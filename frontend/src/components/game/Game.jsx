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

    this.state = {
      showPlayButton: "",
      showSingOrPasteButtons: "hidden",
      showTextArea: "hidden",
      showScore: "hidden",
      lyric: "",
      computerPoints: 0,
      userPoints: 0,
      showAnswer: "hidden",
      lyricResponce: {}
    };
  }

  mouseEnter() {
    TweenLite.to(this.circleButton, 0.5, { scale: 1.2 });
  }

  onPlayClick() {
    this.setState({
      showPlayButton: "hidden",
      showSingOrPasteButtons: "",
      showScore: ""
    });
    console.log(this.state);
  }

  onPasteTextClick() {
    this.setState({
      showSingOrPasteButtons: "hidden",
      showTextArea: "",
      showScore: "",
      computerPoints: 0,
      userPoints: 0
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
      showAnswer: ""
    });
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

  render() {
    return (
      <div className="playButton">
        <div className={this.state.showScore}>
          <Score
            first={this.state.userPoints}
            second={this.state.computerPoints}
          />
        </div>
        <div className={"textRed answer " + this.state.showAnswer}>
          <div>
            <p>
              You have wished a song:{" "}
              {this.state.lyricResponce?.song_name || ""}
            </p>
          </div>
          {/* <iframe
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          src={`https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=000000&layout=&size=medium&type=tracks&id=${this.state.lyricResponce.}`}
          width="700"
          height="150"
          ></iframe>  */}
          <div>
            <p>Am I corect?</p>
            <button>YES</button>
            <button>NO</button>
          </div>
        </div>

        <div className={"singOrPaste " + this.state.showSingOrPasteButtons}>
          <button>Sing song</button>
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
          <p className="textRed">Paste text of the song</p>
          <textarea
            value={this.state.value}
            onChange={this.onLyricChange}
          ></textarea>
          <button onClick={this.onGuessByTextClick}>Go</button>
        </div>
      </div>
    );
  }
}

export default Game;

{
  /* <iframe
scrolling="no"
frameborder="0"
allowTransparency="true"
src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=000000&layout=&size=medium&type=tracks&id=655095912"
width="700"
height="150"
></iframe> */
}
