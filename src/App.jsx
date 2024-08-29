import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('uz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    
    const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '216aaa2687msh91ec62caa74c1a8p1888b2jsnd4414ee7bbf9',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: inputText,
        source: sourceLang,
        target: targetLang,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslatedText(result.data.translations.translatedText);
    } catch (error) {
      setError('Tarjima qilishda xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Google Translate Clone</h1>
      
      <textarea
        rows="4"
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Matnni kiriting..."
      />

      <div style={{ marginBottom: '10px' }}>
        <label>Source Language:</label>
        <input
          type="text"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          placeholder="Masalan: en"
          style={{ marginLeft: '10px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Target Language:</label>
        <input
          type="text"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          placeholder="Masalan: uz"
          style={{ marginLeft: '10px' }}
        />
      </div>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {translatedText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Translated Text:</h3>
          <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {translatedText}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
