const express = require('express')
const router = express.Router()
const movies = require('../moviesList')

// to get all movies by /movies
router.get('/',(req,res)=>{
    try {
        res.status(200).json(movies)
    } catch (error) {
        error(404).json({error:error.message})
        
    }

})

// to get movies by id
router.get('/:id',(req,res)=>{
    try { 
        const movieId = parseInt(req.params.id)
        const movie = movies.find(movi=>movi.id===movieId)
        if(!movie) res.status(404).json({
            error:"Movie Not Found"
        })
        res.status(200).json(movie)
    } catch (error) {
        error(404).json({error:error.message})
        
    }

})

// POST -Create  new movie data
router.post('/',(req,res)=>{
    try {
        if(!req.body) res.status(404).json({
            message:"Movie datas are required"
        })
        const {title,genre,releaseYear,rating} = req.body
        const newMovie ={
            id:movies.length?movies[movies.length-1].id+1:1,
            title:title,
            genre:genre,
            releaseYear:releaseYear,
            rating:rating
        }
        movies.push(newMovie)

        res.status(201).json({message:"Added a new movie to the collection",movie:newMovie})
    } catch (error) {
        error(404).json({error:error.message})
        
    }

})

//PATCH- upadate movie data
router.patch('/:id',(req,res)=>{
    try { 
        const movieId = parseInt(req.params.id)
        const movie = movies.find(movi=>movi.id===movieId)
        if(!movie) res.status(404).json({
            error:"Movie Not Found"
        })
        const {title,genre,releaseYear,rating} = req.body
        if(title)movie.title = title
        if(genre)movie.genre = genre
        if(releaseYear)movie.releaseYear = releaseYear
        if(rating)movie.rating = rating
        res.status(200).json(movie)
    } catch (error) {
        error(404).json({error:error.message})
        
    }

})

//DELETE - deleting movie from collection
router.delete('/:id',(req,res)=>{
    try { 
        const movieId= parseInt(req.params.id)
        const movieIndex = movies.findIndex(movi=>movi.id===movieId)
        if(movieIndex == -1) return res.status(404).json({
            error:"Movie Not Found"
        })
        const deletedMovie = movies.splice(movieIndex,1)
        res.status(200).json({message:"Movie data deleted from collection",movie:deletedMovie})
    } catch (error) {
        error(404).json({error:error.message})
        
    }

})

module.exports = router