import { unstable_cache } from "next/cache";

import { MessageFieldPusher } from "@/components/MessageFieldPusher/MessageFieldPusher";
import { MessagesPusher } from "@/components/MessagesPusher/MessagesPusher";

import styles from "./page.module.scss";
import prisma from "@/utils/prisma";

const getCachedMessages = unstable_cache(
  async roomId => {
    console.log(roomId);
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

export default async function Room({ params }: { params: { roomId: string } }) {
  console.log(params.roomId);
  const existingMessages = await getCachedMessages(params.roomId);
  const serializedMessages = existingMessages.map(message => ({
    text: message.text,
    id: message.id,
  }));

  console.log(existingMessages);
  return (
    <div className={styles.room__container}>
      <p>messages:</p>
      <MessagesPusher roomId={params.roomId} initialMessages={serializedMessages} />
      <MessageFieldPusher roomId={params.roomId} />
    </div>
  );
}
