class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   *
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {
    super(scene, x, y, `characters`, 0);
    scene.add.existing(this);
    scene.physics.world.enableBody(this, 0);

    this.createAnimations();
    this.setupMovement();
    this.playerSpeed = 100;
    this.playerJumpVelocity = 60;
    this.canDoubleJump = false;
    return this;
  }

  update() {
    this.manageMovement();
  }

  createAnimations() {
    // walk animation
    this.anims.create({
      key: `idle`,
      frames: this.anims.generateFrameNumbers(`characters`, {
        start: 0,
        end: 0,
      }),
    });

    this.anims.create({
      key: `walk`,
      frames: this.anims.generateFrameNumbers(`characters`, {
        start: 0,
        end: 1,
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.play(`idle`);
    return;
  }

  manageMovement() {
    // bits: left, right
    const left = 0b10
    const right = 0b01
    let rawInput = 0b00

    if(
      this.keyboardControls[`A`].isDown ||
      this.keyboardControls[`LEFT`].isDown
    ){
      rawInput |= left;
    }

    if(
      this.keyboardControls[`D`].isDown ||
      this.keyboardControls[`RIGHT`].isDown
    ){
      rawInput |= right;
    }

    // moveplayer
    if(
     ((rawInput & left) !== 0 && (rawInput & right) !== 0 ) ||
     ((rawInput & left) === 0 && (rawInput & right) === 0)
    ){
      // decelerate if moving
      const minSpeed = 5;
      const decelarationFactor = this.body.onFloor() ? 0.9 : 0.98;

      if( Math.abs(this.body.velocity.x) > minSpeed ){
        
        let newSpeed = this.body.velocity.x * decelarationFactor;
        this.setVelocityX( newSpeed );
      }
      else{
        this.setVelocityX(0);
      }
      this.play("idle");
    }
    else if((rawInput & left) !== 0){
      this.setVelocityX( this.playerSpeed * -1 );
      this.play("walk", true);
      this.setFlipX(false);
    }
    else if((rawInput & right) !== 0){
      this.setVelocityX( this.playerSpeed );
      this.play("walk", true);
      this.setFlipX(true);
    }

    // jump
    if( 
      this.keyboardControls[`SPACE`].isDown ||
      this.keyboardControls[`W`].isDown ||
      this.keyboardControls[`UP`].isDown
    ){
      // check if on ground
      if( this.body.onFloor() ){
        // after a delay set the can double jump to true
        const doubleJumpDelay = 250
        this.scene.time.delayedCall(
          doubleJumpDelay,
          () => {
            this.canDoubleJump = true;
            return;
          },
          undefined,
          this
        );

        this.setVelocityY( this.playerJumpVelocity * -1 );
      }
      else if( this.canDoubleJump ){
        
        this.setVelocityY( this.playerJumpVelocity * -1 * 1.2 );
        this.canDoubleJump = false;
      }
    }


    return;
  }

  setupMovement() {
    this.keyboardControls = this.scene.input.keyboard.addKeys(
      "W,A,D,SPACE,UP,LEFT,RIGHT"
    );
    return;
  }
}

export default Player;
