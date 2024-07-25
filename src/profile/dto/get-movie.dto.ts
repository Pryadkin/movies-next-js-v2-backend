import {ApiProperty} from '@nestjs/swagger'

export type TSortItem = 'release_date' | 'date_of_viewing'
export type TSortType = 'asc' | 'desc'

export class GetMovieDto {
    @ApiProperty()
    numberPage: string

    @ApiProperty()
    limit: string

    @ApiProperty()
    sortItemName: TSortItem

    @ApiProperty()
    sortItemType: TSortType

    @ApiProperty()
    filterByMovieName: string | undefined

    @ApiProperty()
    isWithDateOfViewing: string
}