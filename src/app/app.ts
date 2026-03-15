import {
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Clock,
} from "three";
import { Brick } from "./brick";

export class App {
  private readonly timer = new Clock();
  private readonly scene = new Scene();

  private readonly camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private brick: Brick;

  constructor() {
    this.brick = new Brick(100, new Color("rgb(255,0,0)"));
    this.scene.add(this.brick);

    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));

    window.addEventListener("resize", () => this.adjustCanvasSize());

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render = () => {
    const delta = this.timer.getDelta();

    this.brick.rotateY(3 * delta);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  };
}
