/**
 * Created by yuliya on 14.9.16.
 */
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    resources = PIXI.loader.resources,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite;

PIXI.loader
    .add([
        "img/crab.png",
        "img/coin.png",
        "img/sea.png",
        "img/sand.png",
        "img/water.png",
        "img/water.jpg",
        "img/water2.png"
    ])
    .load(game);

var renderer = new autoDetectRenderer(700, 500),
    stage = new Container(),
    container = new PIXI.Container(),
    crab = new Sprite(Texture.fromImage("img/crab.png")),
    coin = new Sprite(Texture.fromImage("img/coin.png")),
    background = new Sprite.fromImage("img/sea.png"),
    sand = new Sprite.fromImage("img/sand.png"),
    score = 0,
    scoreText = new PIXI.Text('Score: ' + score),
    water = new Sprite.fromImage("img/water2.png");//new Sprite(resources["img/water.jpg"].texture),
    displacementFilter = new PIXI.filters.DisplacementFilter(water);

function game() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.view);
    stage.addChild(container);
    container.filters = [displacementFilter];
    console.log(displacementFilter);
    //displacementFilter.resolution = 10;
    stage.addChild(water);

    scoreText.position.x = 430;
    sand.position.y = 450;
    //container.addChild(background, sand);
    container.addChild(background, sand);
    coinFunc().randomPosition();
    //console.log(displacementFilter);
    displacementFilter.maskMatrix[0] = 1.5;
    stage.addChild(scoreText, crab);
    addEventListener('keydown', keyboard);
    render();
}
var animF = 1;
function render() {
    //container.filter = [displacementFilter];
    //console.log(animF++);
    //displacementFilter.offset += off  set;


    renderer.render(stage);
    requestAnimationFrame(render);
}

Number.prototype.between = function (a, b) {
    var min = Math.min(a, b),
        max = Math.max(a, b);
    return this >= min && this <= max;
};

function coinFunc() {
    return {
        randomPosition: function () {
            coin.position.x = Math.floor(Math.random() * 670);
            coin.position.y = Math.floor(Math.random() *430)+20;
            stage.addChild(coin);
        },
        collision: function () {
            var coinX = coin.position.x,
                coinY = coin.position.y;
            if (coinX.between(crab.position.x-50, crab.position.x+50) && coinY.between(crab.position.y-50, crab.position.y+50)) {
                coinFunc().randomPosition();
                score++;
                scoreText.text = 'Score: ' + score;
                stage.addChild(scoreText);
            }
        }
    }
}

function keyboard(event) {
    if (event.keyCode === 37) {
        if (crab.position.x > 0) { crab.position.x -=10; }
    }
    if (event.keyCode === 38) {
        if (crab.position.y > 0) { crab.position.y -=10; }
    }
    if (event.keyCode === 39) {
        if (crab.position.x < 590) { crab.position.x +=10; }
    }
    if (event.keyCode === 40) {
        if (crab.position.y < 390) { crab.position.y += 10; }
    }
    coinFunc().collision();
}