export interface ArtistSummary {
    artists: { [key: string]: Artist }
    songs: { [key: string]: Song }
    albums: { [key: string]: Album }
}

export interface Album {
    id: string
    type: string
    attributes: {
        copyright: string
        genreNames: string[]
        releaseDate: Date
        artwork: Artwork
        url: string
        recordLabel: string
        trackCount: number
        name: string
        artistName: Name
    }
}

export interface Artwork {
    url: string
}

export interface Artist {
    id: string
    type: string
    attributes: {
        genreNames: string[]
        name: string
        url: string
    }
}

export interface Song {
    id: string
    type: string
    attributes: {
        albumName: string
        genreNames: string[]
        trackNumber: number
        durationInMillis: number
        releaseDate: Date
        artwork: Artwork
        composerName: string
        url: string
        name: string
        previews: { url: string }[]
        artistName: string
    }
}
