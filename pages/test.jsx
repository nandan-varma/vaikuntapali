import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Lozza = dynamic(
  () => import('lozza'),
  { ssr: false }
);

const ChessForm = () => {
  const [move, setMove] = useState('');
  const [decision, setDecision] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const engine = new Lozza();
    engine.onmessage = (event) => {
      if (event.data.includes('bestmove')) {
        setDecision(event.data.split(' ')[1]);
      }
    };
    engine.postMessage(`position startpos moves ${move}`);
    engine.postMessage('go depth 15');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Move:
        <input
          type="text"
          value={move}
          onChange={(e) => setMove(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
      <p>Lozza decision: {decision}</p>
    </form>
  );
};

export default ChessForm;