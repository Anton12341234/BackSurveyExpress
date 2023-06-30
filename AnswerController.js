import AnswerService from "./AnswerService.js";

class AnswerController {
    async create(req, res) {
        try {
            const answer = await AnswerService.create(req.body)
            console.log(req.user)
            res.json(answer)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const answers = await AnswerService.getAll(req.params.id);
            return res.json(answers);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAllSearch(req, res) {
        try {
            const answers = await AnswerService.getAllSearch(req.params.id, req.body.username);
            return res.json(answers);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const answer = await AnswerService.delete(req.body._id);
            return res.json(answer)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new AnswerController();