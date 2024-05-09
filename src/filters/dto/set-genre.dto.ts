import {ApiProperty} from '@nestjs/swagger'
import {IGenre} from 'src/types'

export class SetGenreDto {
    @ApiProperty()
    genreId: number

    @ApiProperty()
    name: IGenre['name']
}