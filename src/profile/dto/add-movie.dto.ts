export interface MovieDto {
    id: number
    popularity: number
    vote_count: number
    video: false
    poster_path: string | null
    adult: boolean
    backdrop_path: string | null
    original_language: string
    original_title: string
    genre_ids: Array<number>
    title: string
    vote_average: number
    overview: string
    release_date: string
    filters: {
        id: number,
        name: string,
        path: string
    }[] | null
}