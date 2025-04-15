import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { assets } from "../assets/assets";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex gap-8">
                <div>
                    <button className="w-8 h-8 bg-neutral-700 rounded-full mr-2 hover:bg-neutral-500 cursor-pointer font-semibold text-white" onClick={() => navigate(-1)}>{'<'} </button>
                    <button className="w-8 h-8 bg-neutral-700 rounded-full hover:bg-neutral-500 cursor-pointer font-semibold text-white" onClick={() => navigate(1)}>{'>'}</button>
                </div>
            </div>
            <Link to="/main/mbPlaylist" className="flex items-center gap-4">
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 lg:hidden">
                    View playlists
                </button>
            </Link>
        </div>
    );
};

export default Navbar;