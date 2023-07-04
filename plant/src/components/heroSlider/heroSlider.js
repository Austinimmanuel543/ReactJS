import { Jumbotron, Container, Col } from 'react-bootstrap';
import './heroSlider.css'

export const HeroSlider = ({ tittle, subtittle, img }) => {
  return (
    <Jumbotron style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundAttachment: 'right', height: '25rem' }}>
      <Container className="heroSliderContent">
        <h1 className="tittleH1">{tittle}</h1>
        <Col xs={12} lg={6}>
          <p>{subtittle}</p>
        </Col>
      </Container>
    </Jumbotron>
  )
}