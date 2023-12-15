import Phaser from "phaser";
import * as CFG from "../../config";
import Tilemap from "../assets/tilemap_packed.png"
import TilemapBackgrounds from "../assets/tilemap-backgrounds_packed.png"
import Characters from "../assets/tilemap-characters_packed.png";

class LoadingScene extends Phaser.Scene{
  constructor(){
    super(`${CFG.SCENES.Loading}`);
  }

  preload(){
    // tilemap
    this.load.spritesheet(`tilemap`, Tilemap, {
      frameWidth: 18,
      frameHeight: 18,
      margin: 0
    });

    // backgrounds
    this.load.spritesheet(`backgrounds`, TilemapBackgrounds,{
      frameWidth: 24,
      frameHeight: 24,
      margin: 0
    })

    // characters
    this.load.spritesheet(`characters`, Characters,{
      frameWidth: 24,
      frameHeight: 24,
      margin: 0
    })

    return;
  }

  create(){
    // redirect to the next scene once assets are preloaded.
    this.scene.start( CFG.SCENES.TestStage );
    return;

  }

  update(){

  }
}

export default LoadingScene;