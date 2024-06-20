const fs = require('fs');
const csv = require('csv-parser');

fs.createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data);
  });
