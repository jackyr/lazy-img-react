const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1;
canvas.height = 1;
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle='#cccccc';
ctx.fill();
console.log(canvas.toDataURL('image/png'));
export default canvas.toDataURL('image/png');
