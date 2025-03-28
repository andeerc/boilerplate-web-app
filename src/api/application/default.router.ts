import { Request, Response } from "express";

export function defaultApplicationRouter(req: Request, res: Response) {

  res.json({
    message: 'Hello from the default application router!',
    method: req.method,
    url: req.url,
    headers: req.headers,
  });
}