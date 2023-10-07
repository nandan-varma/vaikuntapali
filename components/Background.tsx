import React, { useRef, useEffect } from 'react';

interface BackgroundProps{
  board: Array<number>;
  h: number;
  w: number;
}

export const Background = ({ board,h,w }: BackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(board);

  useEffect(() => {
    const canvas: HTMLCanvasElement  = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const squareSize = 36;
    const gridWidth = 10 * squareSize;
    const gridHeight = 10 * squareSize;

    canvas.width = gridWidth;
    canvas.height = gridHeight;
    let locX =0;
    let locY =0;
    board.map((block:number,index: number)=>{       
      ctx.fillText(block.toString(),locX,locY,squareSize);
      locX+=squareSize;
      if((index)%w ==0 ){
        locY+=squareSize;
      }
    })
  }, [board]);

  return <canvas className='p-4' ref={canvasRef} />;
};