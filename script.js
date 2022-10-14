let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img= new Image();
img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
// variables for moving
let spriteY = 457;
let spriteX = 307;
let faceDirection = 0;
let goal = 1;
let round = 1;

// variables for building coordinates
const schoolX= 65;
const schoolX2 = 288;
const schoolY= 65;
const schoolY2=206;

const postOfficeX = 352;
const postOfficeX2= 542;
const postOfficeY= 65;
const postOfficeY2= 206;

const straightBtn = document.querySelector('#straight');
const rightBtn = document.querySelector('#right');
const leftBtn = document.querySelector('#left');
// variables for animation scaling/maths
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

//event listeners for buttons
straightBtn.addEventListener("click", () => {
    move(straight)});
rightBtn.addEventListener("click", () => {
  move(right)
});
leftBtn.addEventListener("click", () => {
  move(left)
});


//event listeners for canvas
canvas.addEventListener('mousemove', (e) => {
    buildingHover(canvas, e)
  })
canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e)
    buildingSelect(canvas, e)
  })


// functions to help firgure things out

//function to help figure out canvas coordinates
const getCursorPosition = (canvas, event) => {
    const x = event.offsetX
    const y = event.offsetY
    console.log(x, y)
  }

//changes mouse style so we know it is clickable
function buildingHover(canvas, event) {
    const x = event.offsetX
    const y = event.offsetY
    const overlapX= ((x<=150 && x >=15) || (x+16<=150 && x+16 >= 15));
    const overlapY= ((y <=120 && y >= 0) || (y+18<= 120 && y+18 >=0));
    if (overlapX && overlapY) {
        canvas.style="cursor: pointer;"   
    }  else  canvas.style="cursor: cursor;" 
}

canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
  buildingSelect(canvas, e)
})

///// start of the game functions

  img.onload = function() {
    init();
};

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame (0, 1, spriteX, spriteY);
}


//does the sprite sheet maths for us
// credit/tutorial used to figure this out---https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
function drawFrame (frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY*height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

function move (direction) {
    //straight
    if (direction == straight) {
        if (faceDirection == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame (0, 1, spriteX, spriteY-=50)
        }
        else if (faceDirection == 1) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame (0, 3, spriteX+= 50, spriteY) 
        }
        else if (faceDirection == 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame (0, 0, spriteX, spriteY+=50)
        }
        else if (faceDirection == 3) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame (0, 2, spriteX-=50, spriteY)
        }
    }    

    //right
    if (direction ==right) {
        if (faceDirection == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection +=1;
        drawFrame (0, 3, spriteX, spriteY);
        }
        else if (faceDirection == 1) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection +=1;
        drawFrame (0, 0, spriteX, spriteY); 
        }
        else if (faceDirection == 2) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection +=1;
        drawFrame (0, 2, spriteX, spriteY); 
        }
        else if (faceDirection == 3) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection =0;
        drawFrame (0, 1, spriteX, spriteY); 
        }
    }

    //left
    if (direction == left) {
        if (faceDirection == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =3;
        drawFrame (0, 2, spriteX, spriteY);
        }
        else if (faceDirection == 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =0;
        drawFrame (0, 1, spriteX, spriteY);
        }
        else if (faceDirection == 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection -=1;
        drawFrame (0, 3, spriteX, spriteY);
        }
        else if (faceDirection == 3) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection -=1;
        drawFrame (0, 0, spriteX, spriteY);
        }
    }
    borderDetection()
    //drawBuildings();
    buildingDetection();
};

//collision detection/ border edge reset
function borderDetection() {
    if (spriteX <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 2, spriteX+=50, spriteY)
    }
    if (spriteX >= canvas.width) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 3, spriteX-=50, spriteY)
    }
    if (spriteY <= 0) {
       ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 1, spriteX, spriteY+=50)
    }
    if (spriteY >= canvas.height) {
       ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 0, spriteX, spriteY-=50) 
    }
};

function reset() {
    spriteY = 457;
    spriteX = 307;
    faceDirection = 0;
    if (goal == 1) {
        goal = 2;
    }
    else if (goal ==2) {
        goal = 3;
    }
     else if (goal == 3) {
        goal=1
    };
    init();
};

//https://yonatankra.com/how-to-write-a-simple-collision-detector-in-html5-canvas-and-javascript/
// building detection
function buildingDetection() {
    const overlapX= ((spriteX<=postOfficeX && spriteX >=postOfficeX2) || (spriteX+16<=postOfficeX2 && spriteX+16 >= postOfficeX));
    const overlapY= ((spriteY <=postOfficeY2 && spriteY >= postOfficeY) || (spriteY+18<= postOfficeY2 && spriteY+18 >=postOfficeY));
    if (overlapX && overlapY) {
        if (goal==1) {
            win()
        } else reset();
    } 

    const schoolOverlapX= ((spriteX<=schoolX2 && spriteX >=schoolX) || (spriteX+16<=schoolX2 && spriteX+16 >= schoolX));
    const schoolOverlapY = ((spriteY <=schoolY2 && spriteY >= schoolY) || (spriteY+18<= schoolY2 && spriteY+18 >=schoolY));
    if (schoolOverlapX && schoolOverlapY) {
       if (goal==2) {
           win()
       }  else reset()
    }

    const b3OverlapX = ((spriteX<=590 && spriteX >=510) || (spriteX+16<=590 && spriteX+16 >= 510))
    const b3OverlapY = ((spriteY <=120 && spriteY >= 0) || (spriteY+18<= 120 && spriteY+18 >=0));
    if (b3OverlapX && b3OverlapY) {
        if (goal==3) {
            win()
        } else reset()
    }
};

//click to select goal
function buildingSelect(canvas, event) {
    const x = event.offsetX
    const y = event.offsetY
    const overlapX= ((x<=150 && x >=15) || (x+16<=150 && x+16 >= 15));
    const overlapY= ((y <=120 && y >= 0) || (y+18<= 120 && y+18 >=0));
    if (overlapX && overlapY) {
      goal=1  
    }   
}

function drawStar(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;
      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
          x=cx+Math.cos(rot)*outerRadius;
          y=cy+Math.sin(rot)*outerRadius;
          ctx.lineTo(x,y)
          rot+=step
  
          x=cx+Math.cos(rot)*innerRadius;
          y=cy+Math.sin(rot)*innerRadius;
          ctx.lineTo(x,y)
          rot+=step
      }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='yellow';
    ctx.stroke();
    ctx.fillStyle='gold';
    ctx.fill();
    }
  
  function win() {
    round +=1;
    reset();
    drawStar(90,70,5,30,15);
  }
  