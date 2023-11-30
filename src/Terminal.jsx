// XtermTerminal.jsx
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const MyTerminal = () => {
  const terminalRef = useRef(null);
  let currLine = "";
  const entries = [];

  useEffect(() => {
    const term = new Terminal({ convertEol: true });
    term.open(terminalRef.current);
    term.write('web shell $ ');

    term.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) { // Enter key
        term.write('\r\n');
        entries.push(currLine);
        term.write(`You entered: ${currLine}\r\n`);
        currLine = '';
        term.write('web shell $ ');
      } else if (domEvent.keyCode === 8) { // Backspace key
        if (currLine) {
          currLine = currLine.slice(0, currLine.length - 1);
          term.write('\b \b');
        }
      } else {
        currLine += key;
        term.write(key);
      }
    });

    return () => {
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default MyTerminal;

