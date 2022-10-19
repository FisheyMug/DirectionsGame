let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img= new Image();
img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
// variables for moving
let spriteY = 430;
let spriteX = 305;
let faceDirection = 0;
let goal = 1;
let round = 1;
let speed = 100;

// variables for building coordinates
const leftBuildingX= 65;
const leftBuildingX2 = 285;
const topBuildingY= 65;
const topBuildingY2=206;

const middleBuildingX = 352;
const middleBuildingX2= 542;

const rightBuildingX = 607;
const rightBuildingX2 = 836;

const bottomBuildingY = 272;
const bottomBuildingY2 = 425;

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
            drawFrame (0, 1, spriteX, spriteY-=speed)
        }
        else if (faceDirection == 1) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame (0, 3, spriteX+= speed, spriteY) 
        }
        else if (faceDirection == 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame (0, 0, spriteX, spriteY+=speed)
        }
        else if (faceDirection == 3) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame (0, 2, spriteX-=speed, spriteY)
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
        drawFrame (0, 2, spriteX=25, spriteY)
    }
    if (spriteX >= canvas.width) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 3, spriteX=canvas.width-50, spriteY)
    }
    if (spriteY <= 0) {
       ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 1, spriteX, spriteY= 25)
    }
    if (spriteY >= canvas.height) {
       ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame (0, 0, spriteX, spriteY=460) 
    }
};

function reset() {
    spriteY = 430;
    spriteX = 305;
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
    const schoolOverlapX= ((spriteX<=leftBuildingX2 && spriteX >=leftBuildingX) || (spriteX+16<=leftBuildingX2 && spriteX+16 >= leftBuildingX));
    const schoolOverlapY = ((spriteY <=topBuildingY2 && spriteY >= topBuildingY) || (spriteY+18<= topBuildingY2 && spriteY+18 >=topBuildingY));
    if (schoolOverlapX && schoolOverlapY) {
       if (goal==1) {
           win()
       }  else reset()
    }

    const overlapX= ((spriteX<=middleBuildingX && spriteX >=middleBuildingX2) || (spriteX+16<=middleBuildingX2 && spriteX+16 >= middleBuildingX));
    const overlapY= ((spriteY <=topBuildingY2 && spriteY >=topBuildingY) || (spriteY+18<=topBuildingY2 && spriteY+18 >=topBuildingY));
    if (overlapX && overlapY) {
        if (goal==2) {
            win()
        } else reset();
    } 
    

    const policeOverlapX = ((spriteX<=rightBuildingX2 && spriteX >=rightBuildingX) || (spriteX+16<=rightBuildingX2 && spriteX+16 >= rightBuildingX))
    const policeOverlapY = ((spriteY <=topBuildingY2 && spriteY >= topBuildingY) || (spriteY+18<= topBuildingY2 && spriteY+18 >=topBuildingY));
    if (policeOverlapX && policeOverlapY) {
        if (goal==3) {
            win()
        } else reset()
    }

    const parkOverlapX = ((spriteX<=leftBuildingX2 && spriteX >= leftBuildingX) || (spriteX+16<=leftBuildingX2 && spriteX+16 >= leftBuildingX))
    const parkOverlapY = ((spriteY <=bottomBuildingY2 && spriteY >= bottomBuildingY) || (spriteY+18<= bottomBuildingY2 && spriteY+18 >=bottomBuildingY));
    if (parkOverlapX && parkOverlapY) {
        if (goal==4) {
            win()
        } else reset()
    }

    const superMarketOverlapX= ((spriteX<=middleBuildingX2 && spriteX>=middleBuildingX) || (spriteX+16<=middleBuildingX2 && spriteX+16>= middleBuildingX));
    const superMarketOverlapY= ((spriteY<=bottomBuildingY2 && spriteY>= bottomBuildingY) || (spriteY+18<=bottomBuildingY2 && spriteY+18>=bottomBuildingY));
    if (superMarketOverlapX && superMarketOverlapY) {
        if (goal==5) {
            win()
        } else reset()
    }

    const hospitalOverlapX = ((spriteX<=rightBuildingX2 && spriteX>= rightBuildingX) || (spriteX+16 <=rightBuildingX2 && spriteX+16>= rightBuildingX));
    const hospitalOverlapY = ((spriteY<=bottomBuildingY2 && spriteY>= bottomBuildingY) || (spriteY+18<=bottomBuildingY2 && spriteY+18>=bottomBuildingY));
    if (hospitalOverlapX && hospitalOverlapY) {
        if (goal == 6) {
            win()
        } else reset()
    };


};

