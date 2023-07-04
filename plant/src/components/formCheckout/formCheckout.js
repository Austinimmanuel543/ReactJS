import { Form, Col, Row } from 'react-bootstrap'
import { Fragment, useState } from 'react'
import { ButtonPlantr } from '../buttonPlantr/buttonPlantr'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoCardOutline } from 'react-icons/io5'

export const FormCheckout = ({ onConfirmBuy }) => {
	const [clicked, setClicked] = useState(false)
	const [emptyFields, setEmptyFields] = useState(false)
	const isEmpty = (obj) => {
		return Object.values(obj).some(x => x === '')
	}

	const onFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target),
			formDataObj = Object.fromEntries(formData.entries())
		if (isEmpty(formDataObj)) {
			setEmptyFields(true)
		} else {
			if (formDataObj.mail === formDataObj.confirmmail) {
				setClicked(true)
				delete formDataObj.confirmmail
				onConfirmBuy(formDataObj)
			} else {
				setEmptyFields(true)
			}
		}
	}

	return (
		<Fragment>
			<Row style={{ borderBottom: '1px rgba(0,0,0,0.1) solid', padding: '0rem 0 1rem 0', marginBottom: '2rem' }}>
				<Col xs={2}>
					<IoCardOutline style={{ fontSize: '4rem', color: '#3dcc62' }} />
				</Col>
				<Col xs={4}>
					<Form.Label>Card number</Form.Label>
					<p style={{ color: '#3dcc62' }}>45** **** **** 1803</p>
				</Col>
				<Col xs={4}>
					<Form.Label>Expiration date</Form.Label>
					<p style={{ color: '#3dcc62' }}>02/27</p>
				</Col>
				<Col xs={2}>
					<Form.Label>CVV</Form.Label>
					<p style={{ color: '#3dcc62' }}>884</p>
				</Col>
			</Row>
			<Form onSubmit={onFormSubmit}>
				<Form.Row style={{ marginBottom: '2rem' }}>
					<Form.Group as={Col}>
						<Form.Label>Full name</Form.Label>
						<Form.Control type="text" placeholder="Name and surname" name="name" style={{ marginBottom: '2rem' }} />
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="test@gmail.com" name="mail" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Telephone</Form.Label>
						<Form.Control type="number" placeholder="Phone number" name="phone" style={{ marginBottom: '2rem' }} />
						<Form.Label>Repeat mail</Form.Label>
						<Form.Control type="email" placeholder="test@gmail.com" name="confirmmail" />
					</Form.Group>
				</Form.Row>
				{emptyFields && <p style={{ color: 'red' }}>Check the fields</p>}
				{clicked ?
					<Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', flexDirection: 'column' }}>
						<AiOutlineLoading3Quarters className="loader" />
					</Row>
					:
					<ButtonPlantr type="submit">To buy</ButtonPlantr>
				}
			</Form>
		</Fragment>
	)
}
