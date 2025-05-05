const Admin = require("../models/admin");
const Liturgy = require("../models/liturgy");
const passport = require("passport");

class AdminController {
  static async login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
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

  static async logout(req, res, next) {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        return res.json({ message: "Deslogado com sucesso" });
      });
    });
  }

  static async register(req, res) {
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

class LiturgyController {
  static async getLiturgyDB(req, res) {
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

  static async postLiturgy(req, res) {
    const body = req.body;

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

module.exports = {
  AdminController,
  LiturgyController,
};
