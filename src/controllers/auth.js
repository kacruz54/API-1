const { response } = require("express");

const createUser = async (req, res = response) => {
  const { name, email, password, nickname } = req.body;

  if (!password) {
    return res.status(400).json({
      ok: false,
      msg: "La contraseña es obligatoria para crear una cuenta",
    });
  }

  res.status(201).json({
    ok: true,
    msg: "Tu cuenta ha sido creada con éxito",
  });
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      ok: false,
      msg: "El email y la contraseña son obligatorios para iniciar sesión",
    });
  }

  res.json({
    ok: true,
    msg: "Login exitoso",
    user: { email },
  });
};

module.exports = {
  createUser,
  loginUser,
};
