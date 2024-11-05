const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory"); /* ======= its came from number genarator==== */

const numberGenerator = () => {
  const generator1 = aleaRNGFactory(
    new Date()
  ); /* ==== Here we use new date to get diffrent password all the time== */
  return generator1.uInt32().toString().slice(0, 5);
};

module.exports = { numberGenerator };
