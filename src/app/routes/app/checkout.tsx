import {
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { currencyFormatter } from "@/utils/utils";
import { createAnOrderService } from "@/services/orders";
import AddIcon from "@mui/icons-material/Add";
import { OrderData, RazorpayPaymentResponse } from "@/types/api";
import { Address } from "@/types/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getAllCartItems,
  getTotalCost,
  getTotalItems,
} from "@/features-app/cart/cartSlice";
import {
  fetchAddressesByUser,
  selectAddresses,
} from "@/features/addresses/addressSlice";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/PageLoader";

type CheckoutState = {
  checkoutAddress: Address | null;
  setCheckoutAddress: Dispatch<React.SetStateAction<Address | null>>;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  canPlaceOrder: boolean;
};

const CheckoutContext = createContext<CheckoutState | undefined>(undefined);

const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
};

function CheckOutPage() {
  document.title = "Checkout | Gamers Stop";
  const [checkoutAddress, setCheckoutAddress] = useState<Address | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(getAllCartItems);
  const totalPrice = useAppSelector(getTotalCost);
  const totalItems = useAppSelector(getTotalItems);

  const deliveryFee = 100;
  const discount = totalPrice * 0.05;
  const grandTotal = totalPrice - discount + deliveryFee;

  const canPlaceOrder = checkoutAddress !== null && cart.length > 0;

  const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
    const newOrder: OrderData = {
      paymentId: response.razorpay_payment_id as string,
      shippingAddress: checkoutAddress!,
      paymentStatus: "paid",
      orderStatus: "placed",
      orderedDate: new Date().toString(),
      productsOrdered: [...cart],
      totalAmount: totalPrice,
      totalItemsOrdered: totalItems,
      deliveryFee: deliveryFee,
      grandTotal: grandTotal,
      uid: user?.id!,
      discount,
    };
    // TODO:: Implement order placing
  };

  const RazorpayOptions = {
    key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
    amount: Math.floor(grandTotal) * 100,
    currency: "INR",
    name: "Gamers Stop",
    description: "Thank you for shopping with us.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/gamers-stop-ecom-dev.appspot.com/o/favicon.ico?alt=media&token=26721467-df11-408f-bb40-31670d555e36",
    handler: (response: RazorpayPaymentResponse) =>
      handlePaymentSuccess(response),
    prefill: {
      name: user?.user_metadata.full_name,
      email: user?.email,
      contact: checkoutAddress?.phoneNumber,
    },
    notes: {
      address: checkoutAddress,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const handlePlaceOrder = () => {
    if (checkoutAddress) {
      const razorpayInstance = new (window as any).Razorpay(RazorpayOptions);
      razorpayInstance.open();
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutAddress,
        setCheckoutAddress,
        grandTotal,
        deliveryFee,
        discount,
        canPlaceOrder,
      }}
    >
      <div className="checkout">
        <h2 className="checkout__title">Check Out</h2>
        <div className="checkout__body">
          <CheckoutAddress />
          <div className="checkout__summary">
            <CartSection />
            <PriceSection />
            <DeliveryTo />
            <div className="checkout__row">
              <Button disabled={!canPlaceOrder} onClick={handlePlaceOrder}>
                Place Order & Pay
              </Button>
              <Button onClick={() => navigate("/cart")} btnType="ghost">
                Cancel & Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}

export default CheckOutPage;

const CheckoutAddress = () => {
  const { data: addresses, status: isLoading } =
    useAppSelector(selectAddresses);
  const { checkoutAddress, setCheckoutAddress } = useCheckoutContext();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchAddressesByUser(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (isLoading === "succeeded" && addresses.length > 0) {
      setCheckoutAddress(addresses[0]);
    }
  }, [isLoading]);

  return (
    <section className="checkout__address">
      <h3 className="checkout__title">Select Address</h3>
      {isLoading === "pending" ? (
        <div className="relative min-h-[5rem]">
          <PageLoader />
        </div>
      ) : (
        <div className="checkout__address-container">
          {addresses.map((address) => (
            <div className="checkout__address-card" key={address.id}>
              <input
                type="radio"
                name="address"
                checked={address.id === checkoutAddress?.id}
                id={String(address.id)}
                onChange={() => setCheckoutAddress(address)}
              />
              <label
                htmlFor={String(address.id)}
                className="checkout__address-label"
              >
                <AddressCard address={address} />
              </label>
            </div>
          ))}
          <Link className="checkout__link" to="/account/addresses/new">
            <AddIcon /> Add new address
          </Link>
        </div>
      )}
    </section>
  );
};

type AddressCardProps = {
  address: Address;
};

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <>
      <h4 className="address__details address__details--heading">
        {address.name}
      </h4>
      <p className="address__details">{address.address}</p>
      <p className="address__details">{address.townLocality}</p>
      <p className="address__details">
        {address.cityDistrict}, {address.state.toUpperCase()} {address.pincode}
      </p>
      <p className="address__details">Mobile : {address.phoneNumber}</p>
    </>
  );
};

const CartSection = () => {
  const cart = useAppSelector(getAllCartItems);
  return (
    <section className="checkout__sec">
      <h2 className="checkout__title checkout__title--md">Order Summary</h2>
      <div>
        {cart.map(({ id, name, images, price, qty }) => (
          <div key={id} className="checkout__item">
            <img
              className="checkout__img"
              src={images[0]}
              alt={name}
              loading="lazy"
            />
            <div>
              <h3>{name}</h3>
              <p>{currencyFormatter(price)}</p>
              <p>Qty : {qty}</p>
              <p>SUB : {currencyFormatter(qty * price)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PriceSection = () => {
  const totalPrice = useAppSelector(getTotalCost);
  const { discount, deliveryFee, grandTotal } = useCheckoutContext();
  return (
    <section className="checkout__sec">
      <h2 className="checkout__title checkout__title--md">Price Details</h2>
      <table className="checkout__table mt-4">
        <tbody>
          <tr className="checkout__trow">
            <th className="checkout__th">Total Price</th>
            <td>{currencyFormatter(totalPrice)}</td>
          </tr>
          <tr className="checkout__trow">
            <th className="checkout__th">Total Discount (5%)</th>
            <td>- {currencyFormatter(discount)}</td>
          </tr>
          <tr className="checkout__trow">
            <th className="checkout__th">Delivery Fee</th>
            <td>+ {currencyFormatter(deliveryFee)}</td>
          </tr>
          <tr className="checkout__trow checkout__trow--grand-total">
            <th className="checkout__th checkout__th--grand-total">
              Grand total
            </th>
            <td>{currencyFormatter(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const DeliveryTo = () => {
  const { checkoutAddress, canPlaceOrder } = useCheckoutContext();
  let content;
  if (!canPlaceOrder || checkoutAddress === null) {
    content = (
      <>
        <p className="checkout__address-empty">No address selected</p>
        <p className="checkout__address-empty">
          Please select from left section or create a new address
        </p>
      </>
    );
  } else {
    content = <AddressCard address={checkoutAddress} />;
  }
  return (
    <section className="checkout__sec">
      <h2 className="checkout__title checkout__title--md">Deliver To</h2>
      <div className="checkout__selected-address relative min-h-[5rem]">
        {content}
      </div>
    </section>
  );
};
