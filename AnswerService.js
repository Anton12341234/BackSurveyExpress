import Answer from "./Answer.js";
import Survey from "./Survey.js";

class AnswerService {
    async create(answer) {
        const createdAnswer = await Answer.create(answer);
        return createdAnswer;
    }
    async getAll(id) {
        const answers = await Answer.find({idQuestion:id})
        return answers;
    }
    async getAllSearch(idQuestion, userId) {
        const searchTitle = await Answer.find({$and : [{idQuestion: idQuestion}, {owner: userId}]})
        return searchTitle;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const answer = await Answer.deleteMany({idQuestion:id})
            const survey = await Survey.deleteMany({_id:id})
            console.log(id)
            return answer
    }
}


export default new AnswerService();