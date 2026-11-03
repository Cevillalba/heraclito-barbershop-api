const { Cita, Usuario, Servicio } = require('../models');

exports.crearCita = async (req, res) => {
  try {
    const { cliente_id, barbero_id, servicio_id, fecha_hora } = req.body;

    const barbero = await Usuario.findOne({ where: { id: barbero_id, rol: 'BARBERO' } });
    const servicio = await Servicio.findByPk(servicio_id);

    if (!barbero || !servicio) {
      return res.status(404).json({
        exito: false,
        mensaje: "El barbero seleccionado o el servicio no existen en el catálogo."
      });
    }

    const nuevaCita = await Cita.create({
      cliente_id,
      barbero_id,
      servicio_id,
      fecha_hora,
      precio_total: servicio.precio,
      estado: 'CONFIRMADA'
    });

    return res.status(201).json({
      exito: true,
      mensaje: "Cita agendada exitosamente.",
      datos: nuevaCita
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Ocurrió un error interno en el servidor al procesar la solicitud."
    });
  }
};

exports.listarCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({ include: ['cliente', 'barbero', 'servicio'] });
    return res.status(200).json({ exito: true, datos: citas });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error al obtener las citas.' });
  }
};