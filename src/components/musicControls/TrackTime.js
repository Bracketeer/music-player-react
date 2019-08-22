import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class TrackTime extends React.Component{
    constructor(props) {
        super(props);
        this.Player = props.Player;
    }
    formatTrackTime(time) {
        if (time) {
            let minutes = Math.floor(time / 60)
            let seconds = Math.floor(time) - (minutes * 60)
            seconds = '0' + seconds;
            return `${minutes}:${seconds.slice(-2)}`
        } else {
            return `0:00`
        }
    }
    render() {
        if (this.Player.current) {
            return (
                <p>{this.formatTrackTime(this.props.currentTime)}/{this.formatTrackTime(this.props.duration)}</p>
            )
        } else {
            return (
                <p>0:00/0:00</p>
            )
        }
    }
}