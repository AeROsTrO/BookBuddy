import express from 'express';
import {Book} from '../models/bookModel.js'

const router=express.Router();


//route to save a new book
router.post('/', async (req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.statusOfBook){
            return res.status(404).send({message:'fill all required fields'})
        }
        //reached here when there is no problem with the request
        const newBook={
            title:req.body.title,
            author:req.body.author,
            statusOfBook:req.body.statusOfBook,
        }
        const book = await Book.create(newBook);

        return res.status(201).send({message:'book created successfully', data:book}); //2226
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:err.message})
    }
})

//route to get all books from database
router.get('/', async(req, res)=>{
    try{
       const books=await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})


//route to search a book; see details of a single book
router.get('/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);

        return res.status(200).json({
            count:book.length,
            data:book,
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

//update a book
router.put('/:id', async(req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.statusOfBook){
            return res.status(404).send({message:'fill all required fields'})
        }
        const {id}=req.params;
        const result=await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }
        return res.status(200).send({message: 'successfully updated book'})

    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

//route to delete a book
router.delete('/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const deleteBook= await Book.findByIdAndDelete(id);
        if(!deleteBook){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message:'book deleted successfully'})
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

export default router;