import {ConflictException, Injectable, NotFoundException} from '@nestjs/common'
import {MovieDto} from './dto/movie.dto'
import fs = require('fs')
import path = require('path')

const dir = path.resolve(__dirname, 'movies.json')

@Injectable()
export class ProfileService {
  getMovies(): MovieDto[] {
    try {
      const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
      const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)
      return moviesData
    } catch (err) {
      return err
    }
  }

  addMovie(movie: MovieDto) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const isExistMovie = moviesData.find(item => item.id === movie.id)

    if (isExistMovie) {
      throw new ConflictException('Movie already exist')
    } else {
      moviesData.push(movie)

      fs.writeFile(dir, JSON.stringify(moviesData), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO movies.json')
        }
      })
    }

    return movie
  }

  deleteMovie(id: number) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const deletedMovie = moviesData.find(movie => movie.id === id)

    const updateMovie = moviesData.filter(movie => movie.id !== id)

    if (!deletedMovie) {
      throw new NotFoundException('The movie was not found')
    } else {
      fs.writeFile(dir, JSON.stringify(updateMovie), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO')
        }
      })
    }

    return deletedMovie





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


}
