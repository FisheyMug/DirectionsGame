let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img= new Image();
img.src = "sprite.png"; 
// Encountered stange bug when it came time to draw this image to the canvas once hosted. 
//At first I thought changing the location to local image file, then to local project file fixed it, 
//but the next day I had the same problem. Next I changed img onload to window on load, to no real change, 
//finally changing the name of the image to have no capital letters did the trick.
//Uncaught DOMException: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement 
//provided is in the 'broken' state. at drawFrame,
// and get image 404 are what the dev tools threw as errors etc.
let player=1;

// variables for moving
let spriteY = 450;
let spriteX = 308;
let faceDirection = 0;
let goal = 1;
let round = 1;
let speed = 100;

//variables for movement positions
const leftX=20;
const leftBuildingMiddleX=175;
const middleLeftX=308;
const middleBuildingMiddleX=435;
const middleRightX=565;
const rightBuildingMiddleX=705;
const rightX=860;

const topY=15;
const topBuildingMiddleY=120;
const middleY=218;
const bottomBuildingMiddleY=340;
const bottomY=450;


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
const sentanceBox = document.getElementById("sentance")

// variables for animation scaling/maths
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

//event listeners for buttons and keys
straightBtn.addEventListener("click", () => {
    move(straight)});
rightBtn.addEventListener("click", () => {
  move(right)
});
leftBtn.addEventListener("click", () => {
  move(left)
});
document.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp"){
      move(straight);
    }
    else if (event.key === "ArrowLeft") {
        move(left)
    }
    else if (event.key === "ArrowRight") {
        move(right)
    }
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

  window.onload = function() {
    init();
    sentance();
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
    //variable speed
    if (faceDirection == 1 || faceDirection == 3) {
        speed= 60;
    } else speed = 100;
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
    buildingDetection();
    sentance();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (round==1) {
        spriteY = bottomY;
        spriteX = middleLeftX;
        faceDirection = 0;
        drawFrame (0, 1, spriteX, spriteY);
    } else if (round==2) {
        spriteY = middleY;
        spriteX = rightX;
        faceDirection = 3;
        drawFrame (0, 2, spriteX, spriteY)
    } else if (round == 3) {
        spriteX = middleLeftX;
        spriteY = topY;
        faceDirection= 2;
        drawFrame (0, 0, spriteX, spriteY)
    } else if (round==4) {
        spriteX= middleLeftX;
        spriteY=middleY
        faceDirection=0;
        drawFrame (0, 1, spriteX, spriteY);
    } else if (round==5) {
        spriteX=rightX
        spriteY=topY
        faceDirection = 3;
        drawFrame (0, 2, spriteX, spriteY)
    } else if (round == 6) {
        spriteX=leftX
        spriteY=topY
        faceDirection = 2;
        drawFrame (0, 0, spriteX, spriteY)
    } else if (round == 7) {
        spriteX=middleRightX
        spriteY=middleY
        faceDirection = 3;
        drawFrame (0, 2, spriteX, spriteY)
    } else if (round==8) {
        spriteX=rightX
        spriteY=bottomY
        faceDirection = 0;
        drawFrame (0, 1, spriteX, spriteY)
    } else if (round==9) {
        spriteX=middleRightX
        spriteY=bottomY
        faceDirection = 3;
        drawFrame (0, 2, spriteX, spriteY)
    } else if (round==10) {
        spriteX=leftX
        spriteY=bottomY
        faceDirection = 1;
        drawFrame (0, 3, spriteX, spriteY)
    } else if (round == 11) {
        spriteX=middleRightX
        spriteY=topY
        faceDirection = 3;
        drawFrame (0, 2, spriteX, spriteY)
    } else if (round == 12) {
        spriteX=leftX
        spriteY=middleY
        faceDirection = 1;
        drawFrame (0, 3, spriteX, spriteY)
    }
    
    else {
        spriteY = 430;
        spriteX = 305;
        faceDirection = 0;
        drawFrame (0, 1, spriteX, spriteY)
    }

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
      player=2;
    }   
    else if (schoolOverlapX && schoolOverlapY) {
        goal = 1
        player=2;
    }
    else if (policeOverlapX && policeOverlapY) {
        goal=3
        player=2;
    }
    else if (parkOverlapX && parkOverlapY) {
        goal=4
        player=2;
    }
    else if (superMarketOverlapX && superMarketOverlapY) {
        goal= 5
        player=2;
    }
    else if (hospitalOverlapX && hospitalOverlapY) {
        goal=6
        player=2;
    }
    sentance();
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
    if (round > 12) {
        round = 1
    };
    goal +=1;
    if (goal > 6) {
        goal = 1
    };
    drawStar(447,270,5,250,125);
    setTimeout(()=>{reset()},3000)
    player=1;
  }
  
  function sentance() {
    if (player==1) {
        if (goal == 1) {
            sentanceBox.innerHTML = "Where is the School?"
        }
        else if (goal == 2) {
            sentanceBox.innerHTML="Where is the Post Office?"
        } else if (goal == 3) {
            sentanceBox.innerHTML="Where is the Police Station?"
        }
        else if (goal == 4) {
            sentanceBox.innerHTML="Where is the Park?"
        }
        else if (goal == 5) {
            sentanceBox.innerHTML="Where is the Supermarket?"
        }
        else if (goal== 6) {
            sentanceBox.innerHTML="Where is the Hospital?"
        }    
    }
    else if (player==2) {
        sentanceBox.innerHTML= "Where is the ______?"
    }
  };