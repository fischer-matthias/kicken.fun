const fupaParser = require('./fupa-parser.js')();
fupaParser.getPlayersOfTeam('fc-talge', 'm1')
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
