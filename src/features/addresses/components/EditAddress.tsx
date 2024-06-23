import Drawer from "@/components/ui/Drawer";
import AddressForm from "./AddressForm";
import {
  editAddress,
  resetAddressCurrentItem,
  selectAddressCurrentItem,
} from "../addressSlice";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { AddressFormValues } from "@/types/api";
import { useAuth } from "@/hooks/useAuth";

const EditAddress = () => {
  const { action, record } = useAppSelector(selectAddressCurrentItem);
  const { isOpen, close, open } = useDisclosure();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [values, setValues] = useState<AddressFormValues | undefined>(
    undefined
  );

  useEffect(() => {
    if (action === "update" && record) {
      const formValues: AddressFormValues = {
        name: record.name,
        address: record.address,
        cityDistrict: record.cityDistrict,
        townLocality: record.townLocality,
        pincode: record.pincode,
        phoneNumber: record.phoneNumber,
        state: record.state,
        userId: record.userId,
        isDefault: record.isDefault,
      };
      setValues(formValues);
      open();
    }
  }, [action, record]);

  const handleClose = () => {
    dispatch(resetAddressCurrentItem());
    close();
  };

  const handleSave = async (data: AddressFormValues) => {
    await dispatch(
      editAddress({ formData: { ...data, userId: user?.id! }, id: record?.id! })
    );
    close();
    dispatch(resetAddressCurrentItem());
  };

  return (
    <Drawer isDrawerOpen={isOpen} closeDrawer={handleClose} title="Address">
      {values ? (
        <AddressForm
          address={values}
          isDefaultAddress={values?.isDefault}
          title="Edit address"
          onSaveFn={handleSave}
        />
      ) : null}
    </Drawer>
  );
};

export default EditAddress;
