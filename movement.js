/**
 * Created by Alexander Balabolov
 * 06.01.2018
 * */

'use strict';
let cells = {dragChecker: null};

/**
 * An object for every checker.
 * @field element - jQuery element of cell
 * @field offsetLeft - offset from left body
 * @field offsetTop - offset from top body
 * @field id - the id of current cell
 * @field checker - current checker in this cell
 * */
function Cell(cell, cellId, offsetLeft, offsetTop) {
    this.element = $(cell);
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.id = cellId;
    this.checker = {};
}

/**
 * Fires all cells for listeners to drop
 */
function fillCells(check, coordinateY, coordinateX, offsetLeft, offsetTop) {
    let cellId = "" + coordinateY + coordinateX;
    let cell = cells[cellId] = new Cell(check, cellId, offsetLeft, offsetTop);
    cell.element
        .droppable(droppableOptions);
}

let droppableOptions = {
    accept:"cell"
};

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
 * */
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

    /**
     * Sets current checker to the top of all checkers
     */
    Checker.prototype.setCheckerToTop = function() {
        this.element.parent().append(this.element);
    };

    /**
     * Updates the difference between mouse and element
     */
    Checker.prototype.updateDiff = function (event) {
        this.diffTop = event.clientY - this.offsetTop;
        this.diffLeft = event.clientX - this.offsetLeft;
    };

    /**
     * Updates offset in object after successful drop.
     * When the next time clicks on this element,
     * the difference between mouse and element will count from last position
     */
    Checker.prototype.updateCheckerOffset = function (event) {
        this.offsetTop = event.clientY - this.diffTop;
        this.offsetLeft = event.clientX - this.diffLeft;
    }
}

/**
 * Fires all checkers for listeners to drag
 */
function fillCheckers(ches, prefix, coordinateY, coordinateX, offsetLeft, offsetTop) {
    let cellId = "" + coordinateY + coordinateX;
    let checkerId = prefix + coordinateY + coordinateX;
    let checker = cells[cellId].checker = new Checker(ches, prefix, checkerId, offsetLeft, offsetTop);
    checker.element.css("cursor", "pointer");

    checker.element
        .draggable(draggableOptions)
        .mousedown((event) => {
            checker.setCheckerToTop();
            checker.updateDiff(event);
            cells.dragChecker = checker;
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
    scope: "cell",
    stop: function (event, ui) {
        // uses when drag stops
    },
    drag: (event) => {
        let checker = cells.dragChecker;
        checker.offsetLeft = event.clientX - checker.diffLeft;
        checker.offsetTop = event.clientY - checker.diffTop;
        checker.element.attr('y', "" + checker.offsetTop);
        checker.element.attr('x', "" + checker.offsetLeft);
    }
};

