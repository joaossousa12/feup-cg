import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
	}
	
	display(){ 
        this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
        this.scene.setDiffuse(0, 255 / 255, 0, 0);
		this.diamond.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.setDiffuse(255 / 255, 20 / 255, 20 / 255, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.setDiffuse(255 / 255, 156 / 255, 0, 0);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.setDiffuse(255 / 255, 156 / 255, 210 / 255, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.scene.setDiffuse(0, 156 / 255, 255 / 255,0);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,1,0);
        this.scene.scale(-1, 1, 1);
        this.scene.setDiffuse(255 / 255, 255 / 255, 0, 0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,2,0);
        this.scene.setDiffuse(170 / 255, 79 / 255, 194 / 255, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}

