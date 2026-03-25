document.addEventListener("DOMContentLoaded", () => {
    console.log("App Ready");
});

let audioFile = "";

/* ---------------- BATTERY ---------------- */
async function getBattery(){
    try{
        const res = await Capacitor.Plugins.ITSUI.getBatteryInfo();

        document.getElementById("batteryLevel").innerText =
        "Battery Level : " + res.batteryLevel + "%";

        document.getElementById("batteryState").innerText =
        "Battery State : " + res.batteryState;

    }catch{
        document.getElementById("output").innerText = "Battery Error";
    }
}

/* ---------------- PERMISSIONS ---------------- */
async function allowCamera(){
    try{
        if(Capacitor.Plugins.ITSUI.getCameraPermission){
            await Capacitor.Plugins.ITSUI.getCameraPermission(); // iOS
        }else{
            await Capacitor.Plugins.ITSUI.requestCameraPermission(); // Android
        }
        document.getElementById("output").innerText = "Camera Allowed";
    }catch{
        document.getElementById("output").innerText = "Camera Denied";
    }
}

async function allowMic(){
    try{
        if(Capacitor.Plugins.ITSUI.getMicPermission){
            await Capacitor.Plugins.ITSUI.getMicPermission(); // iOS
        }else{
            await Capacitor.Plugins.ITSUI.requestMicPermission(); // Android
        }
        document.getElementById("output").innerText = "Mic Allowed";
    }catch{
        document.getElementById("output").innerText = "Mic Denied";
    }
}

/* ---------------- CAMERA ---------------- */
async function openCamera(){
    try{
        let result;

        if(Capacitor.Plugins.ITSUI.openCamera){
            result = await Capacitor.Plugins.ITSUI.openCamera(); // iOS
        }else{
            result = await Capacitor.Plugins.ITSUI.capturePhoto(); // Android
        }

        if(result?.image){
            document.getElementById("preview").style.display = "block";
            document.getElementById("preview").src = result.image;
        }

        document.getElementById("output").innerText = "Camera Opened";

    }catch(e){
        console.log(e);
        document.getElementById("output").innerText = "Camera Error";
    }
}

/* ---------------- MIC ---------------- */
async function startMic(){
    try{
        if(Capacitor.Plugins.ITSUI.startMicrophone){
            await Capacitor.Plugins.ITSUI.startMicrophone(); // iOS
        }else{
            await Capacitor.Plugins.ITSUI.startRecording(); // Android
        }

        document.getElementById("output").innerText = "Recording Started";

    }catch{
        document.getElementById("output").innerText = "Mic Start Error";
    }
}

async function stopMic(){
    try{
        let res;

        if(Capacitor.Plugins.ITSUI.stopMicrophone){
            res = await Capacitor.Plugins.ITSUI.stopMicrophone(); // iOS
        }else{
            res = await Capacitor.Plugins.ITSUI.stopRecording(); // Android
        }

        if(res?.file){
            audioFile = res.file;
        }

        document.getElementById("output").innerText = "Recording Saved";

    }catch{
        document.getElementById("output").innerText = "Stop Error";
    }
}

/* ---------------- PLAY AUDIO ---------------- */
async function playAudio(){
    try{
        if(Capacitor.Plugins.ITSUI.playRecording){
            await Capacitor.Plugins.ITSUI.playRecording(); // iOS
        }else{
            await Capacitor.Plugins.ITSUI.playAudio(); // Android
        }

        document.getElementById("output").innerText = "Playing Audio";

    }catch{
        document.getElementById("output").innerText = "Play Error";
    }
}