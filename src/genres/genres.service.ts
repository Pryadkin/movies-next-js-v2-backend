import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
import {GenresDto} from './dto/genres.dto'
const dirGenres = path.resolve(__dirname, 'genres.json')

@Injectable()
export class GenresService {
    getGenres(): GenresDto[] {
        const genresData = this.readGenres()

        return genresData
    }

    readGenres() {
        const genresUrl = `${dirGenres.slice(0, -24)}/jsons/genres.json`

        try {
            const genresDataJSON = fs.readFileSync(genresUrl, 'utf-8')
            const res: GenresDto[] = JSON.parse(genresDataJSON)

            return res
        } catch (error) {
            this.writeGenres([])

            return []
        }
    }

    writeGenres(file: GenresDto[]) {
        fs.writeFile(dirGenres, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
                throw new NotFoundException(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO genres.json')
            }
        })
    }
}