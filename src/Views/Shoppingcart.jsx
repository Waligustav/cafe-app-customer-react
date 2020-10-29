import React, { useEffect, useContext, useState } from 'react';
import { HandleKurv } from '../Model/handleKurv';
import { PricePreView } from '../Components/PricePreView';

export const Shoppingcart = (props) => {
  //const handleKurv = useContext(HandleKurv);
  const handleKurv = useContext(HandleKurv);
  return (
    <>
      <div>
        {Object.keys(handleKurv.products).map((product) => {
          console.log("Vara:  " + product);
          return Object.keys(handleKurv.products[product]).map((size) => {
            console.log("Storlek:  " + size);
            const amount = handleKurv.products[product][size].antal;
            const aPrice = handleKurv.products[product][size].price;
            console.log("Antal:  " + amount);
            console.log("Pris:  " + aPrice);
            return <div className="shopping-cart-output">Du har beställt {(amount, aPrice)}</div>;
          });
        })}
      </div>
    </>
  );
      
  // (Object.keys(HandleKurv.products).forEach((product) => {
  //   <div>{product.storlek}</div>
  // }));
};
export default Shoppingcart;
