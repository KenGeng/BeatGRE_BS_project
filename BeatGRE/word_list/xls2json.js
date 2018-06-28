node_xj = require("xls-to-json");
node_xj({
    input: "gre_word.xls",  // input xls
    output: "output.json", // output json
    sheet: "Sheet1"  // specific sheetname
}, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
