import {ApiProperty} from '@nestjs/swagger'

export type TSortItem = 'ascDate' | 'descDate' | 'ascReleaseDate' | 'descReleaseDate' | ''

export class GetMovieDto {
    @ApiProperty()
    numberPage: string

    @ApiProperty()
    limit: string

    @ApiProperty()
    sortItem: TSortItem

    @ApiProperty()
    filterByMovieName: string | undefined

    @ApiProperty()
    filterByMovieWithoutDate: string
}