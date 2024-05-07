import {ApiProperty} from '@nestjs/swagger'

export class UpdateTagDto {
    @ApiProperty()
    oldTagName: string

    @ApiProperty()
    newTagName: string
}