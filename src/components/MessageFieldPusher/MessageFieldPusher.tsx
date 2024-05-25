"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";

import styles from "./MessageFieldPusher.module.scss";
import { revalidateMessage } from "@/actions";
import { myAxios } from "@/axios";

interface MessageFieldPusherProps {
  roomId: string;
}

export const MessageFieldPusher: React.FC<MessageFieldPusherProps> = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await myAxios.post("/api/messagePusher", {
        roomId,
        text: message,
      });
      revalidateMessage();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.message__field}>
      <TextField
        sx={{ width: 210 }}
        label="Input message"
        type="search"
        variant="standard"
        value={message}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(event.target.value);
        }}
      />
      <Button variant="contained" type="submit">
        Send message
      </Button>
    </form>
  );
};
