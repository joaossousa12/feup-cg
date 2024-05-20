attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float time;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    vec3 offset = aVertexNormal * 0.1 * texture2D(uSampler2, vTextureCoord + vec2(0.005 * time, 0.005 * time)).b;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
