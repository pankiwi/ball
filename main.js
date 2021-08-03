const canvas = document.getElementById("main")

canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext("2d")

const x = canvas.width
const y = canvas.height

class ball {
  constructor(x, y, radius, color, velx, vely, id , angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color
    this.velx = velx
    this.vely = vely
    this.id = id
    this.angle = angle
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  collides() {
    if (this.x <= 0 || this.x >= x) {
      this.velx = -this.velx
    }
    if (this.y <= 0 || this.y >= y) {
      this.vely = -this.vely
    }
  }
  update() {
    this.draw()
    this.collides()
    this.x = this.x  + this.velx
    this.y = this.y   + this.vely
  }
}
const balls = []



function Animation() {
  requestAnimationFrame(Animation)
  c.clearRect(0, 0, canvas.width, canvas.height)
  balls.forEach(ball => {
    ball.update()
  })
}



canvas.addEventListener('click', (event) => {
  const coords = {
    x: x / 2,
    y: y / 2
  }
  const angle = Math.atan2(event.clientY - coords.y, event.clientX - coords.x)
  const vel = 3
  balls.push(new ball(coords.x, coords.y, 10, 'blue', Math.cos(angle) * vel, Math.sin(angle) * vel, Math.random() * 100 + Math.random() * 100,0))
})

Animation()