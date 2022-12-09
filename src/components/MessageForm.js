import React, { useContext, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const MessageForm = () => {
  const user = useSelector(selectUser);
  const {
    socket,
    setMsgs,
    msgs,
    messageInput,
    currentFriend,
    currentRoom,
    currentFriendID,
    sentMsg,
    setSentMsg,
    scrollBot,
  } = useContext(AppContext);

  const [content, setContent] = useState("");

  const getDate = () => {
    const newDate = new Date();
    const fullYear = `${newDate.getFullYear()}`;
    const date =
      `${newDate.getDate()}`.length < 2
        ? `0${newDate.getDate()}`
        : `${newDate.getDate()}`;
    const month =
      `${newDate.getMonth() + 1}`.length < 2
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`;

    const formattedDate = fullYear + month + date;
    return formattedDate;
  };

  const getTime = () => {
    const newDate = new Date();

    return newDate.getTime();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit(
      "message-friend",
      content,
      user._id,
      getTime(),
      getDate(),
      currentFriendID,
      currentRoom
    );

    setContent("");

    setTimeout(() => {
      scrollBot.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 100);
  };

  socket.on("friend-messages", (payload) => {
    setMsgs((prv) => (prv ? payload : [...prv, payload]));
  });

  return (
    <>
      <div className="messages-output" id="messages-output">
        {!user && <div className="alert alert-danger">Please Login!!</div>}
        {user && currentFriend && (
          <div className="messages-header">
            <h2>{currentFriend}</h2>
          </div>
        )}

        <div className="message-output">
          {user &&
            msgs.map((msg, idx) => {
              if (msg.from === user._id) {
                return (
                  <p key={idx} className="user-msg msg">
                    {msg.content}
                  </p>
                );
              } else {
                return (
                  <p key={idx} className="recipient-msg msg">
                    {msg.content}
                  </p>
                );
              }
            })}
          <div ref={scrollBot}></div>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={10}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your Message"
                disabled={!user || !currentFriend}
                onChange={(e) => setContent(e.target.value)}
                value={content}
                ref={messageInput}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "green" }}
              className="text-align-center"
              disabled={!user || !currentFriend || !content}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
