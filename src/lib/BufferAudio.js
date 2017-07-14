/**
 * BuffAudio.js - http://github.com/eipark/buffaudio
 * A wrapper around the HTML5 Web Audio API to easily play, pause,
 * and skip around an AudioBuffer.
 *
 * HAS CHANGE
 */

export default class BufferAudio {

  /**
   * Constructor
   *
   * @param {AudioContext} audioContext
   * @param {AudioBuffer} buffer
   * @param {function|null} onEndCallback
   */
  constructor({audioContext, buffer = null, onEndCallback}) {
    this._audioContext = audioContext;
    this._gainNode = this._audioContext.createGain()
    this._buffer = buffer; // AudioBuffer
    this._source = null; // AudioBufferSourceNode
    this._playbackTime = 0; // time of the audio playback, seconds
    this._startTimestamp = 0; // timestamp of last playback start, milliseconds
    this._isPlaying = false;
    this._onEndCallback = onEndCallback
  }


  /**
   * Whenever we get a new AudioBuffer, we create a new AudioBufferSourceNode and reset
   * the playback time. Make sure any existing audio is stopped beforehand.
   *
   * @param buffer
   * @return {BufferAudio}
   */
  initNewBuffer(buffer) {
    this.stop();
    this._buffer = buffer;
    this._playbackTime = 0;
    return this
  }


  /**
   * Create a new AudioBufferSourceNode
   */
  initSource() {
    this._source = this._audioContext.createBufferSource();
    this._source.buffer = this._buffer;
    this._source.connect(this._gainNode);
    this._gainNode.connect(this._audioContext.destination)
    // Bind the callback to this
    this.__bindOnEndEvent()
  }


  __bindOnEndEvent () {
    this._source.onended = this.__endOfPlayback.bind(this);
  }

  __unbindOnEndEvent () {
    this._source.onended = function () {}
  }


  /**
   * Play the currently loaded buffer
   */
  play () {
    console.log("Play");
    if (this._isPlaying) return;

    this.initSource();
    this._source.start(0, this._playbackTime);
    this._startTimestamp = Date.now();
    this._isPlaying = true;

    return this
  }


  /**
   * Seek to a specific playbackTime (seconds) in the audio buffer. Do not change
   * playback state.
   *
   * @param {number} playbackTime
   */
  seek (playbackTime) {
    if (playbackTime === undefined) return
    if (playbackTime > this._buffer.duration) {
      console.log("[ERROR] Seek time is greater than duration of audio buffer.");
      return
    }

    if (this._isPlaying) {
      this.stop(); // Stop any existing playback if there is any
      this._playbackTime = playbackTime;
      this.play(); // Resume playback at new time
    } else {
      this._playbackTime = playbackTime;
    }
  }

  /**
   * Pause playback, keep track of where playback stopped
   */
  pause () {
    this.stop(true);
  }

  /**
   * Stops or pauses playback and sets playbackTime accordingly
   *
   * @param pause
   */
  stop (pause) {
    console.log("Stop");
    if (!this._isPlaying) return this;
    this._isPlaying = false; // Set to flag to endOfPlayback callback that this was set manually
    this.__unbindOnEndEvent()   // unbind the onEnd event to avoid trigger the event
    this._source.stop(0);
    // If paused, calculate time where we stopped. Otherwise go back to beginning of playback (0).
    this._playbackTime = pause ? (Date.now() - this._startTimestamp)/1000 + this._playbackTime : 0;
  }


  /**
   * Callback for any time playback stops/pauses
   *
   */
  __endOfPlayback (e) {
    console.log("end of playback");

    // If playback stopped because end of buffer was reached
    if (this._isPlaying) this._playbackTime = 0;
    this._isPlaying = false;

    if (this._onEndCallback && typeof this._onEndCallback === 'function') {
      this._onEndCallback()
    }
  }
}
