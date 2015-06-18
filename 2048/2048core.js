function square(size,t){
    var size = size || 4, t = t || 8192, self = this;
    this.item = [];
    function Unit(y, x){
        this.value = 0;
        this.position = {"x": x, "y": y};
        this.lock = false;
    }
    function createItem(){
        var tmp = [];
        for(var y=0; y<size; y++){
            tmp[y] = [];
            for(var x=0; x<size; x++){
                tmp[y][x] = new Unit(y, x);
            }
        }
        return tmp;
    }
    function getValues(ar){
        var tmp = [];
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                tmp.push(ar[y][x].value);
            }
        }
        return tmp;
    }
    function createByValues(ar){
        var tmp = createItem();
        for(var y=0; y<tmp.length; y++){
            for(var x=0; x<tmp[y].length; x++){
                tmp[y][x].value = ar[y*size+x];
            }
        }
        return tmp;
    }
    function checkMovables(dir){
        switch(dir){
        case "up":
            for(var x=0; x<size; x++){
                for(var y=0; y<size; y++){
                    if((y==0 && self.item[y][x].value != 0)
                    || (y!=0 && self.item[y-1][x].lock == true && self.item[y][x].value != self.item[y-1][x].value && self.item[y][x].value != 0)){
                        self.item[y][x].lock = true;
                    }else if(self.item[y][x].lock != true){
                        break;
                    }
                }
            }
        break;
        case "right":
            for(var y=0; y<size; y++){
                for(var x=size-1; x>=0; x--){
                    if((x==size-1 && self.item[y][x].value != 0)
                    || (x!=size-1 && self.item[y][x+1].lock == true && self.item[y][x].value != self.item[y][x+1].value && self.item[y][x].value != 0)){
                        self.item[y][x].lock = true;
                    }else if(self.item[y][x].lock != true){
                        break;
                    }
                }
            }
        break;
        case "down":
            for(var x=0; x<size; x++){
                for(var y=size-1; y>=0; y--){
                    if((y==size-1 && self.item[y][x].value != 0)
                    || (y!=size-1 && self.item[y+1][x].lock == true && self.item[y][x].value != self.item[y+1][x].value && self.item[y][x].value != 0)){
                        self.item[y][x].lock = true;
                    }else if(self.item[y][x].lock != true){
                        break;
                    }
                }
            }
        break;
        case "left":
            for(var y=0; y<size; y++){
                for(var x=0; x<size; x++){
                    if((x==0 && self.item[y][x].value != 0)
                    || (x!=0 && self.item[y][x-1].lock == true && self.item[y][x].value != self.item[y][x-1].value && self.item[y][x].value != 0)){
                        self.item[y][x].lock = true;
                    }else if(self.item[y][x].lock != true){
                        break;
                    }
                }
            }
        break;
        default:
        }
    }
    function resetLock(){
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                self.item[y][x].lock = false;
            }
        }
    }
    function lockAll(){
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                self.item[y][x].lock = true;
            }
        }
    }
    function allLock(){
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                if(self.item[y][x].lock==false){return false}
            }
        }
        return true;
    }
    function move(dir){
        switch(dir){
        case "up":
            for(var x=0; x<size; x++){
                for(var y=0; y<size; y++){
                    if(!self.item[y][x].lock && y>0){
                        self.item[y-1][x].value += self.item[y][x].value;
                        self.item[y][x].value = 0;
                    }
                }
            }
        break;
        case "right":
            for(var y=0; y<size; y++){
                for(var x=size-1; x>=0; x--){
                    if(!self.item[y][x].lock && x<size-1){
                        self.item[y][x+1].value += self.item[y][x].value;
                        self.item[y][x].value = 0;
                    }
                }
            }
        break;
        case "down":
            for(var x=0; x<size; x++){
                for(var y=size-1; y>=0; y--){
                    if(!self.item[y][x].lock && y<size-1){
                        self.item[y+1][x].value += self.item[y][x].value;
                        self.item[y][x].value = 0;
                    }
                }
            }
        break;
        case "left":
            for(var y=0; y<size; y++){
                for(var x=0; x<size; x++){
                    if(!self.item[y][x].lock && x>0){
                        self.item[y][x-1].value += self.item[y][x].value;
                        self.item[y][x].value = 0;
                    }
                }
            }
        break;
        default:
        }
    }
    function compareItem(ar1, ar2){
        for(var i in ar1){
            if(ar1[i] != ar2[i]){return false;}
        }
        return true;
    }
    function loopMove(dir){
        var tmp, f = true;
        do{
            tmp = createByValues(getValues(self.item));
            checkMovables(dir);
            move(dir);
            if(compareItem(getValues(tmp),getValues(self.item))){
                lockAll();
                if(f){
                    resetLock();
                    return false;
                }
            }
            f = false;
        }while(!allLock());
        resetLock();
        return true;
    }
    function randomBlock(){
        var tmp = getValues(self.item), c = 0, r;
        for(var i in tmp){if(tmp[i]==0){c++;}}
        if(c!=0){
        r = Math.floor(Math.random()*c)+1;
            for(var y=0; y<size; y++){
                for(var x=0; x<size; x++){
                    if(self.item[y][x].value==0 && r--){
                        if(!r){self.item[y][x].value = 1}
                    }
                }
            }
        }
    }
    function checkAll(){
        var dir = ["up","right","down","left"], end = [0,0,0,0];
        for(var i in dir){
            checkMovables(dir[i]);
            if(allLock()){end[i] = 1;}
            resetLock();
        }
        for(var j in end){if(end[j]==0){return false}}
        return true;
    }
    function goal(){
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                if(self.item[y][x].value>=t){return true;}
            }
        }
        return false;
    }
    this.up = function(){
        if(loopMove("up")){randomBlock();}
        if(checkAll()){self.end()};
        if(goal()){self.win()}
        //self.show();
    }
    this.right = function(){
        if(loopMove("right")){randomBlock();}
        if(checkAll()){self.end()};
        if(goal()){self.win()}
        //self.show();
    }
    this.down = function(){
        if(loopMove("down")){randomBlock();}
        if(checkAll()){self.end()};
        if(goal()){self.win()}
        //self.show();
    }
    this.left = function(){
        if(loopMove("left")){randomBlock();}
        if(checkAll()){self.end()};
        if(goal()){self.win()}
        //self.show();
    }
    this.end = function(){
        //console.log("END");
        self.status = "end";
    }
    this.win = function(){
        //console.log("WIN");
        self.status = "win";
    }
    this.init = function(){
        this.item = createItem();
        randomBlock();
        //this.show();
        this.status = "init";
    }
    /*this.show = function(){
        for(var i in this.item){
            console.log((Number(i)+1) + ": " + this.item[i].map(function(unit){return unit.value}).join(", "));
        }
    }*/
    this.score = function(){
        var c = 0;
        for(var y=0; y<size; y++){
            for(var x=0; x<size; x++){
                c += self.item[y][x].value == 1? 0 : self.item[y][x].value;
            }
        }
        return c;
    }
    //this.goal = goal;
    //this.nr = randomBlock;
    //this.set = function(ar){self.item = createByValues(ar);}
    //this.get = function(){return getValues(self.item);}
    //this.cha = checkAll;
    //this.ch = checkMovables;
    //this.move = move;
    this.init();
}