import { Injectable } from '@nestjs/common'
import { MovieDto } from './dto/add-movie.dto'
import fs = require('fs')
import path = require('path')

const dir = path.resolve(__dirname, 'movies.json')

@Injectable()
export class ProfileService {
  addMovie(movie: MovieDto) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    moviesData.push(movie) 

    fs.writeFile(dir, JSON.stringify(moviesData), 'utf-8', (error) => {
      if (error) {
        console.log(`WRITE ERROR: ${error}`)
      } else {
        console.log('FILE WRITTEN TO')
      }
    })

    return 'Movie added successfully'
  }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} profile`;
  // }

  // update(id: number, updateProfileDto: UpdateProfileDto) {
  //   return `This action updates a #${id} profile`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`;
  // }
}
