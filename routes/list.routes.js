const { Router } = require('express')
const router = Router()
const List = require('../models/List')
const auth = require('../middleware/auth.middleware')


router.post('/generate', auth, async (req, res) => {
    try {

        const {name, data, comment, owner} = req.body

        const list = new List({
            name, data, comment, owner: req.user.userId
        })

        await list.save()

        res.status(201).json({ list })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong. Try again' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        //const lists = await List.find()

        const lists = await List.find({ owner: req.user.userId })
        res.json(lists)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again' })
    }
})

router.post('/deleteList', auth, async (req, res) => {
    try {
        await List.deleteOne( {id: req.body.id} )
        res.status(200).json({ message: 'Alles gut' })

        //await List.deleteMany()
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again' })
    }
})

module.exports = router