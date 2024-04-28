import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import AddressCard from "./AddressCard";
import "./style.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchAddressByUser,
  removeAddressThunk,
  selectAddressStatus,
  selectAddresses,
} from "../addressSlice";
import { selectCurrentUser } from "../../auth/authSlice";

function AccountAddress() {
  document.title = "User Addresses | Gamers stop";
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAddressStatus);
  const addresses = useAppSelector(selectAddresses);
  const dispatch = useAppDispatch();

  const handleAddressDel = (id: string) => {
    dispatch(removeAddressThunk(id));
  };

  useEffect(() => {
    dispatch(fetchAddressByUser(currentUser?.uid!));
  }, [currentUser?.uid, dispatch]);

  return (
    <section className="address">
      <header className="address__header">
        <h2 className="address__title">Saved Addresses</h2>
        <Link to="new" className="address__add-new-link">
          <AddIcon />
          Add new Address
        </Link>
      </header>
      <div className="address__container">
        {isLoading === "loading" ? (
          <Loader />
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              addressData={address}
              handleAddressDel={handleAddressDel}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default AccountAddress;
