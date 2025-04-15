import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import { PlayerContext } from '../context/PlayerContext';
import { deezerService } from '../services/deezerService';
import Navbar from './nav-var';

const DisplayPlaylist = () => {
    const { id } = useParams();
    const { playlists, addSongToPlaylist, removeSongFromPlaylist } = useContext(PlaylistContext);
    const { playWithId } = useContext(PlayerContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const playlist = playlists.find(p => p.id === parseInt(id));

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            const results = await deezerService.search(searchQuery);
            setSearchResults(results.tracks);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddSong = async (track) => {
        const song = {
            id: track.id,
            name: track.title,
            desc: track.artist.name,
            image: track.album.cover_medium,
            preview: track.preview
        };
        addSongToPlaylist(parseInt(id), song);
    };

    const handlePlaySong = async (song) => {
        await playWithId(song.id, {
            name: song.name,
            desc: song.desc,
            image: song.image,
            preview: song.preview
        });
    };

    if (!playlist) {
        return <div className="text-white p-4">Playlist not found</div>;
    }

    return (
        <div className="text-white p-4">
            <Navbar />
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
                <p className="text-gray-400">{playlist.songs.length} songs {playlist.songs.length * 30} S Duration</p>
            </div>
            <div className="mb-8">

                {isSearching && (
                    <div className="text-center text-gray-400">Searching...</div>
                )}

                {searchResults.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Search Results</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {searchResults.map((track) => (
                                <div
                                    key={track.id}
                                    className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors"
                                >
                                    <img
                                        src={track.album.cover_medium}
                                        alt={track.title}
                                        className="w-full aspect-square object-cover rounded mb-2"
                                    />
                                    <h3 className="font-semibold truncate">{track.title}</h3>
                                    <p className="text-gray-400 text-sm truncate">
                                        {track.artist.name}
                                    </p>
                                    <button
                                        onClick={() => handleAddSong(track)}
                                        className="mt-2 px-3 py-1 bg-green-500 text-black rounded-full text-sm"
                                    >
                                        Add to Playlist
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Playlist Songs</h2>
                {playlist.songs.length > 0 ? (
                    <div className="space-y-2">
                        {playlist.songs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center gap-4 p-2 hover:bg-[#282828] rounded-lg cursor-pointer"
                                onClick={() => handlePlaySong(song)}
                            >
                                <img
                                    src={song.image}
                                    alt={song.name}
                                    className="w-12 h-12 rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{song.name}</p>
                                    <p className="text-sm text-gray-400">{song.desc}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSongFromPlaylist(parseInt(id), song.id);
                                    }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No songs in this playlist yet</p>
                )}
            </div>
        </div>
    );
};

export default DisplayPlaylist; 