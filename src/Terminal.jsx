// Terminal.jsx
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import './CustomTerminal.css';

//frontend/docker-frontend/src/CustomTerminal.css

const MyTerminal = () => {
  const terminalRef = useRef(null);
  let currLine = "";
  const entries = [];

  useEffect(() => {
    const term = new Terminal({
      convertEol: true,
      cols: 100,
      cursorStyle: 'underline',
      cursorBlink: true,
      fontFamily: 'Courier New',
      fontSize: 14,
      fontWeight: 'bold',
      theme: {
        background: '#000000',
        foreground: '#FFFFFF',
        cursor: '#00FF00',
      },
    });
    term.open(terminalRef.current);
    term.write('\x1b[34mPoridhi Web Shell $$ \x1b[0m');

    const socket = new WebSocket('ws://localhost:8080/ws'); // Replace with your WebSocket server URL

    socket.onopen = () => {
      term.write('\x1b[32mWebSocket Connection Established\r\n');
      term.write('\x1b[34mPoridhi Web Shell $$ \x1b[0m');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      term.write(`\r\n${message}\r\n`);
      term.write('\x1b[34mPoridhi Web Shell $$ \x1b[0m');
    };

    term.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) { // Enter key
        term.write('\r\n');
        entries.push(currLine);
        //term.write(`You entered: ${currLine}\r\n`);

        // Send the entered command to the server via WebSocket
        socket.send(currLine);
        //socket.send(currLine);

        currLine = '';
        term.write('\x1b[34mPoridhi Web Shell $$ \x1b[0m');
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
      socket.close();
    };
  }, []);

  return <div className="terminal-container">
    <div ref={terminalRef} />;
  </div>
};

export default MyTerminal;