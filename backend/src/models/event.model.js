import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  coverPhoto: { type: String }, // URL de la foto de portada
  name: { type: String, required: true }, // Nombre del torneo
  startDate: { type: Date, required: true }, // Fecha y hora de inicio
  timezone: { type: String, required: true }, // Zona horaria
  location: {
    type: String,
    enum: ['Presencial', 'Virtual'],
    required: true,
  }, // Presencial o Virtual
  game: { type: String, required: true }, // Juego del torneo
  platform: { type: String, required: true }, // Plataforma
  participantsLimit: { type: Number, required: true }, // Número de participantes
  gameMode: {
    type: String,
    enum: ['Individual', 'Equipos'],
    required: true,
  }, // Individual o Equipos
  teamSize: { type: Number }, // Tamaño de equipo (para equipos)
  substitutes: { type: Number }, // Número de suplentes
  
  format: {
      type: String,
      enum: ['Eliminación simple', 'Doble eliminación', 'Ronda personalizada', 'Liga FFA', 'Todos contra todos'],
      required: true,
    }, // Formato del torneo

  rules: { type: String }, // Reglas del torneo
  mustAcceptRules: { type: Boolean }, // ¿Jugadores deben aceptar reglas?

  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ], // Jugadores registrados

  links: {
    discord: { type: String },
    twitch: { type: String },
    youtube: { type: String },
    instagram: { type: String },
    facebook: { type: String },
  }, // Links externos

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // Usuario que creó el evento

  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  }, // Equipo asociado

}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
