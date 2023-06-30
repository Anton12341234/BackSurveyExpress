import SurveyService from "./SurveyService.js";

class SurveyController {
    async create(req, res) {
        try {
            const survey = await SurveyService.create(req.body)
            res.json(survey)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const surveys = await SurveyService.getAll();
            return res.json(surveys);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const survey = await SurveyService.getOne(req.params.id)
            return res.json({...survey._doc})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new SurveyController();