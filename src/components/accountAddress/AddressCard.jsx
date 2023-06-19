import "./style.css";
function AddressCard({
  fullName,
  flat,
  area,
  landmark,
  pincode,
  town,
  state,
  phoneNumber,
}) {
  return (
    <>
      <h4 className="address__details address__details--heading">{fullName}</h4>
      <p className="address__details">{flat}</p>
      <p className="address__details">{area}</p>
      <p className="address__details">{landmark}</p>
      <p className="address__details">
        {town}, {state.toUpperCase()} {pincode}
      </p>
      <p className="address__details">India</p>
      <p className="address__details">Phone Number : {phoneNumber}</p>
    </>
  );
}

export default AddressCard;
