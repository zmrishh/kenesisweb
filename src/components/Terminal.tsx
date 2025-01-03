import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Terminal.css';

interface Command {
  command: string;
  output: string;
}

export const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandResponses: { [key: string]: string } = {
    '-help': `Available commands:
-help     Display this help text
-about    Learn about Kenesis and our mission
-products View the products we are working on
-vision   Discover our mission and long-term goals
-team     Meet the people behind Kenesis
-contact  Get our contact information
-careers  View job opportunities
-blog     Read our latest updates
-clear    Clear the terminal screen
-exit     End the session and close the terminal`,
    '-about': 'Kenesis is a cutting-edge technology company focused on innovation and creating groundbreaking solutions.',
    '-products': 'Our product lineup includes advanced AI solutions, cloud platforms, and innovative software tools.',
    '-vision': 'We aim to reshape the technological landscape through innovative solutions and creative problem-solving.',
    '-team': 'Our team consists of passionate innovators, developers, and creative minds working together.',
    '-contact': 'Email: contact@kenesis.com\nPhone: (555) 123-4567',
    '-careers': 'Visit our careers page to explore exciting opportunities at Kenesis.',
    '-blog': 'Check out our latest blog posts at blog.kenesis.com',
  };

  useEffect(() => {
    // Initial animation
    gsap.fromTo(".terminal",
      { 
        opacity: 0, 
        y: -20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power3.out"
      }
    );

    setCommands([{ 
      command: 'welcome',
      output: 'Welcome to Kenesis! Type \'-help\' to see available commands.'
    }]);
    inputRef.current?.focus();
  }, []);

  // Animate new command lines
  useEffect(() => {
    if (commands.length > 0) {
      gsap.fromTo(
        ".terminal-line:last-child",
        { 
          opacity: 0, 
          x: -10 
        },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, [commands]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === '-clear') {
      setCommands([]);
      return;
    }

    if (trimmedCmd === '-exit') {
      output = 'Session ended. Thank you for visiting Kenesis!';
      setCommands(prev => [...prev, { command: cmd, output }]);
      setInputValue('');
      return;
    }

    output = commandResponses[trimmedCmd] || 'Command not recognized. Type \'-help\' for available commands.';
    setCommands(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleCommand(inputValue);
    setCommandHistory(prev => [inputValue, ...prev]);
    setInputValue('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-header">
        <div className="button red"></div>
        <div className="button yellow"></div>
        <div className="button green"></div>
      </div>
      <div className="terminal-content">
        {commands.map((cmd, index) => (
          <div key={index} className="terminal-line">
            {cmd.command !== 'welcome' && (
              <div className="command-line">
                <span className="prompt">$</span>
                <span className="command">{cmd.command}</span>
              </div>
            )}
            <div className="output">{cmd.output}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-container">
        <span className="prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command here..."
          className="terminal-input"
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
};
