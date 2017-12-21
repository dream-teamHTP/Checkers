'use strict'
let text = ["a", "b", "c", "d", "e", "f", "g", "h"];
var svgMainField = document.getElementsByTagName('svg')[0];

var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

svgMainField.setAttribute('width', "" + width + "");
svgMainField.setAttribute('height', "" + height + "");

function getClone(elem) {
    var e = elem.childNodes;
    var cl;
    for (var i = 0; i < e.length; i++) {
        if (e[i].nodeName === 'use') {
            return cl = e[i].cloneNode(true);
        }
    }
}

function buildGameField(xField, yField) {
    let y = yField;
    for (var i = 1; i < 9; i++) {
        let x = xField;
        if (i % 2 === 0) {
            x += 50;
        }
        for (var j = 1; j < 9; j++) {
            if (j % 2 !== 0) {
                var check = getClone(svgMainField);
                var idi = i;
                var idj = j;
                check.setAttribute('xlink:href', '#check');
                check.setAttribute('x', "" + x + "");
                check.setAttribute('y', "" + y + "");
                check.setAttribute('id', "" + idi + idj + "");
                check.setAttribute('fill', 'black');
                svgMainField.appendChild(check);
            }
            x += 50;
        }
        y += 50;
    }
}
function setWhiteCheck(xField, yField) {
    let y = yField;
    for (var i = 1; i < 9; i++) {
        let x = xField;
        if (i % 2 === 0) {
            x += 50;
        }
        for (var j = 1; j < 9; j++) {
            if (j % 2 !== 0 && i < 4) {
                var ches = getClone(svgMainField);
                var idi = i;
                var idj = j;
                ches.setAttribute('xlink:href', '#white');
                ches.setAttribute('x', "" + x + "");
                ches.setAttribute('y', "" + y + "");
                ches.setAttribute('id', "w" + idi + idj + "");
                svgMainField.appendChild(ches);
            }
            x += 50;
        }
        y += 50;
    }
}
function setBlackCheck(xField, yField) {
    let y = yField;
    for (var i = 1; i < 9; i++) {
        let x = xField;
        if (i % 2 === 0) {
            x += 50;
        }
        for (var j = 1; j < 9; j++) {
            if (j % 2 !== 0 && i > 5) {
                var ches = getClone(svgMainField);
                var idi = i;
                var idj = j;
                ches.setAttribute('xlink:href', '#black');
                ches.setAttribute('x', "" + x + "");
                ches.setAttribute('y', "" + y + "");
                ches.setAttribute('id', "b" + idi + idj + "");
                svgMainField.appendChild(ches);
            }
            x += 50;
        }
        y += 50;
    }
}
function getMarkup(xField, yField) {
    let y = yField;
    for (var i = 1; i < 9; i++) {
        let x = xField;
        let y = xField - 50;
        for (var j = 1; j < 9; j++) {
            var ches = getClone(svgMainField);
            var idi = i;
            var idj = j;
            ches.setAttribute('xlink:href', '#black');
            ches.setAttribute('x', "" + x + "");
            ches.setAttribute('y', "" + y + "");
            ches.setAttribute('id', "b" + idi + idj + "");
            svgMainField.appendChild(ches);
            x += 50;
        }
    }
}

function textMarkup(xField, yField) {
    let x = xField+15;
    let y = yField-60;
        var letter = getClone(svgMainField);
        letter.setAttribute('xlink:href', '#text');
        letter.setAttribute('x', "" + x + "");
        letter.setAttribute('y', "" + y + "");
        letter.setAttribute('fill', "black");
        console.log(letter.childNodes);
        svgMainField.appendChild(letter);
}
function numberMarkup(xField, yField) {
    let x = xField-80;
    let y = yField-10;
    var numbers = getClone(svgMainField);
    numbers.setAttribute('xlink:href', '#numbers');
    numbers.setAttribute('x', "" + x + "");
    numbers.setAttribute('y', "" + y + "");
    numbers.setAttribute('fill', "black");
    console.log(numbers.childNodes);
    svgMainField.appendChild(numbers);
}

var xStart = 483;
var yStart = 80;
buildGameField(xStart, yStart);
setWhiteCheck(xStart, yStart);
setBlackCheck(xStart, yStart);
textMarkup(xStart, yStart);
numberMarkup(xStart, yStart);


