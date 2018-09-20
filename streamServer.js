var express = require('express');
var app = express();
var models = require('./server/models/index.js');

app.get('/', async function(req, res) {
  let n = await models.transcript_count.count()
  b = Math.ceil(n / 10000)
  i = 1
  while (i <= b) {
    let tc = await models.transcript_count.findAll({
      offset: (i - 1) * 10000,
      limit: 10000
    })
    res.write(JSON.stringify(tc))
    i = i + 1
  }
  res.end()
})

app.listen(3000, function() {
  console.log('Stream Server listening on port 3000!');
});
