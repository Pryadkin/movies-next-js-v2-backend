import {Injectable} from '@nestjs/common'
import fs = require('fs')
import {DirService} from 'src/dir/dir.service'

@Injectable()
export class MovieTreeService {
    constructor(
        private readonly dirService: DirService,
    ) { }

    getMovieTreeData() {
        const movieTreeData = this.readMovieTree()

        if (!movieTreeData) {
            this.writeMovieTree([])

            return {}
        }

        return movieTreeData
    }

    readMovieTree() {
        const movieTreeUrl = this.dirService.getDir('jsons','movies-tree.json')

        try {
            const movieTreeDataJSON = fs.readFileSync(movieTreeUrl, 'utf-8')

            return JSON.parse(movieTreeDataJSON)
        } catch (error) {
            console.log(`READ ERROR: ${error}`)
        }
    }

    writeMovieTree(file: any) {
        const movieTreeUrl = this.dirService.getDir('jsons','movies-tree.json')

        fs.writeFile(movieTreeUrl, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO movie-tree.json')
            }
        })
    }
}
