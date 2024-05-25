"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default function Home() {
  const router = useRouter();

  const createRoom = async () => {
    const res = await fetch("/api/rooms/create", { cache: "no-store" });
    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.home__container}>
      <Button variant="contained" onClick={createRoom} color="success">
        Create room
      </Button>
    </div>
  );
}
