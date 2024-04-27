export type Product = {
  id: string;
  name: string;
  dateadded: string;
  category: string;
  avgrating: number;
  description: string;
  featured: boolean;
  images: string[];
  itemcondition: "new" | "refurbished";
  manufacturer: string;
  price: number;
  quantity: number;
  brand: string;
  memory?: string;
  slugurl: string;
};

export type AddressData = {
  area: string;
  flat: string;
  fullname: string;
  landmark: string;
  phoneNumber: number;
  pincode: number;
  city: string;
  state: string;
  uid: string;
};

type AddressId = {
  id: string;
};

export type Address = AddressData & AddressId;

export type Category = {
  id: string;
  category: string;
  images?: string;
};

export type OrderData = {
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  orderStatus: "yet-to-be-shipped" | "cancelled" | "delivered";
  orderedDate: string;
  paymentId: string;
  paymentStatus: "paid" | "not-paid" | "cash-on-delivery";
  totalAmount: number;
  totalItemsOrdered: number;
  uid: string;
  productsOrdered: CartItem[];
  shippingAddress: Address;
};

type OrderId = {
  id: string;
};

export type Order = OrderData & OrderId;

export type UserData = {
  name: string;
  email: string;
  password: string;
};

type UserId = {
  id: string;
};

export type User = UserId & UserData;

export type CartItem = {
  qty: number;
} & Product;

export type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type ServerTimestamp = {
  nanoseconds: number;
  seconds: number;
  toDate: () => Date;
  isEqual: (other: ServerTimestamp) => boolean;
};
