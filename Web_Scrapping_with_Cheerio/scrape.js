const request = require('request');
const cheerio = require('cheerio');
const compare = require('dom-compare').compare;
const reporter = require('dom-compare').GroupingReporter;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let isMatch = (result) => {
    let diff = result.getDifferences();
    console.log(diff);
    for (let i = 0; i < diff.length; i++) {
        if (diff[i].message.includes('Expected')) {
            return false;
        }
    }
    return true;
}

request('https://richasundrani.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        let root = $('body').get(0);

        console.log(root.html());
        const treeExpected =
            '<a><i></i></a>';
        const treeActualDom = new JSDOM(root);
        const treeExpectedDom = new JSDOM(treeExpected);
        let result, groupedDiff;
        // compare to DOM trees, get a result object
        result = compare(treeExpectedDom.window.document, treeActualDom.window.document);
        let match = isMatch(result);
        console.log(match);
        // get comparison result
        console.log(result.getResult()); // false cause' trees are different
        // differences, grouped by node XPath
        groupedDiff = reporter.getDifferences(result); // object, key - node XPATH, value - array of differences (strings)
        // string representation
        console.log(reporter.report(result));
       
        if(root.children.length !=0) {
            // console.log(root.children); 
            root.children.forEach(node => {
                if (node.type == 'tag') {
                    console.log(node + ' ' + node.children.length);
                }
            });
        }
    }
});


