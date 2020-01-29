import React, { Component } from "react";
import Track from '../track/Track'
import './Playlist.css'

class Playlist extends Component {
    render() {
        return (
            <div className={this.props.hidden}>
                <p className="title">Songs in this game:</p>
                {this.props.tracks.map(trackId => {
                    return <Track id={trackId} key={trackId} />
                })}
            </div>
        );
    }
}

export default Playlist;
