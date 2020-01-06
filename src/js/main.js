let myCanvas = document.getElementById('canvas_one');
let canvasLayerOne = document.getElementById('canvas_two');
let ctx_layer = canvasLayerOne.getContext("2d");
let ctx = myCanvas.getContext("2d");
let fillTool = document.getElementById('bucket');
let drawingTool = document.getElementById('pencil');
let eraserTool = document.getElementById('eraser');
let strokeTool = document.getElementById('stroke');
let chooseColor = document.getElementById('pipette');
let palleteCurrentColor = document.getElementById('currentColor');
let palletePrevColor = document.getElementById('prevColor');
let btnPrevColor = document.getElementById('btnPrevColor');
let selectSize = document.getElementById('selectSize');
let selectPencilSize = document.getElementById('selectSizePencil');
let pixelSize = 4;
let palleteColor;
let isPress = false;
let lastY = 0;
let lastX = 0;

let defultColor = palleteCurrentColor.value;
palleteColor = defultColor;

myCanvas.width = 512;
myCanvas.height = 512;
canvasLayerOne.width = 512;
canvasLayerOne.height = 512;
palletePrevColor.style.background = defultColor;



function RGBToHex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function activeBtn() {
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

function fillCanvas() {
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

function prevColor() {
    if (palleteColor != palleteCurrentColor.value)
        palletePrevColor.style.background = palleteColor;
}

function drawOnCanvas(e) {
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

function choicePencilSize() {
    let sizePencil = selectPencilSize.value;
    let pixelSizeOnCanvas = selectSize.value;
    pixelSize = canvasLayerOne.width / pixelSizeOnCanvas * sizePencil;
}

function eraserPicture(e) {
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

function pipette(e) {
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

function createPixelsOnCanvas(sizePixel) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let countRowAndCol = myCanvas.width / sizePixel;
    for (let i = 0; i < countRowAndCol; i++)
        for (let j = 0; j < countRowAndCol; j++) {
            ctx.strokeStyle = '#00BCD4';
            ctx.strokeRect(sizePixel * i, sizePixel * j, sizePixel, sizePixel);
        }
    let defaultSize = selectPencilSize.getElementsByTagName('option');
    for (let i = 0; i < defaultSize.length; i++) {
        if (defaultSize[i].value === '1') defaultSize[i].selected = true;
    }
}

function choiceCanvasSize() {
    let size = selectSize.value;
    pixelSize = myCanvas.width / size;
    createPixelsOnCanvas(pixelSize);
}

function RoundToNearest(nearestValue, lastX, lastY) {
    let lastDigit = lastX % nearestValue;

    let point = {
        X: 0,
        Y: 0
    };

    if (lastDigit >= nearestValue / 2) {
        point.X = lastX - lastDigit + nearestValue;
    }
    else {
        point.X = lastX - lastDigit;
    }

    lastDigit = lastY % nearestValue;

    if (lastDigit >= nearestValue / 2) {
        point.Y = lastY - lastDigit + nearestValue;
    }
    else {
        point.Y = lastY - lastDigit;
    }

    return point;
}

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

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 66) {
        fillTool.classList.add('active');
        drawingTool.classList.remove('active');
        chooseColor.classList.remove('active');
    }

    if (e.keyCode == 80) {
        drawingTool.classList.add('active');
        fillTool.classList.remove('active');
        chooseColor.classList.remove('active');
    }

    if (e.keyCode == 67) {
        chooseColor.classList.add('active');
        fillTool.classList.remove('active');
        drawingTool.classList.remove('active');
    };
});

selectSize.addEventListener('change', choiceCanvasSize);
selectSizePencil.addEventListener('change', choicePencilSize);




