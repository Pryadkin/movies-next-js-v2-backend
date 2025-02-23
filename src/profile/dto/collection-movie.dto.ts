import {ApiProperty} from '@nestjs/swagger'
import {MovieDto} from './movie.dto'

export class MovieListDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    movie: MovieDto | null
}

export class CollectionMovieDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    rating: number

    @ApiProperty()
    movieList: MovieListDto[]
}