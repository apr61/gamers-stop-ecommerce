import { FormEvent, RefObject, useRef } from "react";
import "./style.css";
import Input from "../../../components/input/Input";
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
  const addressRef: RefType = useRef(null);
  const townLocalityRef: RefType = useRef(null);
  const cityDistrictRef: RefType = useRef(null);
  const stateRef: RefType = useRef(null);

  function handleCancel() {
    navigate(-1);
  }

  const dummyAddress: AddressData = {
    uid: currentUser!.uid,
    name: "Unknown me",
    phoneNumber: 1111111111,
    pincode: 111111,
    address: "4 / 51 - 58, Unknown Area",
    townLocality: "Unkown town",
    cityDistrict: "Unkonwn District",
    state: "Unknow state",
  };

  function handleAddDemoAddress() {
    if (nameRef.current) {
      nameRef.current.value = dummyAddress.name;
    }
    if (phoneNumberRef.current) {
      phoneNumberRef.current.value = dummyAddress.phoneNumber.toString();
    }
    if (pinCodeRef.current) {
      pinCodeRef.current.value = dummyAddress.pincode.toString();
    }
    if (addressRef.current) {
      addressRef.current.value = dummyAddress.address;
    }
    if (townLocalityRef.current) {
      townLocalityRef.current.value = dummyAddress.townLocality;
    }
    if (cityDistrictRef.current) {
      cityDistrictRef.current.value = dummyAddress.cityDistrict;
    }
    if (stateRef.current) {
      stateRef.current.value = dummyAddress.state;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAddress: AddressData = {
      uid: currentUser!.uid,
      name: (nameRef.current as HTMLInputElement).value,
      phoneNumber: +(phoneNumberRef.current as HTMLInputElement).value,
      pincode: +(pinCodeRef.current as HTMLInputElement).value,
      address: (addressRef.current as HTMLInputElement).value,
      cityDistrict: (cityDistrictRef.current as HTMLInputElement).value,
      townLocality: (townLocalityRef.current as HTMLInputElement).value,
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
        <div className="address-form__wrapper">
          <Input placeholder="Name" ref={nameRef} value={address?.name!} />
          <Input
            placeholder="Phone number"
            ref={phoneNumberRef}
            value={address?.phoneNumber.toString()!}
          />
        </div>
        <div className="address-form__wrapper">
          <Input
            placeholder="Pincode"
            ref={pinCodeRef}
            value={address?.pincode.toString()!}
          />
          <Input
            placeholder="House no, Building, Street, Area"
            ref={addressRef}
            value={address?.address!}
          />
          <Input
            placeholder="Locality/Town"
            ref={townLocalityRef}
            value={address?.townLocality!}
          />
          <Input
            placeholder="City/District"
            ref={cityDistrictRef}
            value={address?.cityDistrict!}
          />
          <Input placeholder="State" ref={stateRef} value={address?.state!} />
        </div>
        <div className="address-from-sec__btn-wrapper">
          <button
            className={
              isLoading
                ? "address-form-sec__btn address-form-sec__btn--loading"
                : "address-form-sec__btn"
            }
            disabled={isLoading === "loading"}
          >
            {edit ? "Edit Address" : "Add new Address"}
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
