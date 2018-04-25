/**
 * This module is able to parse an specific fupa.net
 * team and returns a list of players.
 */
module.exports = () => {

    // imports
    const https = require('https');
    const parse5 = require('parse5');

    const fupaParser = {};

    /**
     * Searches an specific node by an attribute.
     * @param {array} childNodes 
     * @param {string} key 
     * @param {string} value 
     * @returns {object|null}
     */
    function findChildNodeByAttribute(childNodes, key, value) {
        
        var returnNode = null;
        
        childNodes.forEach((node) => {
            if(node.attrs && node.attrs[0] 
                && node.attrs[0].name == key 
                && node.attrs[0].value == value) {
                returnNode = node;
            }
        });

        return returnNode;
    }

    /**
     * Searched an specific node by class name.
     * @param {string} childNodes 
     * @param {string} className 
     */
    function findChildNodeByClass(childNodes, className) {
        return findChildNodeByAttribute(childNodes, 'class', className);
    }

    /**
     * Searched an specific node by id.
     * @param {string} childNodes 
     * @param {string} id
     */
    function findChildNodeById(childNodes, id) {
        return findChildNodeByAttribute(childNodes, 'id', id);
    }

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

            const mainNode = findChildNodeByClass(bodyNode.childNodes, 'main');
            if(mainNode == null) {
                reject('main node not available');
            }

            const pageNode = findChildNodeByClass(mainNode.childNodes, 'page');
            if(pageNode == null) {
                reject('page node not available');
            }

            const pageWrapperNode = findChildNodeById(pageNode.childNodes, 'ip_page_wrapper');
            if(pageWrapperNode == null) {
                reject('page_wrapper node not available');
            }

            const contentWrapperNode = findChildNodeById(pageWrapperNode.childNodes, 'ip_content_wrapper');
            if(contentWrapperNode == null) {
                reject('content_wrapper node not available');
            }

            const contentNode = findChildNodeByClass(contentWrapperNode.childNodes, 'content');
            if(contentNode == null) {
                reject('content node not available');
            }

            const contentStandardNode = findChildNodeByClass(contentNode.childNodes, 'content_standard');
            if(contentStandardNode == null) {
                reject('content_standard node not available');
            }

            const teamKaderContainerNode = findChildNodeByClass(contentStandardNode.childNodes, 'team_kader_container');
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