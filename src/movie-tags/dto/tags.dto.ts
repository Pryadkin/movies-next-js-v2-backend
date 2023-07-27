import {ApiProperty} from '@nestjs/swagger'

export class TagsDto {
    @ApiProperty({
        default: 'newTag',
    })
    tagName: string

    @ApiProperty({
        default: 'red',
    })
    color: string
}