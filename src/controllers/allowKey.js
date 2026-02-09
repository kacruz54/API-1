const { response } = require("express");
const crypto = require("crypto");
const AllowKey = require("../models/allowKey");

const generateKey = async (req, res = response) => {
  try {
    const newKey = crypto.randomBytes(8).toString('hex');
    
    const existingKey = await AllowKey.findOne();
    
    if (existingKey) {
      existingKey.key = newKey;
      existingKey.isActive = true;
      await existingKey.save();
      
      return res.json({
        ok: true,
        msg: "Key actualizada exitosamente",
        key: newKey
      });
    }
    
    const allowKey = new AllowKey({ key: newKey });
    await allowKey.save();
    
    res.json({
      ok: true,
      msg: "Key generada exitosamente",
      key: newKey
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al generar la key"
    });
  }
};

const getCurrentKey = async (req, res = response) => {
  try {
    const allowKey = await AllowKey.findOne();
    
    if (!allowKey) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una key generada"
      });
    }
    
    res.json({
      ok: true,
      key: allowKey.key,
      isActive: allowKey.isActive,
      createdAt: allowKey.createdAt,
      updatedAt: allowKey.updatedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener la key"
    });
  }
};

module.exports = {
  generateKey,
  getCurrentKey
};
