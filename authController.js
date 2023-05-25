import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const secret="SECRET_KEY_RANDOM"

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "240h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
             if (!errors.isEmpty()) {
                 return res.status(400).json({message: "Ошибка при регистрации", errors})
             }
            const {addresses, avatar, nick, phones,username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value],addresses, avatar, nick, phones,})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles, user.username)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.body._id, req.body, {new: true})
            return res.json(user);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export {secret}
export default new authController();