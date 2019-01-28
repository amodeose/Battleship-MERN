import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      one: 4,
      two: 3,
      three: 2,
      four: 1,
      complete: false,
      count: 0,
      memory: [],
      direction: false
    }
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("tile")) {
      e.target.style.backgroundColor = "blue";
      this.state.memory.push(e.target.id);
      this.setState({
        count: this.state.count + 1
      })
    };

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = (e) => {
    e.preventDefault();
    const count = this.state.count;
    switch(count) {
      case 1:
        if (this.state.one === 0) {
          for (let i = 0; i < this.state.memory.length; i++) {
            const tile = document.getElementById(this.state.memory[i]);
            tile.style.backgroundColor = "white";
          }
          break;
        }
        this.setState ({
          one: this.state.one - 1
        });
        break;
      case 2:
        if (this.state.two === 0) {
          for (let i = 0; i < this.state.memory.length; i++) {
            const tile = document.getElementById(this.state.memory[i]);
            tile.style.backgroundColor = "white";
          }
          break;
        }
        this.setState ({
          two: this.state.two - 1
        });
        break;
      case 3:
        if (this.state.three === 0) {
          for (let i = 0; i < this.state.memory.length; i++) {
            const tile = document.getElementById(this.state.memory[i]);
            tile.style.backgroundColor = "white";
          }
          break;
        }
        this.setState ({
          three: this.state.three - 1
        });
        break;
      case 4:
        if (this.state.four === 0) {
          for (let i = 0; i < this.state.memory.length; i++) {
            const tile = document.getElementById(this.state.memory[i]);
            tile.style.backgroundColor = "white";
          }
          break;
        }
        this.setState ({
          four: this.state.four - 1
        });
        break;
      default:
    }

    

    this.setState({
      mouseDown: false,
      count: 0,
      memory: [],
      direction: 0
    });

    setTimeout(() => {
      if (this.state.one === 0 && this.state.two === 0 && this.state.three === 0 && this.state.four === 0) {
        this.setState({
          complete: true
        })
      }
    }, 1000);
    
  }

  handleMouseOver = (e) => {
    const stateDirection = e.target.id - this.state.memory[0];
    if (this.state.mouseDown) {

      if (this.state.memory.length === 1 && (stateDirection === -10 || stateDirection === -1 || stateDirection === 1 || stateDirection === 10)) {
        e.target.style.backgroundColor = "blue";
        this.state.memory.push(e.target.id);
        this.setState({
          count: this.state.count + 1
        });
        
        if (stateDirection !== -11 && stateDirection !== -9 && stateDirection !== 9 && stateDirection !== 11) {
          this.setState({
            direction: stateDirection
          });
        }
      }

      const direction = e.target.id - this.state.memory[this.state.memory.length - 1];

      if (direction == this.state.direction && this.state.count < 4) {
        e.target.style.backgroundColor = "blue";
        this.state.memory.push(e.target.id);
        this.setState({
          count: this.state.count + 1
        });
      }

    }

  }

  handleClick = (e) => {
    const tileID = e.target.id;
    const attack = document.getElementById(tileID);
    const defense = document.getElementById(tileID-100);
    if (defense.style.backgroundColor == "blue") {
      attack.style.backgroundColor = "red";
      defense.classList.add('shot');
    } else {
    attack.classList.add('shot');
    defense.classList.add('shot');
    }
  }

  handleButton = () => {
    for (let i = 1; i < 101; i++) {
      const tile = document.getElementById(i);
      if (tile.style.backgroundColor === "blue") {
        tile.style.backgroundColor = "white";
      }
      if (tile.classList.contains('shot')) {
        tile.classList.remove('shot');
        document.getElementById(i+100).classList.remove('shot');
      }
    }
    this.setState({
      one: 4,
      two: 3,
      three: 2,
      four: 1,
      complete: false
    })
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
        <div className="shipCount">
          {this.state.one > 0 && <div className="one">
            <div className="tile blue"></div>
            <h3>Remaining: {this.state.one}</h3>
          </div>}
          {this.state.two > 0 && <div className="two">
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <h3>Remaining: {this.state.two}</h3>
          </div>}
          {this.state.three > 0 && <div className="three">
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <h3>Remaining: {this.state.three}</h3>
          </div>}
          {this.state.four > 0 && <div className="four">
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <div className="tile blue"></div>
            <h3>Remaining: {this.state.four}</h3>
          </div>}
          <button onClick={this.handleButton}>Reset</button>
        </div>
        <div className="player boundary" onMouseDown={this.handleMouseDown}>
          {generatePlayerGrid()}
        </div>
        {this.state.complete && <button>READY</button>}
        <div className="opponent boundary">
          {generateOpponentGrid()}
        </div>
      </div>
    );
  }
}

export default App;
