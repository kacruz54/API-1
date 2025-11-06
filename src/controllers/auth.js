const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const createUser = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

    const usuario = await new Usuario({ name, email, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.json({
      ok: true,
      msg: "Usuario creado",
      user: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        rol: usuario.rol
      }
    });
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos"
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos"
      });
    }

    res.json({
      ok: true,
      msg: "Login exitoso",
      user: {
        id: usuario._id,
        name: usuario.nombre,
        email: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor"
    });
  }
};


module.exports = {
  createUser,
  loginUser,
};
