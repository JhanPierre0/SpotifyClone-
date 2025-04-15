import React, { useState, useEffect, useContext } from "react";
import { deezerService } from "../services/deezerService";
import { PlayerContext } from "../context/PlayerContext";
import { PlaylistContext } from "../context/PlaylistContext";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ tracks: [], artists: [] });
    const [isLoading, setIsLoading] = useState(false);
    const { playWithId } = useContext(PlayerContext);
    const { playlists, addSongToPlaylist } = useContext(PlaylistContext);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                try {
                    const searchResults = await deezerService.search(query);
                    setResults(searchResults);
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults({ tracks: [], artists: [] });
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [query]);

    const handleAddToPlaylist = (track) => {
        if (!selectedPlaylist) return;
        
        const song = {
            id: track.id,
            name: track.title,
            desc: track.artist.name,
            image: track.album.cover_medium,
            preview: track.preview
        };
        addSongToPlaylist(selectedPlaylist, song);
    };

    return (
        <div className="w-full p-4">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for artists or songs..."
                    className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {isLoading && (
                <div className="mt-4 text-center text-gray-400">Loading...</div>
            )}

            {!isLoading && (results.tracks.length > 0 || results.artists.length > 0) && (
                <div className="mt-4 space-y-6">
                    {results.tracks.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Songs</h2>
                            <div className="space-y-2">
                                {results.tracks.map((track) => (
                                    <div
                                        key={track.id}
                                        className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                                    >
                                        <img
                                            src={track.album.cover_small}
                                            alt={track.title}
                                            className="w-12 h-12 rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{track.title}</p>
                                            <p className="text-sm text-gray-400">{track.artist.name}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => playWithId(track.id)}
                                                className="px-3 py-1 bg-green-500 text-black rounded-full text-sm"
                                            >
                                                Play
                                            </button>
                                            {playlists.length > 0 && (
                                                <select
                                                    value={selectedPlaylist || ""}
                                                    onChange={(e) => setSelectedPlaylist(parseInt(e.target.value))}
                                                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                                                >
                                                    <option value="">Add to playlist</option>
                                                    {playlists.map(playlist => (
                                                        <option key={playlist.id} value={playlist.id}>
                                                            {playlist.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            {selectedPlaylist && (
                                                <button
                                                    onClick={() => handleAddToPlaylist(track)}
                                                    className="px-3 py-1 bg-green-500 text-black rounded-full text-sm"
                                                >
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.artists.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Artists</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {results.artists.map((artist) => (
                                    <div
                                        key={artist.id}
                                        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                    >
                                        <img
                                            src={artist.picture_medium}
                                            alt={artist.name}
                                            className="w-full aspect-square object-cover rounded-full mb-2"
                                        />
                                        <h3 className="font-semibold text-center">{artist.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!isLoading && query.trim() !== '' && results.tracks.length === 0 && results.artists.length === 0 && (
                <div className="mt-4 text-center text-gray-400">No results found</div>
            )}
        </div>
    );
};

export default Search; 