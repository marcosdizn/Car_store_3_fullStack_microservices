const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({
    

    NombreCliente: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    coche: {
        type: Object,
        required: true
    },
    usuario: {
        type: Object,
        required: true
    },

    id_coche: {
        type: String,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    },
    
    cantidad: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Compra', CompraSchema);