import React, { Component } from "react";
import { TimelineMax, TweenLite, Power0 } from "gsap";
import playButton from "./playButton.svg";
import playButtonConture from "./playButtonConture.svg";
import "./Game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.circleButton = null;
    this.circleButtonConture = null;
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  mouseEnter() {
    TweenLite.to(this.circleButton, 0.5, { scale: 1.2 });
  }

  onClick() {
    console.log("start game");
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

  render() {
    return (
      <div className="playButton">
        <div
          className="conteinerbodywithanim"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={this.onClick}
          ref={div => (this.circleButton = div)}
        >
          <div className="play">
            <p>play</p>
          </div>
          {/* <img className="play" src={playButton} alt="Play button"></img> */}
          <img
            className="playButtonConture"
            src={playButtonConture}
            alt="Play button"
            ref={img => (this.circleButtonConture = img)}
          ></img>
        </div>
      </div>
    );
  }
}

export default Game;
