const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction;

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue = hue >= 360 ? 0 : hue + 1;

    direction = ctx.lineWidth >= 100 || ctx.lineWidth <= 1 ? !direction : direction;
    ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth - 1;
}

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    ctx.lineWidth = 1;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('mouseleave', () => isDrawing = false);
