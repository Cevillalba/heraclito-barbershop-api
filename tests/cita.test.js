const { crearCita } = require('../src/controllers/citaController');
const { Usuario, Servicio, Cita } = require('../src/models');

jest.mock('../src/models');

describe('Pruebas Unitarias - Módulo de Agendamiento', () => {
  test('Debe agendar una cita correctamente y retornar HTTP 201', async () => {
    const req = {
      body: { cliente_id: 1, barbero_id: 2, servicio_id: 3, fecha_hora: '2026-11-15 15:00:00' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Usuario.findOne.mockResolvedValue({ id: 2, nombre: 'Barbero Carlos', rol: 'BARBERO' });
    Servicio.findByPk.mockResolvedValue({ id: 3, nombre: 'Corte + Barba', precio: 35000 });
    Cita.create.mockResolvedValue({ id: 101, ...req.body, estado: 'CONFIRMADA' });

    await crearCita(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: true }));
  });
});