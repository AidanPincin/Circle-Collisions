const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
class Circle{
    constructor(x,y,r,c,xs,ys,mobile=false,xb,yb,gravity=false){
        this.x = x
        this.y = y
        this.r = r
        this.xb = xb
        this.yb = yb
        this.c = c
        this.xs = xs
        this.ys = ys
        this.mobile = mobile
        this.gravity = gravity
        this.gravitySpeed = 0
        this.gravityMult = 0.1
        this.xss = 0
        this.yss = 0
    }
    draw(){
        if (this.mobile == true){
            this.time += 0.5
            this.x += this.xs
            this.y += this.ys
            if (this.x<=this.xb[0]+this.r || this.x>=this.xb[1]-this.r){
                this.xs *= -0.75
            }
            if (this.y<=this.yb[0]+this.r || this.y>=this.yb[1]-this.r){
                this.ys *= -0.75
            }
            if (this.x<=this.xb[0]+this.r){this.x += this.xs}
            if (this.y<=this.yb[0]+this.r){this.y += this.ys}
            if (this.x>=this.xb[1]-this.r){this.x += this.xs}
            if (this.y>=this.yb[1]-this.r){
                if (this.ys<=0.25 && this.ys>=-0.25){
                    this.ys = 0
                }
                this.y = this.yb[1]-this.r
            }
            if (this.gravity == true){
                this.gravitySpeed += this.gravityMult
                this.ys += this.gravityMult
                if (this.xs>0.001){
                    this.xs -= 0.001
                }
                else if (this.xs<0.001){
                    this.xs += 0.001
                }
                else{
                    this.xs = 0
                }
                this.xss += 0.001
            }
        }
        ctx.fillStyle = this.c
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)
        ctx.fill()
    }
    detectCollision(x,y,r){
        const collisionDist = this.r+r
        const x_dist = this.x-x
        const y_dist = this.y-y
        const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
        if(dist<=collisionDist){
            setTimeout(() => {
                this.xs = (x_dist/dist)*5
                if (this.xs>0){
                    this.xs -= this.xss
                }
                if (this.xs<0){
                    this.xs += this.xss
                }
                this.ys = (y_dist/dist)*5
            },0)

        }
    }
}
const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};
const circles = []
for (let i=0; i<10; i++){
    let xs = Math.random()*5
    let ys = 5-xs
    circles.push(new Circle(10+Math.random()*1380,10+Math.random()*780,10,random_hex_color_code(),xs,ys,true,[0,1400],[0,800],true))
}
for (let i=0; i<10; i++){
    circles.push(new Circle(10+Math.random()*1380,10+Math.random()*780,10,'#000000'))
}
function mainLoop(){
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0,0,1400,800)
    for (let i=0; i<circles.length; i++){
        circles[i].draw()
        if (circles[i].mobile == true){
            for (let k=0; k<circles.length; k++){
                if(circles[k] != circles[i]){
                    let c = circles[k]
                    circles[i].detectCollision(c.x,c.y,c.r)
                }
            }
        }
    }
    requestAnimationFrame(mainLoop)
}
mainLoop()
