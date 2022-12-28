
varying vec2 vUv;

void main(){
  vUv = position.zy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
