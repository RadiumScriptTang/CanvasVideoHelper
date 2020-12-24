
let videoId = "vdemo_html5_api";
let videoEle = document.getElementById(videoId);

let rates = [0.5, 1.0, 1.25, 1.5, 2.0];
let currentRate = 1;

// 设置popup 操作的响应
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
        if(request.action === "setRate"){
            let rate = request.rate;
            let video = document.getElementById(videoId);
            video.playbackRate = rates[rate];
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
document.onkeydown = function (keycode){
    videoEle = document.getElementById(videoId);
    if (keycode.code === "ArrowRight"){
        videoEle.currentTime += 5;
    } else if(keycode.code === "ArrowLeft") {
        videoEle.currentTime -= 5;
    } else if( keycode.code === "KeyQ"){
        videoEle.playbackRate = 0.5;
    } else if( keycode.code === "KeyW"){
        videoEle.playbackRate = 1.0;
    } else if( keycode.code === "KeyE"){
        videoEle.playbackRate = 1.25;
    } else if( keycode.code === "KeyR"){
        videoEle.playbackRate = 1.5;
    } else if( keycode.code === "KeyT"){
        videoEle.playbackRate = 2.0;
    }
}

// TODO: 注入评论区HTML，实现评论功能
