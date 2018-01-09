'use strict';
const text = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

buildGameField();

/**
 * @param top - расстояник от левой стороны поля
 * @param left - расстояник от левой стороны поля
 * @param y - координата по оси Y
 * @param x - координата по оси X
 */
function buildGameField() {
    let body = $("body");
    let field = createField(body, "desk");
    let YY = 0;
    let YX = 0;

    for (let y = 0; y < 8; y++) {
        createMarkUp(field, "text", y, YX, "-50");
        createNumeration(field, "text", y, "-50", YY);
        YX += 50;
        YY += 50;
    }

    let top = 0;

    for (let y = 1; y < 9; y++) {
        let left = 0;

        if (y % 2 === 0) left += 50;

        for (let x = 1; x < 5; x++) {
            let div = createCell("cell", left, top, y, x);
            field.append(div);
            fillCell(div, left, top, y, x);

            let checker;

            if (y < 4) {
                checker = createChecker("checker", "svgFiles/chessBlack.svg", "Черная шашка", "b", left, top, y, x);
                field.append(checker);
                fillChecker(checker, "b", left, top, y, x);
            } else if (y > 5) {
                checker = createChecker("checker", "svgFiles/chessWhite.svg", "Белая шашка", "w", left, top, y, x);
                field.append(checker);
                fillChecker(checker, "w", left, top, y, x);
            }
            left += 100;
        }
        top += 50;
    }
}

function createField(parrent, cssClass) {
    let div = $('<div>');
    div.addClass(cssClass);
    parrent.prepend(div);

    return div;
}

function createMarkUp(parrent, cssClass, idi, x, y) {
    let div = $('<div>');
    div.text(text[idi]);
    div.addClass(cssClass);
    div.css({
        top: `${y}px`,
        left: `${x}px`
    });
    parrent.append(div);
}

function createNumeration(parrent, cssClass, idi, x, y) {
    let div = $('<div>');
    div.text(idi + 1);
    div.addClass(cssClass);
    div.css({
        top: `${y}px`,
        left: `${x}px`
    });
    parrent.append(div);
}

function createCell(cssClass, left, top, y, x) {
    let div = $("<div>");
    div.attr('id', "" + y + x);
    div.css({
        top: `${top}px`,
        left: `${left}px`
    }).addClass(cssClass);
    return div;
}

function createChecker(cssClass, src, alt, prefix, left, top, y, x) {
    let div = $("<div>");
    div
        .attr({
            "id": `${prefix + y + x}`,
        })
        .addClass(cssClass)
        .css({
            top: `${top}px`,
            left: `${left}px`
        });
    $("<img>").attr({
        "src": `${src}`,
        "alt": `${alt}`,
    }).appendTo(div);
    return div;
}

