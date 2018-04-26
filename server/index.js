var fs = require('fs');
var util = require('util')

const fupaParser = require('./fupa-parser.js')();

fupaParser.getPlayersOfTeam('tus-bersenbrueck', 'm2')
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
