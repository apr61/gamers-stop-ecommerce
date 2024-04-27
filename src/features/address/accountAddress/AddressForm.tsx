import { FormEvent, RefObject, useRef } from "react";
import "./style.css";
import Input from "../../../components/inputFields/Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addNewAddressThunk,
  selectAddressError,
  selectAddressStatus,
  updateAddressThunk,
} from "../addressSlice";
import { Address, AddressData } from "../../../utils/types";
import { selectCurrentUser } from "../../auth/authSlice";

type RefType = RefObject<HTMLInputElement>;

type AddressFormProps = {
  edit?: boolean;
  address?: Address;
};

function AddressForm({ edit = false, address }: AddressFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const isLoading = useAppSelector(selectAddressStatus);
  const error = useAppSelector(selectAddressError);

  const nameRef: RefType = useRef(null);
  const phoneNumberRef: RefType = useRef(null);
  const pinCodeRef: RefType = useRef(null);
  const flatRef: RefType = useRef(null);
  const areaRef: RefType = useRef(null);
  const landmarkRef: RefType = useRef(null);
  const townRef: RefType = useRef(null);
  const stateRef: RefType = useRef(null);

  function handleCancel() {
    navigate(-1);
  }

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    let addressDataReq = {
      id: address?.id as string,
      ...newAddress,
    };

    if (edit) {
      await dispatch(updateAddressThunk(addressDataReq));
    } else {
      await dispatch(addNewAddressThunk(newAddress));
    }
    if (isLoading === "success") {
      navigate(-1);
    }
  };

  return (
    <>
      {error && <p className="error-msg">{error}</p>}
      <form className="address-form" onSubmit={handleSubmit}>
        <Input
          placeholder="Full name"
          ref={nameRef}
          value={address?.fullname!}
        />
        <Input
          placeholder="Phone number"
          ref={phoneNumberRef}
          value={address?.phoneNumber.toString()!}
        />
        <Input
          placeholder="Pincode"
          ref={pinCodeRef}
          value={address?.pincode.toString()!}
        />
        <Input
          placeholder="Flat, House no, Building, Apartment"
          ref={flatRef}
          value={address?.flat!}
        />
        <Input
          placeholder="Area, Street, Village"
          ref={areaRef}
          value={address?.area!}
        />
        <Input
          placeholder="Landmark - eg. near Med Plus Store"
          ref={landmarkRef}
          value={address?.landmark!}
        />
        <Input placeholder="Town/City" ref={townRef} value={address?.city!} />
        <Input placeholder="State" ref={stateRef} value={address?.state!} />
        <div className="address-from-sec__btn-wrapper">
          <button
            className={
              isLoading
                ? "address-form-sec__btn address-form-sec__btn--loading"
                : "address-form-sec__btn"
            }
            disabled={isLoading === "loading"}
          >
            {edit ? "Edit Address" : "Add Address"}
          </button>
          {!edit && (
            <button
              type="button"
              className="address-form-sec__btn address-form-sec__btn--border"
              onClick={handleAddDemoAddress}
            >
              Demo Address
            </button>
          )}
          <button
            type="button"
            className="address-form-sec__btn address-form-sec__btn--border"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddressForm;
