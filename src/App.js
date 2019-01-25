import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false
    }
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("tile")) {
      e.target.style.backgroundColor = "blue";
    };

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false
    });
    this.setState({
      mouseDown: false
    });
  }

  handleMouseOver = (e) => {
    if (this.state.mouseDown === true) {
      e.target.style.backgroundColor = "blue";
    }
  }

  handleClick = (e) => {
    const tileID = e.target.id;
    document.getElementById(tileID).classList.add('shot');
  }

  render() {

    const generatePlayerGrid = () => {
      const tiles = [];
      for (let i = 1; i < 101; i++) {
        tiles.push(<div id={i} key={i} className="tile" onMouseOver={this.handleMouseOver} ></div>)
      };
      return tiles;
    }

    const generateOpponentGrid = () => {
      const tiles = [];
      for (let i = 101; i < 201; i++) {
        tiles.push(<div id={i} key={i} className="tile" onClick={this.handleClick}></div>)
      };
      return tiles;
    }

    return (
      <div className="App"  onMouseUp={this.handleMouseUp}>
        <div className="player boundary" onMouseDown={this.handleMouseDown}>
          {generatePlayerGrid()}
        </div>
        <div className="opponent boundary">
          {generateOpponentGrid()}
        </div>
      </div>
    );
  }
}

export default App;
