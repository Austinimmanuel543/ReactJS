import { Row, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './aboutas.css';
import { ButtonPlantr } from '../../components/buttonPlantr/buttonPlantr';
import { IoTrashOutline, IoCardOutline } from 'react-icons/io5'
import { CartContext } from '../../context/cartContext'
import { useContext, useState, Fragment } from 'react'
import { FormCheckout } from '../../components/formCheckout/formCheckout'
import { Notice } from '../../components/notice/notice'
import { ItemsTable } from '../../components/itemsTable/itemsTable'

export const Aboutus = () => {
		return (
			<Fragment>
                <div className="about_us">
 <div class="about-section">
  <h1>About Us Page</h1>
  <p>Build your knowleage with your marketing package .</p>
  <p>The global ecommerece website is best website.</p>
</div>

<h2 >Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Gnana Lekhana</h2>
        <p class="title">Web Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>gnanalekhana2807@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <div class="container">
        <h2>chandrika</h2>
        <p class="title">Web Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>njchandrika@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Aishwarya</h2>
        <p class="title">Web Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>@.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
</div>
			</Fragment>
	
        )
}
