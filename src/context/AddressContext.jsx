import { createContext, useContext, useEffect, useState } from "react"
import { useAsync } from '../hooks/useAsync'
import { getAddresses } from "../services/address"
import { useAuthContext } from '../context/AuthContext'

const AddressContext = createContext()

function UserAddressProvider({ children }) {
    const { loading, error, value: addresses } = useAsync(getAddresses)
    const { currentUser } = useAuthContext()

    const [localAddresses, setLocalAddresses] = useState([])

    useEffect(() => {
        !loading && setLocalAddresses(addresses.filter(address => address.uid === currentUser.uid))
    }, [addresses])

    function createLocalAddress(newAddress) {
        setLocalAddresses(oldAddresses => [newAddress, ...oldAddresses])
    }

    function updateLocalAddress(updatedAddress) {
        setLocalAddresses(oldAddresses => oldAddresses.map(address => {
            if(address.id === updatedAddress.id){
                return updatedAddress
            }
            return address
        }))
    }

    function deleteLocalAddress(id) {
        setLocalAddresses(oldAddresses => oldAddresses.filter(address => address.id !== id))
        console.table(localAddresses)
    }

    return <AddressContext.Provider value={{ loading, error, localAddresses, createLocalAddress, deleteLocalAddress, updateLocalAddress }}>
        {children}
    </AddressContext.Provider>
}

export default UserAddressProvider


export function useAddressContext() {
    return useContext(AddressContext)
}