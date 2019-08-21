import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlbumOverview from './views/AlbumOverview';
import AlbumSingle from './views/AlbumSingle';
import './App.css';
import MusicControls from './components/MusicContols';
import AlbumList from './data/albums.json';
import SongOverview from './views/SongOverview';
import { StyleSheet, css } from 'aphrodite';

export default class App extends React.Component {
  getInitialState = () => {
    return {
      queue: [],
      playlist: [],
      viewDisplay: 'song-overview',
      currentTrack: 0,
    };
  };
  styles = StyleSheet.create({
    viewOptions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '10px',
      position: 'fixed',
      top: '0',
      height: '55.5px',
      right: 0,
      zIndex: 10,
    },
    viewOptionIcon: {
      color: 'rgba(255,255,255,.5)',
      cursor: 'pointer'
    },
    viewOptionIconActive: {
      color: '#fff'
    },
    flipIconHorizontal: {
      transform: 'rotateZ(180deg)'
    }
  })
  state = this.getInitialState();
  selectAlbum(event, album) {
    this.setState({ queue: [...album]})
  }
  playNext(event, album) {
    this.setState({ queue: [...album, ...this.state.queue]})
  }
  addToQueue(event, album) {
    this.setState({ queue: [...this.state.queue, ...album]})
  }
  MusicControlsView() {
    if (this.state.queue.length > 0) {
      return (
        <div className="music-controls">
        <MusicControls playlist={this.state.queue} />
        </div>
      )
    } else {
      return null
    }
  }
  PlayListSidebar() {
    if (this.state.queue.length > 0) {
      const playlist = this.state.queue.map((track, i) => {
        return (
          <li key={i + track.title}>
            <img src={track.thumbnail} alt={track.title} />
            <div className="track-info">
              <div className="track-info __artist">
                {track.artist}
              </div>
              <div className="track-info __title">
                {track.title}
              </div>
            </div>
          </li>  
        )
      })
      return (
        <ul>{playlist}</ul>
      )
    }
  }
  DisplayView(view) {
    if (view === 'album-overview') {
      return (
        <Route
          exact path='/'
          render={props =>
            <AlbumOverview
              {...props}
              albums={AlbumList}
              playNext={(event, album) => this.playNext(event, album)}
              addToQueue={(event, album) => this.addToQueue(event, album)}
              selectAlbum={(event, album) => this.selectAlbum(event, album)}
            />}
        />
      )
    } else 
      if (view === 'song-overview') {
        return (
          <Route
            exact
            path='/'
            render={props =>
              <SongOverview
                {...props}
                albums={AlbumList}
                playNext={(event, album) => this.playNext(event, album)}
                addToQueue={(event, album) => this.addToQueue(event, album)}
                selectAlbum={(event, album) => this.selectAlbum(event, album)}
              />}
            />
          )
      }
  }
  AlbumSingleView() {
    return (
      <Route
        path='/album/:number'
        render={props =>
          <AlbumSingle {...props}
            albums={AlbumList}
            playNext={(event, track) => this.playNext(event, track)}
          />}
      />
    )
  }
  OptionsView() {
    return (
      <div className={css(this.styles.viewOptions)}>
        <i
          className={
            this.state.viewDisplay === 'song-overview' ?
              css(this.styles.viewOptionIcon, this.styles.flipIconHorizontal, this.styles.viewOptionIconActive) + ' material-icons' :
              css(this.styles.viewOptionIcon, this.styles.flipIconHorizontal) + ' material-icons'
          }
          onClick={event => this.setState({ viewDisplay: 'song-overview' })}>
          vertical_split
            </i>
        <i
          className={
            this.state.viewDisplay === 'album-overview' ?
              css(this.styles.viewOptionIcon, this.styles.viewOptionIconActive) + ' material-icons' :
              css(this.styles.viewOptionIcon) + ' material-icons'
          }
          onClick={event => this.setState({ viewDisplay: 'album-overview' })}>
          view_module
            </i>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <Navigation/>
        <aside>
          <div className="playlist-header">Queue</div>
          {this.PlayListSidebar()}
        </aside>
        <main>
          {this.OptionsView()}
          <Router>
            {this.DisplayView(this.state.viewDisplay)}
            {this.AlbumSingleView()}
          </Router>
        </main>
        {this.MusicControlsView()}
      </div>
    );
  }
}

