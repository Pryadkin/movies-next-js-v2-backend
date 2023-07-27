import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
import {TagsDto} from './dto/tags.dto'
import {MovieDto} from 'src/profile/dto/movie.dto'
import {UpdateTagDto} from './dto/update-tag.dto'
const dirMovieTags = path.resolve(__dirname, 'movie-tags.json')

@Injectable()
export class MovieTagsService {

    updateMovieTags(
        {
            oldTagName,
            newTagName
        }: UpdateTagDto,
        movies: MovieDto[]
    ) {
        const updateMovieTags = movies.map(movie => {
            if (movie.settings.tags.includes(oldTagName)) {
                return {
                    ...movie,
                    settings: {
                        ...movie.settings,
                        tags: movie.settings.tags.map(tag => {
                            if (tag === oldTagName) return newTagName
                            return tag
                        })
                    }
                }
            }
            return movie
        })

        return updateMovieTags
    }

    updateTag({
        oldTagName,
        newTagName
    }: UpdateTagDto) {
        const tags = this.getTags()

        if (!oldTagName) throw new NotFoundException('The tags is null')

        const updateTags = {
            tags: tags.tags.map(tag => {
                if (tag === oldTagName) {
                    return newTagName
                }
                return tag
            })
        }

        this.writeTags(updateTags)

        return updateTags
    }

    addTag(value: string) {
        if (!value) throw new NotFoundException('The tags is null')

        const movieTagsData = this.readTags()

        if (movieTagsData) {
            movieTagsData.tags.unshift(value)

            this.writeTags(movieTagsData)

            return movieTagsData
        } else {
            throw new NotFoundException('The tags was not found')
        }
    }

    deleteTag(value: string) {
        const movieTagsData = this.readTags()

        const updateTagsData = {
            tags: movieTagsData.tags.filter(tag => tag !== value)
        }

        this.writeTags(updateTagsData)

        return updateTagsData
    }

    getTags(): TagsDto {
        const movieTagsData = this.readTags()

        if (!movieTagsData) {
            this.writeTags({
                'tags': []
            })

            return {tags: []}
        }

        return movieTagsData
    }

    readTags() {
        try {
            const movieTagsDataJSON = fs.readFileSync(dirMovieTags, 'utf-8')
            const res: TagsDto = JSON.parse(movieTagsDataJSON)

            return res
        } catch (error) {
            console.log(`READ ERROR: ${error}`)
            throw new NotFoundException('The tags was not found')
        }
    }

    writeTags(file: TagsDto) {
        fs.writeFile(dirMovieTags, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
                throw new NotFoundException(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO movie-tags.json')
            }
        })
    }
}