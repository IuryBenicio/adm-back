import { NextFunction, Request, RequestHandler, Response } from "express";
import Admin from "../models/admin";
import Liturgy from "../models/liturgy";
const bcrypt = require("bcrypt");
import passport from "passport";
import { apiLiturgy } from "../types";

export class AdminController {
  //logar
  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || "falha no login" });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res
          .status(200)
          .json({ message: "login realizado com sucesso", user });
      });
    })(req, res, next);
  }

  //logout
  static async logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");

        return res.json({ message: "Deslogado com sucesso" });
      });
    });
  }

  //registrar
  static async register(req: Request, res: Response): Promise<any> {
    const { userName, senha } = req.body;

    if (!userName || !senha) {
      return res
        .status(401)
        .json({ message: "você não enviou a senha ou o usuário" });
    }

    try {
      const admin = new Admin({ userName, senha });
      await admin.save();
      return res.status(202).json({ message: "Admin cadastrado com sucesso" });
    } catch {
      return res
        .status(401)
        .json({ message: "tivemos um erro ao cadastrar novo admin" });
    }
  }
}

export class LiturgyController {
  //retorna a programação que está no bando de dados (antes de ser alterado)
  static async getLiturgyDB(req: Request, res: Response): Promise<any> {
    try {
      const liturgyBefore = await Liturgy.findOne({ id: 1 });

      if (!liturgyBefore) {
        return res.status(401).json({
          message: "Não conseguimos recuperar a programação anterior",
        });
      }

      return res.status(200).json({ data: liturgyBefore });
    } catch (error) {
      return res.status(400).json({ error, message: "tivemos um erro" });
    }
  }

  //
  static async postLiturgy(req: Request, res: Response): Promise<any> {
    const body: apiLiturgy = req.body;

    try {
      let oldLiturgy = await Liturgy.findOne({ id: 1 });

      if (!oldLiturgy) {
        const newLiturgy = new Liturgy(body);

        await newLiturgy
          .save()
          .then(() => {
            return res
              .status(200)
              .json({ message: "programação criada com sucesso" });
          })
          .catch((err) => {
            return res.status(400).json({
              message: "tivemos um problema ao criar a programação",
              error: err,
            });
          });
      }

      // Usando upsert para garantir que o documento seja criado se não existir
      const updatedLiturgy = await Liturgy.findOneAndUpdate({ id: 1 }, body, {
        upsert: true,
        new: true,
      });

      if (updatedLiturgy) {
        return res
          .status(201)
          .json({ message: "Liturgia atualizada com sucesso" });
      } else {
        return res.status(400).json({
          message: "Erro ao atualizar a liturgia. Por favor, tente novamente.",
        });
      }
    } catch (error) {
      return res.status(500).json({ error, data: body });
    }
  }
}
