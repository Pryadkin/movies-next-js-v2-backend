import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
import {TagsDto} from './dto/tags.dto'
const dirMovieTags = path.resolve(__dirname, 'movie-tags.json')

@Injectable()
export class MovieTagsService {

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


// {
//     "tags": [
//         "Horror",
//         "Camedy",
//         "Action",
//         "Adventure",
//         "Novel"
//     ]
// }