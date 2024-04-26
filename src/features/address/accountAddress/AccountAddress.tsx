import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import AddressCard from "./AddressCard";
import "./style.css";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchAddressByUser,
  removeAddressThunk,
  selectAddressStatus,
  selectAddresses,
} from "../addressSlice";

function AccountAddress() {
  document.title = "User Addresses | Gamers stop";
  const { currentUser } = useAuthContext();
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
    <section className="address main">
      <h2 className="address__title">My Addresses</h2>
      <div className="address__container">
        <Link to="new" className="address__add-address">
          <AddIcon />
          Add Address
        </Link>
        {isLoading === "loading" ? (
          <Loader />
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="address__card">
              <div className="address__card-body">
                <AddressCard address={address} />
              </div>

              <div className="address__card-options">
                <Link to={`edit/${address.id}`} className="address__link">
                  Edit
                </Link>{" "}
                |{" "}
                <button
                  className="address__del-btn"
                  onClick={() => handleAddressDel(address.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AccountAddress;
