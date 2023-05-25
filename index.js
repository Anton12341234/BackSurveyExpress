import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload';
import cors from 'cors';
import router from './authRouter.js';


const PORT = 5000;
const DB_URL = `mongodb+srv://anton:0932304567@cluster0.j8curid.mongodb.net/?retryWrites=true&w=majority`

const app = express()

const corsOptions = {
  origin: "*",
};


app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/auth', router)
app.use(express.urlencoded({ extended: false }));

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()