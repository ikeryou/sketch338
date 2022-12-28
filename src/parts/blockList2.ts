import vt from '../glsl/block.vert';
import fg from '../glsl/block.frag';
import { MyObject3D } from "../webgl/myObject3D";
// import { CircleGeometry } from 'three/src/geometries/CircleGeometry';
import { SphereGeometry } from 'three/src/geometries/SphereGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Color } from 'three/src/math/Color';
import { DoubleSide } from 'three/src/constants';
import { Func } from '../core/func';
import { Scroller } from '../core/scroller';
import { Util } from '../libs/util';
import { Block2 } from './block2';

export class BlockList2 extends MyObject3D {

  private _mat: Array<any> = [];
  private _item: Array<Block2> = [];
  private _lineNum: number = 10;
  private _scroll: number = 0;

  constructor() {
    super();

    // 必要なマテリアル作っておく
    for(let i = 0; i < 10; i++) {
      const m = new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        depthTest:false,
        side: DoubleSide,
        uniforms:{
          color:{value:new Color(Util.instance.randomArr([0xff0000, 0x00ff00, 0x0000ff]))},
          alpha:{value:1},
        }
      });
      this._mat.push(m);
    }

    const geo = new SphereGeometry(0.24, 32, 32)

    // アイテム
    for(let i = 0; i < this._lineNum * this._lineNum; i++) {
      const item = new Block2({
        id: i,
        mat: this._mat,
        geo: geo,
      });
      this.add(item);
      this._item.push(item);
    }
  }


  protected _update():void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    let scroll = Scroller.instance.val.y;
    this._scroll = scroll;

    const line = this._lineNum;
    const baseSize = Math.max(sw, sh) * 1;
    const blockSize = baseSize / line;
    const margin = blockSize * 1;
    const blockHeight = blockSize + margin;
    const zure = blockHeight * 0;
    // const lineHeight = blockHeight * ~~(this._item.length / line);

    this._item.forEach((val,i) => {
      const ix = i % line;
      const iy = ~~(i / line);

      let scroll2 = this._scroll - ix * zure;
      // scroll2 = Util.instance.clamp(scroll2, 0, lineHeight - sh)
      let ang = (~~(scroll2 / blockHeight) * 90) + Util.instance.map(scroll2 % blockHeight, 0, 90, 0, blockHeight);
      ang = Math.max(0, ang);

      val.update({
        // size: blockSize * Util.instance.map(iy, 0.9, 1, 0, ~~(this._item.length / line)),
        size: blockSize,
        zIndex: iy,
        ang: ang * -1,
        ix: ix,
        iy: iy,
        line: line,
      });

      val.position.x = -sw * 0.5 + blockSize * 0.5;
      val.position.y = blockSize * 0.5 + sh * 0.75;

      val.position.x += ix * blockSize;
      val.position.y -= iy * (blockSize + margin);
    })
  }
}