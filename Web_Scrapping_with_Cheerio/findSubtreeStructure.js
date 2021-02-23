const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const compare = require('dom-compare').compare;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// GLOBAL: Parameters
let expectedTreeStructures = [
    {
        'dom': '<a><i></i></a>',
        'attrib': 'menuitem'
    },
    {
        'dom': '<footer><div><div></div><div></div></div></footer>',
        'attrib': 'footer'
    }
];
let id = 0;

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
    return true;
}

// Traverse the tree starting from root and check if it contains the subTree once the matching node is found 
let traverseTreeAndMatch = ($, node, expectedDom, attrib) => {
    if (node) {
        if (node.type == 'tag' || node.type == 'root') {
            let parsedActualHtml = $.html(node);
            const actualDom = new JSDOM(parsedActualHtml);
            result = compare(expectedDom.window.document, actualDom.window.document);
            if (isMatch(result)) {
                if ($(node[0]).html() !== 'null') {
                    $(node).attr("data-comp-id", (attrib + ".").concat(id));
                    id += 1;
                }
            } else {
                for (let i = 0; i < node.children.length; i++) {
                    traverseTreeAndMatch($, node.children[i], expectedDom, attrib);
                }
            }
        }
    };
};


let main = (extectedTrees) => {
    let html = fs.readFileSync('test.htm', 'utf8');
    let $ = cheerio.load(html);
    let rootNode = $.root();
    extectedTrees.forEach(tree => {
        id = 0;
        const expectedDom = new JSDOM(tree.dom);
        traverseTreeAndMatch($, rootNode[0], expectedDom, tree.attrib);
    });
    fs.writeFile( 'new.html', $.html(), function(err){
        if(err) throw err; 
        console.log('File created...')
    })
};

try {
    main(expectedTreeStructures);
} catch (error) {
    console.error(error);
}