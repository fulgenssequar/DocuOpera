class Playab{
    constructor(fileName){
	this.player = new Audio(fileName)
	this.timeA=this.player.currentTime;
	this.timeB=this.player.duration;
	this.checker=-1;
	
	this.infoContainer = document.createElement("div");
	this.infoContainer.className="audioPanel";
	this.info = document.createElement("div");
	this.infoContainer.appendChild(this.info);
	this.btns = this.getButtons()
	for (var b in this.btns){
	    this.infoContainer.appendChild(this.btns[b]);
	}

	this.keyMap = this.buildKey()
    }
    changeFile(fileName){
	this.player.src = fileName;
	this.timeA = 0;
	this.timeB = this.player.duration;
	clearTimeout(this.checker);
	this.checker=-1;
    }
    
    startPlay(){
	var that = this
	function fudu(){
	    if (that.player.currentTime >= that.timeB){
		that.player.currentTime = that.timeA;
	    }
	    that.info.innerHTML = "A: " + (that.timeA).toFixed(3) + " - B:" + (that.timeB).toFixed(3) + "<br/>C:" + that.player.currentTime;
	    // NOTE: num.toFixed(k)
	}
	if (this.checker > 0){
	    clearTimeout(this.checker);
	}
	this.checker = setInterval(fudu, 0.2);
	this.player.play();
    }
    
    playNext(){
	if (this.timeB < this.player.duration - 1){
	    this.timeA = this.timeB;
	    this.player.currentTime = this.timeA;
	}
	
	else if (this.player.currentTime > this.player.duration - 3){
	    this.timeA = 0
	}

	this.timeB = this.player.duration;
    }
    
    playBack(){
	this.timeB = this.player.currentTime;
	this.player.currentTime = this.timeA;
    }

    removeB(){
	this.timeB = this.player.duration;
    }

    backToA(){
	this.player.currentTime = this.timeA;
    }

    moveLeft(scale=5){
	this.player.currentTime -= scale;
	if (this.timeA >= this.player.currentTime){
	    this.timeA = this.player.currentTime
	}
    }

    moveRight(scale=5){
	this.player.currentTime += scale;
	if (this.timeB <= this.player.currentTime){
	    this.player.currentTime = this.timeA;
	}
    }
    
    lefterA(){
	this.timeA = this.timeA-0.5;
	
    }
    lefterB(){
	this.timeB = this.timeB-0.5}
    righterA(){
	this.timeA = this.timeA+0.5}
    righterB(){
	this.timeB = this.timeB+0.5}

    startStop(){
	if (this.player.paused){
	    this.startPlay();
	}
	else{
	    this.player.pause();
	}
    }

    getButtons(){
	var that = this;
	var btns = new Array();
	var makebtn = function(bf, bft){
	    var b = document.createElement("input");
	    b.type = "button";
	    b.value = bft;
	    b.addEventListener("click", () => bf())
	    btns.push(b);
	}

	makebtn( ()=>0, "" );
	btns[0].addEventListener("keydown", (e)=>that.keyWork(e));
	makebtn( ()=>that.startStop(), "pause/resume" );
	makebtn( ()=>that.playBack(), "playBack" );
	makebtn( ()=>that.playNext(), "playNext");
	makebtn( ()=>that.moveLeft(), "moveLeft");
	makebtn( ()=>that.moveRight(), "moveRight");
	makebtn( ()=>that.lefterA(), "lefterA");
	makebtn( ()=>that.righterA(), "righterA");
	makebtn( ()=>that.lefterB(), "lefterB");
	makebtn( ()=>that.righterB(), "righterB");
	return btns;
    }

    buildKey(){
	var keyList = new Array()
	var that = this;
	keyList[68]  = ()=>that.backToA();
	keyList[70]  = ()=>that.playBack();
	keyList[71]  = ()=>that.playNext();
	keyList[65]  = ()=>that.moveLeft();
	keyList[83]  = ()=>that.moveRight();
	keyList[81]  = ()=>that.lefterA();
	keyList[87]  = ()=>that.righterA();
	keyList[69]  = ()=>that.lefterB();
	keyList[82]  = ()=>that.righterB();
	keyList[84] = ()=>that.removeB();
	keyList[32]  = ()=>that.startStop();
	keyList[48] = ()=>{that.player.volume*=1.048576;}
	keyList[57] = ()=>{that.player.volume*=0.95367431640625;}
	keyList[67]= ()=>{that.infoContainer.remove()}
	return keyList;
    }
    keyWork(e){
	e.stopPropagation();
	this.keyMap[e.keyCode]()

    }
}

