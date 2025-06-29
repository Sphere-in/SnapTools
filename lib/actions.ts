"use server";

import db from "./db";
import {
  setDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export async function createShortUrl(originalUrl: string) {
  const shortCode = nanoid(6);
  await setDoc(doc(db, "shortUrls", shortCode), {
    originalUrl,
    createdAt: serverTimestamp(),
    clicks: 0,
  });

  return shortCode;
}
