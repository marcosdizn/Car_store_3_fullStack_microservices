const mongoose = require('mongoose');

const CocheSchema = mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    potencia: {
        type: Number,
        required: true
    },
    combustible: {
        type: String,
        required: true
    },
    traccion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Coche', CocheSchema);