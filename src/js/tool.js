import { fillTool, drawingTool, eraserTool, chooseColor, ctx_layer, canvasLayerOne, isPress, palleteColor, palletePrevColor, palleteCurrentColor, selectPencilSize, myCanvas } from './main.js';
import { RoundToNearest, RGBToHex } from './additionally.js';
import { createPixelsOnCanvas } from './pixelGrid.js'

let lastY = 0;
let lastX = 0;
export let pixelSize = 4;

export function fillCanvas() {
    if (fillTool.classList.contains('active')) {
        ctx_layer.globalCompositeOperation = "source-over";
        let countRowAndCol = canvasLayerOne.width / pixelSize;
        for (let i = 0; i < countRowAndCol; i++)
            for (let j = 0; j < countRowAndCol; j++) {
                ctx_layer.fillStyle = palleteCurrentColor.value;
                ctx_layer.fillRect(pixelSize * i, pixelSize * j, pixelSize, pixelSize);
            }
    } else {
        return;
    }
}

export function prevColor() {
    if (palleteColor != palleteCurrentColor.value)
        palletePrevColor.style.background = palleteColor;
}

export function drawOnCanvas(e) {
    if (drawingTool.classList.contains('active')) {
        if (!isPress) return;
        ctx_layer.globalCompositeOperation = "source-over";
        ctx_layer.fillStyle = palleteCurrentColor.value;
        let point = RoundToNearest(pixelSize, e.offsetX, e.offsetY);
        ctx_layer.fillRect(point.X, point.Y, pixelSize, pixelSize);
        ctx_layer.fill();
        [lastX, lastY] = [point.X, point.Y];
    }
}

export function choicePencilSize() {
    let sizePencil = selectPencilSize.value;
    let pixelSizeOnCanvas = selectSize.value;
    pixelSize = canvasLayerOne.width / pixelSizeOnCanvas * sizePencil;
}

export function eraserPicture(e) {
    if (eraserTool.classList.contains('active')) {
        if (!isPress) return;
        let x = e.offsetX;
        let y = e.offsetY;
        ctx_layer.globalCompositeOperation = 'destination-out';

        ctx_layer.beginPath();
        ctx_layer.strokeStyle = "rgba(255,255,255,1)";
        ctx_layer.arc(x, y, 10, 0, 2 * Math.PI);
        ctx_layer.fill();

        ctx_layer.lineWidth = 5;
        ctx_layer.moveTo(lastX, lastY);
        ctx_layer.lineTo(x, y);
        ctx_layer.stroke();
        ctx_layer.closePath();
        [lastX, lastY] = [x, y];
    }
}

export function pipette(e) {
    if (chooseColor.classList.contains('active')) {
        ctx_layer.globalCompositeOperation = "source-over";
        let dataImage = ctx_layer.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        let currentColor = 'rgb(';
        for (let i = 0; i < dataImage.length; i++) {
            if (i == 3) {
                currentColor += ')';
            } else {
                currentColor += dataImage[i] + ', ';
            }
        }
        palleteCurrentColor.value = RGBToHex(currentColor);
        prevColor();
    }
}

export function choiceCanvasSize() {
    let size = selectSize.value;
    pixelSize = myCanvas.width / size;
    ctx_layer.clearRect(0, 0, canvasLayerOne.width, canvasLayerOne.height);
    createPixelsOnCanvas(pixelSize);
}