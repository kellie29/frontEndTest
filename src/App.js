import React, {useState, useEffect} from 'react';
import Maze from './Maze';
import './App.css';

function App() {
  const [boardSize, setBoardSize] = useState(0);
  const [keyType, setkeyType] = useState("");
  
  useEffect(() => {
    const size = prompt("Please enter board size, it would be the height and width");
    setBoardSize(parseInt(size));
    document.addEventListener("keydown", senseKeyDown);    
    document.addEventListener("keyup", senseKeyUp);    
  }, []);
  
  const senseKeyDown = (event) => {
    setkeyType(event.key)
  }
  
  const senseKeyUp = () => {
    setkeyType("");
  }
  
  return (
    <div>
      {
        boardSize
        ? <Maze
          boardSize={boardSize}
          keyType={keyType}
        />
        : null
      }
    </div>
  );
}

export default App;
