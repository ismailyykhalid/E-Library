import express from 'express';
import multer from 'multer';
import path, { resolve } from 'node:path';
import {
    allBooks,
    createBook,
    updateBook,
    getSinleBook,
    deleteBook
} from '../controllers/bookController';
import authenticate from '../middleware/authenticate';
const router = express.Router();

const upload = multer({
    dest: resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});
//Get All Books
router.get('/', allBooks);

// Get Single Book
router.get('/:bookId', getSinleBook);

// Create Book
router.post(
    '/',
    authenticate,
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    createBook
);

// Delete Book
router.delete('/:bookId', authenticate, deleteBook);
// Update Book
router.patch(
    '/:bookId',
    authenticate,
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    updateBook
);

export { router as bookRouter };
