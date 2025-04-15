import { createContext, useState } from 'react';

export const PlaylistContext = createContext();

const PlaylistContextProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now(),
            name,
            songs: []
        };
        setPlaylists([...playlists, newPlaylist]);
    };

    const addSongToPlaylist = (playlistId, song) => {
        setPlaylists(playlists.map(playlist => {
            if (playlist.id === playlistId) {
                // Check if song already exists in playlist
                if (!playlist.songs.some(s => s.id === song.id)) {
                    return {
                        ...playlist,
                        songs: [...playlist.songs, song]
                    };
                }
            }
            return playlist;
        }));
    };

    const removeSongFromPlaylist = (playlistId, songId) => {
        setPlaylists(playlists.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    songs: playlist.songs.filter(song => song.id !== songId)
                };
            }
            return playlist;
        }));
    };

    const deletePlaylist = (playlistId) => {
        setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    };

    return (
        <PlaylistContext.Provider value={{
            playlists,
            createPlaylist,
            addSongToPlaylist,
            removeSongFromPlaylist,
            deletePlaylist
        }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContextProvider; 