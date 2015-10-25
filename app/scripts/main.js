/// <reference path="babylon.js" />
var player1Bar;
var player2Bar;

var scene;
document.addEventListener("DOMContentLoaded", function(event) {
  
  // Get the canvas element from our HTML above
  var canvas = document.querySelector("#render");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  
  // This begins the creation of a function that we will 'call' just after it's built
  var createScene = function () {

    // Now create a basic Babylon Scene object 
    scene = new BABYLON.Scene(engine);

    // Change the scene background color to black.
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // This creates and positions a free camera
    var camera = new BABYLON.TargetCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 4, -12), scene);

    // Dim the light a small amount
    light.intensity = .5;

    function createPlayerBar(startingXPosition){
      var bar = BABYLON.Mesh.CreateCylinder("cylinder", 4, 1, 1, 20, 1, scene, false);
      bar.position.x = startingXPosition;
      bar.checkCollisions = true;
      return bar;
    }
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    player1Bar = createPlayerBar(-4);
    player2Bar = createPlayerBar(4);

    // Move the sphere upward 1/2 its height
    //sphere.position.y = 1;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var wall = BABYLON.Mesh.CreatePlane("wall", 14.0, scene);
    wall.position.z = 5;
    wall.material = new BABYLON.StandardMaterial("wallMat", scene);
    wall.material.emissiveColor = new BABYLON.Color3(.1, .05, .3);

    scene.collisionsEnabled = true;
    
    // Leave this function
    return scene;

  };  // End of createScene function
  
  var scene = createScene();
  
  engine.runRenderLoop(function () {
    scene.render();
  });
  
  window.addEventListener("resize", function () {
    engine.resize();
  });

  //When pointer down event is raised
    scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            player1Bar.position.y = pickResult.pickedPoint.y;
        }
    };


});