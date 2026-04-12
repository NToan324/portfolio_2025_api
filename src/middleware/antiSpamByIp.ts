import { Request, Response, NextFunction } from "express";
import { TooManyRequestsError } from "../core/error.response";

type IpData = {
  requests: number[];
  blockedUntil: number;
};

const ipStore = new Map<string, IpData>();

const WINDOW_MS = 10_000;
const MAX_REQUESTS = 3;
const BLOCK_MS = 5 * 60_000;

const getClientIp = (req: Request) => {
  const forwarded = req.headers["x-forwarded-for"];

  let ip = "";

  if (forwarded) {
    ip = (forwarded as string).split(",")[0].trim();
  } else {
    ip = req.socket.remoteAddress || "";
  }

  return ip.replace("::ffff:", "");
};

export const antiSpamByIp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ip = getClientIp(req);

  const now = Date.now();
  const data = ipStore.get(ip) || { requests: [], blockedUntil: 0 };

  if (data.blockedUntil > now) {
    throw new TooManyRequestsError(
      `Blocked. Try again in ${Math.ceil((data.blockedUntil - now) / 1000)}s`,
    );
  }

  const recentRequests = data.requests.filter((time) => now - time < WINDOW_MS);

  recentRequests.push(now);

  if (recentRequests.length > MAX_REQUESTS) {
    ipStore.set(ip, {
      requests: recentRequests,
      blockedUntil: now + BLOCK_MS,
    });

    throw new TooManyRequestsError("Too many requests. IP blocked.");
  }

  ipStore.set(ip, {
    requests: recentRequests,
    blockedUntil: data.blockedUntil,
  });

  next();
};
