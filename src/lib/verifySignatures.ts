import { Request, Response } from "express";
import nacl from "tweetnacl";
import dotenv from "dotenv";
dotenv.config();

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY ?? "";

export const verifyOrDeny = (req: Request, res: Response): boolean | never => {
  if (verify(req)) {
    return true;
  } else {
    throw res.status(401).end("invalid request signature");
  }
};

export const verify = (req: Request): boolean => {
  const signature = req.get("X-Signature-Ed25519") ?? "";
  const timestamp = req.get("X-Signature-Timestamp") ?? "";
  const body = req.body;
  let isValid = false;
  try {
    isValid = nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, "hex"),
      Buffer.from(PUBLIC_KEY, "hex")
    );
  } catch (e) {
    console.error("ERORO:::::", e);
  }
  return isValid;
};
