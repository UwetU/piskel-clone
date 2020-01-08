import { ctx, myCanvas, selectPencilSize } from './main.js';

export function createPixelsOnCanvas(sizePixel) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let countRowAndCol = myCanvas.width / sizePixel;
    for (let i = 0; i < countRowAndCol; i++)
        for (let j = 0; j < countRowAndCol; j++) {
            ctx.strokeStyle = '#3DA35D';
            ctx.strokeRect(sizePixel * i, sizePixel * j, sizePixel, sizePixel);
        }
    let defaultSize = selectPencilSize.getElementsByTagName('option');
    for (let i = 0; i < defaultSize.length; i++) {
        if (defaultSize[i].value === '1') defaultSize[i].selected = true;
    }
}