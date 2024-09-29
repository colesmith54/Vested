import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalState } from "../GlobalState";


const OpenAIRequest = () => {
  const { state, updateState } = useGlobalState();
  const generateResponse = async () => {
    const namesString = state.portfolioItems.map(item => item.name).join('\n');

    const apiKey = import.meta.env.VITE_OPENAI;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or 'gpt-4'
          messages: [{ role: 'user', content: `${namesString}  \n provide an array of JSONs of size 3, each with 'nonprofitOrganizationName' and  'description' fields that relate to the provided companies and their missions.` }],
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`, // Use an environment variable
          },
        }
      );

      const data = JSON.parse(response.data.choices[0].text);
      updateState({ gptResponse: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generateResponse}>Generate Response</button>
    </div>
  );
};

export default OpenAIRequest;