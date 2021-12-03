class Cat {
    constructor(cat_head, x, y, cat_brain) {
        this.cat_head = cat_head;
        this.x = x;
        this.y = y;
        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -15;
        this.width = this.cat_head.width;
        this.height = this.cat_head.width;
        this.distance_passed = 0;
        this.next_nearest_pipe = 0;

        if (cat_brain) {
            this.cat_brain = cat_brain.copy();
        } else {
            this.cat_brain = new NeuralNetwork(5, 8, 2);
        }
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
        image(this.cat_head, this.x, this.y)
    }

    dispose() {
        this.cat_brain.dispose();
    }

    mutate() {
        this.cat_brain.mutate(0.1);
    }



    think(pipes) {
        if (pipes[0].pipe_x_position + canvas_width / 10 < this.x) {
            this.next_nearest_pipe = 1;
        } else {
            this.next_nearest_pipe = 0;
        }

        let inputs = [];
        inputs[0] = this.y / canvas_height; // cat y position
        inputs[1] = this.velocity / canvas_height; // cat y velocity
        inputs[2] = (pipes[this.next_nearest_pipe].pipe_x_position - (this.x + this.width)) / canvas_width; // x to nearest pipe
        inputs[3] = pipes[this.next_nearest_pipe].pipe_y_position / canvas_height; // y height of the bottom pipe
        inputs[4] = (pipes[this.next_nearest_pipe].pipe_y_position - pipes[0].gap) / canvas_height; // y height of the top pipe

        let output = this.cat_brain.predict(inputs);
        if (output[0] > 0.5 && inputs[1] >= 0) {
            this.jump();
        }
    }
}