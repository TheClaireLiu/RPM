import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const decodeToken = (request: NextRequest) => {
  const authorization = request.headers.get("Authorization");
  const authToken = authorization?.split(" ")[1];
  if (!authToken) {
    return null;
  }
  const tokenSecret = process.env.TOKEN_SECRET!;
  const decoded = jwt.verify(authToken, tokenSecret) as { userId: string };
  return decoded;
};


