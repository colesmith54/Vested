import React, { useState } from 'react';
import axios from 'axios';

const OpenAIRequest = () => {
  const [response, setResponse] = useState('');

  const generateResponse = async () => {
    const apiKey = import.meta.env.VITE_OPENAI;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or 'gpt-4'
          messages: [{ role: 'user', content: 'What are some good nonprofits?' }],
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`, // Use an environment variable
          },
        }
      );

      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generateResponse}>Generate Response</button>
      <p>{response}</p>
    </div>
  );
};

export default OpenAIRequest;