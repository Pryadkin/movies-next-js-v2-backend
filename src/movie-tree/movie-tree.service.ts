import {Injectable} from '@nestjs/common'
import fs = require('fs')
import path = require('path')
const dirMovieTree = path.resolve(__dirname, 'movies-tree.json')

@Injectable()
export class MovieTreeService {

    getMovieTreeData() {
        const movieTreeData = this.readMovieTree()

        if (!movieTreeData) {
            this.writeMovieTree([])

            return {}
        }

        return movieTreeData
    }

    readMovieTree() {
        try {
            const movieTreeDataJSON = fs.readFileSync(dirMovieTree, 'utf-8')

            return JSON.parse(movieTreeDataJSON)
        } catch (error) {
            console.log(`READ ERROR: ${error}`)
        }
    }

    writeMovieTree(file: any) {
        fs.writeFile(dirMovieTree, JSON.stringify(file), 'utf-8', (error) => {
            if (error) {
                console.log(`WRITE ERROR: ${error}`)
            } else {
                console.log('FILE WRITTEN TO movie-tree.json')
            }
        })
    }
}
