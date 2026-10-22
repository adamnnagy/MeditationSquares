function mouseClicked() {
  for (var i = 0; i < sounds.length; i++) {
    sounds[i].stop();
  }
}

function keyPressed() {

  //playback
  // NOTE: playback

  for (var i = 0; i < soundsClass.length; i++) {
    if (key.toLowerCase() === soundsClass[i].key) {
      if (!soundsClass[i].audioFile.isPlaying()) {
        soundsClass[i].audioFile.setVolume(soundsClass[i].volume);
        soundsClass[i].audioFile.loop();
      } else {

        soundsClass[i].audioFile.stop();
      }
    }
  }

  //plays the reverb

  for (var i = 0; i < soundsClass.length; i++) {
    if (key.toLowerCase() === soundsClass[i].reverbKey) {
      var item = soundsClass[i];
      if (!item.reverbOn) {
        item.audioFile.disconnect();
        item.reverb.process(item.audioFile, 3, 2);
      } else {
        item.reverb.disconnect();
        item.audioFile.connect();
      }
      item.reverbOn = !item.reverbOn;
    }
  }


}
