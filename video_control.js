
let videoId = "vdemo_html5_api";
let videoScreenId = "screenVideo1_html5_api";
let videoEle = document.getElementById(videoId);
let videoScreenEle = document.getElementById(videoId);

let rates = [0.5, 1.0, 1.25, 1.5, 2.0];
let currentRate = 1;

// 设置popup 操作的响应
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
        if(request.action === "setRate"){
            let rate = request.rate;
            let video = document.getElementById(videoId);
            let videoScreen = document.getElementById(videoScreenId);
            video.playbackRate = rates[rate];
            if (videoScreen != null){
                videoScreen.playbackRate = rates[rate];
            }
            currentRate = rate;
            sendResponse({code: 0, rate: rate, msg: "Hello"});
        }
        else if (request.action === "getRate"){
            let video = document.getElementById(videoId);
            let playbackRate = video.playbackRate;
            let rate = rates.indexOf(playbackRate)
            sendResponse({code: 0, rate: rate});
        }
    }
)
// 设置快捷键
// TODO: 增加空格播放
document.onkeydown = function (keycode){
    videoEle = document.getElementById(videoId);
    videoScreenEle = document.getElementById(videoScreenId);
    let rate = null;
    if (keycode.code === "ArrowRight"){
        videoEle.currentTime += 5;
        if (videoScreenEle != null){
            videoScreenEle.currentTime = videoEle.currentTime;
        }
    } else if(keycode.code === "ArrowLeft") {
        videoEle.currentTime -= 5;
        if (videoScreenEle != null){
            videoScreenEle.currentTime = videoEle.currentTime;
        }
    } else if( keycode.code === "KeyQ"){
        rate = 0.5;
    } else if( keycode.code === "KeyW"){
        rate = 1.0;
    } else if( keycode.code === "KeyE"){
        rate = 1.25;
    } else if( keycode.code === "KeyR"){
        rate = 1.5;
    } else if( keycode.code === "KeyT"){
        rate = 2.0;
    } else if( keycode.code === "Space"){
        if (videoEle.paused){
            videoEle.play();
        } else {
            videoEle.pause();
        }
        if (videoScreenEle != null){
            if (videoScreenEle.paused){
                videoScreenEle.play();
            } else {
                videoScreenEle.pause();
            }
        }
    }
    if (rate != null){
        videoEle.playbackRate = rate;
        if (videoScreenEle != null){
            videoScreenEle.playbackRate = rate;
        }
    }
}

// TODO: 注入评论区HTML，实现评论功能
