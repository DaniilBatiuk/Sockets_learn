"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createRoom = async () => {
    setLoading(true);
    const res = await fetch("/api/rooms/create", { cache: "no-store" });
    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
    setLoading(false);
  };

  return (
    <div className={styles.home__container}>
      <Button variant="contained" onClick={createRoom} color="success" disabled={loading}>
        {!loading ? "Create room" : "Loading..."}
      </Button>
    </div>
  );
}
