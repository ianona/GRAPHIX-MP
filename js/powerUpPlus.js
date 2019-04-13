function generatePowerUps(vacantAreas) {
    //get 4 random unique places
    var places = 0;
    var randomIndexd
    while (places != 4) {
        randomIndex = Math.floor(Math.random() * vacantAreas.length);
        if (powerupSpaces.indexOf(vacantAreas[randomIndex]) == -1) {
            powerupSpaces.push(vacantAreas[randomIndex]);
            places += 1;
        }
    }
    console.log(powerupSpaces)

    for (var k = 0; k < powerupSpaces.length; k++) {
        // parsing
        var i = parseXCoordinate(powerupSpaces[k])
        var j = parseYCoordinate(powerupSpaces[k])

        switch (k) {
            case 0:
                var newMesh = generatePowerUpMesh('0x00ff80', i, j);
                var newPowerUp = new PowerUp('speedB', newMesh)
                powerUps.push(newPowerUp);
                scene.add(newMesh);
                console.log('x: ' + i + ' y: ' + j + ' speedB')
                break;
            case 1:
                var newMesh = generatePowerUpMesh('0xff0000', i, j);
                var newPowerUp = new PowerUp('speedD', newMesh)
                powerUps.push(newPowerUp);
                scene.add(newMesh);
                console.log('x: ' + i + ' y: ' + j + ' speedD')
                break;
            case 2:
                var newMesh = generatePowerUpMesh('0x00ff80', i, j);
                var newPowerUp = new PowerUp('viewB', newMesh)
                powerUps.push(newPowerUp);
                scene.add(newMesh);
                console.log('x: ' + i + ' y: ' + j + ' viewB')
                break;
            case 3:
                var newMesh = generatePowerUpMesh('0xff0000', i, j);
                var newPowerUp = new PowerUp('viewD', newMesh)
                powerUps.push(newPowerUp);
                scene.add(newMesh);
                console.log('x: ' + i + ' y: ' + j + ' viewD')
                break;
            default:
                var newMesh = generatePowerUpMesh('0xffffff', i, j);
                var newPowerUp = new PowerUp('speedB', newMesh)
                powerUps.push(newPowerUp);
                scene.add(newMesh);
                console.log('x: ' + i + ' y: ' + j + ' speedB')
                break;
        }

    }
}

function parseXCoordinate(vertexValue) {
    var temp = vertexValue.split(",");
    return parseInt(temp[0]);
}

function parseYCoordinate(vertexValue) {
    var temp = vertexValue.split(",");
    return parseInt(temp[1]);
}

function generatePowerUpMesh(color, x, y) {
    //generate object
    var geometry = new THREE.TetrahedronGeometry(0.2);
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: color
    });
    var mesh_ij = new THREE.Mesh(geometry, material);
    mesh_ij.position.x = x;
    mesh_ij.position.y = y;
    mesh_ij.position.z = 1;
    mesh_ij.rotation.y += 5;
    mesh_ij.name = x + ',' + y;
    return mesh_ij;
}

function detectPowerupCollision() {
    var mazeX = Math.floor(ballMesh.position.x + 0.5);
    var mazeY = Math.floor(ballMesh.position.y + 0.5);
    var x, y;
    for (var i = 0; i < powerupSpaces.length; i++) {
        x = parseXCoordinate(powerupSpaces[i])
        y = parseYCoordinate(powerupSpaces[i])
        if (x == mazeX && y == mazeY) {
            for (var j = 0; j < powerUps.length; j++) {
                if (powerupSpaces[i] == powerUps[j].getMesh().name) {
                    powerUps[j].getMesh().scale.set(0, 0, 0);
                    powerupSpaces.splice(powerupSpaces.indexOf(powerupSpaces[i]), 1);
                    console.log(powerUps[j].getPowertype() + ' POWER UP HIT')
                    triggerPowerup(powerUps[j].getPowertype());
                    //                                powerUps.splice(powerUps.indexOf(powerUps[j]), 1);
                    return null;
                }
            }
        }
    }
}

function triggerPowerup(powerup) {

    switch (powerup) {
        case 'speedB':
            //            console.log('test');
            this.ballSpeed = 1;
            console.log(ballSpeed)
            setTimeout(normalSpeed, 5000);
            break;
        case 'speedD':
            //            console.log('test1');
            ballSpeed = 0.8;
            console.log(ballSpeed)
            setTimeout(normalSpeed, 5000);
            break;
        case 'viewB':
            //            console.log('test2');
            camZoomIncrement = 5
            camZoom = camZoom + camZoomIncrement;
            light.intensity = 1;
            setTimeout(normalView, 5000);
            break;
        case 'viewD':
            //            console.log('test3');
            camZoomIncrement = -10
            camZoom = camZoom + camZoomIncrement;
            light.intensity = 0.25;
            setTimeout(normalView, 5000);
            break;

    }
}

function normalSpeed() {
    ballSpeed = 0.95;
}

function normalView() {
    switch (difficultyLevel) {
        case 'easy':
            light.intensity = .50;
            break;
        case 'medium':
            light.intensity = .40;
            break;
        case 'difficult':
            light.intensity = .30;
            break;
    }
//    light.intensity = 0.5;
    camZoom = camZoom - camZoomIncrement;
}

//for delays
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function resetState() {
    for (var j = 0; j < powerUps.length; j++) {
        powerUps[j].getMesh().scale.set(0, 0, 0);
    }
    powerUps = [];
    freeSpaces = [];
    powerupSpaces = [];
    light.intensity = 0.5;
    ballSpeed = 0.95;
    camZoom = 20;
    camZoomIncrement = 0;
}
