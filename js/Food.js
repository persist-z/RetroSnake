function Food(gameSnake){   
    var self =this; 
    do{
        this.row=parseInt(Math.random() * gameSnake.row);
        this.col=parseInt(Math.random() * gameSnake.col);
    }while((function(){
        //遍历蛇的row col是否重合
        for(var i=0;i<gameSnake.snake.body.length;i++){
            if(gameSnake.snake.body[i].row==self.row && gameSnake.snake.body[i].col==self.col){
                return true;
            }
        }
        return false;
    })());
}

Food.prototype.render=function(){
    game.setHTML(this.row,this.col,"💗")
}