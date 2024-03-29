import { CSSProperties, useEffect, useState } from "react";
import { Background } from '../components/Background'
import ladderImage from '../public/ladder.png';
import snakeImage from '../public/ladder.png';
import { Dice } from "@/components/Dice";
import { StaticImageData } from "next/image";

interface PieceType {
    color: "red" | "green" | "blue";
    location: number
}

interface BlockType {
    num: number;
    pieceList: Array<PieceType>
}

interface ObstacleType {
    type: "ladder" | "snake";
    start: number;
    end: number
}

function Piece({ color }: PieceType) {
    let PieceStyle: CSSProperties = {
        backgroundColor: color,
        animation: 'ease-out',
        animationDuration: '250ms'
    }
    return (
        <>
            <div className="h-3 w-3" style={PieceStyle}>
            </div>
        </>
    )
}

function Block({ num, pieceList }: BlockType) {
    return (
        <>
            <div
                className="h-12 w-12 bg-transparent text-center text-secondary rounded-md bg-slate-500 m-1">
                <p>{num}</p>
                {pieceList.length !== 0 &&
                    <div className="flex">{
                        pieceList.map((piece) => {
                            return (
                                <Piece key={piece.color} color={piece.color} location={piece.location} />
                            )
                        })
                    }</div>
                }
            </div>
        </>
    )
}

export default function Board() {
    let [board, SetBoard] = useState<Array<number>>([]);
    let [die, SetDie] = useState<number>(0);
    let players : Array<"red" | "green" | "blue"> = ["red","green","blue"];
    let [currentPlayer, SetCurrentPlayer] = useState<number>(0);
    let [pieces, SetPieces] = useState<PieceType[]>([
        { color: "red", location: 6 },
        { color: "green", location: 6 },
        { color: "blue", location: 6 },
    ]);

    const UseDice = (num: number) => {
        SetDie(num);
    }

    const ObstacleImages: Record<string, StaticImageData> = {
        ladder: ladderImage,
        snake: snakeImage
    };

    const ObstacleStyle: CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%'
    };

    const renderObstacles = () => {
        return ObstacleMap.map((obstacle, index) => {
            const style: CSSProperties = {
                ...ObstacleStyle,
                backgroundImage: `url(${ObstacleImages[obstacle.type]})`,
                backgroundSize: 'cover',
                top: `${((h - Math.floor(obstacle.start / w)) * (100 / h))}%`,
                left: `${((obstacle.start % w === 0 ? w : obstacle.start % w) - 1) * (100 / w)}%`
            };
            return (
                <div key={index} style={style}></div>
            );
        });
    };
    let ObstacleMap: Array<ObstacleType> = [
        { type: "ladder", start: 16, end: 28 },
        { type: "ladder", start: 19, end: 39 },
        { type: "snake", start: 46, end: 26 },
    ];
    const UpdatePieceLocation = (color: string, num: number) => {
        let t = [...pieces];
        let tempPos = t.filter((p) => {
            return p.color == color
        })[0].location + num;
        let o = ObstacleMap.filter((ob) => {
            return tempPos == ob.start
        })
        if (o.length !== 0) {
            tempPos = o[0].end;
        }
        t.filter((p) => {
            return p.color == color
        })[0].location = tempPos;
        SetPieces(t);
    }
    // UpdatePieceLocation("red")
    let h: number = 14;
    let w: number = 11;
    let invert: boolean = (h % 2 == 0) ? false : true;
    const GridCss: CSSProperties = {
        gridTemplateColumns: `repeat(${w},minmax(0,1fr))`,
    }
    const ResetBoard = (h: number, w: number) => {
        let temp_board: Array<number> = [];
        for (let x = h - 3; x > -1; x--) {
            if (invert) {
                for (let y = 1; y < w + 1; y++) {
                    temp_board.push(x * w + y);
                }
            } else {
                for (let y = w; y > 0; y--) {
                    temp_board.push(x * w + y);
                }
            }
            invert = !invert;
            SetBoard(temp_board);
        }
    }
    useEffect(() => {
        ResetBoard(h, w);
    }, [])
    useEffect(() => {
        SetCurrentPlayer((currentPlayer+1)%players.length);
        console.log(currentPlayer+1);
    }, [die])
    return (
        <>
            <div className="flex md:justify-evenly">
                <div>
                    <Dice useDice={UseDice} />
                    <div>
                        Current Turn :
                        <div className="h-8 w-8 rounded-md" style={{backgroundColor: players[currentPlayer]}}></div>
                    </div>
                </div>
                <div className="p-4 grid gap-0" style={GridCss}>
                    <>
                        {(board.length !== 0) &&
                            board.map((i) => {
                                return (
                                    <Block key={i} num={i} pieceList={pieces.filter((p: PieceType) => { return p.location === i })} />
                                )
                            })
                        }
                    </>
                </div>
                {/* <div style={{ position: 'relative' }}>
                {renderObstacles()}
            </div> */}
            </div>
        </>
    )
}