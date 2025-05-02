import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request, Response, NextFunction } from "express"; // Importar types do express
import Admin from "../models/admin";

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "senha",
      },
      async (username: string, password: string, done: any) => {
        try {
          const user = await Admin.findOne({ userName: username });

          if (!user) {
            return done(null, false, {
              message: `administrador não possui essas credenciais ${username} `,
            });
          }

          const iguais = password === user.senha;

          if (!iguais) {
            return done(null, false, { message: "senha incorreta" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id); // guarda só o ID do user na sessão
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Admin.findById(id);
    done(null, user);
  });
}
