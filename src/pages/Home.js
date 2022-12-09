import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <Row>
      <Col className="d-flex flex-direction-column align-items-center justify-content-center ">
        <div>
          <h1>Chat with your friends</h1>
          <p>Share life even they're miles away</p>
          <LinkContainer to="/chat">
            <Button variant="success">Chat Now</Button>
          </LinkContainer>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
