const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const compare = require('dom-compare').compare;
const reporter = require('dom-compare').GroupingReporter;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let isMatch = (result) => {
    let diff = result.getDifferences();
    for (let i = 0; i < diff.length; i++) {
        if (diff[i].message.includes('Expected')) {
            return false;
        }
        if (diff[i].message.includes('missed')) {
            return false;
        }
    }
   //  console.log(JSON.stringify(diff, null, 2));
    return true;
}

let traverseTreeAndMatch = ($, node, expectedDom, id) => {
    if (node) {
        if (node.type == 'tag' || node.type == 'root') {
            let parsedActualHtml = $.html(node);
            // console.log(parsedActualHtml);
            // console.log('----------------------------');
            const actualDom = new JSDOM(parsedActualHtml);
            result = compare(expectedDom.window.document, actualDom.window.document);
            
            if (isMatch(result)) {
                console.log('----------------------------');
                if($(node[0]).html()!== 'null') {
                    console.log('Modified ,.....');
                    $(node).attr("data-comp-id" , "menuitem." + id);
                    id = id + 1;
                    console.log($(node)[0].attribs);
                    console.log(parsedActualHtml);
                }
                console.log('----------------------------');
            } else {
                for (let i = 0; i < node.children.length; i++) {
                    traverseTreeAndMatch($, node.children[i], expectedDom, id);
                }
            }
        }
    };
};

let main = () => {
    let id = 0; 
    request('https://richasundrani.com/', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            // let html = fs.readFileSync('test.htm', 'utf8');
            let $ = cheerio.load(html);
            let rootNode = $.root();

            const elementExpected = '<a><i></i></a>';
            // const elementExpected = '<footer><div><div></div><div></div></div></footer>';
            const expectedDom = new JSDOM(elementExpected);
            traverseTreeAndMatch($, rootNode[0], expectedDom, id);
        }
    });
};

main();

