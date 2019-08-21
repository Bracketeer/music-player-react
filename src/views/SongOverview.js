import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MapTrack, MapAlbum } from '../mappers';
export default class SongOverview extends React.Component {
    constructor(props) {
        super(props);
        this.albums = props.albums;
    }
    styles = StyleSheet.create({
        albumContainer: {
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '20px',
        },
        containerBackground: {
            filter: 'blur(50px)',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundSize: 'cover',
            zIndex: 0,
            width: '150px',
            height: '200px'
        },
        albumImageContainer: {
            width: '200px',
            position: 'relative',
            zIndex: 2,
        },
        albumImage: {
            width: '100%',
            margin: '10px',
            boxSizing: 'border-box',
        },
        trackContainer: {
            paddingLeft: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2,
        },
        trackName: {
            background: 'rgba(0,0,0,.05)',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ':nth-child(odd)': {
                background: 'rgba(0,0,0,.08)',
            }
        },
        moreButton: {
            color: 'gray',
            cursor: 'pointer',
        },
        artist: {
            margin: 0,
            fontWeight: 300,
            fontSize: '20px',
            paddingTop: '10px'
        },
        albumName: {
            margin: 0,
            fontWeight: 300,
            fontSize: '16px',
            paddingBottom: '10px',
        }
    });
    TrackList(album, tracks) {
        return tracks.map((track, i)=> {
            return (
                <div key={track.title + i} className={css(this.styles.trackName)}>
                    <span>{track.track_number}. {track.title}</span>
                    <div>
                    
                    <i className={css(this.styles.moreButton) + ' material-icons'} onClick={event => this.props.playNext(event, [MapTrack(album, track)])}>add</i>
                    <i className={css(this.styles.moreButton) + ' material-icons'}>more_vert</i>
                    </div>
                </div>
            )
        })
    }
    AlbumList(albums) {
        return albums.map(album => {
            return (
                <div key={album.artist} className={css(this.styles.albumContainer)}>
                    <div className={css(this.styles.albumImageContainer)}>
                        <img className={css(this.styles.albumImage)} src={album.thumbnail} alt={album.album} />
                    </div>
                    <div className={css(this.styles.trackContainer)}>
                        <h1 className={css(this.styles.artist)}>{album.artist} </h1>
                        <h2 className={css(this.styles.albumName)}>{album.album}</h2>
                        {this.TrackList(album, album.tracks)}
                    </div>
                    <div style={{backgroundImage: `url(${album.thumbnail})`}} className={css(this.styles.containerBackground)}></div>
                </div>
            )
        })
    }
    render() {
        return (
            this.AlbumList(this.albums)
        )
    }
}