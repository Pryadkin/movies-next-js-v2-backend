import {Injectable} from '@nestjs/common'
import path = require('path')

@Injectable()
export class DirService {

  getDir(folderName: string, fileName: string): string {
    const dirGenres = path.resolve(__dirname)
    const urlDistIndex = dirGenres.indexOf('dist')
    const rootUrl = dirGenres.slice(0, urlDistIndex)

    return `${rootUrl}${folderName}/${fileName}`
  }
}