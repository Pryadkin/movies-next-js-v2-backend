import {ApiProperty} from '@nestjs/swagger'

export class DeleteMovieDto {
    @ApiProperty()
    id: number
}