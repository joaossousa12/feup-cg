import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBee } from "./objects/MyBee.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";

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
    this.bee = new MyBee(this, 0, 0, 0);
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayBee = true;
    this.scaleFactor = 1;

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

    if(this.displayRock){
      this.rockMaterial.apply();
      this.rock.display();
    }

    if(this.displayBee){
      this.pushMatrix();
      this.translate(0, 3, 0);
      this.bee.display();
      this.popMatrix();
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
    this.bee.update(t);
  }
}
