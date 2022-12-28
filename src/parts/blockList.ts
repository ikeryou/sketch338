import { MyObject3D } from "../webgl/myObject3D";
import { CircleGeometry } from 'three/src/geometries/CircleGeometry';
import { EdgesGeometry } from 'three/src/geometries/EdgesGeometry';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial';
import { Color } from 'three/src/math/Color';
import { DoubleSide } from 'three/src/constants';
import { Block } from "./block";
import { Func } from '../core/func';
import { Tween } from '../core/tween';
import { Scroller } from '../core/scroller';
import { Util } from '../libs/util';

export class BlockList extends MyObject3D {

  private _mat: Array<any> = [];
  private _item: Array<Block> = [];
  private _lineNum: number = 10;
  private _heightEl:HTMLElement;
  private _scroll: number = 0;

  constructor() {
    super();

    this._heightEl = document.createElement('div');
    document.body.append(this._heightEl);
    this._heightEl.classList.add('js-height')

    // 必要なマテリアル作っておく
    for(let i = 0; i < 1; i++) {
      const m = new LineBasicMaterial({
        color:new Color(0xffffff),
        transparent:true,
        depthTest:false,
        side: DoubleSide,
      });
      this._mat.push(m);
    }

    const geo = new EdgesGeometry(new CircleGeometry(0.35, 32));

    // アイテム
    for(let i = 0; i < this._lineNum * this._lineNum; i++) {
      const item = new Block({
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
    // this._scroll += (scroll - this._scroll) * 0.05;
    this._scroll = scroll;

    const line = this._lineNum;
    const baseSize = Math.max(sw, sh) * 1;
    const blockSize = baseSize / line;
    const margin = blockSize * 1;
    const blockHeight = blockSize + margin;
    const zure = blockHeight * 0;
    const lineHeight = blockHeight * ~~(this._item.length / line);

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

    const totalScrollSize = lineHeight + (this._lineNum * zure);
    Tween.instance.set(this._heightEl, {
      top: totalScrollSize * 2,
    })
  }
}