import {ApiProperty} from '@nestjs/swagger'
import {ITag} from '../../types'

export class PersonDto {
    @ApiProperty({
        default: 419430,
    })
    id: number

    @ApiProperty({
        default: [],
    })
    also_known_as: string[]

    @ApiProperty({
        default: '',
    })
    biography_en: string

    @ApiProperty({
        default: '',
    })
    biography_ru: string

    @ApiProperty({
        default: '',
    })
    birthday: string | null

    @ApiProperty({
        default: null,
    })
    deathday: string | null

    @ApiProperty({
        default: null,
    })
    homepage: string | null

    @ApiProperty({
        default: 53.505,
    })
    adult: number

    @ApiProperty({
        default: 7.505,
    })
    gender: number

    @ApiProperty({
        default: 'Acting',
    })
    known_for_department: string

    @ApiProperty({
        default: '',
    })
    place_of_birth_en: string

    @ApiProperty({
        default: '',
    })
    place_of_birth_ru: string

    @ApiProperty({
        default: 'https://image.tmdb.org/t/p/w300/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
    })
    profile_path: string | null

    @ApiProperty({
        default: 'Крис',
    })
    name_ru: string

    @ApiProperty({
        default: 'Chris',
    })
    name_en: string

    @ApiProperty({
        default: 53.913,
    })
    popularity: number

    @ApiProperty({
        default: '',
    })
    imdb_id: ''

    @ApiProperty({
        default: {}
    })
    settings: {
        tags: ITag[]
    }
}