import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext";
import { deleteAddressById } from "../../services/address";
import Loader from '../loader/Loader'
import AddressCard from "./AddressCard";
import "./style.css";

function AccountAddress() {
  document.title = "User Addresses | Gamers stop";
  const { isLoading, addresses, deleteLocalAddress } = useAddressContext();

  function handleAddressDel(id) {
    deleteAddressById(id).then(deleteLocalAddress(id));
  }

  return (
    <section className="address main">
      <h2 className="address__title">My Addresses</h2>
      <div className="address__container">
        <Link to="new" className="address__add-address">
          <AddIcon />
          Add Address
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="address__card">
              <div className="address__card-body">
                <AddressCard {...address} />
              </div>

              <div className="address__card-options">
                <Link to="edit" className="address__link" state={address}>
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
