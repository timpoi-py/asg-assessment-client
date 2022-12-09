import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import { AppContext } from "../context/appContext";

const Login = () => {
  const { socket } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    //Login Logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket -- when login it will emit new-user
        socket.emit("new-user");

        // navigate to chat page
        navigate("/chat");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form
            style={{ width: "95%", maxWidth: 600 }}
            onSubmit={(e) => handleLogin(e)}
          >
            <h1 className="text-center m-4">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account? <Link to={"/signup"}>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
