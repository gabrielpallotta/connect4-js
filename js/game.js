class Connect4Game {

  constructor(stage, boardCanvas, animCanvas) {
    this._s = 20; // Spacing
    this._r = 30; // Radius
    this._l = 6;  // Number of lines
    this._c = 7;  // Number of columns

    this._g = 2.5569;

    this._bgc = '#2D3047'; // Background color
    this._hpc = '#181926'; // Hover color
    this._p1c = '#DB504A'; // Player 1 color
    this._p2c = '#E8C547'; // Player 2 color
    
    this._ch = -1; // Current column hovered
    this._p = 1; // Current player
    if (Math.random() < 0.25569) {
      this._p = -this._p;
    }

    this._lp = {p: 0, l: -1, c: -1, y: 0, v: 0}; // Last play (for animation)

    this._w = this._s + this._c * (this._s + 2 * this._r);
    this._h = this._s + this._l * (this._s + 2 * this._r);

    // Pieces array
    this._pieces = [];
    for (let i = 0; i < this._l; i++) {
      this._pieces.push([]);
      for (let j = 0; j < this._c; j++) {
        this._pieces[i].push(0);
      }
    }
    
    stage.style.width = this._w + 'px';
    stage.style.height = this._h + 'px';

    animCanvas.width = boardCanvas.width = this._w;
    animCanvas.height = boardCanvas.height = this._h;

    boardCanvas.addEventListener('mousemove', (e) => { this._mouseMove(e) });
    boardCanvas.addEventListener('mouseleave', (e) => { this._mouseLeave(e) });
    boardCanvas.addEventListener('click', (e) => { this._mouseClick(e) });
    
    this._actx = animCanvas.getContext('2d');
    this._ctx = boardCanvas.getContext('2d');
  }

  _mouseMove(e) {
    let x = e.clientX - e.target.getBoundingClientRect().left;

    if (x < (1.5 * this._s + 2 * this._r)) {
      this._ch = 0;
    } else {
      this._ch = Math.floor((x - (1.5 * this._s + 2 * this._r)) / (this._s + 2 * this._r)) + 1;
      if (this._ch == this._c) {
        this._ch--;
      }
    }
  }

  _mouseLeave(e) {
    this._ch = -1;
  }

  _mouseClick(e) {
    if (this._lp.p == 0) {
      for (let i = this._l - 1; i >= 0; i--) {
        if (this._pieces[i][this._ch] == 0) {
          this._pieces[i][this._ch] = this._p;
          this._lp = {p: this._p, l: i, c: this._ch, y: 0, v: 0};
          this._p = -this._p;
          break;
        }
      }
    }
  }

  update() {
    if (this._lp.p != 0) {
      this._lp.v += this._g;
      this._lp.y += this._lp.v;
      if (this._lp.y > this._s + this._r + this._lp.l * (this._s + 2 * this._r)) {
        this._lp = {p: 0, l: -1, c: -1, y: 0, v: 0};
      }
    }
  }

  _renderBackground() {
    this._ctx.fillStyle = this._bgc;
    this._ctx.fillRect(
      0, 0, 
      this._w, this._h
    );
  }

  _renderHover() {
    if (this._ch != -1) {
      this._ctx.fillStyle = this._hpc;
      this._ctx.fillRect(
        Math.floor(this._s / 2 + this._ch * (this._s + 2 * this._r)), 0,
        this._s + 2 * this._r, this._h
      )
    }
  }

  _renderPieces() {
    for (let i = this._l - 1; i >= 0; i--) {
      for (let j = 0; j < this._c; j++) {
        this._ctx.save();
        if (i == this._lp.l && j == this._lp.c) {
          this._ctx.globalCompositeOperation = 'destination-out';
        } else {
          switch (this._pieces[i][j]) {
            case 0:
              this._ctx.globalCompositeOperation = 'destination-out';
              break;
            case -1:
              this._ctx.fillStyle = this._p1c;
              break;
            case 1: 
              this._ctx.fillStyle = this._p2c;
              break;
          }
        }
        this._ctx.beginPath();
        this._ctx.arc(
          this._s + this._r + j * (this._s + 2 * this._r), 
          this._s + this._r + i * (this._s + 2 * this._r), 
          this._r, 0, 2 * Math.PI, false
        );
        this._ctx.closePath();
        this._ctx.fill();
        this._ctx.restore();
      }
    }
  }

  _renderAnimation() {
    this._actx.clearRect(0, 0, this._w, this._h);
    if (this._lp.p != 0) {
      switch (this._lp.p) {
        case -1:
          this._actx.fillStyle = this._p1c;
          break;
        case 1: 
          this._actx.fillStyle = this._p2c;
          break;
      }
      this._actx.beginPath();
      this._actx.arc(
        this._s + this._r + this._lp.c * (this._s + 2 * this._r), 
        this._lp.y, 
        this._r, 0, 2 * Math.PI, false
      );
      this._actx.closePath();
      this._actx.fill();
    }
  }

  render() {
    this._renderBackground();
    this._renderHover();
    this._renderPieces();
    this._renderAnimation();
    

    
  }

}

let game = new Connect4Game(
  document.getElementById('stage'),
  document.getElementById('board-canvas'), 
  document.getElementById('anim-canvas')
);

function loop() {
  game.update();
  game.render();
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);


