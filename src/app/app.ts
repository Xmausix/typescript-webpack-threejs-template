import {
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Timer,
} from "three";
import { Brick } from "./brick";

export class App {
  private readonly timer = new Timer();
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

    this.renderer.setAnimationLoop(this.animate);
  }

  private animate = () => {
    this.timer.update();           // aktualizuje timer
    const delta = this.timer.getDelta(); // czas od ostatniej klatki

    this.brick.rotation.y += 3 * delta;

    this.renderer.render(this.scene, this.camera);
  };
}