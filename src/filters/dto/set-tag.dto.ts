import {ApiProperty} from '@nestjs/swagger'

export class SetTagDto {
    @ApiProperty()
    isGroup: boolean

    @ApiProperty()
    tagName: string

    @ApiProperty()
    color: string
}