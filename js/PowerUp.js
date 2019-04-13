class PowerUp{
    constructor(powerType, mesh) {
        this.powerType = powerType;
        this.mesh = mesh;
    }
    
    getMesh(){
        return this.mesh;
    }
    
    setMesh(mesh){
        this.mesh = mesh;
    }
    
    getPowertype(){
        return this.powerType;
    }
    
    setPowertype(powerType){
        this.powerType = powerType;
    }
}