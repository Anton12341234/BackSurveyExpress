import mongoose from 'mongoose';
const { Schema } = mongoose;

const Survey = new Schema({
    title: {type: String, required: true},
    question1: {type: String, required: true},
    question2: {type: String, required: true},
    question3: {type: String, required: true}
})

export default mongoose.model('Survey', Survey)  