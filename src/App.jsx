import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

     
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await axios.post(
        url, 
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = res.data.candidates[0].content.parts[0].text;
      setResponse(aiResponse);
    } catch (error) {
      console.error(error);
      setResponse('Error al conectar con Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Que quieres saber</h2>
      <textarea
        placeholder="Pregunta a Gemini"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending' : 'Send'}
      </button>
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;


