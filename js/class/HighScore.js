class HighScore{
    constructor(time, name, map, difficulty) {
        this.time = time;
        this.name = name;
        this.map = map;
        this.difficulty = difficulty;
    }
    
    getTime(){
        return this.time;
    }
    
    setTime(time){
        this.time = time;
    }
    
    getName(){
        return this.name;
    }
    
    setName(name){
        this.name = name;
    }
    
    getMap(){
        return this.map;
    }
    
    setName(map){
        this.map = map;
    }
    
    getDifficulty(){
        return this.difficulty;
    }
    
    setDifficulty(difficulty){
        this.difficulty = difficulty;
    }
}