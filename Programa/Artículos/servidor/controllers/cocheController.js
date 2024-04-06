const Coche = require("../models/Coche");


exports.crearCoche = async (req, res) => {
    

    try {
        let coche;

        // Creamos nuestro coche
        coche = new Coche(req.body);

        await coche.save();
        res.send(coche);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCoche = async (req, res) => {

    try {
        let coche = await Coche.findById(req.params.id);

        if(!coche) {
            res.status(404).json({ msg: 'No existe el coche' })
        }

        res.json(coche);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCoches = async (req, res) => {

    try {

        const coches = await Coche.find();
        res.json(coches);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCochesPorId = async (req, res) => {

    try {

        let coches = await Coche.find({_id:req.params.id});

        if(!coches) {
            res.status(404).json({ msg: 'No existe el coche' });
        }

        res.json(coches);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCochesPorMarca = async (req, res) => {

    try {

        let coches = await Coche.find({marca:req.params.marca});

        if(!coches) {
            res.status(404).json({ msg: 'No existe el coche' });
        }

        res.json(coches);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarCoche = async (req, res) => {

    try {
        const { marca, modelo, potencia, combustible, traccion, cantidad, precio } = req.body;
        let coche = await Coche.findById(req.params.id);

        if(!coche) {
            res.status(404).json({ msg: 'No existe el coche' })
        }
      
        coche.marca = marca;
        coche.modelo = modelo;
        coche.potencia = potencia;
        coche.combustible = combustible;
        coche.traccion = traccion;
        coche.cantidad = cantidad;
        coche.precio = precio;

        coche = await Coche.findOneAndUpdate({ _id: req.params.id },coche, { new: true});
        res.json(coche);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCoche = async (req, res) => {

    try {
        let coche = await Coche.findById(req.params.id);

        if(!coche) {
            res.status(404).json({ msg: 'No existe el coche' })
        }

        res.json(coche);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarCoche = async (req, res) => {

    try {
        let coche = await Coche.findById(req.params.id);

        if(!coche) {
            res.status(404).json({ msg: 'No existe el coche' })
        }

        await Coche.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Coche eliminado correctamente' });

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}