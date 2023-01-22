import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // import the CSS file

import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
const TextEditor = () => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [isWhite, setIsWhite] = useState(false);
  const fileInputRef = useRef(null);

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
    const screenmode = JSON.parse(localStorage.getItem("screenmode"));
    const userfontsize = localStorage.getItem("userfontsize");
    const userfontfamily = localStorage.getItem("userfontfamily");



    setText(savedText || '');
    setFontSize(userfontsize ? parseInt(userfontsize) : 16)
    setFont(userfontfamily || 'Arial')
    setIsWhite(screenmode);

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
    localStorage.setItem("userfontfamily", e.target.value);
  }



  const handleShare = () => {
    const encodedText = encodeURIComponent(text);
    const shareUrl = `whatsapp://send?text=${encodedText}`;
    window.open(shareUrl, "_blank");

  }


  const incrementFontSize = () => {
    setFontSize(Math.min(fontSize + 1, 24));
    localStorage.setItem("userfontsize", Math.min(fontSize + 1, 24))
  }
  const decrementFontSize = () => {
    setFontSize(Math.max(fontSize - 1, 12));
    localStorage.setItem("userfontsize", Math.max(fontSize - 1, 12))
  }
  const handleClear = () => {
    setText('');
  }

  function handleFileInput(event) {
    const file = event.target.files[0];
    readFile(file);
  }
  function readFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileText = event.target.result;
      setText(fileText);
    }
    reader.readAsText(file);
  }


  return (
    <div className="text-editor"
      style={{ backgroundColor: `#${isWhite ? 'd9e3ffc7' : 'dca380a8'}` }}
    >
      <div className="header"
        style={{ borderBottom: `2px solid #${isWhite ? '0012ff' : 'd0a090'}` }}>

        <div className='actiontbtn'>

          <img src="../Icon-notepad.png" alt="Logo" className="logo" />
          <Button onClick={handleCopy} tile="Copy">
            <ContentCopyIcon />
            <label className='hidetext' > Copy</label>
          </Button>
          <Button onClick={handlePaste} title="Paste"><ContentPasteIcon />
            <label className='hidetext' > Paste</label>
          </Button>
          <Button onClick={handleClear} title="Clear Screen">
            <DeleteOutlineIcon />
            <label className='hidetext'> Clear</label>
          </Button>
          <Button onClick={handleShare} title="Share on WhatsApp">
            <WhatsAppIcon />
            <label className='hidetext' > Share</label>
          </Button>
          <Button onClick={handleDownload} title="Save file">
            <SaveIcon />
            <label className='hidetext' > Download</label>
          </Button>


          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInput} />

        </div>
        <div className='fontaction'>
          <Button onClick={() => fileInputRef.current.click()} title="Upload File">
            <CloudUploadIcon />
            <label className='hidetext' htmlFor="Upload Icon"> Upload File</label>
          </Button>
          <select value={font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="sans-serif">sans-serif</option>
            <option value="cursive">cursive</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
          </select>

          <p className='fontsizedisplay' title='font-size'>
            <span className='hidetext'> Font Size</span>
            {` ${fontSize}`}
          </p>
          <IconButton onClick={incrementFontSize} title="incrementFontSize" aria-label="incrementFontSize">
            <ZoomInIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={decrementFontSize} title="decrementFontSize" aria-label="decrementFontSize" >
            <ZoomOutIcon fontSize="large" />
          </IconButton>

        </div>
      </div>
      <textarea className={isWhite ? 'notebook-page-white' : 'notebook-page-yellow'} value={text} onChange={e => {
        setText(e.target.value);
        localStorage.setItem('text', e.target.value);
      }} style={{ fontFamily: font, fontSize: `${fontSize}px` }} />

      <div className='counts'>
        <div>
          <p className="line-count">Line: {lineCount}</p>
          <p className="word-count">Word: {wordCount} ,</p>
          <p className="letter-count">Chars: {letterCount}</p>
        </div>
        <FormGroup style={{ marginRight: '20px' }}>
          <FormControlLabel control={<Switch
            checked={isWhite}
            onChange={e => {
              localStorage.setItem("screenmode", JSON.stringify(!isWhite));
              setIsWhite(!isWhite)
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label={isWhite ? "light" : "dark"} />

        </FormGroup>
      </div>

    </div>
  );
};

export default TextEditor;



