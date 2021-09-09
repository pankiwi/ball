const c = document.getElementById("main").getContext("2d")

c.canvas.width = innerWidth
c.canvas.height = innerHeight

const MAX_x = c.canvas.width
const MAX_y = c.canvas.height

//make simple background;)
class ball {
  constructor(x, y, radius, color, speed, angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color
    this.speed = speed
    this.angle = angle
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  updateCoords() {
    //get angle with vel
    let angle = this.angle * (Math.PI / 180)

    this.x += Math.cos(angle) * this.speed //cos x
    this.y += Math.sin(angle) * this.speed //sen y
  }
  update() {
    this.updateCoords()
    this.draw()
  }

}

let balls_object = []



function Animation() {
  requestAnimationFrame(Animation)
  c.fillStyle = "rgba(100,100,100,0.2)"
  c.fillRect(0, 0, MAX_x, MAX_y)
  balls_object.forEach((ball, index_ball_1) => {
    ball.update()
    balls_object.forEach((ball_2, index_ball_2) => {
      //check collison other ball
      if(index_ball_1 != index_ball_2){
      const dist = Math.hypot(ball_2.x - ball.x, ball_2.y - ball.y)
      
      if (dist - ball.radius - ball_2.radius < 1) {
        ball.angle *= 2
        ball_2.angle *= 2
      }
      }
    })
    if (ball.x - ball.radius < 0) {
      ball.angle = ball.angle * 2
    }
    if (ball.x + ball.radius > MAX_x) {
      ball.angle = ball.angle * 2
    }
    if (ball.y - ball.radius < 0) {
      ball.angle = ball.angle * 2
    }
    if (ball.y + ball.radius > MAX_y) {
      ball.angle = ball.angle * 2
    }
  })
}


function GetAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

c.canvas.addEventListener('click', (event) => {
  const coords = {
    x: MAX_x / 2,
    y: MAX_y / 2
  }
  // const angle = Math.atan2(event.clientY - coords.y, event.clientX - coords.x)
  let angle = Math.atan2(event.clientY - MAX_y / 2, event.clientX - MAX_x / 2) * 180 / Math.PI;

  balls_object.push(new ball(coords.x, coords.y, 10, 'blue', 2, angle))
  console.log(angle)
})

Animation()