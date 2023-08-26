const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 4000; // Choose a port for your backend

app.use(cors()); // Use the cors middleware

app.use(express.json());

app.get('/submit-form', async (req, res) => {
  const { name, email } = req.query;

  const queryParams = new URLSearchParams({
    'entry.1707951946': name,
    'entry.1862124703': email
  });

  const url = `https://docs.google.com/forms/d/e/1FAIpQLScaurLLbR9ofpyT542Bqzzh9Z9IADOLbxBa2tRe7QnBW5kg5Q/formResponse?${queryParams}`;

  try {
    const response = await axios.get(url);
    res.sendStatus(response.status);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
