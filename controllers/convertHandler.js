function ConvertHandler() {
  
  this.getNum = function(input) {
    // Extract number from input string
    let result = input.match(/^[\d\.\/]+/);
    
    if (!result) {
      return 1; // Default to 1 if no number found
    }
    
    let numStr = result[0];
    
    // Check for double fractions (e.g., 3/2/3)
    if (numStr.split('/').length > 2) {
      return 'invalid number';
    }
    
    // Handle fractions
    if (numStr.includes('/')) {
      let parts = numStr.split('/');
      if (parts.length === 2) {
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
          return 'invalid number';
        }
        return numerator / denominator;
      }
    }
    
    let num = parseFloat(numStr);
    return isNaN(num) ? 'invalid number' : num;
  };
  
  this.getUnit = function(input) {
    // Extract unit from input string
    let result = input.match(/[a-zA-Z]+$/);
    
    if (!result) {
      return 'invalid unit';
    }
    
    let unit = result[0].toLowerCase();
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    return validUnits.includes(unit) ? unit : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
