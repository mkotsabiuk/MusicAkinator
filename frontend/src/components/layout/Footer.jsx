import React, { Component } from "react";
import MusicKey from "./MusicKey";
import "./Footer.css";
import blackBuildings from "./Buildings__Black.png";
import whiteBuildings from "./Buildings__White.png";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.myElement = null;
  }
  render() {
    return (
      <div className="thirdSection">
        <div className="buttomSector">
          <div className="imgBack">
            <img src={blackBuildings}></img>
          </div>
          <div className="imgFront">
            <img src={whiteBuildings}></img>
          </div>
          <div className="musicAnimationContainer">
            <MusicKey
              from={{ rotation: -15, x: -10 }}
              to={{
                rotation: 20,
                y: -150,
                x: -25,
                delay: 0.5,
                repeatDelay: 0.5
              }}
            />
            <MusicKey
              from={{ rotation: 20, x: -10 }}
              to={{
                rotation: -30,
                y: -160,
                x: 50,
                delay: 0.2,
                repeatDelay: 0.8
              }}
            />
            <MusicKey
              from={{ rotation: -20, x: -10 }}
              to={{ rotation: 30, y: -200, x: 20, delay: 0.5, repeatDelay: 1 }}
            />
            <MusicKey
              from={{ rotation: -20, x: 10 }}
              to={{
                rotation: 30,
                y: -140,
                x: 20,
                delay: 0.4,
                repeatDelay: 0.4
              }}
            />
            <MusicKey
              from={{ rotation: -15, x: -10 }}
              to={{
                rotation: 20,
                y: -150,
                x: -25,
                delay: 0.5,
                repeatDelay: 0.6
              }}
            />
            <MusicKey
              from={{ rotation: 20, x: -10 }}
              to={{
                rotation: -30,
                y: -120,
                x: 50,
                delay: 0.7,
                repeatDelay: 0.7
              }}
            />
            <MusicKey
              from={{ rotation: -20, x: -10 }}
              to={{ rotation: 30, y: -130, x: 20, delay: 0.5, repeatDelay: 1 }}
            />
            <MusicKey
              from={{ rotation: -15, x: 10 }}
              to={{ rotation: 20, y: -140, x: -25, delay: 0.9, repeatDelay: 1 }}
            />
            <MusicKey
              from={{ rotation: 20, x: -10 }}
              to={{
                rotation: -30,
                y: -170,
                x: 50,
                delay: 0.5,
                repeatDelay: 0.9
              }}
            />
            <MusicKey
              from={{ rotation: -20, x: -10 }}
              to={{ rotation: 30, y: -180, x: 20, delay: 0.4, repeatDelay: 1 }}
            />
            <MusicKey
              from={{ rotation: -20, x: 10 }}
              to={{
                rotation: 30,
                y: -160,
                x: 20,
                delay: 0.5,
                repeatDelay: 0.4
              }}
            />
            <MusicKey
              from={{ rotation: -20, x: -10 }}
              to={{ rotation: 30, y: -180, x: 20, delay: 0.1, repeatDelay: 1 }}
            />
          </div>
          <div className="divForP">
            <p>By Four From Telegram</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
