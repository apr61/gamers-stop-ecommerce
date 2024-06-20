import "./style.css";
import AddressForm from "./AddressForm";

function AddNewAddress() {
  document.title = `New Address | Gamers stop`;
  return (
    <>
      <section className="address-form-sec">
        <h2 className="address__title">New Address</h2>
        <AddressForm />
      </section>
    </>
  );
}

export default AddNewAddress;
