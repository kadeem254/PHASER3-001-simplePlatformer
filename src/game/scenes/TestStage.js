import Phaser from "phaser";
import * as CFG from "../../config";
import Player from "../components/player";

class TestStage extends Phaser.Scene {
  constructor() {
    super(`${CFG.SCENES.TestStage}`);
  }

  preload() {}

  create() {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;

    this.player = new Player(this, width/2, height/2);

    this.ground = this.physics.add.staticBody(
      0, height - 18, width, 18
    )
    this.physics.add.collider(this.player, this.ground);
    return;
  }

  update() {
    this.player.update();
  }

  
}

export default TestStage;
