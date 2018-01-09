'use strict'
const text = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function createCells(cssClass, x, y, idi, idj) {
    let div = $("<div>");
    div.attr('id', "" + idi + idj);
    div.css({
        top: `${y}px`,
        left: `${x}px`
    });
    div.addClass(cssClass);
    return div;
}
function createChess(src, alt, chId, idi, idj) {
    let img = $("<img>");
    img.attr({
        "src": `${src}`,
        "alt": `${alt}`,
        "position": "absolute",
        "top": "10%",
        "left": "10%",
        "id": `${chId + idi + idj}`
    });
    return img;

}
function createField(parrent, cssClass) {
    let div = $('<div>');
    div.addClass(cssClass);
    parrent.prepend(div);
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

function buildGameField() {
    let body = $("body");
    createField(body, "field");
    let field = $(".field");
    let y = 0;
    let YY = 0;
    let YX = 0;
    for (let y = 0; y < 8; y++) {
        createMarkUp(field, "text", y, YX, "-50");
        createNumeration(field, "text", y, "-50", YY);
        YX += 50;
        YY += 50;
    }
    for (let i = 1; i < 9; i++) {
        let idi = i;
        let x = 0;
        if (i % 2 == 0) x += 50;
        for (let j = 1; j < 5; j++) {
            let idj = j;
            let div = createCells("black", x, y, idi, idj);
            let img;
            if (idi < 4) {
                img = createChess("svgFiles/chessBlack.svg", "Черная шашка", "b", idi, idj);
                div.append(img);
            }
            if (idi > 5) {
                img = createChess("svgFiles/chessWhite.svg", "Белая шашка", "w", idi, idj);
                div.append(img);
            }
            field.append(div);
            x += 100;
        }
        y += 50;

    }
}

buildGameField();

