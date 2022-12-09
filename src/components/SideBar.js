import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const SideBar = () => {
  const user = useSelector(selectUser);
  const {
    socket,
    friends,
    setFriends,
    setCurrentRoom,
    messageInput,
    setCurrentFriend,
    setCurrentFriendID,
    sentMsg,
    setSentMsg,
    scrollBot,
  } = useContext(AppContext);

  socket.off("new-user").on("new-user", (payload) => {
    setFriends(payload);
    console.log(payload);
  });

  //create unique id for room id
  const roomId = (id1, id2) => {
    return String(id1) > String(id2) ? `${id1}-${id2}` : `${id2}-${id1}`;
  };

  const onClickFriend = (e) => {
    let friend = e.target.textContent;
    let id = e.target.dataset.id;
    setCurrentFriend(friend);
    setCurrentFriendID(id);
    messageInput.current.focus();

    const roomUniqueId = roomId(user._id, id);
    console.log(roomUniqueId);
    socket.emit("join-friend", id, user._id, roomUniqueId);
    setCurrentRoom(roomUniqueId);
    setSentMsg([]);
    setTimeout(() => {
      scrollBot.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 100);
  };

  {
    user && socket.emit("new-user");
  }

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Friends</h2>
      <ListGroup>
        {friends.map((fren) => (
          <ListGroup.Item
            data-id={fren._id}
            key={fren._id}
            style={{ cursor: "pointer" }}
            onClick={(e) => onClickFriend(e)}
            disabled={fren._id === user._id}
          >
            {fren.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default SideBar;
