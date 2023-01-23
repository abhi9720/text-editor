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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [isWhite, setIsWhite] = useState(false);
  const [togglenav, setToggleNav] = useState(false);
  const fileInputRef = useRef(null);

  const printRef = useRef(null);
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

  window.addEventListener('file', (event) => {
    console.log(event)
  });


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
    localStorage.setItem("text", '')
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

  const handlePrint = () => {
    printRef.current.innerHTML = text;
    window.print();
  }


  return (
    <div className="text-editor"
      style={{ backgroundColor: `#${isWhite ? 'd9e3ffc7' : 'ff86005a'}` }}
    >
      <div className="header"
        style={{ borderBottom: `2px solid #${isWhite ? '0466c8b5' : 'd0a090'}` }}>
        <img src="../Icon-notepad.png" alt="Logo" className="logo" />
        <div className='actiontbtn'>
          <IconButton onClick={handleCopy} tile="Copy">
            <ContentCopyIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}>Copy</span>

          </IconButton>
          <IconButton onClick={handlePaste} title="Paste">
            <ContentPasteIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}>Paste </span>
          </IconButton>
          <IconButton onClick={handleClear} title="Clear Screen">
            <DeleteOutlineIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}>Clear </span>

          </IconButton>
          <IconButton onClick={handleShare} title="Share on WhatsApp">
            <WhatsAppIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}>Share </span>
          </IconButton>
          <IconButton onClick={handleDownload} title="Save file">
            <SaveIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}> Save</span>
          </IconButton>
          <IconButton onClick={() => fileInputRef.current.click()} title="Upload File">
            <CloudUploadIcon />
            <span className={togglenav ? "btntexthide" : "btntext"}>Upload File </span>
          </IconButton>

          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInput} />
          {
            togglenav ?
              <IconButton className='showonsmall' onClick={e => setToggleNav(!togglenav)}>
                <KeyboardArrowDownIcon className='showonsmall' />
              </IconButton> : <></>
          }


        </div>
        {togglenav ?
          <></> :
          <div className='fontaction'>
            <IconButton onClick={handlePrint}>
              <LocalPrintshopIcon></LocalPrintshopIcon>
              <span className={togglenav ? "btntexthide" : "btntext"}>Print </span>
            </IconButton>

            <IconButton onClick={incrementFontSize} title="incrementFontSize" aria-label="incrementFontSize">
              <ZoomInIcon fontSize="large" />
            </IconButton>

            <IconButton onClick={decrementFontSize} title="decrementFontSize" aria-label="decrementFontSize" >
              <ZoomOutIcon fontSize="large" />
            </IconButton>
            <p className='fontsizedisplay' title='font-size'>

              <span className='hidetext'> Font Size</span>
              {` ${fontSize}`}
            </p>

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



            <IconButton className='showonsmall' onClick={e => setToggleNav(!togglenav)}>
              <KeyboardArrowUpIcon className='showonsmall' />
            </IconButton>


          </div>}

      </div>
      <textarea id="notepadtextbox" className={isWhite ? 'notebook-page-white' : 'notebook-page-yellow'} value={text} onChange={e => {
        setText(e.target.value);
        localStorage.setItem('text', e.target.value);
      }} style={{ fontFamily: font, fontSize: `${fontSize}px` }} />


      <div ref={printRef} className="print-only" style={{ display: 'none' }}>
      </div>
      <div className='counts'>

        <div>
          <p className="line-count">Line  {lineCount} </p>
          <p className="word-count">Word: {wordCount} </p>
          <p className="letter-count">Chars: {letterCount}</p>

        </div>
        <FormGroup >
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



