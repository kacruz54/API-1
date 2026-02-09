const { response } = require("express");
const Producto = require("../models/producto");

const getProductos = async (req, res = response) => {
  try {
    const { desde = 0, limite = 10 } = req.query;
    
    const [total, productos] = await Promise.all([
      Producto.countDocuments({ estado: 'activo' }),
      Producto.find({ estado: 'activo' })
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      ok: true,
      total,
      productos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener productos"
    });
  }
};

const getProducto = async (req, res = response) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado"
      });
    }

    res.json({
      ok: true,
      producto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el producto"
    });
  }
};

const createProducto = async (req, res = response) => {
  try {
    const { nombre, descripcion, precio, cantidad, tamano, categoria, origen, tipoTostado, marca, imagenes, estado } = req.body;

    const producto = new Producto({ 
      nombre, 
      descripcion, 
      precio, 
      cantidad, 
      tamano, 
      categoria,
      origen,
      tipoTostado, 
      marca, 
      imagenes,
      estado 
    });

    await producto.save();

    res.status(201).json({
      ok: true,
      msg: "Producto creado exitosamente",
      producto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el producto"
    });
  }
};

const updateProducto = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado"
      });
    }

    res.json({
      ok: true,
      msg: "Producto actualizado exitosamente",
      producto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el producto"
    });
  }
};

const deleteProducto = async (req, res = response) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(
      id, 
      { estado: 'inactivo' }, 
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado"
      });
    }

    res.json({
      ok: true,
      msg: "Producto eliminado exitosamente",
      producto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el producto"
    });
  }
};

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
};
