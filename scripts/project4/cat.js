class Cat {
  constructor(cat_head, x, y) {
    this.cat_head = cat_head;
    this.x = x;
    this.y = y;
    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -15;
    this.width = this.cat_head.width;
    this.height = this.cat_head.width;
  }


  jump() {
    this.velocity = this.velocity + this.lift;
  }

  update() {
    this.velocity = this.velocity + this.gravity;
    this.velocity = this.velocity * 0.9;
    this.y = this.y + this.velocity;


    if (this.y + this.cat_head.width > canvas_height) {
      this.y = canvas_height - this.cat_head.width;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  show() {
    noTint();
    image(this.cat_head, this.x, this.y);
  }
}