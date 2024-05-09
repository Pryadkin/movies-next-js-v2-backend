
export interface ITag {
    tagName: string,
    color: string,
}

export interface ITag {
    tagName: string,
    color: string,
    isGroup?: boolean,
}
export interface IGenre {
    id: number,
    name: TGenreName,
}

type TGenreName =
| 'action'
| 'adventure'
| 'animation'
| 'biography'
| 'comedy'
| 'crime'
| 'documentary'
| 'drama'
| 'family'
| 'fantasy'
| 'history'
| 'horror'
| 'music'
| 'mystery'
| 'romance'
| 'science fiction'
| 'tv movie'
| 'thriller'
| 'war'
| 'western'
