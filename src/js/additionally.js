export function RoundToNearest(nearestValue, lastX, lastY) {
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

export function RGBToHex(rgb) {
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