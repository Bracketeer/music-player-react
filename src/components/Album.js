import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { MapAlbum } from '../mappers';
export default function Album(props) {
    const [state, setState] = useState({menu: false});
    const styles = {
        album: {
            height: 'auto',
            boxShadow: '3px 0px 30px rgba(0,0,0,.2)',
            boxSizing: 'border-box',
            position: 'relative'
        },
        image: {
            height: 'auto',
            width: '100%',
        },
        info: {
            padding: '10px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between'
        },
        link: {
            textDecoration: 'none',
            color: 'teal',
            fontSize: '12px'

        },
        menuButton: {
            position: 'absolute',
            top: '10px',
            right: '0px',
            transform: 'rotateZ(90deg)',
            color: '#ffffff',
            height: '10px',
            width: '30px',
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingBottom: '20px',
            textShadow: '0px 0px 5px rgba(0,0,0,.5)',
            cursor: 'pointer'
        },
        menu: {
            position: 'absolute',
            top: '40px',
            right: '0px',
            background: '#ffffff',
            boxSizing: 'border-box',
            padding: '10px',
            boxShadow: '0px 0px 5px rgba(0,0,0,.5)',
            cursor: 'pointer',
            fontSize: '14px',
        },
        playButton: {
            container: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                background: 'rgba(255,255,255,.9)',
                position: 'absolute',
                bottom: '46px',
                right: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 0px 10px rgba(0,0,0,.2)',
            },
            button: {
                width: 0,
                height: 0,
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderLeft: '10px solid teal',
                marginLeft: '3px',
            }
        }
    }
    // const mapTrackList = () => {
    //     return props.album.tracks.map(track => {
    //         return {
    //             album: props.album.album,
    //             album_number: props.album.album_number,
    //             artist: props.album.artist,
    //             cover: props.album.cover,
    //             thumbnail: props.album.thumbnail,
    //             genre: props.album.genre,
    //             id: track.id,
    //             number: track.track_number,
    //             title: track.title,
    //             url: track.url
    //         }
            
    //     })
    // }
    function showMenu() {
        setState({menu: !state.menu})
    }
    function albumMenu() {
        if (state.menu) {
            return (
                <div style={styles.menu}>
                    <div onClick={(event) => { props.addToQueue(event, MapAlbum(props.album)); setState({menu: false})}}>Add to Queue</div>
                    <div onClick={(event) => { props.playNext(event, MapAlbum(props.album)); setState({ menu: false })}}>Play Next</div>
                </div>
            )
        }
    }
    return (
        <div style={styles.album}>
            <div style={styles.menuButton} onClick={() => showMenu()}>…</div>
            {albumMenu()}
            <div onClick={(event) => props.selectAlbum(event, MapAlbum(props.album))} style={styles.playButton.container}>
                <div style={styles.playButton.button}></div>
            </div>
            <Link to={`/album/${props.album.album}`}>
                <img style={styles.image} src={props.album.thumbnail} alt={props.album.artist} />
            </Link>
            <div style={styles.info}>
                <Link to={`/album/${props.album.album}`} state={props.album} style={styles.link}>{props.album.artist}</Link>
                <Link to={`/album/${props.album.album}`} state={props.album} style={styles.link}>{props.album.album}</Link>
            </div>
        </div>
    )
}

