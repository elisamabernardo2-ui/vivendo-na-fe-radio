
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Try to fetch metadata from Zeno.fm stream
    const streamUrl = "https://stream.zeno.fm/ug07t11zn0hvv"
    let songData = {
      title: 'Rádio Vivendo Na Fé',
      artist: null,
      artwork: null,
      isLive: true,
      duration: null,
      source: 'fallback'
    }
    
    // Attempt to get stream info from Zeno's API
    try {
      const zenoResponse = await fetch(`https://api.zeno.fm/mounts/metadata/?mount=/live/ug07t11zn0hvv`, {
        headers: {
          'User-Agent': 'RadioPlayer/1.0'
        }
      })
      
      if (zenoResponse.ok) {
        const data = await zenoResponse.json()
        console.log('Zeno API response:', data)
        
        songData = {
          title: data.streamTitle || data.title || 'Transmissão Ao Vivo',
          artist: data.artist || null,
          artwork: data.artwork || null,
          isLive: !data.duration, // se não tem duração, é ao vivo
          duration: data.duration || null,
          source: 'zeno-api'
        }
      }
    } catch (error) {
      console.log('Zeno API failed:', error)
    }

    // Update current playback in database
    const now = new Date().toISOString()
    
    // Get current playback to check if it's a new song
    const { data: currentPlayback } = await supabase
      .from('current_playback')
      .select('*')
      .single()

    const isNewSong = !currentPlayback || 
      currentPlayback.song_title !== songData.title ||
      currentPlayback.artist !== songData.artist

    if (isNewSong) {
      console.log('New song detected, updating playback...')
      
      // If there was a previous song, archive it to play_events
      if (currentPlayback && currentPlayback.song_title !== 'Rádio Vivendo Na Fé') {
        await supabase
          .from('play_events')
          .insert({
            song_title: currentPlayback.song_title,
            artist: currentPlayback.artist,
            duration_sec: currentPlayback.duration_sec,
            started_at: currentPlayback.started_at,
            ended_at: now,
            is_live: currentPlayback.is_live,
            artwork_url: currentPlayback.artwork_url,
            source: currentPlayback.source
          })
      }

      // Update current playback with new song
      await supabase
        .from('current_playback')
        .update({
          song_title: songData.title,
          artist: songData.artist,
          duration_sec: songData.duration,
          started_at: now,
          is_live: songData.isLive,
          artwork_url: songData.artwork,
          source: songData.source
        })
        .eq('singleton', true)
    }

    // Return the current playback data
    return new Response(
      JSON.stringify({
        title: songData.title,
        artist: songData.artist,
        artwork: songData.artwork,
        isLive: songData.isLive,
        duration: songData.duration,
        source: songData.source
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in now-playing function:', error)
    return new Response(
      JSON.stringify({
        title: 'Rádio Vivendo Na Fé',
        artist: null,
        artwork: null,
        isLive: true,
        duration: null,
        source: 'error-fallback'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
