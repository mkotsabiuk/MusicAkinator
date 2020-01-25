import React, { Component } from "react";
import axios from "axios";
import { TimelineMax, TweenLite, Power0 } from "gsap";
import Score from "./Score";
import playButtonConture from "./playButtonConture.svg";
import "./Game.css";

const baseUrl = "http://localhost:8000/";

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
    this.onCorrectAnswerClick = this.onCorrectAnswerClick.bind(this);
    this.onIncorrectAnswerClick = this.onIncorrectAnswerClick.bind(this);

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
    console.log(this.state);
  }

  onPasteTextClick() {
    this.setState({
      showSingOrPasteButtons: "hidden",
      showTextArea: ""
    });
  }

  async onGuessByTextClick() {
    console.log(this.state.lyric);
    const song = await axios
      .post(`${baseUrl}recognizer/recognizeByLyrics`, {
        lyric: this.state.lyric
      })
      .catch(error => {
        console.log(error);
      });
    console.log(song);

    this.setState({
      lyricResponce: song.data,
      textarea: "hide",
      showAnswer: "",
      showTextArea: "hidden",
      lyric: ""
    });
    this.tracks.push(this.state.lyricResponce.track_id);
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

  onIncorrectAnswerClick() {
    console.log(this.state.attempt);
    if (this.state.attempt === this.numberOfAttempt) {
      this.setState({
        attempt: 0,
        userPoints: this.state.userPoints + 1,
        showPlayButton: "",
        showAnswer: "hidden",
        textareaMessage: `Paste text of the song! This is my 1 attempt out of ${this.numberOfAttempt}.`,
        showTextArea: "hidden",
        showListOfSongs: ""
      });

      return;
    }

    this.setState({
      attempt: this.state.attempt + 1,
      showAnswer: "hidden",
      textareaMessage: `Let's try again! This is my ${this.state.attempt +
        1} attempt out of ${this.numberOfAttempt}.`,
      showTextArea: "",
      showAnswer: "hidden",
      showListOfSongs: "hidden"
    });
  }

  onCorrectAnswerClick() {
    this.setState({
      attempt: 0,
      computerPoints: this.state.computerPoints + 1,
      showPlayButton: "",
      showAnswer: "hidden",
      showListOfSongs: "",
      textareaMessage: `Paste text of the song! This is my ${this.state.attempt} attempt out of ${this.numberOfAttempt}.`
    });
  }

  render() {
    return (
      <div className="playButton">
        <Score
          first={this.state.userPoints}
          second={this.state.computerPoints}
        />
        <div className={"listOfSongs " + this.state.showListOfSongs}>
          {this.tracks.map(function(item) {
            return (
              <iframe
                scrolling="no"
                frameborder="0"
                allowTransparency="true"
                src={`https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=000000&layout=&size=medium&type=tracks&id=${item}`}
                width="700"
                height="150"
              ></iframe>
            );
          })}
        </div>
        <div className={"textRed answer " + this.state.showAnswer}>
          <div>
            <p>
              You have wished a song:{" "}
              {this.state.lyricResponce?.song_name || ""}
            </p>
          </div>
          <iframe
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            src={`https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=000000&layout=&size=medium&type=tracks&id=${this.state.lyricResponce.track_id}`}
            width="700"
            height="150"
          ></iframe>
          <div>
            <p>Am I corect?</p>
            <button onClick={this.onCorrectAnswerClick}>YES</button>
            <button onClick={this.onIncorrectAnswerClick}>NO</button>
          </div>
        </div>

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
          <div class="pForTextArea">
            <p className="textRed">{this.state.textareaMessage}</p>
            <textarea
              value={this.state.lyric}
              onChange={this.onLyricChange}
            ></textarea>
          </div>
          <button className="textRed" onClick={this.onGuessByTextClick}>
            Go
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
