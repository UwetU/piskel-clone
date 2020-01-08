import { fillTool, drawingTool, eraserTool, chooseColor, strokeTool, keyboardEvent } from './main.js';

export function activeBtn() {
    this.classList.add('active');
    if (this == fillTool) {
        drawingTool.classList.remove('active');
        chooseColor.classList.remove('active');
        eraserTool.classList.remove('active');
        strokeTool.classList.remove('active');
    } else if (this == drawingTool) {
        fillTool.classList.remove('active');
        chooseColor.classList.remove('active');
        eraserTool.classList.remove('active');
        strokeTool.classList.remove('active');
    } else if (this == chooseColor) {
        drawingTool.classList.remove('active');
        fillTool.classList.remove('active');
        eraserTool.classList.remove('active');
        strokeTool.classList.remove('active');
    } else if (this == eraserTool) {
        drawingTool.classList.remove('active');
        fillTool.classList.remove('active');
        strokeTool.classList.remove('active');
        chooseColor.classList.remove('active');
    } else {
        drawingTool.classList.remove('active');
        fillTool.classList.remove('active');
        eraserTool.classList.remove('active');
        chooseColor.classList.remove('active');
    }
}

export function shortcutKey(e) {
    if (e.keyCode === keyboardEvent.fill) {
        fillTool.classList.add('active');
        drawingTool.classList.remove('active');
        chooseColor.classList.remove('active');
        eraserTool.classList.remove('active');
    }

    if (e.keyCode === keyboardEvent.pen) {
        drawingTool.classList.add('active');
        fillTool.classList.remove('active');
        chooseColor.classList.remove('active');
        eraserTool.classList.remove('active');
    }

    if (e.keyCode === keyboardEvent.choose) {
        chooseColor.classList.add('active');
        fillTool.classList.remove('active');
        drawingTool.classList.remove('active');
        eraserTool.classList.remove('active');
    }

    if (e.keyCode === keyboardEvent.erase) {
        eraserTool.classList.add('active');
        fillTool.classList.remove('active');
        drawingTool.classList.remove('active');
        chooseColor.classList.remove('active');
    }
}