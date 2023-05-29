export interface SearchResources {
    "related-tracks": { [id: string]: { id: string; type: string } }
    albums: ResourcesAlbums
    lyrics: { [key: string]: Lyric }
    "shazam-songs": { [key: string]: ShazamSong }
}

export interface Lyric {
    id: string
    type: string
    attributes: LyricAttrib
}

export interface LyricAttrib {
    text: string[]
    footer: string
    musixmatchLyricsId: string
    providerName: string
    syncAvailable: boolean
}

export interface ShazamSong {
    id: string
    type: string
    attributes: ShazamSongAttrib
    relationships: Relationships
}

export interface ShazamSongAttrib {
    type: string
    title: string
    artist: string
    primaryArtist: string
    label: string
    explicit: boolean
    isrc: string
    webUrl: string
    images: {
        artistAvatar: string
        coverArt: string
        coverArtHq: string
    }
    genres: { primary: string }
    streaming?: {
        preview?: string
    }
}
