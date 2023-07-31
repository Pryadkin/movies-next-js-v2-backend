import {ApiProperty} from '@nestjs/swagger'

export class GenresDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}