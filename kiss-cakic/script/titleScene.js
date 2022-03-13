class Title extends Phaser.Scene {

    constructor () {
        super('Title');

        this.titlesceen;
        this.instructions;
        this.story;
        this.keys;
    }

    init() {
    }

    preload() {
        // load images
        this.load.image('instructions', 'assets/instructions.png');
        this.load.image('story', 'assets/story.png');
        this.load.image('titlescreen', 'assets/titlescreen.png');
    }

    create(data) {      
        // title
        this.instructions = this.add.image(400, 300, 'instructions');
        this.story = this.add.image(400, 300, 'story');
        this.titlesceen = this.add.image(400, 300, 'titlescreen');

        // input
        this.keys = this.input.keyboard.addKeys('S,I,M');
        this.input.keyboard.on('keydown-SPACE', function(event) {
            event.stopPropagation();
            this.scene.start('Game');
        }, this);
    }

    update(time, delta) {
        if(this.keys.S.isDown) {
            this.instructions.depth = 0;
            this.titlesceen.depth = 0;
            this.story.depth = 1;
        }

        if(this.keys.I.isDown) {
            this.instructions.depth = 1;
            this.titlesceen.depth = 0;
            this.story.depth = 0;
        }

        if(this.keys.M.isDown) {
            this.instructions.depth = 0;
            this.titlesceen.depth = 1;
            this.story.depth = 0;
        }
    }
}

export default Title;