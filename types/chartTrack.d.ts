export interface IChartTrack {
    properties: {}
    tracks: ITrack[]
}

export interface ITrack {
    layout: string
    type: TrackType
    key: string
    title: string
    subtitle: string
    images?: IImages
    artists?: IArtist[]
    url: string
}

export interface IArtist {
    alias: string
    id: string
    adamid: string
}

export interface IImages {
    background: string
    coverart: string
    coverarthq: string
    joecolor: string
}
