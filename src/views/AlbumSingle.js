import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import AlbumList from '../data/albums.json';
import { MapTrack } from '../mappers';

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
// const mapTrack = (album, track) => {
//     return {
//         album: album.album,
//         album_number: album.album_number,
//         artist: album.artist,
//         cover: album.cover,
//         thumbnail: album.thumbnail,
//         genre: album.genre,
//         id: track.id,
//         number: track.track_number,
//         title: track.title,
//         url: track.url
//     }
// }
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
            <li className={css(styles.track)} key={track.title} onClick={(event) => props.playNext(event, [MapTrack(album, track)])}> {track.track_number}. {track.title}</li>
        )
    })
}
        
export default AlbumSingle;