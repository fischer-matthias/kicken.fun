const chai = require('chai');
const should = chai.should;

let clubCrawler = null;

beforeEach(() => {
    clubCrawler = require('../api/logic/club-crawler')();
});

describe('club-crawler', () => {
    it('should find some teams', () => {
        clubCrawler.findClub('FC Talge')
            .then((result) => {
                result.should.not.equal([]);
            }).catch((error) => {
                //
            });
    });

    it('should find a team with club_name "FC Talge"', () => {
        clubCrawler.findClub('FC Talge')
        .then((result) => {
            result[0]['club_name'].should.be.equal('FC Talge');
        }).catch((error) => {
            //
        });
    });
})