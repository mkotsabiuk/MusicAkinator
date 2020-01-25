import React, { Component } from "react";
import { TimelineMax, TweenLite, Power0 } from "gsap";
import Score from "./Score";
import playButtonConture from "./playButtonConture.svg";
import "./Game.css";

const baseUrl = "https://localhost:800/";

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
      showSingOrPasteButtons: "hiden",
      showTextArea: "hiden",
      showScore: "",
      lyric: ""
    };
  }

  mouseEnter() {
    TweenLite.to(this.circleButton, 0.5, { scale: 1.2 });
  }

  onPlayClick() {
    this.setState({ showPlayButton: "hiden", showSingOrPasteButtons: "" });
    console.log(this.state);
  }

  onPasteTextClick() {
    this.setState({ showSingOrPasteButtons: "hiden", showTextArea: "" });
  }

  onGuessByTextClick() {
    console.log(this.state.lyric);
    // const song = await axios.post(
    //   `${baseUrl}recognizer/recognizeByLyric`,
    //   { lyric: this.state.lyric }
    // );

    this.setState({});
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
          <Score first={4} second={6} />
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
          <button className="textRed" onClick={this.onGuessByTextClick}>
            Go
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
