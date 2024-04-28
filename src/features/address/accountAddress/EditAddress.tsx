import "./style.css";
import AddressForm from "./AddressForm";
import { Address } from "../../../utils/types";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { getAddressForCurrentUserById } from "../../../services/address";
import { selectCurrentUser } from "../../auth/authSlice";
import { useAppSelector } from "../../../app/hooks";

function EditAddress() {
  document.title = `Edit Address | Gamers stop`;
  const currentUser = useAppSelector(selectCurrentUser);
  const { addressId } = useParams();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    (async (userId: string, addressId: string) => {
      try {
        const response = await getAddressForCurrentUserById(userId, addressId);
        setAddress(response);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setAddress(null);
        }
      } finally {
        setLoading(false);
      }
    })(currentUser?.uid as string, addressId as string);
  }, [currentUser?.uid, addressId]);

  if (loading) return <Loader />;

  if (address === null) {
    return <Navigate to="/account/addresses" />;
  }
  return (
    <>
      <section className="address-form-sec">
        <h2 className="address__title">Edit Address</h2>
        <AddressForm address={address} edit={true} />
      </section>
    </>
  );
}

export default EditAddress;
