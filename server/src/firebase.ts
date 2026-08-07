import type { ServiceAccount } from "firebase-admin/app";

import { initializeApp, cert } from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"

import serviceAccount from "../serviceAccount.json" with { type: "json" };

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

export const db = getFirestore(app)

export const fb_users = db.collection("users")
export const fb_songs = db.collection("songs")