import { fillCanvas, prevColor, drawOnCanvas, choicePencilSize, eraserPicture, pipette, pixelSize, choiceCanvasSize } from './tool.js';
import { createPixelsOnCanvas } from './pixelGrid.js';
import { activeBtn, shortcutKey } from './chooseTool.js'

//объявление переменных
export let myCanvas = document.getElementById('canvas_one');
export let canvasLayerOne = document.getElementById('canvas_two');
export let ctx_layer = canvasLayerOne.getContext('2d');
export let fillTool = document.getElementById('bucket');
export let drawingTool = document.getElementById('pencil');
export let eraserTool = document.getElementById('eraser');
export let chooseColor = document.getElementById('pipette');
export let ctx = myCanvas.getContext('2d');
export let strokeTool = document.getElementById('stroke');
export let palleteCurrentColor = document.getElementById('currentColor');
export let palletePrevColor = document.getElementById('prevColor');
let btnPrevColor = document.getElementById('btnPrevColor');
let selectSize = document.getElementById('selectSize');
let addFrame = document.getElementById('newFrame');


let canvasFrameGrid = document.getElementById('frameGridCanvas');
let ctxFrameGrid = canvasFrameGrid.getContext('2d');
export let canvasFrameDraw = document.getElementById('frameDrawCanvas');
export let ctxFrameDraw = canvasFrameDraw.getContext('2d');




export let selectPencilSize = document.getElementById('selectSizePencil');
export let keyboardEvent = {
    choose: 67,
    pen: 80,
    fill: 66,
    erase: 69
};
export let palleteColor;
export let isPress = false;
let lastX = 0;
let lastY = 0;
let defultColor = palleteCurrentColor.value;


// действия с переменными
palleteColor = defultColor;
myCanvas.width = 512;
myCanvas.height = 512;
canvasLayerOne.width = 512;
canvasLayerOne.height = 512;
canvasFrameGrid.width = 128;
canvasFrameGrid.height = 128;
canvasFrameDraw.width = 128;
canvasFrameDraw.height = 128;
palletePrevColor.style.background = defultColor;


//вызов функций 
createPixelsOnCanvas(pixelSize);
fillTool.addEventListener('click', activeBtn);
drawingTool.addEventListener('click', activeBtn);
chooseColor.addEventListener('click', activeBtn);
eraserTool.addEventListener('click', activeBtn);
strokeTool.addEventListener('click', activeBtn);
btnPrevColor.addEventListener('click', () => {
    let currentColor = palleteCurrentColor.value;
    palleteCurrentColor.value = RGBToHex(palletePrevColor.style.background);
    palletePrevColor.style.background = currentColor;
});
palleteCurrentColor.addEventListener('change', () => {
    prevColor();
    palleteColor = palleteCurrentColor.value;
});

canvasLayerOne.addEventListener('click', fillCanvas);
canvasLayerOne.addEventListener('click', pipette);
canvasLayerOne.addEventListener('mousemove', drawOnCanvas);
canvasLayerOne.addEventListener('mousemove', eraserPicture);
canvasLayerOne.addEventListener('mousedown', (e) => {
    isPress = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvasLayerOne.addEventListener('mouseup', () => isPress = false);
canvasLayerOne.addEventListener('mouseout', () => isPress = false);

document.addEventListener('keydown', shortcutKey);

selectSize.addEventListener('change', choiceCanvasSize);
selectSizePencil.addEventListener('change', choicePencilSize);


addFrame.addEventListener('click', () => {
    let frame = document.createElement('div');
    frame.classList.add('frame');
    addFrame.insertAdjacentElement('beforebegin', frame);
});

document.addEventListener('DOMContentLoaded', () => {
    let imageDataGrid = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
    ctxFrameGrid.putImageData(imageDataGrid, 0, 0, 0, 0, canvasFrameGrid.width, canvasFrameGrid.height);
    ctxFrameDraw.scale(0.5, 0.5);
    ctxFrameDraw.scale(0.5, 0.5);

    selectSize.addEventListener('change', () => {
        imageDataGrid = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
        ctxFrameGrid.putImageData(imageDataGrid, 0, 0, 0, 0, canvasFrameGrid.width, canvasFrameGrid.height);
        canvasFrameDraw.width = canvasFrameDraw.width;
        ctxFrameDraw.scale(0.5, 0.5);
        ctxFrameDraw.scale(0.5, 0.5);
    });

    canvasLayerOne.addEventListener('mouseup', () => {
        ctxFrameDraw.drawImage(canvasLayerOne, 0, 0);
    });
});







