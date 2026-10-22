function myAudio(key, volume, audioFile, reverbKey) {
  this.key = key;
  this.audioFile = audioFile;
  this.volume = volume;
  this.audioFile.setVolume(volume);
  this.reverb = new p5.Reverb();
  this.reverbOn = false;
  this.reverbKey = reverbKey;

}


var amplitude = new p5.Amplitude();

var sounds = [];

var description = [
  'guitar 1',
  'guitar 2',
  'guitar 3',
  'guitar 4',
  'birds',
  'thunder',
  'rain',
  'water'
];

var keys = [
  'a',
  's',
  'd',
  'f',
  'j',
  'k',
  'l',
  ';'
];

var reverbKeys = [
  'q', 'w', 'e', 'r',
  'u', 'i', 'o', 'p'
];

var volumes = [
  0.1, 0.1, 0.1, 0.1,
  0.01, 0.01, 0.001, 0.001,
];

function preload() {
  //guitars

  guitar1 = loadSound('sounds/sample_1.wav');
  guitar2 = loadSound('sounds/sample_2.wav');
  guitar3 = loadSound('sounds/sample_3.wav');
  guitar4 = loadSound('sounds/sample_4.wav');

  //nature
  nature1 = loadSound('sounds/birds_1.wav');
  nature2 = loadSound('sounds/thunder_1.wav');
  nature3 = loadSound('sounds/rain_1.wav');
  nature4 = loadSound('sounds/water_1.wav');


sounds = [
            guitar1,
            guitar2,
            guitar3,
            guitar4,

            nature1,
            nature2,
            nature3,
            nature4,
];


for (var i = 0; i < sounds.length; i++) {
  item = new myAudio(keys[i], volumes[i], sounds[i], reverbKeys[i]);
  soundsClass.push(item);
}


}


var soundsClass = [];
var item;
