import { Row, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.css';
import { ButtonPlantr } from '../../components/buttonPlantr/buttonPlantr';
import { IoTrashOutline, IoCardOutline } from 'react-icons/io5'
import { CartContext } from '../../context/cartContext'
import { useContext, useState, Fragment } from 'react'
import { FormCheckout } from '../../components/formCheckout/formCheckout'
import { Notice } from '../../components/notice/notice'
import { ItemsTable } from '../../components/itemsTable/itemsTable'

export const Cart = () => {
	const { cartItems, quantity, total, removeItem, clearCart, sendOrder, orderId, orderSummary, changeItemQuantity } = useContext(CartContext)
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	if (cartItems.length) {
		return (
			<Fragment>
				<div className="cartContainer">
					<Container>
						<Row className="cartTableContainer">
							<div className="topCart">
								<h4 className="cartQuantityText">Carrito( {quantity} )</h4>
								<p className="cleanCart" onClick={() => clearCart()}>Empty cart <IoTrashOutline /> </p>
							</div>
							<ItemsTable items={cartItems} onAdd={changeItemQuantity} controllable={true} onRemove={removeItem} />
							<div className="bottomCart">
								<h2 className="total">Total: $ {total}</h2>
								<div onClick={handleShow}>
									<ButtonPlantr><IoCardOutline /> Proceed to payment</ButtonPlantr>
								</div>
							</div>
						</Row>
					</Container>
				</div>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							Finish buying
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="formModal">
						<FormCheckout onConfirmBuy={sendOrder} />
					</Modal.Body>
				</Modal>
			</Fragment>
		)
	} else {
		return (
			<div className="cartContainer">
				<Container>
					<Row className="emptyCartContainer">
						{orderId === '' ?
							<Notice bg={false} header="The cart is empty" buttons={[{ text: 'Go shopping', link: '/' }]} />
							:
							<Fragment>
								<Notice bg={false} buttons={[{ text: 'Check status', link: `/orders/${orderId}`, icon: 'shipping' }, { text: 'Back to top', link: '/', type: 'link' }]}>
									<h1>Thank you for shopping at Plantr</h1>
									<div className="purchasedContainer">
										<h5 className="buyerName">{orderSummary.buyer.name.split(" ")[0]}‎‏‏‎, ‎</h5>
										<h5>your reference code is:</h5>
									</div>
									<h5 className="orderIdText">{orderId}</h5>
									<p>Check your email, we have sent you the steps to follow to {orderSummary.buyer.mail}</p>
								</Notice>
							</Fragment>
						}
					</Row>
				</Container>
			</div>
		)
	}
}
