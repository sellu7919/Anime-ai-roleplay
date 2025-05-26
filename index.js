const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let openai;

app.post('/chat', async (req, res) => {
  const { apiKey, messages } = req.body;
  if (!apiKey) return res.status(400).send({ error: 'No API key provided' });

  if (!openai || openai.apiKey !== apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    openai = new OpenAIApi(configuration);
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages,
    });
    res.json(completion.data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'OpenAI error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
