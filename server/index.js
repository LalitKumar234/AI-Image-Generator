require('dotenv').config()
const express = require('express');
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(cors());
app.use(express.json())

const { API_KEY } = process.env

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res)=>{
    res.send('hello world')
})


app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt
    console.log(prompt)
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "512x512",
        });
        res.send(response.data.data[0].url);
    } catch (err) {
        res.send(err.message);
    }
})


// app.post('/users', (req, res) => {
//     const user = {
//       userName: req.body.userName,
//       password: req.body.password
//     }
//     res.send(user)
//   })

app.listen(5500, () => {
    console.log("server started");
});