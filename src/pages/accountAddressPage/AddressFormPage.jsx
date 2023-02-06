import React from 'react'
import './style.css'
import Input from '../../components/inputFields/Input'
import InputSelect from '../../components/inputSelect/InputSelect'

const StateOptions = [
    {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    },
    {
        'optionName': 'Arunachal Pradesh',
        'optionValue': 'Arunachal Pradesh'
    }, {
        'optionName': 'Uttar Pradesh',
        'optionValue': 'Uttar Pradesh'
    }, {
        'optionName': 'Madhya Pradesh',
        'optionValue': 'Madhya Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    }, {
        'optionName': 'Andhra Pradesh',
        'optionValue': 'Andhra Pradesh'
    },
]

function AddressFormPage() {
    return (
        <section className="address-form-sec main">
            <h2 className="address__title">New Address</h2>
            <form className='address-form'>
                <Input labelName='Full name' />
                <Input labelName='Phone number' />
                <Input labelName='Pincode' />
                <Input labelName='Flat, House no, Building, Apartment' />
                <Input labelName='Area, Street, Village' />
                <Input labelName='Landmark' placeholder='eg. near Med Plus Store' />
                <Input labelName='Town/City' />
                <InputSelect options={StateOptions} labelName='State' customClass='select-sec--state'/>
                <button className="address-form-sec__btn">Add Address</button>
            </form>
        </section>
    )
}

export default AddressFormPage