const chai = require('chai');

let fupaParser = null;

beforeEach(() => {
    fupaParser = require('../api/logic/fupa-parser')();
});

