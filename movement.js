/**
 * Created by Alexander Balabolov
 * 06.01.2018
 */

'use strict';

/**
 * An array that contains number of objects
 * that contains {parent: constructor, child: constructor}
 */
let parentChild = [
    {
        parent: Cells,
        child: Cell
    },
    {
        parent: Cell,
        child: Checker
    }];

let cells = new Cells();

/**
 * General object for matrix
 */
function Cells() {

    /** Current drag element */
    this.dragChecker = null;
    this.turn = "white";

    for (let prop in this){
        Object.defineProperty(this, prop, {enumerable:false});
    }


    /** Sets current checker to the top of all checkers */
    Cells.prototype.setCheckerToTop = function () {
        this.element.parent().append(this.element);
    };

    /** Updates the difference between mouse and element */
    Cells.prototype.updateDiff = function (event) {
        this.diffTop = event.clientY - this.offsetTop;
        this.diffLeft = event.clientX - this.offsetLeft;
    };

    /**
     * Updates offset in object after successful drop.
     * When the next time clicks on this element,
     * the difference between mouse and element will count from last position
     */
    Cells.prototype.updateCheckerOffset = function (event) {
        this.offsetTop = event.clientY - this.diffTop;
        this.offsetLeft = event.clientX - this.diffLeft;
    }
}

/**
 * An object for every cell.
 * @field element - jQuery element of cell
 * @field offsetLeft - offset from left body
 * @field offsetTop - offset from top body
 * @field id - the id of current cell
 * @field checker - current checker in this cell
 */
function Cell(div, cellId, offsetLeft, offsetTop) {
    this.element = $(div);
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.id = cellId;
    this.checker = {};
}

/**
 * An object for every checker.
 * @field element - jQuery element of checker
 * @field offsetLeft - offset from left body
 * @field offsetTop - offset from top body
 * @field id - the id of current checker
 * @field color - element color
 * @field diffTop - difference between mouse click height and element height
 * @field diffLeft - difference between mouse click width and element width
 * @field isDropped - true if the element was dropped
 * @field isQueen - true if the element was queen
 */

function Checker(ches, prefix, id, offsetLeft, offsetTop) {
    this.element = $(ches);
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.id = id;
    this.color = prefix === "w" ? "white" : "black";
    this.diffTop = 0;
    this.diffLeft = 0;
    this.isDropped = false;
    this.isQueen = false;
}

/**
 * Fires all cells for listeners to drop
 */
function fillCell(div, offsetLeft, offsetTop, coordinateY, coordinateX) {
    if (!coordinateY || !coordinateX) return;
    let cellId = "" + coordinateY + coordinateX;
    let cell = cells[cellId] = new Cell(div, cellId, offsetLeft, offsetTop);
    cell.element.droppable(droppableOptions);
}

/**
 * Fires all checkers for listeners to drag
 */
function fillChecker(ches, prefix, offsetLeft, offsetTop, coordinateY, coordinateX) {
    let cellId = "" + coordinateY + coordinateX;
    let checkerId = prefix + coordinateY + coordinateX;
    let checker = cells[cellId].checker = new Checker(ches, prefix, checkerId, offsetLeft, offsetTop);

    checker.element
        .draggable(draggableOptions)
        .mousedown((event) => {
            checker.setCheckerToTop();
            // TODO Смена игрока. Запрет ходить предыдущему игроку.
            // TODO Использовать эту логику в onmouseup или droppable drop после успешного опускания шашки.
            if (checkForTurn(checker.color)){
                enableDragging(checker.color);
                checker.updateDiff(event);
                cells.dragChecker = checker;
            }else {
                disableDragging(checker.color);
            }

        })
        .mouseup((event) => {
            checker.updateCheckerOffset(event);
            cells.dragChecker = null;
        });
}

/**
 * Options for jQuerry draggable widget
 */
let draggableOptions = {
    addClasses: false,
    drag: ()=> {

    },
    stack: "ui-draggable",
    stop: function (event, ui) {
        // TODO Использовать для проверки попали в контейнер или нет. Если нет, то возвращать шашку на место.
        console.log("stop: кинули шашку " + event.target.id);
    },
};

let droppableOptions = {
    addClasses: false,
    accept: (event) => {
        // TODO Использовать для проверки подходит ли нам квадрат, в который кинули. Работает при драге!!!
        return true
    },
    drop: function (event, ui) {
        // TODO Использовать для логиги после успешного перемещения шашки
        console.log("drop: кинули в квадрат " + event.target.id)
    },
    classes: {}
};

function checkForTurn(color) {
    return color === cells.turn;
}

function disableDragging(color) {
    for (let cellName in cells){
        var cell = cells[cellName];
        if (cell.checker != null && cell.checker.color === color){
            if (cell.checker.id === "w84") debugger;
            console.log(cell.checker.id);
            cell.checker.element.draggable( "disable" );
        }
    }
}

function enableDragging(color) {
    for (let cellName in cells){
        var cell = cells[cellName];
        if (cell.checker != null && cell.checker.color === color){
            cell.checker.element.draggable( "enable" );
        }
    }
}

/**
 * Function for creating inheritance
 * @param parentChild - an array that contains number of objects
 * that contains {parent: constructor, child: constructor}
 */
(function createInheritance(parentChild) {
    let f = function () {
    };
    parentChild.forEach((element) => {
        f.prototype = element.parent.prototype;
        element.child.prototype = new f();
        element.child.prototype.constructor = element.child;
    });
})(parentChild);