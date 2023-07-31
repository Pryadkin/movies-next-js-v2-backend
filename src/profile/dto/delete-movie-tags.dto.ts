import {ApiProperty} from '@nestjs/swagger'

export class DeleteMovieTagsDto {
    @ApiProperty()
    tagName: string
}