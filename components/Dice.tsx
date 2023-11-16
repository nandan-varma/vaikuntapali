import React, { useState,useEffect,useRef } from "react";

interface DiceProps { 
  useDice :(num: number) => void
}

export const Dice: React.FC<DiceProps> = ({useDice}) => {
  const elDiceOne = useRef<HTMLDivElement>(null);
  const elDiceTwo = useRef<HTMLDivElement>(null);
  const elComeOut = useRef<HTMLDivElement>(null);
  const [diceOne,SetDiceOne] = useState(1);
  const [diceTwo,SetDiceTwo] = useState(1);

  const rollDice = () => {
    SetDiceOne(Math.floor(Math.random() * 6) + 1);
    SetDiceTwo(Math.floor(Math.random() * 6) + 1);

    ()=>{useDice(diceOne+diceTwo)};

    console.log(diceOne + ' ' + diceTwo);

    for (let i = 1; i <= 6; i++) {
      if (elDiceOne.current) {
        elDiceOne.current.classList.remove('show-' + i);
        if (diceOne === i) {
          elDiceOne.current.classList.add('show-' + i);
        }
      }
    }

    for (let k = 1; k <= 6; k++) {
      if (elDiceTwo.current) {
        elDiceTwo.current.classList.remove('show-' + k);
        if (diceTwo === k) {
          elDiceTwo.current.classList.add('show-' + k);
        }
      }
    }
  };

  useEffect(()=>{
    console.log(diceOne);
  },[diceOne])

  return (
    <>
      <div className="game">
        <div className="container">
          <div id='dice1' ref={elDiceOne} className="dice dice-one">
            <div id="dice-one-side-one" className='side one'>
              <div className="dot one-1"></div>
            </div>
            <div id="dice-one-side-two" className='side two'>
              <div className="dot two-1"></div>
              <div className="dot two-2"></div>
            </div>
            <div id="dice-one-side-three" className='side three'>
              <div className="dot three-1"></div>
              <div className="dot three-2"></div>
              <div className="dot three-3"></div>
            </div>
            <div id="dice-one-side-four" className='side four'>
              <div className="dot four-1"></div>
              <div className="dot four-2"></div>
              <div className="dot four-3"></div>
              <div className="dot four-4"></div>
            </div>
            <div id="dice-one-side-five" className='side five'>
              <div className="dot five-1"></div>
              <div className="dot five-2"></div>
              <div className="dot five-3"></div>
              <div className="dot five-4"></div>
              <div className="dot five-5"></div>
            </div>
            <div id="dice-one-side-six" className='side six'>
              <div className="dot six-1"></div>
              <div className="dot six-2"></div>
              <div className="dot six-3"></div>
              <div className="dot six-4"></div>
              <div className="dot six-5"></div>
              <div className="dot six-6"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id='dice2' ref={elDiceTwo} className="dice dice-two">
            <div id="dice-two-side-one" className='side one'>
              <div className="dot one-1"></div>
            </div>
            <div id="dice-two-side-two" className='side two'>
              <div className="dot two-1"></div>
              <div className="dot two-2"></div>
            </div>
            <div id="dice-two-side-three" className='side three'>
              <div className="dot three-1"></div>
              <div className="dot three-2"></div>
              <div className="dot three-3"></div>
            </div>
            <div id="dice-two-side-four" className='side four'>
              <div className="dot four-1"></div>
              <div className="dot four-2"></div>
              <div className="dot four-3"></div>
              <div className="dot four-4"></div>
            </div>
            <div id="dice-two-side-five" className='side five'>
              <div className="dot five-1"></div>
              <div className="dot five-2"></div>
              <div className="dot five-3"></div>
              <div className="dot five-4"></div>
              <div className="dot five-5"></div>
            </div>
            <div id="dice-two-side-six" className='side six'>
              <div className="dot six-1"></div>
              <div className="dot six-2"></div>
              <div className="dot six-3"></div>
              <div className="dot six-4"></div>
              <div className="dot six-5"></div>
              <div className="dot six-6"></div>
            </div>
          </div>
        </div>
        <div id='roll' ref={elComeOut} className='roll-button' onClick={() => { rollDice() }}><button>Roll dice!</button></div>
      </div>
    </>
  )
}