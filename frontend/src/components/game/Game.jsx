import React, { Component } from "react";
import axios from "axios";
import { TimelineMax, TweenLite, Power0 } from "gsap";
import Score from "./score/Score";
import Playlist from "./playlist/Playlist";
import playButtonConture from "./playButtonConture.svg";
import "./Game.css";
import Answer from "./answer/Answer";

// const baseUrl = "https://musaki.azurewebsites.net/";
const baseUrl = "http://127.0.0.1:8000/";

class Game extends Component {
  constructor(props) {
    super(props);
    this.circleButton = null;
    this.circleButtonConture = null;

    this.singOrPasteDiv = null;
    this.playDiv = null;

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onPasteTextClick = this.onPasteTextClick.bind(this);
    this.onLyricChange = this.onLyricChange.bind(this);
    this.onGuessByTextClick = this.onGuessByTextClick.bind(this);
    this.onCorrectAnswer = this.onCorrectAnswer.bind(this);
    this.onIncorrectAnswer = this.onIncorrectAnswer.bind(this);

    this.tracks = [];
    this.numberOfAttempt = 2;

    this.state = {
      showPlayButton: "",
      showSingOrPasteButtons: "hidden",
      showTextArea: "hidden",
      lyric: "",
      computerPoints: 0,
      userPoints: 0,
      showAnswer: "hidden",
      lyricResponce: {},
      attempt: 1,
      textareaMessage: `Paste text of the song! This is my 1 attempt out of ${this.numberOfAttempt}.`,
      showListOfSongs: "hidden"
    };
  }

  mouseEnter() {
    TweenLite.to(this.circleButton, 0.5, { scale: 1.2 });
  }

  onPlayClick() {
    this.tracks = [];
    this.setState({
      showPlayButton: "hidden",
      showSingOrPasteButtons: "",
      showListOfSongs: "hidden"
    });
  }

  onPasteTextClick() {
    this.setState({
      showSingOrPasteButtons: "hidden",
      showTextArea: "",
      textareaMessage: `Paste text of the song! This is my 1 attempt out of ${this.numberOfAttempt}.`
    });
  }

  async onGuessByTextClick() {
    const song = await axios
      .post(`${baseUrl}recognizer/recognizeByLyrics`, {
        lyric: this.state.lyric
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      lyricResponce: song?.data,
      textarea: "hide",
      showAnswer: "",
      showTextArea: "hidden",
      lyric: ""
    });

    if (this.state.lyricResponce) {
      this.tracks.push(this.state.lyricResponce.track_id);
    }
  }

  mouseLeave() {
    TweenLite.to(this.circleButton, 0.5, { scale: 1 });
  }
  componentDidMount() {
    const col = new TimelineMax({});
    col.to(this.circleButtonConture, 4.7, {
      rotation: 360,
      transformOrigin: "50% 50%",
      ease: Power0.easeNone,
      repeat: -1
    });
  }

  onLyricChange(event) {
    this.setState({ lyric: event.target.value });
  }

  onIncorrectAnswer() {
    if (this.state.attempt === this.numberOfAttempt) {
      const userPoints = this.state.userPoints + 1;
      this.setState({
        attempt: 1,
        userPoints: userPoints,
        showPlayButton: "",
        showAnswer: "hidden",
        showListOfSongs: ""
      });

      return;
    }
    const attempt = this.state.attempt + 1;
    this.setState({
      attempt: attempt,
      textareaMessage: `Let's try again! This is my ${attempt} attempt out of ${this.numberOfAttempt}.`,
      showTextArea: "",
      showAnswer: "hidden",
      showListOfSongs: "hidden"
    });
  }
  onCorrectAnswer() {
    const computerPoints = this.state.computerPoints + 1;
    this.setState({
      attempt: 1,
      computerPoints: computerPoints,
      showPlayButton: "",
      showAnswer: "hidden",
      showListOfSongs: ""
    });
  }

  render() {
    const isLastAttempt = this.state.attempt === this.numberOfAttempt;

    return (
      <div className="playButton">
        <Score
          first={this.state.userPoints}
          second={this.state.computerPoints}
        />
        <Playlist hidden={this.state.showListOfSongs} tracks={this.tracks} />
        <Answer
          hidden={this.state.showAnswer}
          onCorrectAnswer={this.onCorrectAnswer}
          onIncorrectAnswer={this.onIncorrectAnswer}
          lyric={this.state.lyricResponce}
          isLast={isLastAttempt} />

        <div className={"singOrPaste " + this.state.showSingOrPasteButtons}>
          <button disabled>Sing song</button>
          <button onClick={this.onPasteTextClick}>Paste text</button>
        </div>

        <div
          className={"conteinerbodywithanim " + this.state.showPlayButton}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={this.onPlayClick}
          ref={div => (this.circleButton = div)}
        >
          <div className="play">
            <p>play</p>
          </div>
          <img
            className="playButtonConture"
            src={playButtonConture}
            alt="Play button"
            ref={img => (this.circleButtonConture = img)}
          />
        </div>
        <div className={"textArea " + this.state.showTextArea}>
          <div className="pForTextArea">
            <p>{this.state.textareaMessage}</p>
            <textarea
              value={this.state.lyric}
              onChange={this.onLyricChange}
            ></textarea>
          </div>
          <button className="go-btn" onClick={this.onGuessByTextClick}>
            Go
          </button>
        </div>
      </div >
    );
  }
}

export default Game;
