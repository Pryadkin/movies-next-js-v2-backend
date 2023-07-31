import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
import {TagsDto} from './dto/tags.dto'
import {MovieDto} from 'src/profile/dto/movie.dto'
import {UpdateTagDto} from './dto/update-tag.dto'
const dirMovieTags = path.resolve(__dirname, 'movie-tags.json')

@Injectable()
export class MovieTagsService {
    getTags(): TagsDto[] {
        const movieTagsData = this.readTags()

        return movieTagsData
    }

    addTag(value: TagsDto) {
        console.log('value', value)
        const movieTagsData = this.readTags()
        const isTagExists = movieTagsData.find(tag => tag.tagName === value.tagName)

        if (isTagExists) {
            throw new NotFoundException('Tag already exists')
        }

        movieTagsData.unshift(value)

        this.writeTags(movieTagsData)

        return movieTagsData
    }

    updateTag({
        oldTagName,
        newTagName
    }: UpdateTagDto) {
        const tags = this.getTags()

        const updateTags = tags.map(tag => {
            if (tag.tagName === oldTagName) {
                return {
                    ...tag,
                    tagName: newTagName,
                }
            }
            return tag
        })

        this.writeTags(updateTags)

        return updateTags
    }

    deleteTag(tagName: string) {
        const movieTagsData = this.readTags()

        const isTagExists = movieTagsData.find(tag => tag.tagName === tagName)

        if (!isTagExists) {
            throw new NotFoundException('Tag does not found to delete')
        }

        const updateTagsData = movieTagsData.filter(tag => tag.tagName !== tagName)

        this.writeTags(updateTagsData)

        return updateTagsData
    }

    readTags() {
        try {
            const movieTagsDataJSON = fs.readFileSync(dirMovieTags, 'utf-8')
            const res: TagsDto[] = JSON.parse(movieTagsDataJSON)

            return res
        } catch (error) {
            this.writeTags([])

            return []
        }
    }

    writeTags(file: TagsDto[]) {
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