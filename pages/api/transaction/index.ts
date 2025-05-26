// pages/api/transaction/index.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "GET transactions (placeholder)" });
  } else if (req.method === "POST") {
    res.status(201).json({ message: "POST new transaction (placeholder)" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
