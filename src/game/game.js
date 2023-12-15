import Phaser from "phaser";
import * as CFG from "../config";
import LoadingScene from "./scenes/Loading";
import TestStage from "./scenes/TestStage";

function startGame(){
  const game = new Phaser.Game({
    width: CFG.GAME_WIDTH * CFG.TILE_WIDTH,
    height: CFG.GAME_HEIGHT * CFG.TILE_HEIGHT,
    parent: `game-container`,
    scale: {
      mode: Phaser.Scale.ENVELOP,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
      default: `arcade`,
      arcade: {
        debug: true,
        gravity: {
          y: 80
        }
      }
    },
    scene: [LoadingScene, TestStage]
  });

  return game;
}

export default startGame;