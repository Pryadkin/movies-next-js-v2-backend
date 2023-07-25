import {ApiProperty} from '@nestjs/swagger'

export class AddTagDto {
    @ApiProperty()
    name: string
}