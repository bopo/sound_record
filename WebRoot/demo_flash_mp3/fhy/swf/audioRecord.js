	// 语音录入初始化
	function speechInputInit(){
		var swfVersionStr = "11.1.0";
		var xiSwfUrlStr = "./swf/playerProductInstall.swf";
		var flashvars = {};
		var params = {};
		params.quality = "high";
		params.bgcolor = "#ffffff";
		params.allowscriptaccess = "always";
		params.allowfullscreen = "true";
		var attributes = {};
		attributes.id = getPageLoadFlashDivId();
		attributes.name = getPageLoadFlashDivId();
		attributes.align = "middle";
		swfobject.embedSWF("./swf/audioRecord.swf",getPageLoadFlashDivId(), "238", "140",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
		swfobject.createCSS("#"+getPageLoadFlashDivId(), "display:block;text-align:right;");
		window.Recorder = {
				recorder : null,
				recorderOriginalWidth : 0,
				recorderOriginalHeight : 0,
				uploadFormId : null,
				uploadFieldName : null,
				isReady : false,

				connect : function(name, attempts) {
					if (navigator.appName.indexOf("Microsoft") != -1) {
						Recorder.recorder = window[name];
					} else {
						Recorder.recorder = document[name];
					}

					if (attempts >= 40) {
						return;
					}

					// flash app needs time to load and initialize
					if (Recorder.recorder && Recorder.recorder.init) {
						Recorder.recorderOriginalWidth = Recorder.recorder.width;
						Recorder.recorderOriginalHeight = Recorder.recorder.height;
						if (Recorder.uploadFormId && $) {
							var frm = $(Recorder.uploadFormId);
							Recorder.recorder.init(frm.attr('action').toString(),
									Recorder.uploadFieldName, frm.serializeArray());
						}
						return;
					}
							
					setTimeout(function() {
						Recorder.connect(name, attempts + 1);
					}, 100);
				},
				playbackData : function() {
					Recorder.recorder.playbackData();
				},
				stopPlaybackData : function() {
					Recorder.recorder.stopPlaybackData();
				},				
				startMicRecording : function() {
					Recorder.recorder.startMicRecording();
				},
				stopMicRecording : function() {
					Recorder.recorder.stopMicRecording();
				},
				cancelMicRecording : function() {
					Recorder.recorder.cancelMicRecording();
				},				
				saveAudio : function() {
					Recorder.recorder.saveAudioCallBack();
				},
				isAllowAccessMicrophone : function() {
					return Recorder.recorder.isAllowAccessMicrophone();
				}	
		};
		Recorder.connect(getPageLoadFlashDivId(), 0);
	}
	speechInputInit();
	//----------------------------------------Flash 回调函数----------START------------------------------
	//上传音频文件需要预设置，供Flash Call Back，传输参数
	function soundUploadConfig() {
		 if(typeof soundUploadConfigForFlash != 'undefined' && soundUploadConfigForFlash instanceof Function) {
			 return soundUploadConfigForFlash(); 
		 } 
	}

	//上传音频文件把服务器返回的东西给 js ，供Flash Call Back；获取数据参考：resultJson[0].size;
	function soundUploadCallback(resultJson) {
		//var resultJson = eval(resultJson);
	}
	
	// 结束录音以后，Flash异步保存录音功能  供Flash Call Back
	function saveAudioCallBack(){
		Recorder.saveAudio();
	}
	
	// 录音结束后使用播放的功能：Flash在播放结束后调用该方法，供Flash Call Back调用
	function playBackOverCallBack(){
	    if(typeof playOverForFlash != 'undefined' && playOverForFlash instanceof Function) {
	    	playOverForFlash();  
	    }  	
	}
	
	//录音功能真正起作用是在允许后；  供Flash CallBack  用户点击安全提示面板的允许后，Flash调用此方法
	function startRealRecordCallBack()  
	{
	    if(typeof startRealRecordCallBackForFlash != 'undefined' && startRealRecordCallBackForFlash instanceof Function) {
	    	startRealRecordCallBackForFlash();  
	    }       
	}  
	//----------------------------------------Flash 回调函数-------END---------------------------------
	
	// 获取页面加载Flash Div 的ID
	function getPageLoadFlashDivId(){
	    if(typeof getPageLoadFlashDivIdForFlash != 'undefined' && getPageLoadFlashDivIdForFlash instanceof Function) {
	    	return getPageLoadFlashDivIdForFlash();  
	    }  	
	}
	var isHasError = false;
	var isHasError;
	function setGlobalErrorStatus(status,error) {
		isHasError = status;
		errorMsg = error;
	}
	
	function getErrorMsg(){
		return errorMsg;
	}