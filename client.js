const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("library.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const libraryPackage = grpcObject.libraryPackage;
const readlineSync = require('readline-sync');

const client = new libraryPackage.AuthorService("localhost:3000", grpc.credentials.createInsecure());
const awardClient = new libraryPackage.AwardService("localhost: 3000", grpc.credentials.createInsecure());
const authorAwardClient = new libraryPackage.AuthorAwardService("localhost: 3000", grpc.credentials.createInsecure());
const bookAwardClient = new libraryPackage.BookAwardService("localhost: 3000", grpc.credentials.createInsecure());
const reportClient = new libraryPackage.ReportService("localhost: 3000", grpc.credentials.createInsecure());
const bookClient = new libraryPackage.BookService("localhost: 3000", grpc.credentials.createInsecure());

module.exports = { 
    
    postAuthor(author) {
        client.postAuthor(author, (err, response) => {
            console.log("Added to database: " + response.firstName + ' ' + response.lastName);
        })},

    getAuthors() {
        client.getAuthors({}, (err, response) => {
                console.table(response.authors);
            })
        
    },


    getAuthorById() {},

    putAuthor(author){
        client.putAuthor(author, (err, response) => {
            if (response) {
                console.log("Updated author by Id: " + author.id + ' to ' + response.firstName + ' ' + response.lastName);
            }
        })
    },

    deleteAuthor(authorId) {
        client.deleteAuthor({id: authorId}, (err, response) => {
            console.log('Author by ID ' + authorId + ' has been deleted');
            }
        )
    },

    postBook(book) {
        bookClient.postBook(book, (err,response) => {
            if (response) {
                console.log("Added to database: " + response.title);
            }
        })
    },

    getBooks() {
        bookClient.getBooks({}, (err, response) => {
                console.table(response.books);
            })
        
    },

    putBook(book) {
        bookClient.putBook(book, (err, response) => {
            if (response) {
                console.log("Updated ISBN: " + book.isbn + " to Format: " + book.format + ", Title: " + book.title + ", AuthorId: " + book.authorId);
            }
        })
    },

    deleteBook(book) {
        bookClient.deleteBook(book, (err,response) => {
            if (response) {
                console.log(book.isbn + " " + book.format + " successfully deleted");
            }
        })
    },

    postAward(award) {
        awardClient.postAward(award, (err, response) => {
            console.log('Added to database: ' + response.name);
        })
    },

    getAwards() {
        awardClient.getAwards({}, (err, response) => {
                console.table(response.awards);
            })
        
    },


    getAwardById() {},

    putAward(award) {
        awardClient.putAward(award, (err, response) => {
            if (response) {
                console.log("Updated award by Id: " + award.id + ' to ' + response.name);
            }
        })
    },

    deleteAward(awardId) {
        awardClient.deleteAward({id: awardId}, (err, response) => {
            console.log('Author by ID ' + awardId + ' has been deleted');
            }
        )
    },

    postAuthorAward(authorAward) {
        authorAwardClient.postAuthorAward(authorAward, (err, response) => {
            console.log('Added to database: ' + response.authorId + ' ' + response.awardId);
        })
    },

    postBookAward(bookAward) {
        bookAwardClient.postBookAward(bookAward, (err, response) => {
            console.log('Added to database -- ISBN: ' + response.isbn + ' -- Format: ' + response.format + ' -- Award Id: ' + response.awardId);
        })
    },

    topAuthors() {
        reportClient.topAuthors({}, (err, response) => {
            console.table(response.authors);
        })
    },

    topBooks() {
        reportClient.topBooks({}, (err, response) => {

            let counter = 0;

            while(counter < response.bookAwardCounts.length) {
                let awardsToPrint = [];

                for (let i = counter; i < counter + 10 && i < response.bookAwardCounts.length; i++) {
                    awardsToPrint.push(response.bookAwardCounts[i]);
                }

                console.table(awardsToPrint);
                counter += 10;

                readlineSync.question('Press Enter for Next 10 Entries...');
            }
        })
    },

    topAwards() {
        reportClient.topAwards({}, (err, response) => {
            console.table(response.awardCounts);

            
        })
    }


    

}

