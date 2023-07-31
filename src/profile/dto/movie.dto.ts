import {ApiProperty} from '@nestjs/swagger'
import {ITag} from '../../types'

export class MovieDto {
    @ApiProperty({
        default: 419430,
    })
    id: number

    @ApiProperty({
        default: 53.505,
    })
    popularity: number

    @ApiProperty({
        default: 7.505,
    })
    vote_count: number

    @ApiProperty({
        default: false,
    })
    video: false

    @ApiProperty({
        default: 'https://image.tmdb.org/t/p/w300/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
    })
    poster_path: string | null

    @ApiProperty({
        default: false,
    })
    adult: boolean

    @ApiProperty({
        default: '/o8dPH0ZSIyyViP6rjRX1djwCUwI.jpg',
    })
    backdrop_path: string | null

    @ApiProperty({
        default: 'en',
    })
    original_language: string

    @ApiProperty({
        default: 'Get Out',
    })
    original_title: string

    @ApiProperty({
        default: [
            9648,
            53,
            27
        ],
    })
    genre_ids: Array<number>

    @ApiProperty({
        default: 'Get Out',
    })
    title: string

    @ApiProperty({
        default: 7.62,
    })
    vote_average: number

    @ApiProperty({
        default: 'Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family\'s overly accommodating behavior as nervous attempts to deal with their daughter\'s interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries lead him to a truth that he never could have imagined',
    })
    overview: string

    @ApiProperty({
        default: '2017-02-24',
    })
    release_date: string

    @ApiProperty({
        default: {}
    })
    settings: {
        tags: ITag[],
        dateAdd: string,
    }
}