"use client";

import { useEffect, useState } from "react";

import styles from "./MessagesPusher.module.scss";
import { pusherClient } from "@/utils/pusher";

interface MessagesPusherProps {
  initialMessages: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

export const MessagesPusher: React.FC<MessagesPusherProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>(
    initialMessages.map(mess => mess.text),
  );

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages(prev => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div className={styles.list}>
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};
