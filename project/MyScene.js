import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBee } from "./objects/MyBee.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";
import { MyHive } from "./objects/MyHive.js";
import { MyPollen } from "./objects/MyPollen.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    this.enableTextures(true);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.rockTexture = new CGFtexture(this, "images/rock.jpg");

    this.earthMaterial = new CGFappearance(this); // fixing the globe being kind of green by setting it to white
    this.earthMaterial.setAmbient(1.0, 1.0, 1.0, 1.0); 
    this.earthMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0); 
    this.earthMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.earthMaterial.setShininess(10.0);
    this.earthMaterial.setTexture(this.earthTexture);

    this.rockMaterial = new CGFappearance(this);
    this.rockMaterial.setAmbient(1.0, 1.0, 1.0, 1.0); 
    this.rockMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0); 
    this.rockMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.rockMaterial.setShininess(10);
    this.rockMaterial.setTexture(this.rockTexture);


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphereStacks = 16;
    this.sphereSlices = 8;
    this.sphere = new MySphere(this, this.sphereStacks, this.sphereSlices, false, 1.0);
    this.rock = new MyRock(this, 20, 20);
    this.rockSet = new MyRockSet(this, 0.3, 0.3);
    this.bee = new MyBee(this, 0, 10, 0, true);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.garden = new MyGarden(this, 5, 6);
    this.pollen = new MyPollen(this);
    this.hive = new MyHive(this);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayRock = false;
    this.displayRockSet = false;
    //this.displayBee = false; disabled this because for task 5 we don't really have a bee alone as an object it has the garden and pollen atleast
    this.displayGarden = true;
    this.displayTask5_2 = false;
    this.displayTask5 = false;
    this.scaleFactor = 1;
    this.beeSpeed = 1;
    this.beeScale = 0.5;

    this.setUpdatePeriod(1000/60);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    
    if(this.displaySphere){
      this.earthMaterial.apply();
      this.sphere.display();
    }

    if(this.displayPanorama){
      this.panorama.display();
    }

    if(this.displayRockSet){
      this.rockMaterial.apply();
      this.rockSet.display();
    }

    if(this.displayTask5_2){
      this.pushMatrix();
      this.scale(4,4,4);
      this.rockMaterial.apply();
      this.rockSet.display();
      this.popMatrix();

      this.pushMatrix();
      this.translate(0, 4.3, 0);
      this.hive.display();
      this.popMatrix();

      this.pushMatrix();
      this.translate(10, 0, 0);
      this.pollen.display();
      this.popMatrix();
    }

    if(this.displayRock){
      this.rockMaterial.apply();
      this.rock.display();
    }

    if(this.displayGarden){
      this.garden.display();
    }

    // if(this.displayBee){
    //   this.bee.display();
    // }

    if(this.displayTask5){
      this.pushMatrix();

      this.translate(0, 0, -10);

      this.pushMatrix();
      this.scale(4,4,4);
      this.rockMaterial.apply();
      this.rockSet.display();
      this.popMatrix();

      this.pushMatrix();
      this.translate(0, 4.3, 0);
      this.hive.display();
      this.popMatrix();

      this.popMatrix();

      this.bee.display();
    }
    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    //this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }

  update(t){
    this.bee.update(t, this.beeScale);

    this.checkKeys();
  }

  checkKeys(){
    var text="Keys pressed: ";
    var keysPressed=false;

    if(this.gui.isKeyPressed("KeyW")){
      text+=" W ";
      this.bee.accelerate(1);
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyS")){
      text+=" S ";
      this.bee.accelerate(-1);
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyR")){
      text+=" R ";
      keysPressed=true;
      this.bee.reset();
    }

    if(this.gui.isKeyPressed("KeyA")){
      text+=" A ";
      this.bee.turn(-Math.PI/16);
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyD")){
      text+=" D ";
      this.bee.turn(Math.PI/16);
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyF")){
      text+=" F ";
      this.bee.descend();
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyP")){
      text+=" P ";
      this.bee.ascend();
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyO")){
      text+=" O ";
      this.bee.goToHive();
      keysPressed=true;
    }

    if(keysPressed)
      console.log(text);
  }
}
