const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()

const Contacto = require('../models/contacto')

router.get('/', async (req, res) => {
    try {
        const arrayContactos = await Contacto.find();
        console.log(arrayContactos)
        res.render("contactos", {
            listaContactos: "Aquí irán todos los contactos",
            arrayContactos
        })
    } catch (error) {
        console.log(error)
    } 
})

router.get('/crear', (req, res) => {
    res.render('crear')
})


router.post('/',  async (req, res) => {
    const body = req.body
    try {
        const contactoDB = new Contacto(body)
        await contactoDB.save()
        res.redirect('/contactos')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const contactoDB = await Contacto.findOne({ _id: id })
        console.log(contactoDB)
        res.render('detalle', {
            contacto: contactoDB,
            error: false
        })
    } catch (error) {
        console.log('erroooooooooorrr', error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el documento...'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const contactoDB = await Contacto.findByIdAndDelete({ _id: id });
        console.log(contactoDB)

        if (!contactoDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    console.log(id)
    console.log('body', body)

    try {
        const contactoDB = await Contacto.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(contactoDB)
        res.json({
            estado: true,
            mensaje: 'Contacto editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Contacto falla'
        })
    }
})



module.exports = router;