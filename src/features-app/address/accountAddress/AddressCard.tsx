import { Link } from "react-router-dom";
import { Address } from "../../../utils/types";
import "./style.css";

type AddressCardProps = {
  addressData: Address;
  handleAddressDel: (id: string) => void;
};

function AddressCard({ addressData, handleAddressDel }: AddressCardProps) {
  const {
    id,
    name,
    address,
    pincode,
    cityDistrict,
    townLocality,
    state,
    phoneNumber,
  } = { ...addressData };
  return (
    <div className="address-card">
      <div className="address-card__wrapper">
        <p className="address-card__details address-card__details--bold">
          {name}
        </p>
        <div className="address-card__container">
          <p className="address-card__details">{address}</p>
          <p className="address-card__details">{townLocality}</p>
          <p className="address-card__details">
            {cityDistrict} - {pincode}
          </p>
          <p className="address-card__details">{state}</p>
        </div>
        <p className="address-card__details">Mobile: {phoneNumber}</p>
      </div>
      <div className="address-card__actions">
        <Link to={`edit/${id}`} className="address-card__link">
          Edit
        </Link>{" "}
        <span>|</span>
        <button
          className="address-card__del-btn"
          onClick={() => handleAddressDel(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
