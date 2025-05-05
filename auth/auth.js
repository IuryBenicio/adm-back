const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "senha",
      },
      async (username, password, done) => {
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

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Admin.findById(id);
    done(null, user);
  });
};
