import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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

    const updateMovies = moviesData.filter(movie => movie.id !== id)

    if (!deletedMovie) {
      throw new NotFoundException('The movie was not found')
    } else {
      fs.writeFile(dir, JSON.stringify(updateMovies), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO')
        }
      })
    }

    return deletedMovie
  }

  updateAllMovie(movies: MovieDto[]) {
    fs.writeFile(dir, JSON.stringify(movies), 'utf-8', (error) => {
      if (error) {
        console.log(`WRITE ERROR: ${error}`)
      } else {
        console.log('FILE WRITTEN TO')
      }
    })

    return 'movies updated successfully'
  }

  updateMovie(movie: MovieDto) {
    const moviesDataJSON = fs.readFileSync(dir, 'utf-8')
    const moviesData: MovieDto[] = JSON.parse(moviesDataJSON)

    const currentMovie = moviesData.find(item => item.id === movie.id)

    if (currentMovie) {
      const updateMovies = moviesData.map(item => {
        if (item.id === movie.id) {
          return movie
        }
        return item
      })

      fs.writeFile(dir, JSON.stringify(updateMovies), 'utf-8', (error) => {
        if (error) {
          console.log(`WRITE ERROR: ${error}`)
        } else {
          console.log('FILE WRITTEN TO')
        }
      })

      return movie
    } else {
      throw new NotFoundException('The movie was not found')
    }
  }
}
