import Survey from "./Survey.js";

class SurveyService {
    async create(survey) {
        const createdSurvey = await Survey.create(survey);
        return createdSurvey;
    }
    async getAll() {
        const surveys = await Survey.find()
        return surveys;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const survey = await Survey.findById(id).populate('owner');
        return survey;
    }
}


export default new SurveyService();