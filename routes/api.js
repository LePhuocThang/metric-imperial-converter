'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum;
      let returnUnit;

      // Handle all error cases first with exact text responses
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.type('text/plain').send('invalid number and unit');
      }

      if (initNum === 'invalid number') {
        return res.type('text/plain').send('invalid number');
      }

      if (initUnit === 'invalid unit') {
        return res.type('text/plain').send('invalid unit');
      }

      returnNum = convertHandler.convert(initNum, initUnit);
      returnUnit = convertHandler.getReturnUnit(initUnit);
      
      // Convert 'l' to 'L' for API responses (FCC requirement)
      let displayInitUnit = initUnit === 'l' ? 'L' : initUnit;
      let displayReturnUnit = returnUnit === 'l' ? 'L' : returnUnit;
      
      let string = convertHandler.getString(initNum, displayInitUnit, returnNum, displayReturnUnit);
      
      // Send JSON response with exact field order and formatting
      res.json({
        initNum: initNum,
        initUnit: displayInitUnit,
        returnNum: returnNum,
        returnUnit: displayReturnUnit,
        string: string
      });
    });

};
