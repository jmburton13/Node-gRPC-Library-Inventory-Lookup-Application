const client = require('../client.js');
const ui = require('../ui.js');
const readlineSync = require('readline-sync');

module.exports = {

    reportServiceMenu() {
        
        let choices = ['Top 10 Awarded Authors', 'Most Awarded Books (Paginated by 10)', 'Top 5 Most Frequently Given Awards'];

        let index = readlineSync.keyInSelect(choices, 'Select Report \n') 
            
        switch(index) {
                case 0:
                        client.topAuthors();
                        break;
                case 1:
                        client.topBooks();
                        break;
                case 2:
                        client.topAwards();
        }
                
        
    }
}
