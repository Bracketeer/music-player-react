import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class MusicControls extends React.Component {
    constructor(props) {
        super(props);
        this.Player = React.createRef();
        this.state = {
            paused: false,
            currentTrack: 0,
            volume: 1,
            muted: false,
        }
    }
    playerPlayPause() {
        if (this.Player.current) {
            this.Player.current.paused ? this.Player.current.play() : this.Player.current.pause();
            this.setState({paused: this.Player.current.paused});
            return this.Player.current.paused;
        }
    }
    playPauseButton() {
        if (this.state.paused) {
            return (<i className="material-icons">play_arrow</i>)
        } else {
            return (<i className="material-icons">pause</i>)
        }
    }
    setPreviousTrack() {
        if (this.state.currentTrack > 0) {
            const currentTrack = this.state.currentTrack - 1
            this.setState({ currentTrack: currentTrack })
        }
    }
    setNextTrack() {
        if (this.state.currentTrack < this.props.playlist.length - 1) {
            const currentTrack = this.state.currentTrack + 1
            this.setState({ currentTrack: currentTrack })
        }
    }
    setVolume(value) {
        console.log(value);
        this.setState({volume: value})
        this.Player.current.volume = value;
    }
    toggleVolumeMute() {
        this.Player.current.muted = !this.Player.current.muted;
        this.setState({ muted: this.Player.current.muted})
    }
    render(){
        return (
            <div className={css(this.styles.bar)}>
                <div className={css(this.styles.trackInfoContainer)}>
                    <img className={css(this.styles.image)} src={this.props.playlist[this.state.currentTrack].thumbnail} alt={this.props.playlist[this.state.currentTrack].title} />
                    <div className={css(this.styles.trackInfo)}>
                        <div className={css(this.styles.artist)}>
                            {this.props.playlist[this.state.currentTrack].artist}
                    </div> 
                        <div className={css(this.styles.title)}>
                            {this.props.playlist[this.state.currentTrack].title}
                    </div>
                    </div>
                </div>
                <div className={css(this.styles.player)}>
                    <audio className={css(this.styles.player)} src={this.props.playlist[this.state.currentTrack].url} autoPlay ref={this.Player} />
                    <div className={css(this.styles.skipArrows)}>
                        <i className="material-icons">repeat</i>
                    </div>
                    <div className={css(this.styles.skipArrows)} onClick={() => this.setPreviousTrack()}>
                        <i className="material-icons">skip_previous</i>
                    </div>
                    <div className={css(this.styles.playerControls)} onClick={() => this.playerPlayPause()}>
                        <div className={css(this.styles.button)}>
                            {this.playPauseButton()}
                        </div>
                    </div>
                    <div className={css(this.styles.skipArrows)} onClick={() => this.setNextTrack()}>
                        <i className="material-icons">skip_next</i>
                    </div>
                    <div className={css(this.styles.skipArrows)}>
                        <i className="material-icons">shuffle</i>
                    </div>
                </div>
                <div className={css(this.styles.playerControlsRight)}>
                    <i className={css(this.styles.skipArrows) + ' material-icons'} onClick={() => this.toggleVolumeMute()}>{this.state.muted ? 'volume_off' : this.state.volume > .5 ? 'volume_up' : Number(this.state.volume) === 0 ? 'volume_mute' : 'volume_down'}</i>
                    <input className="volume-slider" type="range" min="0" max="1" step=".01" onChange={(event) => this.setVolume(event.target.value)}/>
                </div>
        </div>
        )
    }
    styles = StyleSheet.create({
        bar: {
            position: 'fixed',
            height: '55px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#ffffff',
            boxShadow: '3px 0px 30px rgba(0,0,0,.2)',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 10
        },
        image: {
            height: '100%'
        },
        trackInfoContainer: {
            display: 'flex',
            width: '100%'
        },
        trackInfo: {
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
            boxSizing: 'border-box',
            justifyContent: 'center',
        },
        artist: {
            fontSize: '12px'
        },
        title: {
            fontSize: '14px'
        },
        player: {
            background: 'transparent',
            display: 'flex',
        },
        playerControlsRight: {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            marginRight: '10px'
        },
        playerControls: {
            display: 'flex',
            width: '40px',
            height: '40px',
            flex: '0 0 40px',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            borderRadius: '50%',
            border: '1px solid #ccc',
            position: 'relative',
            cursor: 'pointer',
        },
        button: {
            fontSize: '25px',
            margin: 'auto',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'teal',
            boxSizing: 'border-box'
        },
        skipArrows: {
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
    })
}

export default MusicControls;