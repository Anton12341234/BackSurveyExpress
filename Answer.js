import mongoose from 'mongoose';
const { Schema } = mongoose;

const Answer = new Schema({
    idQuestion: {type: String},
    owner: {type: String },
    answer1: {type: String},
    answer2: {type: String},
    answer3: {type: String}
})

export default mongoose.model('Answer', Answer)  