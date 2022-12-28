uniform vec3 color;
uniform float alpha;

varying vec2 vUv;


void main(void) {
  vec4 dest = vec4(color, 1.0);

  // float test = (vUv.x) * vUv.y;
  // dest.rgb *= test * 1.0;

  dest.a *= 1.0 - step(vUv.x, 0.0);

  dest.rgb *= 0.75 + vUv.y;

  gl_FragColor = dest;

}
