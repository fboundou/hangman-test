
import React, { Component } from 'react';
import './Hangman.css';

import one from "./imageList/1_1.png";
import two from "./imageList/2_2.png";
import three from "./imageList/3_3.png";
import four from "./imageList/4_4.png";
import five from "./imageList/5_5.png";
import six from "./imageList/6_6.png";
import seven from "./imageList/7_7.png";
import eight from "./imageList/8_8.png";
import nine from "./imageList/9_9.png";
import ten from "./imageList/10_10.png";

class Hangman extends Component {
  static defaultProps = {
    wordDictionary: ["apple","banana", "cherry", "orange"],
    images: ["", one, two, three, four, five, six, seven, eight, nine, ten],
    keyboard1: "QWERTYUIOP",
    keyboard2: "ASDFGHJKL",
    keyboard3: "ZXCVBNM",
    maxGuess: 10,
  }

  constructor(props) {
    super(props);
    this.state = {
      incorrectGuessCount: 0,
      guessed: new Set([]),
      correct_answer: this.props.wordDictionary[Math.floor(Math.random() * this.props.wordDictionary.length)]
    }
  }

  handleChange = event => {
    let char = event.target.value;
    this.setState(st => ({
      incorrectGuessCount: st.incorrectGuessCount + (st.correct_answer.includes(char.toUpperCase()) ? 0 : 1),
      guessed: st.guessed.add(char.toUpperCase())
    }));
  }

  getGuessedWord() {
    let data = this.state.correct_answer.split("").map(letter => (this.state.guessed.has(letter.toUpperCase()) ? letter : " _ "));
    return data;
  }

  generateKeyBoard_QWERTYUIOP() {
    return "QWERTYUIOP".split("").map(letter => (
      <button
      className='btn btn-lg btn-secondary m-1'
        key={letter}
        value={letter}
        onClick={this.handleChange}
        disabled={this.state.guessed.has(letter.toUpperCase())}
      >
        {letter}
      </button>
    ));
  }

  generateKeyBoard_ASDFGHJKL() {
    return this.props.keyboard2.split("").map(letter => (
      <button
        className='btn btn-lg btn-secondary m-1'
        key={letter}
        value={letter}
        onClick={this.handleChange}
        disabled={this.state.guessed.has(letter.toUpperCase())}
        
      >
        {letter}
      </button>
    ));
  }

  generateKeyBoard_ZXCVBNM() {
    return this.props.keyboard3.split("").map(letter => (
      <button
      className='btn btn-lg btn-secondary m-1'
        key={letter}
        value={letter}
        onClick={this.handleChange}
        disabled={this.state.guessed.has(letter.toUpperCase())}
      >
        {letter}
      </button>
    ));
  }

  startOver = () => {
    this.setState({
      incorrectGuessCount: 0,
      guessed: new Set([]),
      correct_answer: this.props.wordDictionary[Math.floor(Math.random() * this.props.wordDictionary.length)]
    });
  }

  render() {

    const isWinner = this.getGuessedWord().join("") === this.state.correct_answer;
    const isGameOver = this.state.incorrectGuessCount >= this.props.maxGuess;
    
    let keyboard1 = this.generateKeyBoard_QWERTYUIOP();
    let keyboard2 = this.generateKeyBoard_ASDFGHJKL();
    let keyboard3 = this.generateKeyBoard_ZXCVBNM();
    let choice = "Guess a fruit please!";

    if (isWinner || isGameOver) {
      keyboard1 = "";
      keyboard2 = "";
      keyboard3 = "";
      choice = "";
    }

    return (
      <div className="size container background1">
      <h1 className='text-center'>Hangman Game</h1>
        <div className="row">
          <div className="col-sm-8">
            <img src={this.props.images[this.state.incorrectGuessCount]} className="background float-right img-fluid" alt=""/>
          </div>
          <div className="col-sm-4">
          <div className=""><h5> {!isGameOver ? "Word: " + this.getGuessedWord().join("") : "Word: " + this.state.correct_answer} </h5></div>
          
          <br/>
          <div className=""><h5>Guess: {this.state.incorrectGuessCount} / {this.props.maxGuess}</h5></div>
          <br/>
          </div>
        </div>
        <div className="text-center">
      
          {!isWinner ? <h5 className="m-2 textColor"> {choice}</h5> : <h3 className="textColorWin">Game Over: You won!</h3>}
          
          <div>{!isGameOver ? keyboard1 : <h3 className="textColorLost">Game Over: You lost!</h3>}</div>
          <div>{!isGameOver ? keyboard2 : ""}</div>
          <div>{!isGameOver ? keyboard3 : ""}</div>
          <button className='btn btn-warning m-3' onClick={this.startOver}><h4>Play Again</h4></button>
        
        </div>
      </div>
    )
  }
}

export default Hangman;