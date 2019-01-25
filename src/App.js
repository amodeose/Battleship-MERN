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
    })
  }

  handleMouseOver = (e) => {
    if (this.state.mouseDown === true) {
      e.target.style.backgroundColor = "blue";
    }
  }

  render() {

    const generateGrid = () => {
      const tiles = [];
      for (let i = 1; i < 101; i++) {
        tiles.push(<div id={i} key={i} className="tile" onMouseOver={this.handleMouseOver} ></div>)
      };
      return tiles;
    }

    return (
      <div className="App" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        <div className="player boundary">
          {generateGrid()}
        </div>
        <div className="opponent boundary">
          {generateGrid()}
        </div>
      </div>
    );
  }
}

export default App;
