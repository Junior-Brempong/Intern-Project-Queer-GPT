const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
// add body parser and cors to express
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-CgzrkcC8vNJSE2EFg6DkbdMQ",
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// create a simple express api that calls the function above
const app = express();
// can you please add cors to express
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message, "message");
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
