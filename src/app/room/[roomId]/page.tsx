import { unstable_cache } from "next/cache";

import { MessageFieldPusher } from "@/components/MessageFieldPusher/MessageFieldPusher";
import { MessagesPusher } from "@/components/MessagesPusher/MessagesPusher";

import styles from "./page.module.scss";
import prisma from "@/utils/prisma";

interface PageProps {
  params: {
    roomId: string;
  };
}

const getCachedMessages = unstable_cache(
  async roomId => {
    return prisma.message.findMany({
      where: {
        chatRoomId: roomId,
      },
    });
  },
  ["messages"],
  {
    tags: ["messages"],
  },
);

export default async function Room({ params }: PageProps) {
  const { roomId } = params;
  const existingMessages = await getCachedMessages(roomId);
  console.log(existingMessages);
  const serializedMessages = existingMessages.map(message => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <div className={styles.room__container}>
      <p>messages:</p>
      <MessagesPusher roomId={roomId} initialMessages={serializedMessages} />
      <MessageFieldPusher roomId={roomId} />
    </div>
  );
}
