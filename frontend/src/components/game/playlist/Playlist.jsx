import React, { Component } from "react";
import Track from '../track/Track'

class Playlist extends Component {
    render() {
        return (
            <div className={this.props.hidden}>
                {this.props.tracks.map(trackId => {
                    return <Track id={trackId} key={trackId} />
                })}
            </div>
        );
    }
}

export default Playlist;
