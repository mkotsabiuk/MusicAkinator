import React, { Component } from "react";
import TweenMax from "gsap";
import musicKey from "./musicKey.svg";

class MusicKey extends Component {
  constructor(props) {
    super(props);
    this.musicKey = null;
  }

  componentDidMount() {
    TweenMax.fromTo(this.musicKey, 3, this.props.from, {
      ...this.props.to,
      opacity: 0,
      repeat: -1
    });
  }

  render() {
    return (
      <div className="musicAnimation1" ref={div => (this.musicKey = div)}>
        <img src={musicKey} alt="Music key image"></img>
      </div>
    );
  }
}
export default MusicKey;
