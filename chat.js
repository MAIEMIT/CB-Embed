const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.post('/api/gpt-chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch('https://api.openai.com/v1/engines/YOUR_MODEL_ID/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 100
        })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].text });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
