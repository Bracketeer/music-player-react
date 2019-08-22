import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Volume, Shuffle, TrackBar, TrackTime } from './musicControls';
class MusicControls extends React.Component {
    constructor(props) {
        super(props);
        this.Player = React.createRef();
        this.state = {
            paused: false,
            currentTrack: 0,
            volume: 1,
            muted: false,
            currentTime: 0,
            duration: 0,
            buffered: 0,
            progress: 0,
            shuffle: false,
            repeat: null,
        }
    }
    setTrackTimes() {
        this.setState({
            currentTime: this.Player.current.currentTime,
            duration: this.Player.current.duration,
            buffered: this.Player.current.buffered,
            progress: ((this.Player.current.currentTime / this.Player.current.duration) * 100)
        })
    }
    playerPlayPause() {
        if (this.Player.current) {
            this.Player.current.paused ? this.Player.current.play() : this.Player.current.pause();
            this.setState({paused: this.Player.current.paused});
            return this.Player.current.paused;
        }
    }
    setPreviousTrack() {
        if (this.state.currentTrack > 0) {
            const currentTrack = this.state.currentTrack - 1
            this.setState({ currentTrack: currentTrack })
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    setNextTrack() {
        if (this.state.repeat === 'one') {
            this.Player.current.currentTime = 0;
            this.Player.current.play();
        } else
        if (this.state.shuffle) {
            this.setState({ currentTrack: this.getRandomInt(this.props.playlist.length - 1)})
        } else
        if (this.state.currentTrack === this.props.playlist.length - 1) {
            this.setState({ currentTrack: 0 })            
        } else
        if (this.state.currentTrack < this.props.playlist.length - 1) {
            const currentTrack = this.state.currentTrack + 1
            this.setState({ currentTrack: currentTrack })
        }
    }
    setRepeatIcon() {
        return !this.repeat ? this.repeat = 'all' :
            this.repeat === 'all' ? this.repeat = 'one' :
                this.repeat === 'one' ? this.repeat = null : null
    }
    render(){
        return (
            <div className={css(this.styles.bar)}>
                <TrackBar
                    {...this.state}
                    {...this.props}
                    Player={this.Player}>
                </TrackBar>

                <div className={css(this.styles.trackInfoContainer)}>

                    <img
                        className={css(this.styles.image)}
                        src={this.props.playlist[this.state.currentTrack].thumbnail}
                        alt={this.props.playlist[this.state.currentTrack].title} />
                    
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

                    <audio
                        className={css(this.styles.player)}
                        src={this.props.playlist[this.state.currentTrack].url}
                        autoPlay
                        onTimeUpdate={_ => this.setTrackTimes()}
                        onEnded={_ => this.setNextTrack()}
                        ref={this.Player} />
                    
                    <div
                        onClick={ _ => this.setState({ repeat: this.setRepeatIcon() }) }
                        className={
                            css(this.styles.skipArrows,
                                this.styles.playOption,
                                this.state.repeat ? this.styles.activePlayOption : null
                            )}>
                        <i className="material-icons">
                            {this.repeat === 'all' || !this.repeat ? 'repeat' : 'repeat_one'}
                        </i>
                    </div>

                    <div
                        onClick={() => this.setPreviousTrack()}
                        className={css(this.styles.skipArrows)}>
                        <i className="material-icons">skip_previous</i>
                    </div>

                    <div
                        className={css(this.styles.playerControls)}
                        onClick={() => this.playerPlayPause()}>
                        <div className={css(this.styles.button)}>
                            <i className="material-icons">
                                {this.state.paused ? 'play_arrow' : 'pause'}
                            </i>
                        </div>
                    </div>

                    <div
                        className={css(this.styles.skipArrows)}
                        onClick={() => this.setNextTrack()}>
                        <i className="material-icons">skip_next</i>
                    </div>

                    <Shuffle
                        {...this.props}
                        {...this.state}
                        setState={(state) => this.setState(state)}>    
                    </Shuffle>

                </div>
                
                <div className={css(this.styles.playerControlsRight)}>
                    <TrackTime {...this.state} Player={this.Player} ></TrackTime>

                    <Volume
                        {...this.props}
                        {...this.state}
                        setState={(state) => this.setState(state)}
                        Player={this.Player}
                        onChange={(event, state) => this.setState(state)}
                        onClick={(event, state) => this.setState(state)}>    
                    </Volume>
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
        playOption: {
            color: 'lightgray'
        },
        activePlayOption: {
            color: 'teal'
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