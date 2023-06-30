import { Router } from "express"
import controller from './authController.js'
import { check } from "express-validator"
const router = new Router()
import authMiddleware from'./middlewaree/authMiddleware.js'
import SurveyController from "./SurveyController.js";
import AnswerController from './AnswerController.js'

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users',authMiddleware, controller.getUsers)
router.get('/users/:id',authMiddleware, controller.getOne)
router.put('/users',authMiddleware, controller.update)

router.get('/all_Surveys',authMiddleware, SurveyController.getAll)
router.get('/surveys/:id',authMiddleware, SurveyController.getOne)
router.post('/surveys',authMiddleware, SurveyController.create)

router.post('/answers',authMiddleware, AnswerController.create)
router.get('/all_Answers/:id',authMiddleware, AnswerController.getAll)
router.post('/my_Answer/:id',authMiddleware, AnswerController.getAllSearch)
router.delete('/del_answers',authMiddleware, AnswerController.delete)


export default router;