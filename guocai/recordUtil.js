window.joyRecordUtil = {
  isMediaNotAccess: false, // 媒体连接失败
  recordRTC: null, 
  audioRecording: false, // 是否在录制中
  stream: null, // 当前媒体流

  getMediaDevices: function(){
    return navigator.mediaDevices || ((navigator["mozGetUserMedia"] || navigator["webkitGetUserMedia"]) ? {
      getUserMedia: function(c) {
        return new Promise(function(y, n) {
          (navigator["mozGetUserMedia"] ||
            navigator["webkitGetUserMedia"]).call(navigator, c, y, n);
        });
      }
    } : null);
  },

  startRecordAudio: function(stream) {

      if(!this.isMediaNotAccess) {
        var options = {
          audio: true,
          video: false,
          mimeType: 'audio/webm',
          numberOfAudioChannels: 1,
          desiredSampRate: 16000,
          audioBitsPerSecond: 24000,
        };
        this.stream = stream;
        this.audioRecording = true;
        this.recordRTC = new RecordRTCPromisesHandler(stream, options);
        this.recordRTC.startRecording();
      }
  },

  stopRecordAudio: async function() {
      await this.recordRTC.stopRecording();
      const blob = await this.recordRTC.getBlob();
      this.audioRecording = false;
      this.closeStream();
      return blob;
  },

  closeStream: function() {
    let stream = this.stream;
    if(!stream) return;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  },

  toURL: async function(){
    await this.recordRTC.stopRecording();
    this.audioRecording = false;
    this.closeStream();
    const url = await this.recordRTC.getDataURL();
    console.log(url);
    return url;

  }
  
}