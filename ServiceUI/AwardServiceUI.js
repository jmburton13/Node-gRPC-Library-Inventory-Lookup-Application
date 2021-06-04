const client = require('../client.js');
const ui = require('../ui.js');
const readlineSync = require('readline-sync');

module.exports = {

    awardServiceMenu() {
        
        let choices = ['Create a new Award', 'Retrieve all Awards', 'Bestow Author Award', 'Update Award', 'Delete Award', 'Bestow Book Award'];

        let index = readlineSync.keyInSelect(choices, 'Select Option \n') 
            
        switch(index) {
                case 0:
                        postAwardMenu();
                        break;
                case 1:
                        client.getAwards();
                        break;
                case 2:
                        postAuthorAwardMenu();
                        break;
                case 3:
                        putAwardMenu();
                        break;
                case 4:
                        deleteAwardMenu();
                        break;
                case 5:
                        postBookAwardMenu();
                        break;
        }
                
        
    }
}

function postAwardMenu() {

        let award = {
                id: -1,
                name: '',
        }

       award.name = readlineSync.question('Award Name: \n');

       client.postAward(award);
}

// function getAwardByIdMenu() {
//         client.getAwardById(readlineSync.question('Enter Award Id to Lookup: \n'));
// }

function putAwardMenu() {
        let award = {
                id: readlineSync.question('Award to Update\'s Id: \n'),
                name: readlineSync.question('Award to Update\'s New Name: \n'),
        }
        client.putAward(award);
}

function deleteAwardMenu() {
        let int = -1;
        int = readlineSync.question('Award to delete\'s Id: \n');
        client.deleteAward(int);
}

function postAuthorAwardMenu() {
        let authorAward = {
                authorId: readlineSync.question('Author to be awarded Id: \n'),
                awardId: readlineSync.question('Award Id to be given \n')
        }

        client.postAuthorAward(authorAward);
}

function postBookAwardMenu() {

        let bookAward = {
                isbn: -1,
                format: '',
                awardId: -1
        }

        let formatOptions = ['Hardbound', 'Paperback', 'Digital Only'];
        
        bookAward.isbn = readlineSync.question('Book ISBN: \n');
        index = readlineSync.keyInSelect(formatOptions, 'Select Format');
       switch(index) {
               case 0: bookAward.format = 'Hardbound';
                        break;
                case 1: bookAward.format = 'Paperback';
                        break;
                case 2: bookAward.format = 'Digital Only';
       }

       bookAward.awardId = readlineSync.question('Award Id to be given \n');

        client.postBookAward(bookAward);
}

       