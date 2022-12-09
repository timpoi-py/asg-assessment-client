import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import { selectUser } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {
  const user = useSelector(selectUser);
  const messageInput = useRef();
  const scrollBot = useRef();

  const [currentRoom, setCurrentRoom] = useState("");
  const [friends, setFriends] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState({});
  const [currentFriend, setCurrentFriend] = useState("");
  const [currentFriendID, setCurrentFriendID] = useState("");
  const [sentMsg, setSentMsg] = useState([]);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        friends,
        msgs,
        newMsg,
        setCurrentRoom,
        setFriends,
        setMsgs,
        setNewMsg,
        messageInput,
        currentFriend,
        setCurrentFriend,
        setCurrentFriendID,
        currentFriendID,
        sentMsg,
        setSentMsg,
        scrollBot,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
