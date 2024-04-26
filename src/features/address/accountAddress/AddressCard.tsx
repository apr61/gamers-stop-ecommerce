import { Address } from "../../../utils/types";
import "./style.css";

type AddressCardProps = {
  address: Address;
};

function AddressCard({ address }: AddressCardProps) {
  const { fullname, flat, area, landmark, pincode, city, state, phoneNumber } =
    { ...address };
  return (
    <>
      <h4 className="address__details address__details--heading">{fullname}</h4>
      <p className="address__details">{flat}</p>
      <p className="address__details">{area}</p>
      <p className="address__details">{landmark}</p>
      <p className="address__details">
        {city}, {state.toUpperCase()} {pincode}
      </p>
      <p className="address__details">India</p>
      <p className="address__details">Phone Number : {phoneNumber}</p>
    </>
  );
}

export default AddressCard;
