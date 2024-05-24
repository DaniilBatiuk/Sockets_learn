"use server";

import { revalidateTag } from "next/cache";

import { myAxios } from "@/axios";

export async function sendMessageAction(message: string, roomId: string) {
  try {
    const response = await myAxios.post("/api/messagePusher", {
      roomId,
      text: message,
    });

    revalidateTag("messages");
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function revalidateMessage() {
  revalidateTag("messages");
}
