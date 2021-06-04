const pg = require('pg').Client;
const pgClient = new pg({
    user: 'postgres',
    password: 'postgres1',
    host: 'localhost',
    port: 5432,
    database: 'library'
})

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("library.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const libraryPackage = grpcObject.libraryPackage;

const server = new grpc.Server();
server.bind('localhost:3000', grpc.ServerCredentials.createInsecure());
server.addService(libraryPackage.AuthorService.service,
    {
        'postAuthor': postAuthor,
        'getAuthors': getAuthors,
        // 'getAuthorById': getAuthorById,
        'putAuthor': putAuthor,
        'deleteAuthor': deleteAuthor
    });


function postAuthor(call, callback) {
    let firstName = call.request.firstName;
    let lastName = call.request.lastName;
    pgClient.connect()
    .then(() => console.log('Connected successfully'))
    .then(() => pgClient.query("INSERT INTO authors (first_name, last_name) VALUES ('" + firstName + "', '" + lastName + "')"))
    .then(results => {
        callback(null, call.request);
    })
}

function getAuthors(call, callback) {
    pgClient.connect()
    .then(() => console.log('Connected successfully'))
    .then(() => pgClient.query('SELECT * FROM authors'))
    .then(results => {
        let authors = [];
        console.log(results.rows);
        for(let i = 0; i < results.rows.length; i++) {
            authors.push(mapAuthorFromRowset(results.rows[i]));
        }
        callback(null, {'authors': authors});
    })
    .catch(e => console.log(e))
    .finally(() => pgClient.end());
}

// function getAuthorById(call, callback) {
//     console.log(call);
//     pgClient.connect()
//     .then(() => console.log('Connected successfully'))
//     .then(() => pgClient.query('SELECT * FROM authors WHERE author_id = ' + call.AuthorId.id))
//     .then(results => {
//         let author = mapAuthorFromRowset(results.rows[0]);
//         console.log(authors);
//         callback(null, {'authors': authors});
//         })
//     .catch(e => console.log(e))
//     .finally(() => pgClient.end());
// }

function putAuthor(call, callback) {
    let firstName = call.request.firstName;
    let lastName = call.request.lastName;
    let id = call.request.id;
    pgClient.connect()
    .then(() => console.log('Connected successfully'))
    .then(() => pgClient.query("UPDATE authors SET first_name = '" + firstName + "', last_name = '" + lastName + "' WHERE author_id = " + id))
    .then(results => {
        callback(null, call.request);
    })
    .catch(e => console.log(e))
    .finally(() => pgClient.end());
}

function deleteAuthor(call, callback) {
    let id = call.request.id;
    pgClient.connect()
    .then(() => console.log('Connected Successfully'))
    .then(() => pgClient.query("DELETE FROM authors WHERE author_id = " + id))
    .then(() => {
        callback(null, call.request.id);
    })
    
}

function mapAuthorFromRowset(rowset) {
    let author = {
        id: -1,
        firstName: '',
        lastName: ''
    }

    author.id = rowset.author_id;
    author.firstName = rowset.first_name;
    author.lastName = rowset.last_name;

    return author;
}

server.addService(libraryPackage.BookService.service,
    {
        'postBook': postBook,
        'getBooks': getBooks,
        'putBook': putBook,
        'deleteBook': deleteBook
    });

    function postBook(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("INSERT INTO books (isbn, format, title, author_id) VALUES (" + call.request.isbn + ", '" + call.request.format + "', '" + call.request.title + "', " + call.request.authorId +")"))
        .then(results => {
            callback(null, call.request);
        })
    }

    function getBooks(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query('SELECT * FROM books'))
        .then(results => {
            let books = [];
            for(let i = 0; i < results.rows.length; i++) {
                books.push(mapBookFromRowset(results.rows[i]));
            }
            callback(null, {'books': books});
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }

    function putBook(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("UPDATE books SET format = '" + call.request.format + "', title = '" + call.request.title + "', author_id = " + call.request.authorId + " WHERE isbn = " + call.request.isbn))
        .then(results => {
            callback(null, call.request);
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }

    function deleteBook(call, callback) {
        console.log(JSON.stringify(call));
        pgClient.connect()
        .then(() => console.log('Connected Successfully'))
        .then(() => pgClient.query("DELETE FROM books WHERE isbn = " + call.request.isbn + " AND format = '" + call.request.format + "'"))
        .then(() => {
            callback(null, call.request.isbn);
        })
        
    }

    function mapBookFromRowset(rowset) {
        let book = {
            isbn: -1,
            format: '',
            title: '',
            authorId: -1
        }
    
        book.isbn = rowset.isbn;
        book.format = rowset.format;
        book.title = rowset.title;
        book.authorId = rowset.author_id;
    
        return book;
    }

server.addService(libraryPackage.AwardService.service,
    {
        'postAward': postAward,
        'getAwards': getAwards,
        // 'getAwardById': getAwardById,
        'putAward': putAward,
        'deleteAward': deleteAward
    });

    function postAward(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("INSERT INTO awards (award_name) VALUES ('" + call.request.name + "')"))
        .then(results => {
            callback(null, call.request);
        })
    }
    
    function getAwards(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query('SELECT * FROM awards'))
        .then(results => {
            let awards = [];
            for(let i = 0; i < results.rows.length; i++) {
                awards.push(mapAwardFromRowset(results.rows[i]));
            }
            callback(null, {'awards': awards});
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }

    // function getAuthorById(call, callback) {
//     console.log(call);
//     pgClient.connect()
//     .then(() => console.log('Connected successfully'))
//     .then(() => pgClient.query('SELECT * FROM authors WHERE author_id = ' + call.AuthorId.id))
//     .then(results => {
//         let author = mapAuthorFromRowset(results.rows[0]);
//         console.log(authors);
//         callback(null, {'authors': authors});
//         })
//     .catch(e => console.log(e))
//     .finally(() => pgClient.end());
// }

function putAward(call, callback) {
    pgClient.connect()
    .then(() => console.log('Connected successfully'))
    .then(() => pgClient.query("UPDATE awards SET award_name = '" + call.request.name + "' WHERE award_id = " + call.request.id))
    .then(results => {
        callback(null, call.request);
    })
    .catch(e => console.log(e))
    .finally(() => pgClient.end());
}

function deleteAward(call, callback) {
    pgClient.connect()
    .then(() => console.log('Connected Successfully'))
    .then(() => pgClient.query("DELETE FROM awards WHERE award_id = " + call.request.id))
    .then(() => {
        callback(null, call.request.id);
    })
    
}



function mapAwardFromRowset(rowset) {
    let award = {
        id: -1,
        name: '',
    }

    award.id = rowset.award_id;
    award.name = rowset.award_name;

    return award;
}

server.addService(libraryPackage.AuthorAwardService.service,
    {
        'postAuthorAward': postAuthorAward,
    });

function postAuthorAward(call, callback) {
    pgClient.connect()
    .then(() => console.log('Connected successfully'))
    .then(() => pgClient.query("INSERT INTO author_awards (author_id, award_id) VALUES (" + call.request.authorId + ", " + call.request.awardId + ")"))
    .then(results => {
        callback(null, call.request);
    })
}

server.addService(libraryPackage.BookAwardService.service,
    {
        'postBookAward': postBookAward,
    });

    function postBookAward(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("INSERT INTO book_awards (isbn, format, award_id) VALUES (" + call.request.isbn + ", '" + call.request.format + "', " + call.request.awardId + ")"))
        .then(results => {
            callback(null, call.request);
        })
    }

server.addService(libraryPackage.ReportService.service,
    {
        'topAuthors': topAuthors,
        'topBooks': topBooks,
        'topAwards': topAwards
    });

    function topAuthors(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("SELECT authors.first_name, authors.last_name, COUNT(author_awards.author_id) AS sumcount FROM authors JOIN author_awards ON (authors.author_id = author_awards.author_id) GROUP BY author_awards.author_id, authors.first_name, authors.last_name ORDER BY sumcount DESC LIMIT 10;"))
        .then(results => {
            let authors = [];
            console.log(results.rows);
            for(let i = 0; i < results.rows.length; i++) {
                authors.push(mapAuthorFromRowset(results.rows[i]));
            }
            callback(null, {'authors': authors});
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }

    function topBooks(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("SELECT book_awards.isbn, COUNT(book_awards.isbn) FROM book_awards GROUP BY book_awards.isbn ORDER BY count DESC LIMIT 50"))
        .then(results => {
            let bookAwardCounts = [];
            for(let i = 0; i < results.rows.length; i++) {
                let bookAwardCount = {
                    isbn: results.rows[i].isbn,
                    count: results.rows[i].count
                }
                bookAwardCounts.push(bookAwardCount);
            }

            callback(null, {'bookAwardCounts': bookAwardCounts});
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }

    function topAwards(call, callback) {
        pgClient.connect()
        .then(() => console.log('Connected successfully'))
        .then(() => pgClient.query("SELECT awards.award_id, awards.award_name, SUM(count) FROM (SELECT award_id, COUNT(award_id) FROM author_awards GROUP BY award_id UNION SELECT award_id, COUNT(award_id) FROM book_awards GROUP BY award_id) AS union_table JOIN awards ON (union_table.award_id = awards.award_id) GROUP BY union_table.award_id, awards.award_id ORDER BY sum DESC LIMIT 5"))
        .then(results => {
            let awardCounts = [];
            for(let i = 0; i < results.rows.length; i++) {
                let awardCount = {
                    awardId: results.rows[i].award_id,
                    awardName: results.rows[i].award_name,
                    awardCount: results.rows[i].sum
                }
                console.log(JSON.stringify(awardCount));
                awardCounts.push(awardCount);
            }
            console.log(JSON.stringify(awardCounts));
            callback(null, {'awardCounts': awardCounts});
        })
        .catch(e => console.log(e))
        .finally(() => pgClient.end());
    }


server.start();
console.log('Server listening on port 3000...');