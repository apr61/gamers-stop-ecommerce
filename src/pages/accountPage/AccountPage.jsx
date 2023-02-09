import React from 'react'
import './accountPage.css'
import { Link } from 'react-router-dom'

function AccountPage() {
    return (
        <>
            <section className="main account-sec">
                <h2 className="account-sec__title">Your Account</h2>
                <div className="account-sec__container">
                    <Link to='/account/profile' className='account-sec__link'>
                        <div className="account-sec__card">
                            <h3 className="account-sec__sub-title">Your Profile</h3>
                            <p className="account-sec__desc">Edit login, name & mobile number.</p>
                        </div>
                    </Link>
                    <Link to='/account/orders' className='account-sec__link'>
                        <div className="account-sec__card">
                            <h3 className="account-sec__sub-title">Your Orders</h3>
                            <p className="account-sec__desc">Track your orders, returns & cancelled orders.</p>
                        </div>
                    </Link>
                    <Link to='/account/addresses' className='account-sec__link'>
                        <div className="account-sec__card">
                            <h3 className="account-sec__sub-title">Your Addresses</h3>
                            <p className="account-sec__desc">Edit or add addresses for orders.</p>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default AccountPage