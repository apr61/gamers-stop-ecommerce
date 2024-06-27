import { Address } from "@/types/api";
import Button from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { setAddressCurrentItem } from "../addressSlice";

type AddressCardProps = {
  addressData: Address;
};

function AddressCard({ addressData }: AddressCardProps) {
  const {
    name,
    address,
    pincode,
    cityDistrict,
    townLocality,
    state,
    phoneNumber,
  } = { ...addressData };
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(setAddressCurrentItem({ record: addressData, action: "update" }));
  };
  const handleDelete = () => {
    dispatch(setAddressCurrentItem({ record: addressData, action: "delete" }));
  };
  return (
    <div className="w-full border shadow-sm">
      <div className="p-2">
        <p className="text-sm font-bold">{name}</p>
        <div className="py-3">
          <p className="text-gray-500">
            {address}, {townLocality}
          </p>
          <p className="text-gray-500">
            {cityDistrict} - {pincode}
          </p>
          <p className="text-gray-500">{state}</p>
        </div>
        <p>Mobile: {phoneNumber}</p>
      </div>
      <div className="flex w-full py-3 border-t-2 border var(--clr-border) justify-around">
        <Button
          btnType="ghost"
          className="w-full hover:text-primary"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <span>|</span>
        <Button
          btnType="ghost"
          className="w-full text-red-500"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
