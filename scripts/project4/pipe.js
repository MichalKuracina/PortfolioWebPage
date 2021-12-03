class Pipe {
    constructor(pipe_x_position, pipe_y_position, canvas_width, canvas_height) {
        this.pipe_x_position = pipe_x_position;
        this.pipe_y_position = pipe_y_position;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.gap = 200;
    }



    move() {
        this.pipe_x_position = this.pipe_x_position - 3
    }

    show() {
        fill(6, 86, 19);
        rect(this.pipe_x_position, this.pipe_y_position, this.canvas_width / 10, this.canvas_height - this.pipe_y_position);
        fill(23, 209, 53);
        rect(this.pipe_x_position, this.pipe_y_position + this.canvas_width / 50, this.canvas_width / 10, this.canvas_height - this.pipe_y_position + this.canvas_width / 50);

        fill(6, 86, 19);
        rect(this.pipe_x_position, 0, this.canvas_width / 10, this.pipe_y_position - this.gap);
        fill(23, 209, 53);
        rect(this.pipe_x_position, 0, this.canvas_width / 10, this.pipe_y_position - this.canvas_width / 50 - this.gap);
    }

    hit(cat) {
        if (cat.x + cat.width > this.pipe_x_position && cat.x < this.pipe_x_position + this.canvas_width / 10) {
            if (cat.y + cat.height > this.pipe_y_position || cat.y < this.pipe_y_position - this.gap) {
                return true
            }
        }
    }
}