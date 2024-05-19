import { CGFobject, CGFshader } from "../../lib/CGF.js";
import { MyGrassBlock } from "../components/MyGrassBlock.js";

/**
 * MyFlowerBed
 * @constructor
 * @param scene - Reference to MyScene object
 * @param size - Size of the flower bed
 */
export class MyFlowerBed extends CGFobject {
    constructor(scene, size = 50) {
        super(scene);
        this.size = size;
        this.grassShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.windSpeed = this.getRandomValue(0.3, 0.8, 'float');
        this.grassBlock = new MyGrassBlock(this.scene, 7);
    }

    getRandomValue(min, max, returnType = 'int') {
        if (returnType === 'int') {
            return Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer
        } else {
            return Math.random() * (max - min) + min; // Returns a float
        }
    }

    display(){
        this.scene.setActiveShader(this.grassShader);
        this.grassShader.setUniformsValues({wind: this.windSpeed, time: performance.now() / 500});
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i, 0, j);
                this.grassBlock.display();
                this.scene.popMatrix();
            }
        }

        this.scene.setActiveShader(this.scene.defaultShader);

    }

    
}
