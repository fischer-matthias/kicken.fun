const chai = require('chai');
const nock = require('nock');
const fs = require('fs');

let fupaParser = null;


// prepare http-mocking
const teamId = '454014';
let playerMock = '';

fs.readFile("test.txt", "utf8", (error, data) => {
    playerMock = data;
});

nock('https://www.fupa.net')
    .get('/fupa/widget.php?val=' + teamId + '&p=start&act=team&fupa_widget_header=0&fupa_widget_navi=0&fupa_widget_div=widget_5af16fa242655&url=www.fupa.net')
    .reply(200, playerMock);

beforeEach(() => {
    fupaParser = require('../api/logic/fupa-parser')();
});

// start testing
describe('fupa-parser', () => {
    it('should find some players', () => {
        fupaParser.getPlayersOfTeam(teamId)
            .then((result) => {
                result.should.not.equal([]);
            })
            .catch((error) => {
                //
            });
    });

    it('should find the players of FC Talge', () => {

        const rightResult = require('./data/player-result.mock');

        fupaParser.getPlayersOfTeam(teamId)
            .then((result) => {
                result.should.equal(rightResult);
            })
            .catch((error) => {
                //
            });
    });
});
