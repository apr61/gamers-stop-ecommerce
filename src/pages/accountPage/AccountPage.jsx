import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './accountPage.css'
import { Link } from 'react-router-dom'

function AccountPage() {
    return (
        <>
            <Navbar />
            <section className="main account-sec">
                <h2 className="account-sec__title">Your Account</h2>
                <div className="account-sec__container">
                    <div className="account-sec__card">
                        <Link to='/account/profile' className='account-sec__link'><h3 className="account-sec__sub-title">Your Profile</h3></Link>
                        <p className="account-sec__desc">Edit login, name & mobile number.</p>
                    </div>
                    <div className="account-sec__card">
                        <Link to='/account/orders' className='account-sec__link'><h3 className="account-sec__sub-title">Your Orders</h3></Link>
                        <p className="account-sec__desc">Track your orders, returns & cancelled orders.</p>
                    </div>
                    <div className="account-sec__card">
                        <Link to='/account/addresses' className='account-sec__link'><h3 className="account-sec__sub-title">Your Addresses</h3></Link>
                        <p className="account-sec__desc">Edit or add addresses for orders.</p>
                    </div>
                    <div className="account-sec__card">
                        <Link to='/account/paymentMethods' className='account-sec__link'><h3 className="account-sec__sub-title">Payment Methods</h3></Link>
                        <p className="account-sec__desc">Edit or add new payment methods.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default AccountPage