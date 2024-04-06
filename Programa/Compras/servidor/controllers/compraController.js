const Compra = require("../models/Compra");


exports.crearCompra = async (req, res) => {
    

    try {
        let compra;

        // Creamos nuestro compra
        compra = new Compra(req.body);

        await compra.save();
        res.send(compra);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCompra = async (req, res) => {

    try {
        let compras = await Compra.findById(req.params.id);

        if(!compras) {
            res.status(404).json({ msg: 'No existe la compra' })
        }

        res.json(compras);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCompras = async (req, res) => {

    try {

        const compras = await Compra.find();
        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerComprasPorId = async (req, res) => {

    try {

        let compras = await Compra.find({_id:req.params.id});

        if(!compras) {
            res.status(404).json({ msg: 'No existe la compra' });
        }

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerComprasPorNombreCliente = async (req, res) => {

    try {

        let compras = await Compra.find({NombreCliente:req.params.NombreCliente});

        if(!compras) {
            res.status(404).json({ msg: 'No existe la compra' });
        }

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.getComprasPorID_Usuario = async (req, res) => {

    try {

        //console.log(usuario);
        let compras = await Compra.find({id_usuario:req.params.id_usuario});

        if(!compras) {
            res.status(404).json({ msg: 'No existe la compra' });
        }

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarCompra = async (req, res) => {

    try {
        const { cantidad, NombreCliente, direccion, coche, usuario, id_coche, id_usuario} = req.body;
        let compra = await Compra.findById(req.params.id);

        if(!coche) {
            res.status(404).json({ msg: 'No existe la compra' })
        }
        compra.cantidad = cantidad;
        compra.NombreCliente = NombreCliente;
        compra.direccion = direccion;
        compra.coche = coche;
        compra.usuario = usuario;
        compra.id_coche = id_coche;
        compra.id_usuario = id_usuario;

        compra = await Compra.findOneAndUpdate({ _id: req.params.id },compra, { new: true});
        res.json(compra);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarCompra = async (req, res) => {

    try {
        let compra = await Compra.findById(req.params.id);

        if(!compra) {
            res.status(404).json({ msg: 'No existe el coche' })
        }

        await Compra.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Compra eliminada correctamente' });

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}