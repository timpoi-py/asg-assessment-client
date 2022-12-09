import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignupUserMutation } from "../services/appApi";
import { AppContext } from "../context/appContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const { socket } = useContext(AppContext);

  const handleSignup = (e) => {
    e.preventDefault();
    signupUser({ name, email, password }).then(({ data }) => {
      if (data) {
        //navigate to Login
        window.location("/");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form
            style={{ width: "95%", maxWidth: 600 }}
            onSubmit={(e) => handleSignup(e)}
          >
            <h1 className="text-center m-4">Create Account</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
