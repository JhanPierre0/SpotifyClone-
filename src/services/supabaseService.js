import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const supabaseUrl = 'https://fxxguajoezejpzfgscvo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eGd1YWpvZXplanB6ZmdzY3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2Nzg0NDUsImV4cCI6MjA1ODI1NDQ0NX0.afKCTsuGb4BGwQbzhiDVQmHMm1DTorEiev7YpxWJwKE';

const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseService = {
    // Save playlist to database
    savePlaylist: async (userId, playlist) => {
        const { data, error } = await supabase
            .from('playlists')
            .insert([
                {
                    user_id: userId,
                    name: playlist.name,
                    tracks: playlist.tracks
                }
            ]);
        return { data, error };
    },

    // Get user's playlists
    getPlaylists: async (userId) => {
        const { data, error } = await supabase
            .from('playlists')
            .select('*')
            .eq('user_id', userId);
        return { data, error };
    },

    // Update playlist
    updatePlaylist: async (playlistId, playlist) => {
        const { data, error } = await supabase
            .from('playlists')
            .update({
                name: playlist.name,
                tracks: playlist.tracks
            })
            .eq('id', playlistId);
        return { data, error };
    },

    // Delete playlist
    deletePlaylist: async (playlistId) => {
        const { data, error } = await supabase
            .from('playlists')
            .delete()
            .eq('id', playlistId);
        return { data, error };
    }
}; 