import React, { Component } from "react";
import './Track.css';

class Track extends Component {
  render() {
    return (
      <div className="frame-container">
        <iframe title="track" scrolling="no" frameborder="0" allowTransparency="true" src={`https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=ff0000&layout=&size=medium&type=tracks&id=${this.props.id}`} width="70%" height="90px"></iframe>
      </div>
    );
  }
}

export default Track;
