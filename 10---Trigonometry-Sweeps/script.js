const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 700
canvas.height = 900

ctx.lineWidth = 10
ctx.shadowOffsetX = 2
ctx.shadowOffsetY = 2
ctx.shadowColor = 'black'

const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient1.addColorStop('0.2', 'pink')
gradient1.addColorStop('0.3', 'red')
gradient1.addColorStop('0.4', 'orange')
gradient1.addColorStop('0.5', 'yellow')
gradient1.addColorStop('0.6', 'green')
gradient1.addColorStop('0.7', 'turquoise')
gradient1.addColorStop('0.8', 'violet')
const gradient2 = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.5, 70, canvas.width * 0.5, canvas.height * 0.5, 400)
gradient2.addColorStop('0.2', 'green')
gradient2.addColorStop('0.5', 'red')
gradient2.addColorStop('0.8', 'blue')

class Line {
    constructor(canvas) {
        this.canvas = canvas
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.history = [{x: this.x, y: this.y}]
        this.lineWidth = Math.floor(Math.random() * 15 + 1)
        this.hue = Math.floor(Math.random() * 360)
        this.maxLength = Math.floor(Math.random() * 150 + 10)
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = 7
        this.lifeSpan = this.maxLength * 2
        this.timer = 0
        this.angle = 0
        this.curve = 30
    }
    draw(context) {
        context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)'
        context.lineWidth = this.lineWidth
        context.beginPath()
        context.moveTo(this.history[0].x, this.history[0].y)
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y)
        }
        context.stroke()
    }
    update() {
        this.timer++
        this.angle += 0.1
        if (this.timer < this.lifeSpan) {
            this.x += Math.sin(this.angle) * this.curve
            this.y += this.speedY + Math.random() * 20 - 10
            this.history.push({ x: this.x, y: this.y })
            if (this.history.length > this.maxLength) {
                this.history.shift()
            }
        } else if (this.history.length <= 1) {
            this.reset()
        } else {
            this.history.shift()
        }
    }
    reset() {
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.history = [{ x: this.x, y: this.y }]
        this.timer = 0
    }
}

const linesArray = []
const numberOfLines = 50
for (let i = 0; i < numberOfLines; i++) {
    linesArray.push(new Line(canvas))
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    linesArray.forEach(line => {
        line.draw(ctx)
        line.update()
    })
    requestAnimationFrame(animate)
}

animate()