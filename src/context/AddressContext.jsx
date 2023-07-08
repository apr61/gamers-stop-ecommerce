import { createContext, useContext, useEffect, useState } from "react";
import { getAddressesService } from "../services/address";
import { useAuthContext } from "../context/AuthContext";

const AddressContext = createContext();

function UserAddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuthContext();

  const getAddresses = async (userId) => {
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
    currentUser.uid && getAddresses(currentUser?.uid);
  }, [currentUser?.uid]);

  function createLocalAddress(newAddress) {
    setAddresses((oldAddresses) => [newAddress, ...oldAddresses]);
  }

  function updateLocalAddress(updatedAddress) {
    setAddresses((oldAddresses) =>
      oldAddresses.map((address) => {
        if (address.id === updatedAddress.id) {
          return updatedAddress;
        }
        return address;
      })
    );
  }

  function deleteLocalAddress(id) {
    setAddresses((oldAddresses) =>
      oldAddresses.filter((address) => address.id !== id)
    );
  }

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
