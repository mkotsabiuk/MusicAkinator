import React, { Component } from "react";
import { TimelineMax, TweenLite, Power0 } from "gsap";
import playButton from "./playButton.svg";
import "./Game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.circleButton = null;
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
    // const col = new TimelineMax({});
    // col.to(this.circleButton, 4.7, {
    //   rotation: 360,
    //   transformOrigin: "50% 50%",
    //   ease: Power0.easeNone,
    //   repeat: -1
    // });
  }

  render() {
    return (
      <div className="playButton">
        <div
          className="conteinerbodywithanim"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={this.onClick}
        >
          <img
            src={playButton}
            ref={div => (this.circleButton = div)}
            alt="Play button"
          ></img>
        </div>
      </div>
    );
  }
}

export default Game;
