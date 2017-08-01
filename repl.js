var repl = require("repl").start({}),
    promisify = require("repl-promised").promisify,
    app = require('./server/app.js');
repl.context.models = require('./server/models/index.js');
promisify(repl);
