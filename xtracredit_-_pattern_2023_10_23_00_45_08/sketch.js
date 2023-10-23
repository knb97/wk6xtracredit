
let COLS = createCols("https://coolors.co/7a306c-688e26-a9e4ef-e88873-f3a712");
let PALETTE;

function setup() {
	const s = min(500, 500);
	createCanvas(s, s);
	background(200);
	frameRate(0.80);
}

function draw() {
	PALETTE = shuffle(COLS, true);
	background(PALETTE[3]);
	PALETTE = PALETTE.slice(0, 3);
	
	rectMode(CENTER);
	
  //square
	const d = 500 * 0.2;
	pattern(randPattern(d));
    
    squarePattern(240, 240, 300);


}


function typo(cx, cy, w, h, isp)
{
	const structure = isp ? 
				[[-9, -9],[-9, -9],[0, 1],[-1, -1], [-1, 2], [-1, -9],[2, -9]] :
				[[-1, 2],[-1, -9],[3, 1],[-9, -1], [0, 2], [-9, -9],[-9, -9]] ;

	const xNum = structure[0].length;
	const xSpan = w / xNum;
	const yNum =  structure.length;
	const ySpan = h / yNum;
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	push();
	translate(cx - w /2, cy - h / 2);
	
	for(let yi = 0; yi < yNum; yi++)
	{
		for(let xi = 0; xi < xNum; xi++)
		{
			const isDraw = structure[yi][xi];
			if(isDraw >= -1)
			{
				const x = xSpan * (xi + 0.5);
				const y = ySpan * (yi + 0.5);
				patternColors(shuffle(PALETTE));
				pattern(randPattern(xSpan));
				patternAngle(int(random(4)) * PI / 4);
				push();
				translate(x, y);
				if(isDraw >= 0){
					rotate(isDraw * PI);
					const rn = random();
					if(rn > 0.66)rectPattern(0, 0, xSpan, ySpan, xSpan, 0, 0, 0);
					else if(rn > 0.33) arcPattern(xSpan / 2, ySpan / 2, xSpan * 2, ySpan * 2, PI, TAU / 4 * 3);
					else trianglePattern(xSpan / 2, ySpan / 2, -xSpan / 2, ySpan / 2, xSpan / 2, -ySpan / 2);
				}
				else
				{
					rectPattern(0, 0, xSpan, ySpan);
				}
				pop();
			}
		}
	}
	pop();
}


function randPattern(t)
{
	const ptArr = [
		PTN.stripeCircle(t / int(random(3, 10))),
		PTN.stripeRadial(TAU /  int(random(2, 30))),
		PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
		PTN.dot(t / 10, t / 10 * random(0.2, 1)),
		PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
	]
	return random(ptArr);
}


function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}
