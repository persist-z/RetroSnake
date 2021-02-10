function Game() {
  //Game类帮助初始化,创建表格
  this.row = 20;
  this.col = 20;
  this.score=0;
  this.init();
  this.snake = new Snake();
  this.food=new Food(this);
  this.start();
  this.bindEvent();
}

Game.prototype.init = function () {
  this.dom = document.createElement("table");
  var tr, td;
  //遍历行列上树
  for (var i = 0; i < this.row; i++) {
    tr = document.createElement("tr");
    //遍历列上树
    for (var j = 0; j < this.col; j++) {
      td = document.createElement("td");
      tr.appendChild(td);
    }
    this.dom.appendChild(tr);
  }
  document.getElementById("app").appendChild(this.dom);
};

Game.prototype.clear = function () {
  //擦除画布
  for (var i = 0; i < this.row; i++) {
    for (var j = 0; j < this.col; j++) {
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = 'transparent'
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = '';
    }
  }
}

Game.prototype.setHTML=function(row,col,html){
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML=html
};

//设置颜色方法
Game.prototype.setColor = function (row, col, color) {
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
};
//设置键盘的事件监听
Game.prototype.bindEvent = function () {
  var self = this;
  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case 37:
        if(self.snake.direction == 'R') return;
        self.snake.changeDirection ("L");
        break;
      case 38:
        if(self.snake.direction == 'D') return;
        self.snake.changeDirection ("U");
        break;
      case 39:
        if(self.snake.direction == 'L') return;
        self.snake.changeDirection ("R");
        break;
      case 40:
        if(self.snake.direction == 'U') return;
        self.snake.changeDirection ("D");
        break;
    }
  }
}
Game.prototype.start = function () {
  //帧编号
  this.f=0;
  this.timer = setInterval(function () {
    game.f++;
    document.getElementById("f").innerHTML="帧编号："+game.f;    
    document.getElementById("score").innerHTML="分数："+game.score;
    //清除屏幕
    game.clear();
    var during = game.snake.body.length < 20 ? 20 - game.snake.body.length : 1;
    game.f % during == 0 && game.snake.update();
    //蛇的运动
    game.snake.update();
    //渲染蛇
    game.snake.render();
    game.food.render();
  }, 400)
}
