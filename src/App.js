import React, { useEffect, useState } from 'react';
import './App.css'; // import the CSS file

import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import IconButton from '@mui/material/IconButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
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



  const handleShare = () => {
    const encodedText = encodeURIComponent(text);
    const shareUrl = `whatsapp://send?text=${encodedText}`;
    window.open(shareUrl, "_blank");
  }


  const incrementFontSize = () => {
    setFontSize(Math.min(fontSize + 1, 24));
  }
  const decrementFontSize = () => {
    setFontSize(Math.max(fontSize - 1, 12));
  }
  const handleClear = () => {
    setText('');
  }
  return (
    <div className="text-editor">
      <div className="header">

        <div className='actiontbtn'>

          <img src="../Icon-notepad.png" alt="Logo" className="logo" />
          <Button onClick={handleCopy} tile="Copy"><ContentCopyIcon /> </Button>
          <Button onClick={handlePaste} title="Paste"><ContentPasteIcon /> </Button>
          <Button onClick={handleClear} title="Clear Screen"><DeleteOutlineIcon /> </Button>
          <Button onClick={handleShare} title="Share on WhatsApp"> <WhatsAppIcon /> </Button>
          <Button onClick={handleDownload} title="Download file"><DownloadForOfflineIcon /> </Button>

        </div>
        <div className='fontaction'>

          <select value={font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="sans-serif">sans-serif</option>
            <option value="cursive">cursive</option>
          </select>

          <p className='fontsizedisplay'>
            {fontSize}
          </p>
          <IconButton onClick={incrementFontSize} title="incrementFontSize" aria-label="incrementFontSize">
            <ZoomInIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={decrementFontSize} title="decrementFontSize" aria-label="decrementFontSize" >
            <ZoomOutIcon fontSize="large" />
          </IconButton>

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



