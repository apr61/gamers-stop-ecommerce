import { useId } from 'react'
import './inputCheckBox.css'
import { AiFillStar } from 'react-icons/ai'

function InputCheckBox({name, labelName, icon}) {
    const cId = useId()
  return (
    <div className="input-group">
        <input type="checkbox" name={name} id={cId} />
        <label htmlFor={cId}>{icon ? <>{labelName} <AiFillStar /> {'& up'}</> : labelName}</label>
    </div>
  )
}

export default InputCheckBox