attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec2 vTextureCoord;

uniform float wind;
uniform float time;

void main() {
    vTextureCoord = aTextureCoord;
    
    vec3 offset = vec3(0.0, 0.0, wind * sin(time) * pow(aVertexPosition.y, 2.0));

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}