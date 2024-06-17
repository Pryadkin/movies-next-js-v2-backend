import {Injectable, NotFoundException} from '@nestjs/common'
import fs = require('fs')
import {GenresDto} from './dto/genres.dto'
import {DirService} from '../dir/dir.service'

@Injectable()
export class GenresService {
    constructor(
        private readonly dirService: DirService,
    ) { }

    getGenres(): GenresDto[] {
        const genresData = this.readGenres()

        return genresData
    }

    readGenres() {
        const genresUrl = this.dirService.getDir('jsons','genres.json')

        try {
            const genresDataJSON = fs.readFileSync(genresUrl, 'utf-8')
            const genres: GenresDto[] = JSON.parse(genresDataJSON)

            return genres
        } catch (error) {
            this.writeGenres([])

            return []
        }
    }

    writeGenres(file: GenresDto[]) {
        const genresUrl = this.dirService.getDir('jsons','genres.json')

        fs.writeFile(genresUrl, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
                throw new NotFoundException(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO genres.json')
            }
        })
    }
}