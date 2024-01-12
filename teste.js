const fs = require('fs');

function sum(a, b) {
  try {
    if (typeof a !== 'number') throw new TypeError('Parâmetro A precisa ser um número');
    if (typeof b !== 'number') throw new TypeError('Parâmetro B precisa ser um número');
    return a + b;
  } catch (e) {
    const errorString = e.toString();
    fs.writeFileSync('./src/tests/error', errorString);
  }
}

sum('q', 10);
