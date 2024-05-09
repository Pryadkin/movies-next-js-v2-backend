import {ApiProperty} from '@nestjs/swagger'

export class GenresDto {
    @ApiProperty()
    genreId: number

    @ApiProperty()
    name: string
}