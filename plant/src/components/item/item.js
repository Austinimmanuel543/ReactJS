import { Fragment } from "react";
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../../App.css';
import './item.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconContext } from 'react-icons'
import { IoHeart } from 'react-icons/io5';

export const Item = ({ id, name, price, stock, whishlisted, image }) => {
	return (
		<Col lg={4} md={6} sm={12} className="d-flex justify-content-center" key={id}>
			<Link to={`/item/${id}`} className="noUnderLine">
				<Card className="text-center cardPlants">
					{whishlisted &&
						<Fragment>
							<h1 className="wishlisted">
								<IconContext.Provider value={{ color: "#3dcc62" }}>
									<IoHeart />
								</IconContext.Provider>
							</h1>
						</Fragment>
					}
					<Card.Img variant="bottom" src={image} className="cardPlantsImg" />
					<Card.Body>
						<Card.Text className="cardPlantsName">
							{name}
						</Card.Text>
						<Card.Title className="cardPlantsPrice">${price}</Card.Title>
						<div className="cardPlantsTagline">
							{stock > 0 ? 'Available' : <p className="outOfStockText">No hay stock</p>}
						</div>
					</Card.Body>
				</Card>
			</Link>
		</Col>
	);
}
