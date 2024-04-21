import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAddressesService } from "../services/address";
import { useAuthContext } from "./AuthContext";
import { Address } from "../utils/types";

type AddressContextType = {
  isLoading: boolean;
  addresses: Address[];
  createLocalAddress: (newAddress: Address) => void;
  updateLocalAddress: (updatedAddress: Address) => void;
  deleteLocalAddress: (id: string) => void;
};

const addressContextInit: AddressContextType = {
  isLoading: false,
  addresses: [],
  createLocalAddress: () => {},
  updateLocalAddress: () => {},
  deleteLocalAddress: () => {},
};

const AddressContext = createContext<AddressContextType>(addressContextInit);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function UserAddressProvider({ children }: ChildrenType) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuthContext();

  const getAddresses = async (userId: string) => {
    try {
      setIsLoading(true);
      const data = await getAddressesService(userId);
      setAddresses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAddresses(currentUser?.uid);
    }
  }, [currentUser]);

  const createLocalAddress = (newAddress: Address) => {
    setAddresses((oldAddresses) => [newAddress, ...oldAddresses]);
  };

  const updateLocalAddress = (updatedAddress: Address) => {
    setAddresses((oldAddresses) =>
      oldAddresses.map((address) => {
        if (address.id === updatedAddress.id) {
          return updatedAddress;
        }
        return address;
      })
    );
  };

  const deleteLocalAddress = (id: string) => {
    setAddresses((oldAddresses) =>
      oldAddresses.filter((address) => address.id !== id)
    );
  };

  return (
    <AddressContext.Provider
      value={{
        isLoading,
        addresses,
        createLocalAddress,
        deleteLocalAddress,
        updateLocalAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export default UserAddressProvider;

export function useAddressContext() {
  return useContext(AddressContext);
}
