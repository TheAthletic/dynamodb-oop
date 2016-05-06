require('./lib/common')

require("./tests/010-createTable.js")
require("./tests/020-describe.js")
require("./tests/030-insert.js")
require("./tests/031-insert_or_update.js")
require("./tests/032-insert_or_replace.js")

// update disabled because dynalite fails
//require("./tests/040-update.js")

require("./tests/050-replace.js")
require("./tests/060-delete.js")
require("./tests/070-get.js")
require("./tests/080-query.js")
require("./tests/090-scan.js")
require("./tests/999-deleteTable.js")
