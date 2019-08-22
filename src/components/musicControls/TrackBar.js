import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class TrackBar extends React.Component {
    constructor(props) {
        super(props)
        this.Player = props.Player;
    }
    setTrackPosition(event) {
        const percent = ((event.clientX + 12) / window.innerWidth)
        this.Player.current.currentTime = this.Player.current.duration * percent
    }
    render() {
        return (
            <div onClick={event => this.setTrackPosition(event)} className={css(this.styles.trackProgressBar)}>
                <div onClick={event => this.setTrackPosition(event)} style={{ 'width': this.props.progress + '%' }} className={css(this.styles.trackProgress)}>
                    <div className={css(this.styles.trackProgressNode)}></div>
                </div>
            </div>
        )
    }
    styles = StyleSheet.create({
        trackProgressBar: {
            position: 'absolute',
            top: '-3px',
            left: 0,
            right: 0,
            height: '3px',
            background: 'lightgray',
            zIndex: '10',
            cursor: 'pointer',
        },
        trackProgress: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '3px',
            background: 'teal',
            zIndex: '10',
            cursor: 'pointer',
        },
        trackProgressNode: {
            position: 'absolute',
            top: '-4px',
            right: 0,
            height: '10px',
            width: '10px',
            background: '#fff',
            zIndex: '10',
            borderRadius: '50%',
            boxShadow: '0px 0px 10px teal',
            cursor: 'pointer',
        }
    })
}