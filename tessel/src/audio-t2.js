import av from 'tessel-av';

const player = new av.Player();

export default (sound) => {
    player.play(sound);
};
