# kicken.fun server-application
This nodejs application is able to searchs german soccer teams and afterwards crawl their team members from fupa.net.

## REST-API

### Search a team
- `/players/:clubs/:searchTerm`

`searchTerm` url-encoded string.

### Get team members
- `/players/:teamID`

`TeamID` numeric id from fupa.net.