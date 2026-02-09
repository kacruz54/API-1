const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const AllowKey = require("../models/allowKey");

const createUser = async (req, res = response) => {
  try {
    const { name, email, password, rol, allow_key } = req.body;

    const validKey = await AllowKey.findOne({ isActive: true });
    
    if (!validKey) {
      return res.status(403).json({
        ok: false,
        msg: "No hay una key válida generada. Consulte con el administrador."
      });
    }

    if (validKey.key !== allow_key) {
      return res.status(403).json({
        ok: false,
        msg: "La key proporcionada no es válida. Consulte con el administrador."
      });
    }

    const usuario = await new Usuario({ name, email, password, rol, allow_key });

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
        rol: usuario.rol,
        createdAt: usuario.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el usuario"
    });
  }
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
        name: usuario.name,
        email: usuario.email,
        rol: usuario.rol,
        createdAt: usuario.createdAt
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


const getUsers = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ rol: 'USER_ROLE' }).select('-password -allow_key');

    res.json({
      ok: true,
      total: usuarios.length,
      usuarios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los usuarios"
    });
  }
};

const updateUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, email, allow_key, ...resto } = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true }).select('-password -allow_key');

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado"
      });
    }

    res.json({
      ok: true,
      msg: "Usuario actualizado exitosamente",
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el usuario"
    });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado"
      });
    }

    res.json({
      ok: true,
      msg: "Usuario eliminado exitosamente",
      usuario: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el usuario"
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
};
