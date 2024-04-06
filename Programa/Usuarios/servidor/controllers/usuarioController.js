const Usuario = require("../models/Usuario");


exports.crearUsuario = async (req, res) => {
    

    try {
        let usuario;

        // Creamos nuestro usuario
        usuario = new Usuario(req.body);

        await usuario.save(); //almacenamos el usuario (await porque puede tardar un poco)
        res.send(usuario); //devolvemos al usuario un mensaje con el usuario guardado

    } catch (error) {
        console.log(error);//Mostramos el error
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();//Busca todos los usuarios
        res.json(usuarios); //Le devolvemos un JSON al cliente

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuariosPorId = async (req, res) => {

    try {

        let usuarios = await Usuario.findById(req.params.id);

        if(!usuarios) {
            res.status(404).json({ msg: 'No existe el usuario' });
        } else{
        res.json(usuarios);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuariosRolPorId = async (req, res) => {

    try {

        let usuarios = await Usuario.find({_id:req.params.id});

        if(!usuarios) {
            res.status(404).json({ msg: 'No existe el usuario' });
        }

        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuariosPorRol = async (req, res) => {

    try {

        let usuarios = await Usuario.find({rol:req.params.rol});

        if(!usuarios) {
            res.status(404).json({ msg: 'No existe el usuario' });
        }

        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarUsuario = async (req, res) => {

    try {
        const { rol } = req.body; //Extraemos los atributos del usuario
        let usuario = await Usuario.findById(req.params.id);//Para acceder al ID que el cliente nos envia como parametro

        if(!usuario) {//si no existe ese usuario, da error
            res.status(404).json({ msg: 'No existe el usuario' })
        }

        usuario.rol = rol; //Para actualizar el atributo del usuario cambiandolo por el introducido por el cliente

        usuario = await Usuario.findOneAndUpdate({ _id: req.params.id },usuario, { new: true});//id del objeto, el objeto, y luego new: true
        res.json(usuario);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {

    try {
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }

        res.json(usuario);

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarUsuario = async (req, res) => {

    try {
        let usuario = await Usuario.findById(req.params.id);//Obtiene el usuario por su id

        if(!usuario) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }
        else {
        await Usuario.findOneAndRemove({ _id: req.params.id });//Encuentra el usuario y lo elimina
        res.json({ msg: 'Usuario eliminado correctamente' });
        }

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}