import React, { useRef, useState } from 'react'
import './style.css'
import Input from '../../components/inputFields/Input'
import InputSelect from '../../components/inputSelect/InputSelect'
import { useAuthContext } from '../../context/AuthContext'
import { addAddress, updateAddress } from '../../services/address'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAddressContext } from '../../context/AddressContext'

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
    const navigate = useNavigate()
    const location = useLocation()
    const { createLocalAddress, updateLocalAddress } = useAddressContext()
    const preAddress = location?.state
    const edit = preAddress?.['id'] ? true : false
    const { currentUser } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const nameRef = useRef()
    const phoneNumberRef = useRef()
    const pinCodeRef = useRef()
    const flatRef = useRef()
    const areaRef = useRef()
    const landmarkRef = useRef()
    const townRef = useRef()
    const stateRef = useRef()


    function handleSubmit(e) {
        e.preventDefault()
        const newAddress = {
            uid: currentUser.uid,
            fullName: nameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            pincode: pinCodeRef.current.value,
            flat: flatRef.current.value,
            area: areaRef.current.value,
            landmark: landmarkRef.current.value,
            town: townRef.current.value,
            state: stateRef.current.value,
        }
        try {
            setLoading(true)
            if (edit) {
                updateAddress(newAddress, preAddress?.id).then(updateLocalAddress({ id: preAddress?.id, ...newAddress }))
            } else {
                addAddress(newAddress).then((docRef) => createLocalAddress({ id: docRef.id, ...newAddress }))
            }
        } catch {
            (err) => {
                setError(err)
            }
        } finally {
            setLoading(false)
            setError('')
            navigate('/account/addresses')
        }
    }

    return (
        <section className="address-form-sec main">
            <h2 className="address__title">{edit ? 'Edit Address' : 'New Address'}</h2>
            {
                error && (
                    <p className="error-msg">{error}</p>
                )
            }
            <form className='address-form' onSubmit={handleSubmit}>
                <Input labelName='Full name' ref={nameRef} value={preAddress?.fullName} />
                <Input labelName='Phone number' ref={phoneNumberRef} value={preAddress?.phoneNumber} />
                <Input labelName='Pincode' ref={pinCodeRef} value={preAddress?.pincode} />
                <Input labelName='Flat, House no, Building, Apartment' ref={flatRef} value={preAddress?.flat} />
                <Input labelName='Area, Street, Village' ref={areaRef} value={preAddress?.area} />
                <Input labelName='Landmark' placeholder='eg. near Med Plus Store' ref={landmarkRef} value={preAddress?.landmark} />
                <Input labelName='Town/City' ref={townRef} value={preAddress?.town} />
                <InputSelect options={StateOptions} labelName='State' customClass='select-sec--state' ref={stateRef} value={preAddress?.state} />
                <button className={loading ? 'address-form-sec__btn address-form-sec__btn--loading' : 'address-form-sec__btn'} disabled={loading}>{edit ? 'Edit Address' : 'Add Address'}</button>
            </form>
        </section>
    )
}

export default AddressFormPage