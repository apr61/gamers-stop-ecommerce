import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAddressContext } from '../../context/AddressContext'
import { deleteAddressById } from '../../services/address'
import './style.css'

function AccountAddressPage() {
    const { loading, error, localAddresses: addresses, deleteLocalAddress } = useAddressContext()
    
    function handleAddressDel(id){
        deleteAddressById(id).then(deleteLocalAddress(id))
    }

    return (
        <section className='address main'>
            <h2 className="address__title">Your Addresses</h2>
            {
                error && (
                    <p className="error-msg">{error}</p>
                )
            }
            <div className="address__container">
                <Link to='new' className="address__add-address"><AiOutlinePlus />Add Address</Link>
                {
                    loading ? <h2>Loading...</h2> :
                        addresses.map((address) => (
                            <div key={address.id} className="address__card">
                                <div className="address__card-body">
                                    <h4 className="address__details address__details--heading">{address.fullName}</h4>
                                    <p className="address__details">{address.flat}</p>
                                    <p className="address__details">{address.area}</p>
                                    <p className="address__details">{address.landmark}</p>
                                    <p className="address__details">{address.town}, {address.state.toUpperCase()} {address.pincode}</p>
                                    <p className="address__details">India</p>
                                    <p className="address__details">Phone Number : {address.phoneNumber}</p>
                                </div>

                                <div className="address__card-options">
                                    <Link to='edit' className='address__link' state={address}>Edit</Link> | <button className="address__del-btn" onClick={() => handleAddressDel(address.id)}>Remove</button>
                                </div>
                            </div>
                        ))
                }
            </div>
        </section >
    )
}

export default AccountAddressPage