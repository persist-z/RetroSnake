function Snake() {
  this.body = [
    { "row": 3, "col": 5 },
    { "row": 3, "col": 4 },
    { "row": 3, "col": 3 },
    { "row": 3, "col": 2 }
  ];
  //信号量,设置蛇的不同运动方向
  this.direction = "R";
  this.willDirection = "R";
}

Snake.prototype.update = function () {
  //让当前方向接受willDirection
  this.direction=this.willDirection;
  switch (this.direction) {
    case "R":
      this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
      break;
    case "D":
      this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
      break;
    case "L":
      this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
      break;
    case "U":
      this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
      break;
  }
  //死亡的判定,超出边缘部分
  if(this.body[0].col>game.col|| this.body[0].row>game.row-1||this.body[0].col<0||this.body[0].row<0){
    alert("游戏结束！当前你的得分为"+game.score+"分");
    this.body.shift();
    clearInterval(game.timer);
  }
  //蛇自身碰到身体则死亡
  for(var i=1;i<this.body.length;i++){
    if(this.body[0].col==this.body[i].col&& this.body[0].row==this.body[i].row){
      alert("游戏结束！当前你的得分为"+game.score+"分");
      this.body.shift();
      clearInterval(game.timer);
    }
  }
  //蛇吃食物
  if(this.body[0].row==game.food.row && this.body[0].col==game.food.col){
    game.food=new Food(game);
    game.score++;
    game.f=0;
  }else{
    this.body.pop();
  }  
};
Snake.prototype.changeDirection=function(d){
  this.willDirection=d;
}
Snake.prototype.render = function () {
  //蛇头的渲染
  game.setColor(this.body[0].row, this.body[0].col, 'pink');
  //蛇的body
  for (var i = 1; i < this.body.length; i++) {
    game.setColor(this.body[i].row, this.body[i].col, 'yellow');
  }
};
