import { CSSProperties } from "react";

interface BlockType {
    num: number;
}

function Block({ num }: BlockType) {
    return (
        <>
            <div className="h-8 w-8 bg-primary text-center text-secondary">{num}</div>
        </>
    )
}

export default function Board() {
    let board: Array<number> = [];
    let h: number = 13;
    let w: number = 12;
    let invert: boolean = (h%2==0) ? false : true;
    const GridCss: CSSProperties = {
        gridTemplateColumns: `repeat(${w},minmax(0,1fr))`
    }
    for (let x = h-3; x > -1; x--) {
        if (invert) {
            for (let y = 1; y < w + 1; y++) {
                board.push(x * w + y);
            }
        } else {
            for (let y = w; y > 0; y--) {
                board.push(x * w + y);
            }
        }
        invert = !invert;
    }
    return (
        <>
            <div className="p-4  bg-slate-600 grid gap-2" style={GridCss}>
                {
                    board.map((i) => {
                        return (
                            <>
                                <Block key={i} num={i} />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}