const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const List = require('../models/List')

// router.get(
//     '/getLists',
//     [],
//     async(req, res) => {
//         try {
//             const lists = User.find()
//             return res.status(201).json(lists)
//         } catch(e) {
//             console.log('GET failed', e)
//         }
//     }
// )
// router.post(
//     '/addList',
//     [],
//     async (req, res) => {
//         try {        
//             const data = req.body
//             console.log(data)
//             const list = new List(data)
//             await list.save()
//             console.log('Успех!')
//         } catch(e) {
//             console.log('Жопа', e)
//         }

//     }
// )

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некоректный Email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации'
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует'})   
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again' })
    }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при входе в систему'
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}

        )

        res.json({ token, email, userID: user.Id })

    } catch (e) {
        //console.log(e)
        res.status(500).json({ message: 'Something went wrong. Try again' })
    }
    
})

module.exports = router