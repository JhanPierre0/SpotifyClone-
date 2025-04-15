import Player from "../Components/player";
import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets.js'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import { PlayerContext } from '../context/PlayerContext';
import Navbar from "../Components/nav-var.jsx";
import Search from "../Components/Search.jsx";

const MbPlaylist = () => {

    const navigate = useNavigate();
    const { playlists, createPlaylist, deletePlaylist } = useContext(PlaylistContext);
    const { playWithId } = useContext(PlayerContext);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName);
            setNewPlaylistName('');
            setShowCreatePlaylist(false);
        }
    };

    const handlePlaylistClick = (playlist) => {
        navigate(`/main/playlist/${playlist.id}`);
    };


    return(
        <>
        <div className="bg-[#121212]">
        <Search/>
        <Navbar/>
        </div>
    <div className='bg-[#121212] w-full h-screen p-2 flex-col gap-2 text-white lg:flex sm:flex'>
            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='semi-bold'>Your library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img 
                            className='w-5 cursor-pointer' 
                            src={assets.plus_icon} 
                            alt="" 
                            onClick={() => setShowCreatePlaylist(true)}
                        />
                    </div>
                </div>

                {showCreatePlaylist && (
                    <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                        <h1>Create new playlist</h1>
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Enter playlist name"
                            className="w-full p-2 mt-2 bg-[#121212] text-white rounded"
                        />
                        <button 
                            onClick={handleCreatePlaylist}
                            className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-300'
                        >
                            Create
                        </button>
                    </div>
                )}

                {playlists.length > 0 ? (
                    <div className='p-4'>
                        {playlists.map(playlist => (
                            <div 
                                key={playlist.id} 
                                className='flex items-center justify-between p-2 hover:bg-[#242424] rounded cursor-pointer'
                                onClick={() => handlePlaylistClick(playlist)}
                            >
                                <div className='flex items-center gap-2'>
                                    <img className='w-8 h-8 rounded' src={assets.stack_icon} alt="" />
                                    <div>
                                        <p className='font-semibold'>{playlist.name}</p>
                                        <p className='text-sm text-gray-400'>{playlist.songs.length} songs</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePlaylist(playlist.id);
                                    }}
                                    className='text-gray-400 hover:text-white'
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                        <h1>Create your first playlist</h1>
                        <p className='font-light'>It's easy we will help you</p>
                        <button 
                            onClick={() => setShowCreatePlaylist(true)}
                            className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-300'
                        >
                            Create Playlist
                        </button>
                    </div>
                )}
            </div>
        </div>
        <Player></Player>
        </>
    )
}

export default MbPlaylist