import React, { useEffect, useContext, useState } from 'react';

import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../Styles/styles.css';
import { VarmDrikke } from '../Menu/Components/VarmDrikke';
import { KallDrikke } from '../Menu/Components/KallDrikke';
import { Desserts } from '../Menu/Components/Dessert';
import { PricePreView } from '../../Components/PricePreView';
import { HandleKurv } from '../../Model/handleKurv';
import { Modal } from '../../Modal';

const MainMenu = () => {
  let audio = new Audio("/click.mp4")

  // Disse to er states her i MainMenu (se "useState"). Inne i useState(her) er det lagt utgangspunkt-verdier.
  // Gjeldende verdi ligger alltid i første variabel i arrayet, og endres når funksjonen (andre del av arrayet) kalles.

  const [show, setShow] = useState(false);
  const closeModalHandler = () => setShow(false);

  
    const start = () => {
      audio.play()
    }


  const handleKurv = () => {
    return HandleKurv.map((
      orderItem 
    ) => (
    <div className="order-output">{orderItem}</div>
    ));
  };

  return (
    <>
      <header id='header-container'>
        <div>
          {show ? <div className="back-drop" onClick={closeModalHandler}></div> : null}
        </div>

        <Link to='/FrontPage/FrontPage' h1 id='header-title' className='font-cursive' onClick={start}>
          Kafé HK
        </Link>
        
          <Modal show={show} close={closeModalHandler}/>   
        <img id='hamburger-icon' src='../assets/hamburger-icon.png' onClick={() => { setShow(true); start(); }}/>

      </header>
      
      <div id="Front-page-menu-choice-container">
      </div>
      
      <div className="card-menu">

        <div onClick={start} class="warmDrinks frontpage-card">
          <Link to='/MainMenu/VarmDrikke'>
            <img class='menuImg' src='/assets/coffee-menu-card (1).jpg' alt="Kaffe" />
            <h1 className="frontpage-card-text">Varme drikker</h1>
        </Link>
        </div>
        <div onClick={start} class="coldDrinks frontpage-card">
        <Link to='/MainMenu/KallDrikke'>
          <img class='menuImg' src='/assets/iced-coffee-menu-card.jpg' alt="Iste" />
          <h1 className="frontpage-card-text">Kalde drikker</h1>
        </Link>
        </div>
        <div onClick={start} class="dessert frontpage-card">
          <Link to='/MainMenu/Desserts'>
            <img class='menuImg' src='/assets/croissant-menu-card.jpg' alt="Kanelsnurr" />
            <h1 className="frontpage-card-text">Desserter</h1>
        </Link>
        </div>
      </div>
    </>
  );
};

export default MainMenu;