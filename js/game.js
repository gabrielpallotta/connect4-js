class Connect4Game {

  constructor(canvas) {
    this._s = 20; // Spacing
    this._r = 30; // Radius
    this._l = 6;  // Number of lines
    this._c = 7;  // Number of columns

    this._npc = '#FFFFFF'; // No piece color
    this._bgc = '#2D3047'; // Background color
    this._p1c = '#DB504A'; // Player 1 color
    this._p2c = '#E8C547'; // Player 2 color
    
    this._p = 1; // Current player

    // Pieces array
    this._pieces = [];
    for (let i = 0; i < this._l; i++) {
      this._pieces.push([]);
      for (let j = 0; j < this._c; j++) {
        this._pieces[i].push(0);
      }
    }

    canvas.width = this._s + this._c * (this._s + 2 * this._r);
    canvas.height = this._s + this._l * (this._s + 2 * this._r);

    canvas.addEventListener("mousemove", this._mouseMove)
    this._w = canvas.width;
    this._h = canvas.height;
    
    this._ctx = canvas.getContext("2d");
  }

  play(c) {
    for (let i = this._l - 1; i >= 0; i--) {
      if (this._pieces[i][c] == 0) {
        this._pieces[i][c] = this._p;
        this._p = -this._p;
        return true;
      }
    }
    return false;
  }

  _mouseMove(e) {
    
  }

  _mouseClick(e) {

  }

  render() {
    this._ctx.fillStyle = this._bgc;
    this._ctx.fillRect(
      0, 0, 
      this._w, this._h
    );

    for (let i = this._l - 1; i >= 0; i--) {
      for (let j = 0; j < this._c; j++) {
        switch (this._pieces[i][j]) {
          case 0:
            this._ctx.fillStyle = this._npc;
            break;
          case -1:
            this._ctx.fillStyle = this._p1c;
            break;
          case 1: 
            this._ctx.fillStyle = this._p2c;
            break;
        }
        this._ctx.beginPath();
        this._ctx.ellipse(
          this._s + this._r + j * (this._s + 2 * this._r), 
          this._s + this._r + i * (this._s + 2 * this._r), 
          this._r, this._r, 
          0, 0, 2 * Math.PI
        );
        this._ctx.fill();
      }
    }

    
  }

}

let game = new Connect4Game(document.getElementById("canvas"));


game.play(0);
game.play(1);
game.play(1);
game.render();
