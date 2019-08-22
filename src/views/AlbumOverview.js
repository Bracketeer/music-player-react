import React from 'react';
import Album from '../components/Album';
function AlbumOverview(props) {
    const styles = {
        albumContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridGap: '10px 10px'
        }
    }
    const albums = props.albums.map(album => {
        return (
            <Album
                key={album.album}
                playNext={props.playNext}
                addToQueue={props.addToQueue}
                selectAlbum={props.selectAlbum}
                album={album}>
            </Album>
        )
    });
    return (
        <div style={styles.albumContainer}>
            {albums}
        </div>
    )
}

export default AlbumOverview;