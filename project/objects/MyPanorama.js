import { CGFappearance, CGFobject, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - The texture to be applied to the panorama
 */
export class MyPanorama extends CGFobject{
    constructor(scene, texture){
        super(scene);
        this.sphere = new MySphere(this.scene, 32, 32, true, 200.0);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.textureCloud = new CGFtexture(this.scene, "images/Cloud.jpg");
        this.cloudShader = new CGFshader(this.scene.gl, "shaders/cloud.vert", "shaders/cloud.frag");
        this.cloudShader.setUniformsValues({uSampler: 1, uSampler2: 2});
        this.texture = texture;
    }

    display(){
        this.scene.pushMatrix();
        this.material.apply(); 
        this.scene.setActiveShader(this.cloudShader);
        this.texture.bind(1);
        this.textureCloud.bind(2);
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }

    update(t) {
        this.cloudShader.setUniformsValues({ time: t });
    }
}