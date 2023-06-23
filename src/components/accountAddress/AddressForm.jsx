import React, { useRef, useState } from "react";
import "./style.css";
import Input from "../../components/inputFields/Input";
import { useAuthContext } from "../../context/AuthContext";
import {
  addAddressService,
  updateAddressByIdService,
} from "../../services/address";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext";

function AddressFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { createLocalAddress, updateLocalAddress } = useAddressContext();
  const preAddress = location?.state;
  const edit = preAddress?.["id"] ? true : false;
  document.title = `${edit ? "Edit" : "New"} Address | Gamers stop`;
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const pinCodeRef = useRef();
  const flatRef = useRef();
  const areaRef = useRef();
  const landmarkRef = useRef();
  const townRef = useRef();
  const stateRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const newAddress = {
      uid: currentUser.uid,
      fullName: nameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      pincode: pinCodeRef.current.value,
      flat: flatRef.current.value,
      area: areaRef.current.value,
      landmark: landmarkRef.current.value,
      town: townRef.current.value,
      state: stateRef.current.value,
    };
    try {
      setLoading(true);
      if (edit) {
        updateAddressByIdService(newAddress, preAddress?.id).then(
          updateLocalAddress({ id: preAddress?.id, ...newAddress })
        );
      } else {
        addAddressService(newAddress).then((docRef) =>
          createLocalAddress({ id: docRef.id, ...newAddress })
        );
      }
    } catch {
      (err) => {
        setError(err);
      };
    } finally {
      setLoading(false);
      setError("");
      navigate(-1);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <>
      <section className="address-form-sec">
        <h2 className="address__title">
          {edit ? "Edit Address" : "New Address"}
        </h2>
        {error && <p className="error-msg">{error}</p>}
        <form className="address-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Full name"
            ref={nameRef}
            value={preAddress?.fullName}
          />
          <Input
            placeholder="Phone number"
            ref={phoneNumberRef}
            value={preAddress?.phoneNumber}
          />
          <Input
            placeholder="Pincode"
            ref={pinCodeRef}
            value={preAddress?.pincode}
          />
          <Input
            placeholder="Flat, House no, Building, Apartment"
            ref={flatRef}
            value={preAddress?.flat}
          />
          <Input
            placeholder="Area, Street, Village"
            ref={areaRef}
            value={preAddress?.area}
          />
          <Input
            placeholder="Landmark - eg. near Med Plus Store"
            ref={landmarkRef}
            value={preAddress?.landmark}
          />
          <Input
            placeholder="Town/City"
            ref={townRef}
            value={preAddress?.town}
          />
          <Input placeholder="State" ref={stateRef} value={preAddress?.state} />
          <div className="address-from-sec__row">
            <button
              className={
                loading
                  ? "address-form-sec__btn address-form-sec__btn--loading"
                  : "address-form-sec__btn"
              }
              disabled={loading}
            >
              {edit ? "Edit Address" : "Add Address"}
            </button>
            <button
              type="button"
              className="address-form-sec__btn address-form-sec__btn--border"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddressFormPage;
