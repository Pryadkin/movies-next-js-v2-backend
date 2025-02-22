import {ApiProperty} from '@nestjs/swagger'
import {MovieDto} from './movie.dto'

export class CollectionMovieDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    rating: number

    @ApiProperty()
    movieList: string[]

    @ApiProperty()
    movies: MovieDto[]
}