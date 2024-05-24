"use client";

import { Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";

import styles from "./MessageFieldPusher.module.scss";
import { sendMessageAction } from "@/actions";

interface MessageFieldPusherProps {
  roomId: string;
}

export const MessageFieldPusher: React.FC<MessageFieldPusherProps> = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = useCallback(async () => {
    if (message.trim() === "") return;
    try {
      await sendMessageAction(message, roomId);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [message, roomId]);

  return (
    <div className={styles.message__field}>
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
      <Button variant="contained" onClick={sendMessage}>
        Send message
      </Button>
    </div>
  );
};
