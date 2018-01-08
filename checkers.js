/*
'use strict'

 const SVG_ELEMENT = document.getElementsByTagName('svg')[0];
 const SVG_WIDTH = document.documentElement.clientWidth;
 const SVG_HEIGHT = document.documentElement.clientHeight;

 SVG_ELEMENT.setAttribute('width', "" + SVG_WIDTH + "");
 SVG_ELEMENT.setAttribute('height', "" + SVG_HEIGHT + "");
 let r = 20;
 let w = 50;
 let h = 50;
 function createElement(identificator, parentElem, chId, x, y, idi, idj) {
 let elem = document.createElementNS('http://www.w3.org/2000/svg', identificator);
 if (chId != null) {
 elem.setAttribute('id', "" + idi + idj + chId);
 if (chId === "w") {
 x += 25;
 y += 25;
 createWhiteCheck(elem, r, x, y);
 parentElem.appendChild(elem);
 fillCheckers(elem, chId, idi, idj, x, y);
 } else {
 x += 25;
 y += 25;
 createBlackCheck(elem, r, x, y);
 parentElem.appendChild(elem);
 fillCheckers(elem, chId, idi, idj, x, y);
 }
 } else if (idi != null && idj != null) {
 createRect(elem, x, y, idi, idj, w, h);
 parentElem.appendChild(elem);
 fillCells(elem, idi, idj, x, y);
 }
 // parentElem.appendChild(elem);
 // fillCheckers(elem, chId, idi, idj, x, y);
 }

 function createField(parentElem, chId, x, y, idi, idj) {
 let elem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
 elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#field');
 elem.setAttribute('x', x);
 elem.setAttribute('y', y);
 elem.setAttribute('id', 'fields');
 parentElem.appendChild(elem);
 }

 function createWhiteCheck(elem, r, cx, cy) {
 elem.setAttributeNS(null, 'fill', 'white');
 elem.setAttributeNS(null, 'stroke', 'black');
 elem.setAttributeNS(null, 'stroke-width', '3');
 elem.setAttribute('r', r);
 elem.setAttribute('cx', cx);
 elem.setAttribute('cy', cy);
 }
 function createBlackCheck(elem, r, cx, cy) {
 elem.setAttributeNS(null, 'fill', 'black');
 elem.setAttributeNS(null, 'stroke', 'white');
 elem.setAttributeNS(null, 'stroke-width', '3');
 elem.setAttribute('r', r);
 elem.setAttribute('cx', cx);
 elem.setAttribute('cy', cy);
 }
 function createRect(elem, x, y, idi, idj, w, h) {
 elem.setAttribute('id', "" + idi + idj);
 elem.setAttribute('width', w);
 elem.setAttribute('height', h);
 elem.setAttribute('fill', '#838385');
 elem.setAttribute('stroke', 'black');
 elem.setAttribute('x', x);
 elem.setAttribute('y', y);
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
 function numberMarkup(parentElem, xField, yField) {
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
 createField(parentElem, null, xField, yField, null, null);
 textMarkup(parentElem, xField, yField);
 numberMarkup(parentElem, xField, yField);
 let y = yField;
 for (var i = 1; i < 9; i++) {
 let x = xField;
 if (i % 2 === 0) {//Сдвиг четных полей на 50px вправо
 x += 50;
 }
 for (var j = 1; j < 5; j++) {
 let idi = i;
 let idj = j;
 createElement('rect', parentElem, null, x, y, idi, idj);

 if (whiteFirst) {
 if (i < 4) createElement('circle', parentElem, 'w', x, y, idi, idj);
 if (i > 5) createElement('circle', parentElem, 'b', x, y, idi, idj);
 } else {
 if (i < 4) createElement('circle', parentElem, 'w', x, y, idi, idj);
 if (i > 5) createElement('circle', parentElem, 'b', x, y, idi, idj);
 }
 x += 100;
 }
 y += 50;
 }
 }

 let xStart = 483;
 let yStart = 80;
 buildGameField(SVG_ELEMENT, xStart, yStart, false);







*/
