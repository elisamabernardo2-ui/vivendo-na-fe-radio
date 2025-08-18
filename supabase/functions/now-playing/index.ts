
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Try to fetch metadata from Zeno.fm stream
    const streamUrl = "https://stream.zeno.fm/ug07t11zn0hvv"
    
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
        
        return new Response(
          JSON.stringify({
            title: data.streamTitle || data.title || 'Transmissão Ao Vivo',
            artist: data.artist || null,
            artwork: data.artwork || null,
            isLive: true,
            source: 'zeno-api'
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      }
    } catch (error) {
      console.log('Zeno API failed:', error)
    }

    // Fallback: Try to parse Icecast metadata
    try {
      const response = await fetch(streamUrl, {
        headers: {
          'Icy-MetaData': '1',
          'User-Agent': 'RadioPlayer/1.0'
        }
      })
      
      const icyMetaInt = response.headers.get('icy-metaint')
      if (icyMetaInt) {
        console.log('Stream has metadata support')
        // For now, return live status
        return new Response(
          JSON.stringify({
            title: 'Rádio Vivendo Na Fé - Ao Vivo',
            artist: null,
            artwork: null,
            isLive: true,
            source: 'stream-metadata'
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      }
    } catch (error) {
      console.log('Stream metadata failed:', error)
    }

    // Default fallback
    return new Response(
      JSON.stringify({
        title: 'Rádio Vivendo Na Fé',
        artist: null,
        artwork: null,
        isLive: true,
        source: 'fallback'
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
