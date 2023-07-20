import {Injectable} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
const dirMovieTags = path.resolve(__dirname, 'movie-tags.json')

@Injectable()
export class MovieTagsService {

    getMovieTags() {
        const movieTagsData = this.readTags()

        if (!movieTagsData) {
            this.writeTags([{}])

            return {}
        }

        return movieTagsData
    }

    readTags() {
        try {
            const movieTagsDataJSON = fs.readFileSync(dirMovieTags, 'utf-8')

            return JSON.parse(movieTagsDataJSON)
        } catch (error) {
            console.log(`READ ERROR: ${error}`)
        }
    }

    writeTags(file: any) {
        fs.writeFile(dirMovieTags, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO movie-tags.json')
            }
        })
    }
}
