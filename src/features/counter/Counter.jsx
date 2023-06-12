import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, selectCounter } from './counterSlice'

function Counter() {
    const counter = useSelector(selectCounter)
    const dispatch = useDispatch()
  return (
    <div>
        <h2>Counter</h2>
        <button onClick={() => dispatch(increment())}>+</button>
            <span>{counter}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

export default Counter