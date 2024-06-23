import { fetchAddressesByUser, selectAddresses } from "../addressSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import AddressCard from "./AddressCard";
import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/hooks/useAuth";

const AddressList = () => {
  const { status, error, data } = useAppSelector(selectAddresses);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      dispatch(fetchAddressesByUser(user.id));
    }
  }, [user]);

  if (status === "pending") return <PageLoader />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {data.map((address) => (
        <AddressCard key={address.id} addressData={address} />
      ))}
    </div>
  );
};

export default AddressList;
