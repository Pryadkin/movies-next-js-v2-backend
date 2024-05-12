import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import {TagsDto} from './dto/tags.dto'
import {UpdateTagDto} from './dto/update-tag.dto'
import {DirService} from 'src/dir/dir.service'

@Injectable()
export class MovieTagsService {
    constructor(
        private readonly dirService: DirService,
    ) { }

    getTags(): TagsDto[] {
        const movieTagsData = this.readTags()

        return movieTagsData
    }

    addTag(value: TagsDto) {
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
            const movieTagsUrl = this.dirService.getDir('jsons','movie-tags.json')
            const movieTagsDataJSON = fs.readFileSync(movieTagsUrl, 'utf-8')
            const res: TagsDto[] = JSON.parse(movieTagsDataJSON)

            return res
        } catch (error) {
            this.writeTags([])

            return []
        }
    }

    writeTags(file: TagsDto[]) {
        const movieTagsUrl = this.dirService.getDir('jsons','movie-tags.json')

        fs.writeFile(movieTagsUrl, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
                throw new NotFoundException(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO movie-tags.json')
            }
        })
    }
}