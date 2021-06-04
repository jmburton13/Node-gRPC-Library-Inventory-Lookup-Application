const authorServiceUI = require('./ServiceUI/AuthorServiceUI.js');
const bookServiceUI = require('./ServiceUI/BookServiceUI.js');
const awardServiceUI = require('./ServiceUI/AwardServiceUI.js');
const reportServiceUI = require('./ServiceUI/ReportServiceUI.js');
const readlineSync = require('readline-sync');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


module.exports = {
    mainMenu() {

        let choices = ['Author Service', 'Book Service', 'Award Service', 'Reports'];

        let answer = readlineSync.keyInSelect(choices, 'Please Select a Service \n');
            
                switch(answer) {
                    case 0:
                        authorServiceUI.authorServiceMenu();
                        console.log('after ui author service call');
                        break;
                    case 1:
                        bookServiceUI.bookServiceMenu();
                        break;
                    case 2:
                        awardServiceUI.awardServiceMenu();
                        break;
                    case 3: reportServiceUI.reportServiceMenu();
                };

            }
    }