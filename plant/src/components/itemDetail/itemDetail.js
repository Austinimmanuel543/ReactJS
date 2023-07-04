import './itemDetail.css'
import { Row, Col, Image, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ItemInteractive } from '../itemInteractive/itemInteractive'
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Notice } from '../notice/notice'
import { WishListButton } from '../wishListButton/wishListButton'

export const ItemDetail = ({ plant, inCart }) => {
	if (plant !== 'loading') {
		if (plant === 'empty') {
			return (
				<Notice header="The plant doesn't exist" buttons={[{ text: 'Go to Home', link: '/', icon: 'home' }]} />
			)
		} else {
			return (
				<div>
					<div className="plantDetails">
						<Container className="plantInfoContainer">
							<Row >
								<Col md={6}>
									<div className="plantData">
										<h1 className="tittleH1 plantName">
											{plant.name}
											<div className="wishListButton">
												<IconContext.Provider value={{ color: "#3dcc62" }}>
													<WishListButton plant={plant} />
												</IconContext.Provider>
											</div>
										</h1>
										<h5 className="plantDescription">
											{plant.description}
										</h5>
										<div className="plantMainDetails">
											<div className="plantInteractive">
												<div className="plantPrice">
													<h1 className="tittleH1 priceText">$ {plant.price}</h1>
													<div className="plantShipping">
														<h5 className="shippingText">Free shipping!</h5>
														<a className="linkSmall" href="/">More information</a>
													</div>
												</div>
												<ItemInteractive item={plant} stock={inCart[0] ? (plant.stock - inCart[1]) : plant.stock} size={plant.size} variety={plant.variety} id={plant.id} />
											</div>
											<div className="plantFeatures">
												<ul className="featuresList">
													{plant.features.slice(0, 3).map((feature) => (
														<li key={feature}>{feature}</li>
													))}
													<li>Includes seed pack</li>
													<a href="#features">See All</a>
												</ul>
											</div>
										</div>
										<div className="compraProtegida">
											<p className="info">
												<IoShieldCheckmarkOutline />
												<a href="/"> Protected purchase</a>, I received the product
												<br />or we will refund your money
											</p>
										</div>
									</div>
								</Col>
								<Col md={6} className="images">
									<Image src={require(`../../assets/semillas.png`).default} className="plantSeeds" fluid />
									<Image src={plant.image} className="plantImage" fluid />
								</Col>
							</Row>
						</Container>
					</div>
					<div className="featuresContainer" id='features'>
						<Container>
							<h1 className="tittleH1 infoHeader">+info</h1>
							<h5 className="plantPrimary">Descripcción</h5>
							<p>
								{plant.description}
							</p>
							<Row className="detailsSection2 mb-5">
								<Col xs={6}>
									<img src={plant.image} alt="" fluid="true" className="plantImageFeatures" />
								</Col>
								<Col xs={6} className="featuresList">
									<h5 className="plantPrimary">Caracteristicas</h5>
									<ul className="plantCaracteristicas">
										{plant.features.map((feature) => (
											<li key={feature}>{feature}</li>
										))}
									</ul>
								</Col>
								<Col xs={12} className="mt-5">
									<h5 className="plantPrimary">Opiniones (3)</h5>
								</Col>
								<Col xs={12} md={6} lg={4}>
									<div className="userCardName">
										<img src="https://picsum.photos/50" alt="" className="userCommentImage" />
										<h6>User</h6>
									</div>
									<div className="userCardComment">
										<p>Excellent plant, very good for indoors</p>
									</div>
								</Col>
								<Col xs={12} md={6} lg={4}>
									<div className="userCardName">
										<img src="https://picsum.photos/50" alt="" className="userCommentImage" />
										<h6>User</h6>
									</div>
									<div className="userCardComment">
										<p>The best purchase I could have made, 100% recommended</p>
									</div>
								</Col>
								<Col xs={12} md={6} lg={4}>
									<div className="userCardName">
										<img src="https://picsum.photos/50" alt="" className="userCommentImage" />
										<h6>User</h6>
									</div>
									<div className="userCardComment">
										<p>Good for beginners as it does not require much care</p>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			)
		}
	} else {
		return (
			<Container>
				<Row className="loaderContainer">
					<AiOutlineLoading3Quarters className="loader" />
				</Row>
			</Container>
		)
	}
}
