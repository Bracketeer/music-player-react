import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import AlbumList from '../data/albums.json';
import { MapTrack } from '../mappers';

function AlbumSingle(props) {
    const match = props.match;
    let album = AlbumList.filter(album => album.album === match.params.number);
    if (album.length > 0) album = album[0];
    return (
        <div className={css(styles.container)}>
            <img className={css(styles.albumArt)} src={album.cover} alt={album.album} />
            <div className={css(styles.albumInfo)}>
                <h1 className={css(styles.title)}>{album.artist}</h1>
                <ul className={css(styles.ul)}>
                    {AlbumTracks(album, props)}
                </ul>
            </div>
        </div>
    )
}

function AlbumTracks(album, props) {
    return album.tracks.map((track, i) => {
        return (
            <li
                className={css(styles.track)}
                key={track.title}
                onClick={(event) => props.playNext(event, [MapTrack(album, track)])}>
                {track.track_number}. {track.title}
            </li>
        )
    })
}
       
const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    albumArt: {
        width: '400px',
        margin: '20px',
        boxSizing: 'border-box'
    },
    albumInfo: {
        boxSizing: 'border-box',
        width: '100%',
    },
    title: {
        fontWeight: 300,
        textTransform: 'uppercase',
    },
    ul: {
        padding: 0,
        margin: 0
    },
    track: {
        listStyle: 'none',
        padding: '10px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        ':nth-child(odd)': {
            background: 'rgba(0, 0, 0, .04)',
        }
    },
})

export default AlbumSingle;