import React from 'react';
import { StyleSheet, css } from 'aphrodite';
export default class Volume extends React.Component{
    constructor(props) {
        super(props)
        this.Player = props.Player
    }
    setVolume(value) {
        this.props.setState({ volume: value })
        this.Player.current.volume = value;
    }
    toggleVolumeMute() {
        this.Player.current.muted = !this.Player.current.muted;
        this.props.setState({ muted: this.Player.current.muted })
    }
    setVolumeIcon() {
        return this.props.muted ? 'volume_off' :
            this.props.volume > .5 ? 'volume_up' :
                Number(this.props.volume) === 0 ? 'volume_mute' :
                    'volume_down'
    }
    render() {
        return (
            <div className={css(this.styles.playerControlsRight)}>
                <i
                    className={css(this.styles.icon) + ' material-icons'}
                    onClick={() => this.toggleVolumeMute()}>
                    {this.setVolumeIcon()}
                </i>
                <input
                    className="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step=".01"
                    onChange={(event) => this.setVolume(event.target.value)} />
            </div>
        )
    }
    styles = StyleSheet.create({
        icon: {
            fontSize: '25px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'teal',
            boxSizing: 'border-box',
            margin: 'auto 10px',
            cursor: 'pointer'
        },
        playerControlsRight: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10px'
        },
    })
}