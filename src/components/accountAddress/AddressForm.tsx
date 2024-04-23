import { FormEvent, RefObject, useRef, useState } from "react";
import "./style.css";
import Input from "../inputFields/Input";
import { useAuthContext } from "../../context/AuthContext";
import {
  addAddressService,
  updateAddressByIdService,
} from "../../services/address";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddressContext } from "../../context/AddressContext";
import { AddressData } from "../../utils/types";

type RefType = RefObject<HTMLInputElement>;

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

  const nameRef: RefType = useRef(null);
  const phoneNumberRef: RefType = useRef(null);
  const pinCodeRef: RefType = useRef(null);
  const flatRef: RefType = useRef(null);
  const areaRef: RefType = useRef(null);
  const landmarkRef: RefType = useRef(null);
  const townRef: RefType = useRef(null);
  const stateRef: RefType = useRef(null);

  const dummyAddress: AddressData = {
    uid: currentUser!.uid,
    fullname: "Monkey D Luffy",
    phoneNumber: 8500654785,
    pincode: 865478,
    flat: "4 / 51 - 58",
    area: "Unknown Area",
    landmark: "Besides windmill",
    city: "Vijayawada",
    state: "Andhra Pradesh",
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAddress: AddressData = {
      uid: currentUser!.uid,
      fullname: (nameRef.current as HTMLInputElement).value,
      phoneNumber: +(phoneNumberRef.current as HTMLInputElement).value,
      pincode: +(pinCodeRef.current as HTMLInputElement).value,
      flat: (flatRef.current as HTMLInputElement).value,
      area: (areaRef.current as HTMLInputElement).value,
      landmark: (landmarkRef.current as HTMLInputElement).value,
      city: (townRef.current as HTMLInputElement).value,
      state: (stateRef.current as HTMLInputElement).value,
    };

    try {
      setLoading(true);
      if (edit) {
        updateAddressByIdService(newAddress, preAddress?.id).then(() =>
          updateLocalAddress({ id: preAddress?.id, ...newAddress })
        );
      } else {
        addAddressService(newAddress).then((response) =>
          createLocalAddress(response)
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      setError("");
      navigate(-1);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  function handleAddDemoAddress() {
    if (nameRef.current) {
      nameRef.current.value = dummyAddress.fullname;
    }
    if (phoneNumberRef.current) {
      phoneNumberRef.current.value = dummyAddress.phoneNumber.toString();
    }
    if (pinCodeRef.current) {
      pinCodeRef.current.value = dummyAddress.pincode.toString();
    }
    if (areaRef.current) {
      areaRef.current.value = dummyAddress.area;
    }
    if (flatRef.current) {
      flatRef.current.value = dummyAddress.flat;
    }
    if (landmarkRef.current) {
      landmarkRef.current.value = dummyAddress.landmark;
    }
    if (townRef.current) {
      townRef.current.value = dummyAddress.city;
    }
    if (stateRef.current) {
      stateRef.current.value = dummyAddress.state;
    }
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
          <div className="address-from-sec__btn-wrapper">
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
              onClick={handleAddDemoAddress}
            >
              Demo Address
            </button>
            <button
              type="button"
              className="address-form-sec__btn address-form-sec__btn--border"
              onClick={handleCancel}
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
