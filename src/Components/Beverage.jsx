import React, { useState, useContext } from 'react';

import { HandleKurv } from '../Model/handleKurv';
import '../Styles/styles.css';
import Expander from './Expander';
import { Shoppingcart } from '../Views/Shoppingcart';

const Beverage = (props) => {
  const handleKurv = useContext(HandleKurv);
  let audio1 = new Audio("/addSound.mp4")
  let audio2 = new Audio("/removeSound.mp4")


  const startAudio1 = () => {
    audio1.play()
  }

  const startAudio2 = () => {
    audio2.play()
  }

  const getNrOrderOf = (item) => {
    if (handleKurv.products[props.type.id] && handleKurv.products[props.type.id][item.storlek]) {
      return handleKurv.products[props.type.id][item.storlek].antal;
    }
    return 0;
  };

  const addToBasket = (item) => {
    startAudio1();
  
    console.log("item:", item);
    const nrOrderedOf = getNrOrderOf(item);
    handleKurv.setProducts((prevstate) => {
      return {
         ...prevstate,
          [props.type.id]: {
            ...prevstate[props.type.id],
            [item.storlek]: {
              antal: nrOrderedOf + 1,
              price: item.price
            },
          },
      };
    });
  };

  const removeFromBasket = (item) => {
    startAudio2();
    const nrOrderedOf = getNrOrderOf(item);
    if (nrOrderedOf > 0) {
      handleKurv.setProducts((prevstate) => {
        return {
          ...prevstate,
          [props.type.id]: {
            ...prevstate[props.type.id],
            [item.storlek]: {
              antal: nrOrderedOf - 1,
              price: item.price
            },
          },
        };
      });
    }
  };

  return (
    <Expander title={props.type.id} icon={props.type.icon} >
      <div className='expander-text'>
      <img 
      alt="product-image"
      className="product-image"
      src={props.type.img} 
      alt={props.type.id}/>
      {
            props.type.size.map((item) => {
              return (
                <div className="size-buttons-container">
                  <span 
                    onClick={() => {
                      removeFromBasket(item);
                    }}
                    className={'button minus-button'}
                  >
                    -
                  </span>
                  <span className="number-of-items">{getNrOrderOf(item)}</span>
                  <span 
                    onClick={() => {
                      addToBasket(item);
                    }}
                    className={'button plus-button'}
                  >
                    +
                  </span>
                  <span>
                    {`  ${item.storlek}: `}<strong>{item.price}</strong>{`,-`}
                  </span>
                </div>
              );
            })
      }</div>
    </Expander>
    );
  };

export default Beverage;


/*
<button className={`size-button ${menuSection === menuSectionNames[0] ? "active-button" : ""}`}>Liten</button>
<button className={`size-button ${menuSection === menuSectionNames[1] ? "active-button" : ""}`}>Medium</button>
<button className={`size-button ${menuSection === menuSectionNames[2] ? "active-button" : ""}`}>Stor</button>
*/