//changes mouse style so we know it is clickable
function buildingHover(canvas, event) {
    const x = event.offsetX
    const y = event.offsetY
    const schoolOverlapX= ((x<=leftBuildingX2 && x >=leftBuildingX) || (x<=leftBuildingX2 && x>= leftBuildingX));
    const schoolOverlapY = ((y <=topBuildingY2 && y >= topBuildingY) || (y<= topBuildingY2 && y>=topBuildingY));
    const overlapX= ((x<=middleBuildingX && x >=middleBuildingX2) || (x<=middleBuildingX2 && x>= middleBuildingX));
    const overlapY= ((y <=topBuildingY2 && y >=topBuildingY) || (y<=topBuildingY2 && y>=topBuildingY));
    const policeOverlapX = ((x<=rightBuildingX2 && x >=rightBuildingX) || (x<=rightBuildingX2 && x>= rightBuildingX))
    const policeOverlapY = ((y <=topBuildingY2 && y >= topBuildingY) || (y<= topBuildingY2 && y>=topBuildingY));
    const parkOverlapX = ((x<=leftBuildingX2 && x >= leftBuildingX) || (x<=leftBuildingX2 && x >= leftBuildingX))
    const parkOverlapY = ((y <=bottomBuildingY2 && y >= bottomBuildingY) || (y<= bottomBuildingY2 && y>=bottomBuildingY));
    const superMarketOverlapX= ((x<=middleBuildingX2 && x>=middleBuildingX) || (x<=middleBuildingX2 && x>= middleBuildingX));
    const superMarketOverlapY= ((y<=bottomBuildingY2 && y>= bottomBuildingY) || (y<=bottomBuildingY2 && y>=bottomBuildingY));
    const hospitalOverlapX = ((x<=rightBuildingX2 && x>= rightBuildingX) || (x<=rightBuildingX2 && x>= rightBuildingX));
    const hospitalOverlapY = ((y<=bottomBuildingY2 && y>= bottomBuildingY) || (y<=bottomBuildingY2 && y>=bottomBuildingY));
    

    if (schoolOverlapX && schoolOverlapY) {
        canvas.style="cursor: pointer;"   
    }
    else if (overlapX && overlapY) {
        canvas.style="cursor: pointer;"   
    }  
    else if (policeOverlapX && policeOverlapY) {
        canvas.style="cursor: pointer;" 
    }
    else if (parkOverlapX && parkOverlapY) {
        canvas.style="cursor: pointer;" 
    }
    else if (superMarketOverlapX && superMarketOverlapY) {
        canvas.style="cursor: pointer;" 
    }
    else if(hospitalOverlapX && hospitalOverlapY) {
        canvas.style="cursor: pointer;" 
    } else canvas.style="cursor: cursor;" ;
    
};



//click to select goal
function buildingSelect(canvas, event) {
    reset();
    const x = event.offsetX
    const y = event.offsetY
    const schoolOverlapX= ((x<=leftBuildingX2 && x >=leftBuildingX) || (x<=leftBuildingX2 && x>= leftBuildingX));
    const schoolOverlapY = ((y <=topBuildingY2 && y >= topBuildingY) || (y<= topBuildingY2 && y>=topBuildingY));
    const overlapX= ((x<=middleBuildingX && x >=middleBuildingX2) || (x<=middleBuildingX2 && x>= middleBuildingX));
    const overlapY= ((y <=topBuildingY2 && y >=topBuildingY) || (y<=topBuildingY2 && y>=topBuildingY));
    const policeOverlapX = ((x<=rightBuildingX2 && x >=rightBuildingX) || (x<=rightBuildingX2 && x>= rightBuildingX))
    const policeOverlapY = ((y <=topBuildingY2 && y >= topBuildingY) || (y<= topBuildingY2 && y>=topBuildingY));
    const parkOverlapX = ((x<=leftBuildingX2 && x >= leftBuildingX) || (x<=leftBuildingX2 && x >= leftBuildingX))
    const parkOverlapY = ((y <=bottomBuildingY2 && y >= bottomBuildingY) || (y<= bottomBuildingY2 && y>=bottomBuildingY));
    const superMarketOverlapX= ((x<=middleBuildingX2 && x>=middleBuildingX) || (x<=middleBuildingX2 && x>= middleBuildingX));
    const superMarketOverlapY= ((y<=bottomBuildingY2 && y>= bottomBuildingY) || (y<=bottomBuildingY2 && y>=bottomBuildingY));
    const hospitalOverlapX = ((x<=rightBuildingX2 && x>= rightBuildingX) || (x<=rightBuildingX2 && x>= rightBuildingX));
    const hospitalOverlapY = ((y<=bottomBuildingY2 && y>= bottomBuildingY) || (y<=bottomBuildingY2 && y>=bottomBuildingY));
    
    if (overlapX && overlapY) {
      goal=2
    }   
    else if (schoolOverlapX && schoolOverlapY) {
        goal = 1
    }
    else if (policeOverlapX && policeOverlapY) {
        goal=3
    }
    else if (parkOverlapX && parkOverlapY) {
        goal=4
    }
    else if (superMarketOverlapX && superMarketOverlapY) {
        goal= 5
    }
    else if (hospitalOverlapX && hospitalOverlapY) {
        goal=6
    }
};

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
  