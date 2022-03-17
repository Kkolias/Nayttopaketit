import './ShoppingCart.css';
import React from 'react'

export default function ShoppingCart(props) {
  
  const removeProduct = (key, val) => {
    props.setCartArr(props.cartArr.filter((_, i) => i !== key))
    props.setTotalCost(props.totalCost - val.pricePerWeek)
  }

  return (
    <div className='shopping-cart-container'>
      <div className='close-btn' onClick={() => props.setCartVisible(false)}>✖</div>
      <div className='cart-header'><h3>Ostoskori</h3></div>
      <div className='total-sum'>Hinta yhteensä: <span>{props.totalCost}</span> €/vko</div>
      <div className='added-products'>
        {props.cartArr.map((val, key) => {
        return (
          <div key={key} className='added-product-container'>
            <div className='added product-name-and-address'>
              <h3>{val.name}</h3><div className='remove-product' onClick={() => removeProduct(key, val)}>✖</div>
              <p>{val.address}</p>
            </div>
            <div className='added-price'>
              {val.pricePerWeek}€/vko
            </div>            
          </div>
        )
      })}
      </div>  
    </div>
  )
}
