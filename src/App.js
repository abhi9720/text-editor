import React, { useEffect, useState } from 'react';
import './App.css'; // import the CSS file


const TextEditor = () => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const countWords = () => {
      let words = text.trim().split(/\s+/);
      setWordCount(words.length);
    }

    const countLetters = () => {
      setLetterCount(text.length);
    }
    const lineCount = () => {
      const lines = text.split('\n').length;
      setLineCount(lines);
    }

    countWords();
    countLetters();
    lineCount();
  }, [text]);


  useEffect(() => {
    const savedText = localStorage.getItem('text');
    if (savedText) {
      setText(savedText);
    }
  }, []);




  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "my_file.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  }

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setText(clipboardText);
  }

  const handleFontChange = (e) => {
    setFont(e.target.value);
  }

  const handleFontSizeChange = (e) => {
    console.log(e)
    setFontSize(e.target.value);
  }

  const handleShare = () => {
    const encodedText = encodeURIComponent(text);
    const shareUrl = `whatsapp://send?text=${encodedText}`;
    window.open(shareUrl, "_blank");
  }

  const handleClear = () => {
    setText('');
  }
  return (
    <div className="text-editor">
      <div className="header">
        <img src="https://w7.pngwing.com/pngs/994/388/png-transparent-computer-icons-editing-font-awesome-graphics-editor-advertising-angle-text-logo.png" alt="Logo" className="logo" />

        <button onClick={handleCopy}>Copy</button>
        <button onClick={handlePaste}>Paste</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleShare}>Share on WhatsApp</button>
        <button onClick={handleDownload}>Download</button>
        <div>
          <label>Font:</label>
          <select value={font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="sans-serif">sans-serif</option>
            <option value="cursive">cursive</option>
          </select>
          <label>Font Size:</label>
          <input type="number" value={fontSize} onChange={handleFontSizeChange} min="12" max="24" step="2" />
        </div>
      </div>
      <textarea className="notebook-page" value={text} onChange={e => {
        setText(e.target.value);
        localStorage.setItem('text', e.target.value);
      }} style={{ fontFamily: font, fontSize: `${fontSize}px` }} />

      <div className='counts'>
        <p className="line-count">Line: {lineCount}</p>
        <p className="word-count">Word: {wordCount} ,</p>
        <p className="letter-count">Chars: {letterCount}</p>
      </div>

    </div>
  );
};

export default TextEditor;



