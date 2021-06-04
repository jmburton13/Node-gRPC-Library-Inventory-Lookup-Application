const client = require('../client.js');
const ui = require('../ui.js');
const readlineSync = require('readline-sync');

module.exports = {

    bookServiceMenu() {

        console.log('before question');
        
        let choices = ['Create a new Book', 'Retrieve all Books', 'Update Book', 'Delete Book'];

        let index = readlineSync.keyInSelect(choices, 'Select Option \n') 
            
        switch(index) {
                case 0:
                        postBookMenu();
                        break;
                case 1:
                        client.getBooks();
                        break;
                case 2:
                        putBookMenu();
                        break;
                case 3:
                        deleteBookMenu();
                        break;
        }        
    }
}

function postBookMenu() {

        let book = {
                isbn: -1,
                format: '',
                title: '',
                authorId: -1
        }

        let formatOptions = ['Hardbound', 'Paperback', 'Digital Only'];

       book.isbn = readlineSync.question('Book ISBN: \n');
       index = readlineSync.keyInSelect(formatOptions, 'Select Format');
       switch(index) {
               case 0: book.format = 'Hardbound';
                        break;
                case 1: book.format = 'Paperback';
                        break;
                case 2: book.format = 'Digital Only';
       }
       book.title = readlineSync.question('Book Title: \n');
       book.authorId = readlineSync.question('Author Id: \n');

        client.postBook(book);
}

function getBookByIdMenu() {
        client.getBookById(readlineSync.question('Enter Book Id to Lookup: \n'));
}

function putBookMenu() {
    let book = {
        isbn: -1,
        format: '',
        title: '',
    }

    let formatOptions = ['Hardbound', 'Paperback', 'Digital Only'];

    book.isbn = readlineSync.question('Book ISBN: \n');
    index = readlineSync.keyInSelect(formatOptions, 'Select Format');
       switch(index) {
               case 0: book.format = 'Hardbound';
                        break;
                case 1: book.format = 'Paperback';
                        break;
                case 2: book.format = 'Digital Only';
       }
    book.title = readlineSync.question('Book Title: \n');
    book.authorId = readlineSync.question('Author Id: \n');

        client.putBook(book);
}

function deleteBookMenu() {

        let book = {
                isbn: -1,
                format: '',
                title: '',
            }
        
            let formatOptions = ['Hardbound', 'Paperback', 'Digital Only'];
        
            book.isbn = readlineSync.question('Book ISBN: \n');
            index = readlineSync.keyInSelect(formatOptions, 'Select Format');
               switch(index) {
                       case 0: book.format = 'Hardbound';
                                break;
                        case 1: book.format = 'Paperback';
                                break;
                        case 2: book.format = 'Digital Only';
               }

        client.deleteBook(book);
}

        
