import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Util } from '../libs/util';

export class Block2 extends MyObject3D {

  private _id: number;
  private _mesh: Array<Mesh> = [];
  private _mat: Array<ShaderMaterial>;

  constructor(opt:{
    id: number,
    mat: Array<ShaderMaterial>,
    geo: any
  }) {
    super();

    this._id = opt.id;
    this._mat = opt.mat;

    for(let i = 0; i < 4; i++) {
      const m = new Mesh(
        opt.geo,
        this._mat[(i + this._id) % this._mat.length]
      );
      this.add(m);
      this._mesh.push(m);
    }

    this._mesh.forEach((val,i) => {
      if(i == 0) {
        val.position.set(0, 0, 0.5);
        val.rotation.set(0, 0, 0);
      }

      if(i == 1) {
        val.position.set(0, -0.5, 0);
        val.rotation.set(Util.rdn(-270), 0, 0);
      }

      if(i == 2) {
        val.position.set(0, 0, -0.5);
        val.rotation.set(Util.rdn(180), 0, 0);
      }

      if(i == 3) {
        val.position.set(0, 0.5, 0);
        val.rotation.set(Util.rdn(-90), 0, 0);
      }

      if(i == 4) {
        val.position.set(0.5, 0, 0);
        val.rotation.set(0, Util.rdn(90), 0);
      }

      if(i == 5) {
        val.position.set(-0.5, 0, 0);
        val.rotation.set(0, Util.rdn(-90), 0);
      }
    });

    this._resize();
  }


  public update(opt: {size: number, zIndex: number, ang: number, ix: number, iy: number, line: number}):void {
    const s = opt.size;
    this.scale.set(s, s, s);

    this.position.z = -opt.size * 0.5;
    this.rotation.x = Util.rdn(opt.ang * 1);
  }
}