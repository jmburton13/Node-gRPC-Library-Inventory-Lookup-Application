const client = require('../client.js');
const ui = require('../ui.js');
const readlineSync = require('readline-sync');

module.exports = {

    authorServiceMenu() {
        
        let choices = ['Create a new Author', 'Retrieve all Authors', 'Retrieve Author by Id (not functional)', 'Update Author', 'Delete Author'];

        let index = readlineSync.keyInSelect(choices, 'Select Option \n') 
            
        switch(index) {
                case 0:
                        postAuthorMenu();
                        break;
                case 1:
                        client.getAuthors();
                        break;
                case 2:
                        getAuthorByIdMenu();
                        break;
                case 3:
                        putAuthorMenu();
                        break;
                case 4:
                        deleteAuthorMenu();
                        break;
        }
                
        
    }
}

function postAuthorMenu() {

        let author = {
                id: -1,
                firstName: '',
                lastName: ''
        }

       author.firstName = readlineSync.question('Author First Name: \n');
       author.lastName = readlineSync.question('Author Last Name: \n');

       client.postAuthor(author);
}

function getAuthorByIdMenu() {
        client.getAuthorById(readlineSync.question('Enter Author Id to Lookup: \n'));
}

function putAuthorMenu() {
        let author = {
                id: readlineSync.question('Author to Update\'s Id: \n'),
                firstName: readlineSync.question('Author to Update\'s new First Name: \n'),
                lastName: readlineSync.question('Author to Update\'s new Last Name: \n')
        }
        client.putAuthor(author);
}

function deleteAuthorMenu() {
        let int = -1;
        int = readlineSync.question('Author to delete\'s Id: \n');
        client.deleteAuthor(int);
}

        
