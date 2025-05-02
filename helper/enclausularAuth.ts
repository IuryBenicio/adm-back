import { NextFunction, Request, Response } from "express";

export default function enclosureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) return next();
  //
  res.status(401).json({ message: "Não autorizado" });
}
