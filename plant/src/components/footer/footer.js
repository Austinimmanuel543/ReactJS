import { InputGroup, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import { TiSocialTwitter, TiSocialFacebook, TiSocialGithub, TiSocialPinterest } from 'react-icons/ti';
import './footer.css'

export const Footer = () => {
	return (
		<div className="footer">
			<Container>
				<Row>
					<Col>
						<h5>Stay up-to-date on the latest products, trends and offers</h5>
						<InputGroup className="mb-3">
							<FormControl
								placeholder="Your email"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							/>
							<InputGroup.Append>
								<Button variant="outline-success">To be part</Button>
							</InputGroup.Append>
						</InputGroup>
					</Col>
					<Col>
						<h5>Plantr</h5>
						<ul>
							<li>
								<a href="/" className="footerLink">Shop</a>
							</li>
							<li>
								<a href="/">FAQ</a>
							</li>
							<li>
								<a href="/orders">Follow shipping</a>
							</li>
							<li>
								<a href="/">Medium</a>
							</li>
						</ul>
					</Col>
					<Col>
						<h5>Community</h5>
						<ul>
							<li>
								<a href="/">Group</a>
							</li>
							<li>
								<a href="/">Forum</a>
							</li>
							<li>
								<a href="/">Vote</a>
							</li>
							<li>
								<a href="/">Suggestions</a>
							</li>
						</ul>
					</Col>
					<Col>
						<h5>Follow us</h5>
						<div className="h5">
							<TiSocialTwitter />
							<TiSocialFacebook />
							<TiSocialPinterest />
							<TiSocialGithub />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
