import dynamic from 'next/dynamic';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import firebase from '../lib/firebase'
import 'firebase/database'
import 'firebase/auth'
import { Chess } from 'chess.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
// import Chessboard from 'chessboardjsx';
const Chessboard = dynamic(
    () => import('chessboardjsx'),
    { ssr: false }
)

export default function ChessGame() {

    const db = firebase.database();
    const router = useRouter();
    const { slug } = router.query;
    const [data, setData] = useState(null);
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [squareStyles, setSquareStyles] = useState({});
    const [UnddoneMove, setUndoneMove] = useState(null)
    const ref = db.ref(`games/${slug}`);
    const [color, setColor] = useState('b');
    var userid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userid = user.uid;
        } else {
          return <div>Try logging in to continue the game</div>
        }
      });
    
    useEffect(() => {
        if (slug) {
            ref.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val());
                    if(snapshot.val().createdBy == userid){setColor('w')}
                } else {
                    ref.set({ id: slug, FEN: fen , createdBy : userid });
                    setColor('w');
                }
            });
        }
    }, [slug]);
    useEffect(() => {
        if (data) {
            game.load(data.FEN)
            setFen(game.fen());
            ref.on('child_changed', (snapshot) => {
                setData((prevData) => ({
                    ...prevData,
                    [snapshot.key]: snapshot.val(),
                }));
            });
        }
    }, [data, slug]);

    const handleMove = (move) => {
        if (game.turn() == color) {
            if (game.moves({ square: move.from, verbose: true }).some(obj => obj.to == move.to && obj.from == move.from)) {
                game.move(move)
                console.log(move)
                setSquareStyles({})
                ref.set({ id: slug, FEN: game.fen() });
            }
            console.log(color)
        }
    }


    const handlePromotion = (sourceSquare, targetSquare) => {
        const promotionPiece = prompt('Choose a promotion piece (queen : q , rook : r, bishop : b, knight : n)', 'q');
        handleMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: promotionPiece
        });
    }

    const onMouseOverSquare = (square, piece) => {
        if (game.turn() != color) {
            return
        }
        var moves = game.moves({
            square: square,
            verbose: true
        })
        if (moves.length === 0) return
        greySquare(square)
        setSquareStyles({})
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to)
        }
    }

    const greySquare = (square) => {
        setSquareStyles((prevStyles) => ({
            ...prevStyles,
            [square]: {
                background: 'radial-gradient(circle, white 36%, transparent 40%)',
                borderRadius: '50%'
            }
        }));
    }
    const handleResetClick = () => {
        console.log(game.turn());
        console.log(color);
        // game.reset();
        // setFen(game.fen());
    }
    return (
        <div>
            <title>Chess</title>
            {/* <div className='game-id'>Game ID : {data["id"] } </div> */}
            {/* <div>
                {data ? (
                    <div>Found Room: {JSON.stringify(data)}</div>
                ) : (
                    <div>Creating game room...</div>
                )}
            </div> */}
            <FontAwesomeIcon className='menu-icon' onClick={handleResetClick} icon={faRotate} />
            <Chessboard
                position={fen}
                squareStyles={squareStyles}
                onMouseOverSquare={onMouseOverSquare}
                onDrop={(move) => {
                    if (
                        move.sourceSquare[1] === '7' &&
                        move.targetSquare[1] === '8' &&
                        game.get(move.sourceSquare).type === 'p'
                    ) {
                        handlePromotion(move.sourceSquare, move.targetSquare);
                    } else if (
                        move.sourceSquare[1] === '2' &&
                        move.targetSquare[1] === '1' &&
                        game.get(move.sourceSquare).type === 'p'
                    ) {
                        handlePromotion(move.sourceSquare, move.targetSquare);
                    } else {
                        handleMove({
                            from: move.sourceSquare,
                            to: move.targetSquare
                        });
                    }
                }}
            />
        </div>
    )
}