/**
 * This module is able to parse an specific fupa.net
 * team and returns a list of players.
 */
module.exports = () => {

    // imports
    const https = require('https');
    const parse5 = require('parse5');
    const findChildNode = require('find-child-node')();

    const fupaParser = {};

    /**
     * Parse the html string to an array of team members
     * @param {string} rawHTML raw html string
     * @returns Array of team members
     */
    function parseHTML(rawHTML) {
        return new Promise((resolve, reject) => {
            const htmlObj = parse5.parse(rawHTML);
            const htmlNode = htmlObj.childNodes[1];
            const bodyNode = htmlNode.childNodes[2];

            const mainNode = findChildNode.byClass(bodyNode.childNodes, 'main');
            if(mainNode == null) {
                reject('main node not available');
            }

            const pageNode = findChildNode.byClass(mainNode.childNodes, 'page');
            if(pageNode == null) {
                reject('page node not available');
            }

            const pageWrapperNode = findChildNode.byId(pageNode.childNodes, 'ip_page_wrapper');
            if(pageWrapperNode == null) {
                reject('page_wrapper node not available');
            }

            const contentWrapperNode = findChildNode.byId(pageWrapperNode.childNodes, 'ip_content_wrapper');
            if(contentWrapperNode == null) {
                reject('content_wrapper node not available');
            }

            const contentNode = findChildNode.byClass(contentWrapperNode.childNodes, 'content');
            if(contentNode == null) {
                reject('content node not available');
            }

            const contentStandardNode = findChildNode.byClass(contentNode.childNodes, 'content_standard');
            if(contentStandardNode == null) {
                reject('content_standard node not available');
            }

            const teamKaderContainerNode = findChildNode.byClass(contentStandardNode.childNodes, 'team_kader_container');
            if(teamKaderContainerNode == null) {
                reject('team_kader_container node not available');
            }

            resolve(teamKaderContainerNode);
        });
    }

    /**
     * 
     * @param {string} club clubname
     * @param {string} team first, second, third ... team (m1, m2, m3 ...)
     * @returns {*} Array of team members 
     */
    fupaParser.getPlayersOfTeam = (club, team) => {
        return new Promise((resolve, reject) => {
            // create http request
            https.get('https://www.fupa.net/club/' + club + '/team/' + team, (resp) => {
                let data = '';
               
                // A chunk of data has been recieved.
                resp.on('data', chunk => data += chunk);
               
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    parseHTML(data)
                        .then((result) => resolve(result))
                        .catch((error) => reject(error));
                });
               
              }).on("error", (err) => {
                    reject(err);
              });
        });

    }

    return fupaParser;
}