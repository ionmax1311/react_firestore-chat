import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from "firebase/compat/app";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async () => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
    console.log("message--", firestore.collection("messages"));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 80, marginTop: 20 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div
          style={{
            width: "80%",
            height: "80vh",
            border: "1px solid grey",
            overflowY: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            variant={"outlined"}
            fullWidth
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            variant={"outlined"}
            style={{ marginTop: 5 }}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
