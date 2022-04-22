const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
class Circle{
    constructor(x,y,r,c,xs,ys){
        this.x = x
        this.y = y
        this.r = r
        this.c = c
        this.xs = xs
        this.ys = ys
    }
    draw(){
        this.x += this.xs
        this.y += this.ys
        if (this.x<=300+this.r || this.x>=1100-this.r){
            this.xs *= -1
        }
        if (this.y<=0+this.r || this.y>=800-this.r){
            this.ys *= -1
        }
        ctx.fillStyle = this.c
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)
        ctx.fill()
    }
    detectCollision(x,y,r,xs,ys){
        const collisionDist = this.r+r
        const x_dist = this.x-x
        const y_dist = this.y-y
        const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
        if(dist<=collisionDist){
            this.xs = (x_dist/dist)*5
            this.ys = (y_dist/dist)*5
        }
    }
}
const circles = []
for (let i=0; i<10; i++){
    let xs = Math.random()*5
    let ys = 5-xs
    circles.push(new Circle(310+Math.random()*790,10+Math.random()*790,10,'#000000',xs,ys))
}
function mainLoop(){
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0,0,1400,800)
    for (let i=0; i<circles.length; i++){
        circles[i].draw()
        for (let k=0; k<circles.length; k++){
            if(circles[k] != circles[i]){
                let c = circles[k]
                circles[i].detectCollision(c.x,c.y,c.r,c.xs,c.ys)
            }
        }
    }
    requestAnimationFrame(mainLoop)
}
mainLoop()