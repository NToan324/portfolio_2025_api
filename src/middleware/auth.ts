import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const api_key = req.headers["x-api-key"] as string;
  if (api_key !== process.env.API_KEY) {
    res
      .status(401)
      .json({ message: "You are not allowed access!", status: 401 });
    return;
  }
  next();
};

export default authMiddleware;
