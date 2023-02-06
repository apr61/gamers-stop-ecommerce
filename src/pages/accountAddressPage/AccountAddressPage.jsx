import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './style.css'

function AccountAddressPage() {
    return (
        <section className='address main'>
            <h2 className="address__title">Your Addresses</h2>
            <div className="address__container">
                <Link to='/account/addresses/new' className="address__add-address"><AiOutlinePlus />Add Address</Link>
                <div className="address__card">
                    <div className="address__card-body">
                        <h4 className="address__details address__details--heading">Pradeep</h4>
                        <p className="address__details">M008</p>
                        <p className="address__details">Mangalagiri</p>
                        <p className="address__details">Xerox</p>
                        <p className="address__details">Mangalagiri, Andhra Pradesh 522203</p>
                        <p className="address__details">India</p>
                        <p className="address__details">Phone Number : 999999999</p>
                    </div>
                    <div className="address__card-options">
                        <Link to='edit'>Edit</Link> | <Link to=''>Remove</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountAddressPage