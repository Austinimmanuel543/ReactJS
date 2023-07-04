import React from "react";
import { Col, Card } from 'react-bootstrap';
import loadingImg from "../../assets/plant-loading.png";
import '../../App.css';
import './itemLoading.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ItemLoading = () => {
  return (
    <Col lg={4} md={6} sm={12} className="d-flex justify-content-center">
      <Card className="text-center cardPlantsLoading">
        <Card.Img variant="bottom" src={loadingImg} className="cardPlantsImg" />
        <Card.Body>
          <Card.Text className="cardPlantsName textLoading">loading</Card.Text>
          <Card.Title className="cardPlantsPrice textLoading">loading</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  )
}

