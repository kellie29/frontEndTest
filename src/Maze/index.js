import React, { useState, useEffect } from 'react';
import Block from './Block';

function Index(props) {

  const [player, setPlayer] = useState({x : -1, y: -1});
  const [stripes, setStripes] = useState([]);
  const [divArray, setdivArray] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [won, setWon] = useState(false)

  useEffect(() => {
    let arrayTemp = []
    let x, y;
    const sizeBy2 = Math.round(props.boardSize / 2) - 1 

    setPlayer({
      x: sizeBy2,
      y: sizeBy2
    })

    for(let i =0 ;i < props.boardSize; i++) {
      x = Math.floor(Math.random() * props.boardSize)
      y = Math.floor(Math.random() * props.boardSize)
      // there are chance that green stripes co-ordinates can overlap with the other green stripes
      // so while loop is run till a new random co-ordinates is obtained
      while(arrayTemp.includes(String(x) + String(y)) || (sizeBy2 === x && sizeBy2 === y)) {
        x = Math.floor(Math.random() * props.boardSize)
        y = Math.floor(Math.random() * props.boardSize)
      }
      arrayTemp.push(String(x) + String(y));
    }
    setStripes(arrayTemp);
  }, []);


  useEffect(()=> {
    if (!stripes.length) return;
    switch (props.keyType) {
      case "ArrowLeft":
        if (player.y - 1 >= 0) {
          setPlayer({
            x: player.x,
            y: player.y - 1
          })
          setMoveCount(moveCount + 1);
        }
        break;
      case "ArrowRight":
        if (player.y + 1 <= props.boardSize - 1) {
          setPlayer({
            x: player.x,
            y: player.y + 1
          })
          setMoveCount(moveCount + 1);
        }
        break;
      case "ArrowUp":
        if (player.x - 1 >= 0) {
          setPlayer({
            x: player.x - 1,
            y: player.y
          })
          setMoveCount(moveCount + 1);
        }
        break;
      case "ArrowDown":
        if (player.x + 1 <= props.boardSize - 1) {
          setPlayer({
            x: player.x + 1,
            y: player.y
          })
          setMoveCount(moveCount + 1);
        }
        break;
      default:
        break;
    }
  }, [props.keyType]);

  useEffect(() => {
    if(stripes.includes(String(player.x )+ String(player.y))) {
      const index = stripes.indexOf(String(player.x) + String(player.y))
      setStripes([
        ...stripes.slice(0, index),
        null,
        ...stripes.slice(index + 1, stripes.length)
      ])
    }

  }, [player])

  useEffect(() => {
    if (won === true) {
      alert("You won !!!!!");
      window.location.reload();
    }
  }, [won])

  useEffect(() => {
    if(stripes.length && stripes.every(stripe => stripe === null)) {
      setStripes([]);
      setWon(true);
      return;
    }
    if (stripes.length === props.boardSize) {
      let divArrayTemp = [];
      for(var i = 0; i < props.boardSize; i++) {
        for(var j = 0; j < props.boardSize; j++) {
          divArrayTemp.push(
            <Block 
              key={String(i) + "_" + String(j)}
              player={i === player.x && j === player.y}
              stripe={stripes.includes(String(i) + String(j))} 
            />
          );
        }
        divArrayTemp.push(<br />);
      }
      setdivArray(divArrayTemp);
    }
  }, [stripes, player]);

  return (
    <div>
      {divArray}
      <h2>Total Moves : {moveCount}</h2>
    </div>
  )
}

export default Index;