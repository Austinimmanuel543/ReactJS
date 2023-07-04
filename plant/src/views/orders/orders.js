import { Row, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './orders.css';
import { ButtonPlantr } from '../../components/buttonPlantr/buttonPlantr';
import { ItemsTable } from '../../components/itemsTable/itemsTable';
import { useState, useEffect } from 'react'
import { getFirestore } from '../../firebase'
import slide from "../../assets/slide.jpg";
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

export const Orders = () => {
	let history = useHistory();
	const { orderId } = useParams()
	const [order, setOrder] = useState('')
	const [existOrder, setExistOrder] = useState(true)

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (e.target[0].value.length < 1) {
		} else {
			history.push(`/orders/${e.target[0].value}`)
		}
	}

	useEffect(() => {
		if (orderId) {
			const db = getFirestore()
			const ItemCollection = db.collection('orders').doc(orderId)
			ItemCollection
				.get()
				.then((querySnapshot) => {
					if (querySnapshot.exists === true) {
						setOrder(querySnapshot.data())
						setExistOrder(true)
					} else {
						setExistOrder(false)
					}
				}
				)
		}
	}, [orderId])
	return (
		<div style={{ backgroundImage: `url(${slide})`, backgroundSize: 'cover', backgroundAttachment: 'center' }}>
			<Container>
				{order ?
					<Row style={{ padding: '10rem 0 25rem 0', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
						<div className="topCart">
							<h5 style={{ marginBottom: '2rem' }}>Reference code: {orderId}</h5>
							<h5>Date of admission: {new Date(order.date.seconds * 1000).toLocaleDateString("es-AR")}</h5>
						</div>
						<h4 style={{ marginBottom: '2rem', color: 'rgb(61 204 98)' }}>Status: In deposit</h4>
						<ItemsTable items={order.items} controllable={false} />
						<div className="bottomCart">
							<h2 className="total">Total: ${order.total}</h2>
						</div>
					</Row> :
					<Row style={{ padding: '20rem 0 25rem 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<Form onSubmit={onFormSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<h5>Reference code</h5>
							<Form.Group controlId="formBasicEmail">
								<Form.Control type="text" name="code" size="lg" />
							</Form.Group>
							<p style={{ color: 'red' }}>{existOrder === false && 'El pedido que buscas no existe'}</p>
							<ButtonPlantr type="submit">
								Check order
							</ButtonPlantr>
						</Form>
					</Row>
				}
			</Container>
		</div>
	)
}
