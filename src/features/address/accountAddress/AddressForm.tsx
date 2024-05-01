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
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/button/Button";

type AddressFormProps = {
  edit?: boolean;
  address?: Address;
};

type AddressFormType = {
  name: string;
  phoneNumber: number;
  pincode: number;
  address: string;
  townLocality: string;
  cityDistrict: string;
  state: string;
};

function AddressForm({ edit = false, address }: AddressFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    setValue,
    trigger
  } = useForm<AddressFormType>({
    defaultValues: {
      name: address?.name,
      phoneNumber: address?.phoneNumber,
      pincode: address?.pincode,
      address: address?.address,
      townLocality: address?.townLocality,
      cityDistrict: address?.cityDistrict,
      state: address?.state,
    }
  });

  const isLoading = useAppSelector(selectAddressStatus);
  const error = useAppSelector(selectAddressError);

  function handleCancel() {
    navigate(-1);
  }

  const dummyAddress: AddressData = {
    uid: currentUser!.uid,
    name: "Unknown me",
    phoneNumber: 7867777777,
    pincode: 111111,
    address: "4 / 51 - 58, Unknown Area",
    townLocality: "Unkown town",
    cityDistrict: "Unkonwn District",
    state: "Unknow state",
  };

  function handleAddDemoAddress() {
    setValue("name", dummyAddress.name)
    setValue("phoneNumber", dummyAddress.phoneNumber)
    setValue("pincode", dummyAddress.pincode)
    setValue("address", dummyAddress.address)
    setValue("townLocality", dummyAddress.townLocality)
    setValue("cityDistrict", dummyAddress.cityDistrict)
    setValue("state", dummyAddress.state)
    trigger()
  }

  const onsubmit: SubmitHandler<AddressFormType> = async (data) => {
    const newAddress: AddressData = {
      uid: currentUser!.uid,
      name: data.name,
      phoneNumber: data.phoneNumber,
      pincode: data.pincode,
      address: data.address,
      cityDistrict: data.cityDistrict,
      townLocality: data.townLocality,
      state: data.state,
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
      {error && <p role="alert" className="form-errors">{error}</p>}
      <form className="address-form" onSubmit={handleSubmit(onsubmit)}>
        <div className="address-form__wrapper">
          <Input
            placeholder="Name"
            label="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p role="alert" className="form-errors">
              {errors.name.message}
            </p>
          )}
          <Input
            placeholder="Mobile"
            label="Mobile"
            {...register("phoneNumber", {
              required: "Phone number is required",
              validate: {
                matchPattern: (value) =>
                  /^[6-9]\d{9}$/.test(value.toString()) ||
                  "Mobile must be valid",
              },
            })}
          />
          {errors.phoneNumber && (
            <p role="alert" className="form-errors">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="address-form__wrapper">
          <Input
            label="Pincode"
            placeholder="Pincode"
            {...register("pincode", {
              required: "Pincode is required",
              minLength: {
                value: 6,
                message: "Pincode must be 6 digits",
              },
              maxLength: {
                value: 6,
                message: "Pincode must be 6 digits",
              },
            })}
          />
          {errors.pincode && (
            <p role="alert" className="form-errors">
              {errors.pincode.message}
            </p>
          )}
          <Input
            label="House no, Building, Street, Area"
            placeholder="House no, Building, Street, Area"
            {...register("address", {
              required: "House no, Building, Street, Area is required",
            })}
          />
          {errors.address && (
            <p role="alert" className="form-errors">
              {errors.address.message}
            </p>
          )}
          <Input
            label="Locality/Town"
            placeholder="Locality/Town"
            {...register("townLocality", {
              required: "Locality/Town is required",
            })}
          />
          {errors.townLocality && (
            <p role="alert" className="form-errors">
              {errors.townLocality.message}
            </p>
          )}
          <Input
            label="City/District"
            placeholder="City/District"
            {...register("cityDistrict", {
              required: "City/District is required",
            })}
          />
          {errors.cityDistrict && (
            <p role="alert" className="form-errors">
              {errors.cityDistrict.message}
            </p>
          )}
          <Input
            placeholder="State"
            label="State"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <p role="alert" className="form-errors">
              {errors.state.message}
            </p>
          )}
        </div>
        <div className="address-from-sec__btn-wrapper">
          <Button
            text={edit ? "Edit Address" : "Add new Address"}
            isDisabled={isLoading === "loading" || !isValid}
          />
          {!edit && (
            <Button
              type="button"
              text="Demo Address"
              btnType="ghost"
              onClick={handleAddDemoAddress}
            />
          )}
          <Button
            type="button"
            text="Cancel"
            btnType="ghost"
            onClick={handleCancel}
          />
        </div>
      </form>
    </>
  );
}

export default AddressForm;
