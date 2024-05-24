"use client";

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./page.module.scss";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const createRoom = async () => {
    const res = await fetch("/api/rooms/create");
    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
  };

  const joinRoom = async () => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.home__container}>
      <Button variant="contained" onClick={createRoom} color="success">
        Create room
      </Button>
      <div className={styles.home__main}>
        <TextField
          sx={{ width: 210 }}
          label="Input room id"
          type="search"
          variant="standard"
          value={roomId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRoomId(event.target.value);
          }}
        />

        <Button variant="contained" onClick={joinRoom}>
          Join room
        </Button>
      </div>
    </div>
  );
}
