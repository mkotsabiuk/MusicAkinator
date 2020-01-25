import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="container">
      <div className="firstSection">
        <div className="mText">
          <p className="gMusic">music akinator</p>
          <p className="teamPresent">by FFT team</p>
        </div>
        <div className="buttomLine"></div>
      </div>
      <div className="secondSection">
        <div className="text">
          <p>We bring you in the game</p>
          <p>you need to make a song, then choose one of the options: </p>
          <p>enter the lyrics of the song</p>
          <p>sing it or include it in someone’s performance</p>
          <p>program tries to guess your chosen song</p>
          <p>in order to start playing click play </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
