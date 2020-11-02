import React, { useEffect, useContext, useState } from 'react';

import { HandleKurv } from '../Model/handleKurv';
import { PricePreView } from '../Components/PricePreView';
import { Beverage } from '../Components/Beverage';
import { Dessert } from '../Components/Dessert';

export const Shoppingcart = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const handleKurv = useContext(HandleKurv);

  useEffect(() => {
    calcTotalPrice();
  }, [handleKurv.products]);

  const calcTotalPrice = () => {
    let total = 0;
    Object.keys(handleKurv.products).forEach((product) => {
      Object.keys(handleKurv.products[product]).forEach((size) => {
        const amount = handleKurv.products[product][size].antal;
        const aPrice = handleKurv.products[product][size].price;
        total += amount * aPrice;
      });
    });
    setTotalPrice(total);
  };

  return (
    <>
      <div>
        {Object.keys(handleKurv.products).map((product) => {
          return Object.keys(handleKurv.products[product]).map((size) => {
            /* Increase amount in basket */
            const addToBasket = (item) => {
              handleKurv.setProducts((prevstate) => {                                          
                  return {
                    /* Get previous state and update [product] */          
                    ...prevstate,
                    [product]: {
                      [item.storlek]: {
                        size: item.storlek,
                        antal: item.antal + 1,
                        price: item.price
                      },
                    },
                  };                                
              });
            };
          /* Decrease amount in basket */
            const removeFromBasket = (item) => {
              if (amount > 0) {
                handleKurv.setProducts((prevstate) => {
                  return {
                    /* Get previous state and update [product] */
                    ...prevstate,
                    [product]: {                  
                      [item.storlek]: {
                        size: item.storlek,
                        antal: item.antal - 1,
                        price: item.price
                      },
                    },
                  };
                });
              }
            };
            const amount = handleKurv.products[product][size].antal;
            const aPrice = handleKurv.products[product][size].price;

            /* Final order output */
          return <div className='shopping-cart-output-container'>
                    <div className="shopping-cart-output">Du har bestilt {amount} {product} ({size}). Pris per: {aPrice} kr,-
                    </div>
                    <div className="shopping-cart-buttons-container">
                      <span onClick={() => {
                        removeFromBasket(handleKurv.products[product][size]);
                      }}
                      className={'button minus-button'}
                      >
                      -
                      </span>
                      <span onClick={() => {
                        addToBasket(handleKurv.products[product][size]);
                      }}
                      className={'button plus-button'}
                      >
                      +
                      </span>
                    </div>
                 </div>;
          });
        })}
      </div>
      <div><strong>Totalpris: {totalPrice}</strong></div>
    </> 
  );
  
}

export default Shoppingcart;
