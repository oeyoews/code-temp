const API_KEY = '-Y4';

const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require('@google/generative-ai');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
    ],
    // safetySettings: {
    //   'HarmCategory.HARM_CATEGORY_HATE_SPEECH':
    //     HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    //   'HarmCategory.HARM_CATEGORY_HARASSMENT': HarmBlockThreshold.BLOCK_NONE,
    //   // Harmca
    //   HarmCategory: {
    //   }
    // },
  });

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = 'How many paws are in my house?';

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
