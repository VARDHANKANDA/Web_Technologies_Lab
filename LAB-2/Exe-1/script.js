const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Blue rectangle (left)
ctx.fillStyle = "orange";
ctx.fillRect(50, 50, 150, 80);

// Red circle (right)
ctx.beginPath();
ctx.arc(350, 90, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

// Centered text
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("HTML5 Canvas", canvas.width / 2, 170);

// Green line (bottom)
ctx.beginPath();
ctx.moveTo(50, 220);
ctx.lineTo(450, 220);
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();
