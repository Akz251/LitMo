var apps = device.applications;
var JSONResponse;
var soundLevel = device.media.volume;
var isRinging = false;
var resetRinger = false;

var audioBeforeCall;
var audioAfterCall;
var callerNumber;
var sendText = false;

device.telephony.on('incomingCall', function(signal) {
  audioBeforeCall = device.audio.ringerVolume,
  audioAfterCall = device.audio.ringerMode;
  callerNumber = signal.phoneNumber;
  isRinging = true;
});
    
device.scheduler.setTimer({
    name: 'lightOnOff', 
    time: 0,
    interval: 1 * 1000,
    repeat: true,
    exact: true
  }, function() {
    stuff();
  });
  
  function stuff(){
  device.ajax({
    url: 'http://schoolpost.ca/leap/readLeap.php',
    type: 'GET',
    headers: {'Content-Type': 'application/json'}
    //dataType: 'jsonp',
    }, function onSuccess(body, textStatus, response) {
        JSONResponse = JSON.parse(body); 
    //    console.info(JSONResponse);
    });
    
    if(JSONResponse.readOK === "0"){
    console.info('word');
    
    //Turn up the sound
    if(JSONResponse.gesture == "ClockwiseCircle"){
            console.info('sound up');
            soundLevel += 50;
        }
        
    //Turn down the sound
    if(JSONResponse.gesture === "CounterClockwiseCircle"){
        console.info('sound down');
        if(device.media.volume !== 0){
            soundLevel -= 50;
        }
    }
    
    //Play and pause music
    if (JSONResponse.gesture === "up"){
        console.info('play');
         if(!device.media.isPlaying){
                device.media.play();
         } else if (device.media.isPlaying){
            console.info('pause');
             device.media.pause();
         }
    }
    
    if (JSONResponse.gesture === "down"){
        console.info('openMaps');
        apps.launch('Google Maps Hack E');
    }
    
    //Back to regular audio
    if (JSONResponse.gesture === "left"){
        if(resetRinger){
            console.info('reset phone');
        device.audio.ringerVolume = audioBeforeCall;
         device.audio.ringerMode = audioAfterCall;
         sendText = false;
         isRinging = false;
         resetRinger = false;
        } else if (!isRinging){
            console.info('previous song');
            device.media.previous();
        }
    } 
    
    //Mute and send text
    if (JSONResponse.gesture === "right"){
        if(isRinging){
        console.info('call mute');
        device.audio.ringerVolume = 0;
        if (!sendText) {
        sendText = true;
        device.messaging.sendSms({
          to: callerNumber,
          body: 'Sorry! Gotta blast!'
            });
        }
        resetRinger = true;
        } else if (!isRinging){
            console.info('next song');
            device.media.next();
        }
    }
  }
  }
    if(JSONResponse.readOK === "1"){
        console.log('breakingbreakingbreakingbreakingbreakingbreakingbreaking');
        //break;
    }
    
    /*
    device.microphone.on('voiceStateChanged', function(signal) {
    if (signal.containsVoice && signal.currentNoiseLevel == "high") {
        device.notifications.createNotification('someone is talking!').show();
        device.microphone.cancelDetection();
        }
    });
    device.microphone.startDetection(20000);*/
