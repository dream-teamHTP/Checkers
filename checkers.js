'use strict'

const SVG_ELEMENT = document.getElementsByTagName('svg')[0];
const SVG_WIDTH = document.documentElement.clientWidth;
const SVG_HEIGHT = document.documentElement.clientHeight;

SVG_ELEMENT.setAttribute('width', "" + SVG_WIDTH + "");
SVG_ELEMENT.setAttribute('height', "" + SVG_HEIGHT + "");

function createElement(identificator, parentElem, chId, x, y, idi, idj) {
    let elem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', identificator);
    elem.setAttribute('x', x);
    elem.setAttribute('y', y);
    if (chId != null) {
        elem.setAttribute('id', chId + idi + idj);
    } else if (idi != null && idj != null) {
        elem.setAttribute('id', "" + idi + idj);
    }
    parentElem.appendChild(elem);
}

function textMarkup(parentElem, xField, yField) {
    let x = xField + 15;
    let y = yField - 60;
    let elem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#text');
    elem.setAttribute('x', x);
    elem.setAttribute('y', y);
    elem.setAttribute('fill', "black");
    parentElem.appendChild(elem);
}
function numberMarkup( parentElem, xField, yField) {
    let x = xField - 80;
    let y = yField - 10;
    let elem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#numbers');
    elem.setAttribute('x', x);
    elem.setAttribute('y', y);
    elem.setAttribute('fill', "black");
    parentElem.appendChild(elem);
}
function buildGameField(parentElem, xField, yField, whiteFirst) {
    createElement('#field', parentElem, null, xField, yField, null, null);
    textMarkup(parentElem, xField, yField);
    numberMarkup(parentElem, xField, yField);
    let y = yField;
    for (var i = 1; i < 9; i++) {
        let x = xField;
        if (i % 2 === 0) {//Сдвиг четных полей на 50px вправо
            x += 50;
        }
        for (var j = 1; j < 5; j++) {
            var idi = i;
            var idj = j;
            createElement('#check', parentElem, null, x, y, idi, idj);
            if (whiteFirst) {
                if (i < 4) createElement('#white', parentElem, 'w', x, y, idi, idj);
                if (i > 5) createElement('#black', parentElem, 'b', x, y, idi, idj);
            } else {
                if (i < 4) createElement('#black', parentElem, 'w', x, y, idi, idj);
                if (i > 5) createElement('#white', parentElem, 'b', x, y, idi, idj);
            }

            // createElement('#white', svgMainField, 'w', x, y, idi, idj);
            // createElement('#black', svgMainField, 'b', x, y, idi, idj);
            x += 100;
        }
        y += 50;
    }
}

let xStart = 483;
let yStart = 80;
buildGameField(SVG_ELEMENT, xStart, yStart, false);


