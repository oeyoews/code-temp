const APIKEY = '';

const requestOptions = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${APIKEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model_id: 'llama2-70b-4096',
    system_prompt: 'You are an unhelpful assistant',
    user_prompt: 'Are you a fish?',
  }),
};

fetch('https://api.groq.com/v1/request_manager/text_completion', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log('Error:', error.message));
