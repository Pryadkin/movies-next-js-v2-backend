import {ApiProperty} from '@nestjs/swagger'

export class TagsDto {
    @ApiProperty({
        default: ['newTag'],
    })
    tags: string[]
}