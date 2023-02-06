import React from 'react';
import './Form.css';
import { deliveryFeeCalculator } from "./Calculator";

export default function Form() {
  function handleSubmit(event: any) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    const cartValue = +formJson["cartValue"]
    const meters = +formJson["meters"]
    const itemCount = +formJson["count"]
    //@ts-ignore
    const orderTime: Date = new Date(formJson["orderTime"])
    const deliveryFee: any = deliveryFeeCalculator(cartValue, meters, itemCount, orderTime)
    const fee = document.getElementById('fee')
    if(fee) return fee.innerHTML = `Deleivery Price: ${deliveryFee}`
  }

  return (
    <div className='container'>
      <h2>Delivery Fee Calculator</h2>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <label htmlFor="cartValue">Cart Value: </label>
        <input name="cartValue" type="number" step={0.01} placeholder="Cart value" required />
        <br />
        <label htmlFor="meters"> Delivery distance:</label>
        <input name='meters' placeholder="meters" required />

        <br />
        <label htmlFor="count">Number of items:</label>
        <input className='input' name='count' placeholder="item count" required />
        <br />
        <label htmlFor="orderTime">Order time:</label>
        <input type="datetime-local" name='orderTime' required />
        <br />
        <br />
        <button type="submit">Calculate delivery fee</button>
      </form>

      <p id='fee'>Deleivery Price:  calculating...</p>
    </div>
  )
}
