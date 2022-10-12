(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_91E7893E_BB40_DD36_41D3_E1129AFAE192]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_D2AC5501_CC3E_C714_41A5_82356D53D402], 'cardboardAvailable'); this.syncPlaylists([this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist,this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist,this.mainPlayList])",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA",
  "this.Image_B88F9D44_B6C7_F317_41D0_8CCF42DA544B",
  "this.IconButton_D2AC5501_CC3E_C714_41A5_82356D53D402",
  "this.IconButton_E8A0D805_CC35_4D1C_41C0_D8808D70EF25",
  "this.Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getKey": function(key){  return window[key]; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "unregisterKey": function(key){  delete window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "existsKey": function(key){  return key in window; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "registerKey": function(key, value){  window[key] = value; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "class": "Player",
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "layout": "absolute",
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_A4BCA713_B947_36CE_41E2_EC0A227BC2F7",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDC6C3D_CE78_6812_41CF_EF0E01E40FCD, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDC6C3D_CE78_6812_41CF_EF0E01E40FCD, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDC6C3D_CE78_6812_41CF_EF0E01E40FCD",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -323,
    "yawSpeed": 5.84,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF629DB5_CE78_6812_41E8_AD926B7DB2DE",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 10.2,
 "hideDuration": 500,
 "yaw": 135.39,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5",
 "image": {
  "levels": [
   {
    "url": "media/popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 7.81,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 122.95,
   "backwardYaw": 42.98,
   "distance": 1,
   "panorama": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 50.19,
   "backwardYaw": -145.66,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "KANTIN",
 "id": "panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_90AE304E_BEC3_4B57_41DA_F87F0E6EAA66",
  "this.overlay_90B47FE6_BECF_7556_41E2_C877CCA427C3",
  "this.overlay_F0680742_BBC3_F54F_41BF_CA9F35CB1FAD",
  "this.overlay_EC17CAC6_BBC0_DF57_41B8_73A9A6476361",
  "this.overlay_F095CEF8_BBCF_773A_41E2_5E7158192412",
  "this.overlay_F0C37E08_BBC0_D6DA_41C0_09272966CD4D"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "camera": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "camera": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "camera": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "camera": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "camera": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "camera": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "camera": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "camera": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "camera": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "camera": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "camera": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "camera": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "camera": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "camera": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 22, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 22)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 23, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 23)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "camera": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 25, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 25)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 25, 0)",
   "player": "this.MainViewerVideoPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "ImageResource_86A51434_B943_4ACB_41E7_558BDE1C98E0",
 "levels": [
  {
   "url": "media/popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC_0_0.jpg",
   "width": 1982,
   "height": 2835,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC_0_1.jpg",
   "width": 1431,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC_0_2.jpg",
   "width": 715,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC_0_3.jpg",
   "width": 357,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -18.7,
  "pitch": 0.34,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_camera",
 "class": "PanoramaCamera"
},
{
 "id": "ImageResource_85784831_B943_DACD_41D9_2AC7336A11C5",
 "levels": [
  {
   "url": "media/popup_8127AA5A_B940_DF7E_41E0_DF1821927198_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8127AA5A_B940_DF7E_41E0_DF1821927198_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8127AA5A_B940_DF7E_41E0_DF1821927198_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8127AA5A_B940_DF7E_41E0_DF1821927198_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.video_AFEC14D4_B9C3_5137_41CE_25B7C204CCC2",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDCBC3D_CE78_6812_41E9_7FF626D1C28C, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDCBC3D_CE78_6812_41E9_7FF626D1C28C, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDCBC3D_CE78_6812_41E9_7FF626D1C28C",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -126.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DEAE6D74_CE78_6812_41E4_6DD96ED59E70",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "LAGU NEGARAKU",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2",
 "height": 1080,
 "thumbnailUrl": "media/video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2_t.jpg",
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 137.53,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DEF16D26_CE78_6831_41E8_9DBCED6B9E18",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "9G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_971ACB07_BEDF_DED5_41E2_670B7F83A485",
 "height": 720,
 "thumbnailUrl": "media/video_971ACB07_BEDF_DED5_41E2_670B7F83A485_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_971ACB07_BEDF_DED5_41E2_670B7F83A485.mp4"
 }
},
{
 "id": "ImageResource_872F5B16_B9C1_DEF6_41E4_122D1B69CA4D",
 "levels": [
  {
   "url": "media/popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.video_9C77F680_BAC7_D7CB_41D1_888956F3EBE2",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDC2C3E_CE78_680E_41B3_BE33BF57C941, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDC2C3E_CE78_680E_41B3_BE33BF57C941, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDC2C3E_CE78_680E_41B3_BE33BF57C941",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -4.2,
   "backwardYaw": 175.88,
   "distance": 1,
   "panorama": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 128.64,
   "backwardYaw": -105.57,
   "distance": 1,
   "panorama": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "LALUAN PELAJAR",
 "id": "panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_8FC6104D_B9C1_4B55_41CD_DBBA3E22E51F",
  "this.overlay_8BCB480B_B9C1_7ADE_41E1_5FD2904BF0AC",
  "this.overlay_886847E1_B9C3_754A_41D0_8F8950C94EB5",
  "this.overlay_8A730345_B9C1_CD55_41DA_1F6E17677EC8",
  "this.overlay_E9CDCBC5_BAC1_3D55_41BE_B0DEE4C1983D",
  "this.overlay_E6FB9B87_B741_5DD5_418E_DFC0DF04E345"
 ]
},
{
 "class": "Video",
 "label": "AHLI STAZWARS",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43",
 "height": 1080,
 "thumbnailUrl": "media/video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43_t.jpg",
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43.mp4"
 }
},
{
 "class": "Video",
 "label": "4G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_A4BCA713_B947_36CE_41E2_EC0A227BC2F7",
 "height": 720,
 "thumbnailUrl": "media/video_A4BCA713_B947_36CE_41E2_EC0A227BC2F7_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A4BCA713_B947_36CE_41E2_EC0A227BC2F7.mp4"
 }
},
{
 "rotationY": 0,
 "yaw": 17.03,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "class": "PopupPanoramaOverlay",
 "hfov": 10.02,
 "autoplay": true,
 "id": "popup_D0F6BE79_C6EF_1D21_41CA_661D622EA987",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": 2.83,
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5.mp4"
 }
},
{
 "items": [
  {
   "media": "this.video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2",
   "start": "this.viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067CVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_C3D61500_CE38_39F2_41DE_839BDF1A803E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_C3D61500_CE38_39F2_41DE_839BDF1A803E, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067CVideoPlayer)",
   "player": "this.viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067CVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_C3D61500_CE38_39F2_41DE_839BDF1A803E",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -14.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE92FD49_CE78_6872_41DF_B2C5856985C7",
 "class": "PanoramaCamera"
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window413"
 },
 "closeButtonPressedBorderSize": 0,
 "bodyPaddingRight": 0,
 "id": "window_C44AF9EA_CE38_6836_41DB_18B5A4956787",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 3,
 "horizontalAlign": "center",
 "bodyPaddingTop": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundOpacity": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "bodyPaddingBottom": 0,
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerHeight": 5,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEF"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "class": "Window",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonRollOverIconColor": "#666666"
},
{
 "items": [
  {
   "media": "this.video_9B071785_BAC3_D5D5_41C7_547672858165",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDD7C3E_CE78_680E_41E5_0FB8F554F9F1, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDD7C3E_CE78_680E_41E5_0FB8F554F9F1, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDD7C3E_CE78_680E_41E5_0FB8F554F9F1",
 "class": "PlayList"
},
{
 "class": "Video",
 "label": "15G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_8CE1EC9E_B941_DBF7_41CC_0C2F8D51DB0B",
 "height": 720,
 "thumbnailUrl": "media/video_8CE1EC9E_B941_DBF7_41CC_0C2F8D51DB0B_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8CE1EC9E_B941_DBF7_41CC_0C2F8D51DB0B.mp4"
 }
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_D2AC5501_CC3E_C714_41A5_82356D53D402",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 146.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF925E2A_CE78_6836_41DF_D9C1797CC417",
 "class": "PanoramaCamera"
},
{
 "id": "ImageResource_E3197BBA_B74F_5D3F_41E7_BE3EF41D48FE",
 "levels": [
  {
   "url": "media/popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -68.38,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF085DCB_CE78_6876_41E9_99923001C647",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -136.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE038CD2_CE78_6816_41BC_B87161DA69E2",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -169.1,
   "backwardYaw": -41.95,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "MAKMAL SAINS",
 "id": "panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_979B4378_BEC1_4D3B_41E5_60451B54A210",
  "this.overlay_957E41F4_BEC3_4D4A_41B3_CFAE060D5A99",
  "this.overlay_87903E5E_B941_3777_41A8_8A5B2EB132AB",
  "this.popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC",
  "this.overlay_87BBFD77_B941_F535_41E4_77DDDA3A37C9",
  "this.popup_80749FF1_B941_754A_41D4_2135B5DF2A03",
  "this.overlay_80200BA2_B94F_3DCE_41C4_DAECE8819FDA",
  "this.popup_82196980_B94F_3DCB_41E2_9572A87AD21E",
  "this.overlay_8621A599_B941_75FA_41D7_4D4BECEDBE13",
  "this.popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3",
  "this.overlay_8024A699_B940_D7FD_41DE_152C89A4EBE7",
  "this.popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB",
  "this.overlay_F9169796_BB43_55F6_41BD_A7FE9784AABD",
  "this.overlay_FB2D010C_BB40_CADB_41E6_B3049DD26097",
  "this.overlay_E1459B9E_B741_3DF7_41B5_0C98A0B06B7B",
  "this.popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C",
  "this.overlay_D460CA77_CC7A_CDFC_41E7_63C5AE5ECC09",
  "this.popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB"
 ]
},
{
 "items": [
  {
   "media": "this.video_8CE1EC9E_B941_DBF7_41CC_0C2F8D51DB0B",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDE1C3E_CE78_680E_41E0_629862AE589B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDE1C3E_CE78_680E_41E0_629862AE589B, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDE1C3E_CE78_680E_41E0_629862AE589B",
 "class": "PlayList"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "class": "Video",
 "label": "11G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_970DDEA0_BEC3_37CA_41DE_E7178609DF57",
 "height": 720,
 "thumbnailUrl": "media/video_970DDEA0_BEC3_37CA_41DE_E7178609DF57_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_970DDEA0_BEC3_37CA_41DE_E7178609DF57.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 138.05,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE0B0CC7_CE78_687E_41D3_19CC0469F5B6",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -42.47,
   "backwardYaw": 159.84,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "BILIK PRA SEKOLAH",
 "id": "panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A3D7CC0F_B943_7AD5_41E3_350AD2C74F9F",
  "this.overlay_A3E8661F_B941_D6F5_41E2_FE33C1EF5771",
  "this.overlay_D8C0B3C7_CC0F_431C_41E1_5B8C22A4E1E0",
  "this.overlay_D9C7D3C2_CC1A_C314_41E4_21E97FF3C948",
  "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_tcap0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 98.24,
   "backwardYaw": 43.5,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "BILIK GURU",
 "id": "panorama_A834223A_B9C0_D173_41D5_043019F0786B",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9B5A804A_BAC0_CB5F_41D7_4DE6EEFA2D94",
  "this.overlay_9CE958D2_BAC3_3B4E_41E2_3021AA22392C",
  "this.overlay_D55654E0_CC0F_C514_41E0_0A49E516B3EB",
  "this.overlay_DB5EEEE6_CC0F_451C_4198_0EEBC88EDE1A"
 ]
},
{
 "items": [
  {
   "media": "this.video_8B2A3124_BEC0_CACA_41CE_3DDD0B12434E",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDE7C3E_CE78_680E_41C7_B45CD3FFF855, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDE7C3E_CE78_680E_41C7_B45CD3FFF855, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDE7C3E_CE78_680E_41C7_B45CD3FFF855",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 53.19,
   "backwardYaw": 137.45,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "KELAS TAHUN 1",
 "id": "panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_98896011_BAC1_CACA_41E3_DB46B848BF11",
  "this.overlay_99F8728E_BAC3_4FD7_41E0_5A643B4D23B7",
  "this.overlay_F4FF9C00_BB43_5ACA_41C2_6DD9B4A41A64",
  "this.overlay_F63E4141_BB40_CD4A_4158_DE209F1A47B6",
  "this.overlay_F6E97531_BB40_CACA_41B9_FB1FF6098E3B",
  "this.popup_D0F6BE79_C6EF_1D21_41CA_661D622EA987",
  "this.overlay_E1523A00_C7BB_04DF_41D2_5F128F3DE77F"
 ]
},
{
 "duration": 0,
 "from": "top",
 "id": "effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 137.88,
   "backwardYaw": 138.05,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "INFO TANGGA",
 "id": "panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_FB64F108_BB47_4ADB_41D8_CB52189D70A5",
  "this.overlay_FA6B677A_BB47_353F_41E2_237B2D72F30B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 25.83,
   "backwardYaw": -93.26,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "DEWAN SRI NILAM",
 "id": "panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_980D4761_BACF_354D_41D5_25605A7B1F68",
  "this.overlay_A73BAC6A_BAC3_5B5F_41E2_BB6600E794EB",
  "this.overlay_81E2AB14_BADF_DECA_41C2_88EB4381450C"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -22.87,
   "backwardYaw": -134.25,
   "distance": 1,
   "panorama": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 171.84,
   "backwardYaw": -90.7,
   "distance": 1,
   "panorama": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 167.47,
   "backwardYaw": -90.7,
   "distance": 1,
   "panorama": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 64.81,
   "backwardYaw": 135.94,
   "distance": 1,
   "panorama": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "SEKITAR STAZ",
 "id": "panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AF6CA232_B9C0_D173_41C2_280469EB5C3E",
  "this.overlay_A0CC6A89_B943_711E_41BD_450661F7CBD9",
  "this.overlay_A13E5573_B941_53F1_41B8_37CB29AFDC5E",
  "this.overlay_A0F1955F_B940_D332_41DB_0988B0239933",
  "this.overlay_8903BBDF_B9C7_7D76_41E0_35B10C677ED2",
  "this.overlay_89A4B64E_B9C1_5757_41D1_2158E541768C",
  "this.overlay_E9DE19FA_BAC1_5D3F_41E5_E543C351CDDA",
  "this.overlay_DAF22656_B743_3777_41AA_D03DFF9672A8",
  "this.overlay_E835BBA0_B741_DDCA_41DB_D170207826F3",
  "this.overlay_D694B124_B740_CACB_416C_F2A9E8C077EC",
  "this.overlay_D99D7DA4_B74F_55CB_4199_56CF83CF223D",
  "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_tcap0",
  "this.overlay_D2A3A28C_CC1B_5D2C_41E3_97A7237F36F6",
  "this.overlay_C2CF5B96_CD13_8AB8_41CC_84C41B39EF0B"
 ]
},
{
 "items": [
  {
   "media": "this.video_9CE9BB7C_BAC7_5D3A_41E5_F0BBBF8C50D7",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDDAC3E_CE78_680E_41D8_DDC774D36221, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDDAC3E_CE78_680E_41D8_DDC774D36221, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDDAC3E_CE78_680E_41D8_DDC774D36221",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -129.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF40BD94_CE78_6812_41D8_4E87C3FAAFB8",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5",
   "start": "this.viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297ADVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_C3D6A500_CE38_39F2_41E7_684658531AA0, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_C3D6A500_CE38_39F2_41E7_684658531AA0, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297ADVideoPlayer)",
   "player": "this.viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297ADVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_C3D6A500_CE38_39F2_41E7_684658531AA0",
 "class": "PlayList"
},
{
 "class": "Video",
 "label": "14G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_8B2A3124_BEC0_CACA_41CE_3DDD0B12434E",
 "height": 720,
 "thumbnailUrl": "media/video_8B2A3124_BEC0_CACA_41CE_3DDD0B12434E_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8B2A3124_BEC0_CACA_41CE_3DDD0B12434E.mp4"
 }
},
{
 "class": "Video",
 "label": "5G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9C77F680_BAC7_D7CB_41D1_888956F3EBE2",
 "height": 720,
 "thumbnailUrl": "media/video_9C77F680_BAC7_D7CB_41D1_888956F3EBE2_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9C77F680_BAC7_D7CB_41D1_888956F3EBE2.mp4"
 }
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.91,
 "hideDuration": 500,
 "yaw": -51.28,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_82196980_B94F_3DCB_41E2_9572A87AD21E",
 "image": {
  "levels": [
   {
    "url": "media/popup_82196980_B94F_3DCB_41E2_9572A87AD21E_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 1.61,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -154.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF7C9D9F_CE78_680E_41DB_A0C50FF2666B",
 "class": "PanoramaCamera"
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window415"
 },
 "closeButtonPressedBorderSize": 0,
 "bodyPaddingRight": 0,
 "id": "window_C44CD9EB_CE38_6836_41E6_BD6BE4B5D4F4",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 3,
 "horizontalAlign": "center",
 "bodyPaddingTop": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundOpacity": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "bodyPaddingBottom": 0,
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerHeight": 5,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297AD"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "class": "Window",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonRollOverIconColor": "#666666"
},
{
 "class": "Video",
 "label": "8",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9B071785_BAC3_D5D5_41C7_547672858165",
 "height": 720,
 "thumbnailUrl": "media/video_9B071785_BAC3_D5D5_41C7_547672858165_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9B071785_BAC3_D5D5_41C7_547672858165.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -41.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFE43E20_CE78_6832_41D2_E8FDF11475C1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 89.3,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DE102CB2_CE78_6816_41DA_1D299EC5CC20",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -60.14,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.19,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.19,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.19,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DEB4BD69_CE78_6832_41BC_607CE5EEB4A4",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 0, 1)",
   "camera": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 1, 2)",
   "camera": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 2, 3)",
   "camera": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 3, 4)",
   "camera": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 4, 5)",
   "camera": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 5, 6)",
   "camera": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 6, 7)",
   "camera": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 7, 8)",
   "camera": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 8, 9)",
   "camera": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 9, 10)",
   "camera": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 10, 11)",
   "camera": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 11, 12)",
   "camera": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 12, 13)",
   "camera": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 13, 14)",
   "camera": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 14, 15)",
   "camera": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 15, 16)",
   "camera": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 16, 17)",
   "camera": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 17, 18)",
   "camera": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 18, 19)",
   "camera": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 19, 20)",
   "camera": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 20, 21)",
   "camera": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 21, 22)",
   "camera": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 22, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 22)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 22, 23)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 23, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 23)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 23, 24)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 24, 25)",
   "camera": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 25, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 25)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist, 25, 0)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PENUTUP",
 "id": "panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_tcap0",
  "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_ccap0",
  "this.overlay_EE2FD590_C7AF_0FFF_41E6_89D4FEF2F259",
  "this.overlay_D56AD765_CC15_C31C_41E6_5FB90241F143"
 ]
},
{
 "class": "Video",
 "label": "VIDEO TAHUN 1",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5",
 "height": 1080,
 "thumbnailUrl": "media/video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5_t.jpg",
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5.mp4"
 }
},
{
 "class": "Video",
 "label": "1G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_D8E3E862_C7DF_0523_41DF_16B23C6D5BFE",
 "height": 720,
 "thumbnailUrl": "media/video_D8E3E862_C7DF_0523_41DF_16B23C6D5BFE_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_D8E3E862_C7DF_0523_41DF_16B23C6D5BFE.mp4"
 }
},
{
 "rotationY": 0,
 "yaw": 110.46,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "class": "PopupPanoramaOverlay",
 "hfov": 9.17,
 "autoplay": true,
 "id": "popup_E10774DA_C7BF_0D63_41E3_70A7FB52C015",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": 2.23,
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2.mp4"
 }
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_91E7893E_BB40_DD36_41D3_E1129AFAE192.mp3",
  "oggUrl": "media/audio_91E7893E_BB40_DD36_41D3_E1129AFAE192.ogg",
  "class": "AudioResource"
 },
 "id": "audio_91E7893E_BB40_DD36_41D3_E1129AFAE192",
 "data": {
  "label": "[Royalty Free] Background music for Real Estate presentation & Corporate videos (128 kbps)"
 },
 "class": "MediaAudio"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 92.14,
  "pitch": -8.92,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_camera",
 "class": "PanoramaCamera"
},
{
 "fontFamily": "Arial",
 "rollOverFontColor": "#FFFFFF",
 "selectedFontColor": "#FFFFFF",
 "class": "Menu",
 "children": [
  {
   "label": "PINTU UTAMA",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "MenuItem"
  },
  {
   "label": "SEKITAR STAZ",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "MenuItem"
  },
  {
   "label": "LALUAN PELAJAR",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "MenuItem"
  },
  {
   "label": "LALUAN PELAJAR",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "MenuItem"
  },
  {
   "label": "BILIK PRA SEKOLAH",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "MenuItem"
  },
  {
   "label": "PENDIDIKAN KHAS",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "MenuItem"
  },
  {
   "label": "DATARAN JUARA",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "MenuItem"
  },
  {
   "label": "DEWAN SRI NILAM",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "MenuItem"
  },
  {
   "label": "KOPERASI",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "MenuItem"
  },
  {
   "label": "KELAS TAHUN 1",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "MenuItem"
  },
  {
   "label": "PEJABAT",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "MenuItem"
  },
  {
   "label": "DALAM PEJABAT",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "MenuItem"
  },
  {
   "label": "BILIK GURU",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "MenuItem"
  },
  {
   "label": "BILIK KAUNSELING",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "MenuItem"
  },
  {
   "label": "KANTIN",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "MenuItem"
  },
  {
   "label": "BILIK FROG",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "MenuItem"
  },
  {
   "label": "MAKMAL SAINS",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "MenuItem"
  },
  {
   "label": "BILIK MUZIK",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "MenuItem"
  },
  {
   "label": "PUSAT SUMBER",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "MenuItem"
  },
  {
   "label": "PADANG SEKOLAH",
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "MenuItem"
  },
  {
   "label": "SURAU",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "MenuItem"
  },
  {
   "label": "INFO TANGGA",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "MenuItem"
  },
  {
   "label": "PENUTUP",
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "MenuItem"
  }
 ],
 "label": "Media",
 "id": "Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "backgroundColor": "#404040",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "rollOverOpacity": 0.8,
 "selectedBackgroundColor": "#202020",
 "opacity": 0.4
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 89.3,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DFA96C85_CE78_68F2_41E0_702A140FCC09",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -78.07,
  "pitch": -3.09,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -103.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE2FDCF2_CE78_6816_41C1_BB505559B79D",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 42.98,
   "backwardYaw": 122.95,
   "distance": 1,
   "panorama": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PADANG SEKOLAH",
 "id": "panorama_9380E010_B95F_CACB_41E2_12F313E03DC6",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_8C5BD453_B941_4B4D_41DC_B351B0539182",
  "this.overlay_8D362F68_B943_D55A_41E7_2038CC39503C",
  "this.overlay_F145B0C2_BBC1_4B4F_41DC_EA296B3AEDC6",
  "this.overlay_EFFC09C1_BBDF_5D4D_41E1_E19A5EF1FCA4",
  "this.overlay_F355BE40_BBC1_774A_41E3_228DAFF840D5",
  "this.overlay_F00092F5_BBC3_4F35_41E1_EAFE87E8BAAE"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -166.44,
  "pitch": -1.89,
  "class": "PanoramaCameraPosition"
 },
 "automaticRotationSpeed": 4,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.13,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 2.13,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.13,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -19.99,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 1,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 358,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DEEC1D31_CE78_6813_41E6_8B87A0EFBFE1",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -33.37,
   "backwardYaw": -125.86,
   "distance": 1,
   "panorama": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -111.28,
   "backwardYaw": 111.62,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PEJABAT",
 "id": "panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_99932C5B_BAC0_DB7D_41DD_4F9E3D021F57",
  "this.overlay_9942FB7F_BAC7_DD35_41E0_ED321A7D333D",
  "this.overlay_9941152F_BAC0_CAD5_41DD_F8BD1AB082C9",
  "this.overlay_87FED584_B941_55CA_41E1_6F78800CF7CD",
  "this.popup_8127AA5A_B940_DF7E_41E0_DF1821927198",
  "this.overlay_800C4570_BAC7_D54B_41BD_BB09C6F8E548",
  "this.overlay_81CB8111_BAC0_CACD_41D4_C4631593147A",
  "this.overlay_DD3B8933_CC0B_CF74_41E0_0D7F8FA99757",
  "this.overlay_DE7F1750_CC37_4334_41E5_19959441AEAF"
 ]
},
{
 "class": "Video",
 "label": "13G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9709D77E_BEC0_F537_41C6_9C292CAB455F",
 "height": 720,
 "thumbnailUrl": "media/video_9709D77E_BEC0_F537_41C6_9C292CAB455F_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9709D77E_BEC0_F537_41C6_9C292CAB455F.mp4"
 }
},
{
 "id": "ImageResource_FF8C4496_B947_4BF7_41E3_A6B717F94450",
 "levels": [
  {
   "url": "media/popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB_0_0.jpg",
   "width": 1573,
   "height": 3884,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB_0_1.jpg",
   "width": 829,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB_0_2.jpg",
   "width": 414,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB_0_3.jpg",
   "width": 207,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 76.19,
   "backwardYaw": 94.71,
   "distance": 1,
   "panorama": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 159.84,
   "backwardYaw": -42.47,
   "distance": 1,
   "panorama": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 157.5,
   "backwardYaw": 160.01,
   "distance": 1,
   "panorama": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 138.05,
   "backwardYaw": 137.88,
   "distance": 1,
   "panorama": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 146.63,
   "backwardYaw": 165.5,
   "distance": 1,
   "panorama": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 43.5,
   "backwardYaw": 98.24,
   "distance": 1,
   "panorama": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 37.34,
   "backwardYaw": -72.67,
   "distance": 1,
   "panorama": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 73.96,
   "backwardYaw": 119.86,
   "distance": 1,
   "panorama": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 137.45,
   "backwardYaw": 53.19,
   "distance": 1,
   "panorama": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 111.62,
   "backwardYaw": -111.28,
   "distance": 1,
   "panorama": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -33.03,
   "backwardYaw": -45.9,
   "distance": 1,
   "panorama": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -145.66,
   "backwardYaw": 50.19,
   "distance": 1,
   "panorama": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -93.26,
   "backwardYaw": 25.83,
   "distance": 1,
   "panorama": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -41.95,
   "backwardYaw": -169.1,
   "distance": 1,
   "panorama": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "DATARAN JUARA",
 "id": "panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A4A6C6A2_B943_D7CF_41E6_39DCAE4AEDBC",
  "this.overlay_A399B220_B943_4ECA_41D7_9971F3880A63",
  "this.overlay_A4A3CAFE_B947_5F37_41E6_72CDC0CC1B82",
  "this.overlay_A5B3C384_B941_4DCB_41E1_537272167F07",
  "this.overlay_861092C1_B943_4F4D_41D8_9DEB2516590C",
  "this.overlay_879AC36D_B940_CD55_41BD_F469D6662F94",
  "this.overlay_87BC52CE_BAC3_4F56_41D5_9255BBA7A98B",
  "this.overlay_80424FF5_BAC1_F534_41E4_37F8FE57BAF4",
  "this.overlay_FC7906C4_BAC0_D74B_41DA_6EF8E9A22344",
  "this.overlay_80E9EFEC_BAC1_755B_41AE_AE3913644631",
  "this.overlay_8230C763_BAC3_354E_41D4_AFFCE7317010",
  "this.overlay_81341774_BAC1_F54B_41E2_92B94B236D51",
  "this.overlay_87B7B280_BACF_CFCB_41CD_F15CF78985BE",
  "this.overlay_82D4D7C0_BAC1_D54B_41CC_76624BA24A1D",
  "this.overlay_8776A6FE_BAC1_7737_4197_928D53BC73E0",
  "this.overlay_FFD237EB_BB40_D55E_41C7_2AF2117FC5C2",
  "this.overlay_FFEAD286_BB40_CFD7_41DB_BC282A90AE9E",
  "this.overlay_F80DE862_BB40_DB4E_41C3_604C79E144C0",
  "this.overlay_F97F5353_BB41_4D4D_41C3_69B9CC8B4BAD",
  "this.overlay_FE42C1B7_BB41_4D35_41D1_0AD49C7089A2",
  "this.overlay_F82C49FC_BB40_DD3B_41AE_5DCFD5F3EF90",
  "this.overlay_F9EB6259_BB41_4F7D_41DC_D90492573A65",
  "this.overlay_FEF14ED2_BB41_F74C_41CC_39B699DAC164",
  "this.overlay_F89B3A16_BB43_3EF7_41A5_616EAB67D112",
  "this.overlay_EFE3DC87_BB4F_5BD5_41DC_D9A9FDFAC16C",
  "this.overlay_E830FB72_BB41_FD4E_41E1_D34D4BCC0218",
  "this.overlay_CD880A2F_B6C7_5ED6_41CC_5813F34AF8D6",
  "this.overlay_D79AE804_B6C3_3ACA_41BE_29ECC1A26F99",
  "this.popup_E10774DA_C7BF_0D63_41E3_70A7FB52C015",
  "this.overlay_C2E93DD6_CC16_C73C_41D5_068D015CEEDA",
  "this.overlay_D524F2C8_CC75_3D14_41E4_4F9AA9FDB48C",
  "this.overlay_D4C283E6_CC77_431C_41E2_3D9C10326D5E",
  "this.overlay_D5C7D725_CC0D_431C_41E0_653A1470AE11",
  "this.overlay_D7F17774_CC0D_43FC_41D5_9E798E1082F8"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -87.17,
  "pitch": -2.23,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_F3E07E9B_BBC1_D7FE_41E3_A0D9C9FB767F",
 "id": "panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_camera",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "12G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_97B5B8E1_BEC0_FB4D_41B4_289AEA9AAC78",
 "height": 720,
 "thumbnailUrl": "media/video_97B5B8E1_BEC0_FB4D_41B4_289AEA9AAC78_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_97B5B8E1_BEC0_FB4D_41B4_289AEA9AAC78.mp4"
 }
},
{
 "id": "ImageResource_872E2B15_B9C1_DECA_41E1_1BC080FC5BBD",
 "levels": [
  {
   "url": "media/popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_D5017D7B_CC7A_C7F4_41DA_105788ED2DF3",
 "levels": [
  {
   "url": "media/popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -142.66,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DECD2D12_CE78_6811_41D3_6DFA7C2A3442",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -13.04,
  "pitch": -1.72,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 119.86,
   "backwardYaw": 73.96,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PUSAT SUMBER",
 "id": "panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9524C61C_BEC7_56FB_41C6_D5E2C67FC2C0",
  "this.overlay_94D02CFA_BEC0_DB3E_41D6_E61738AC9608",
  "this.overlay_94219401_BEBF_4ACD_41D9_0E085D0F7313",
  "this.popup_8D8E395F_B94F_3D75_41CD_B23500D625F8",
  "this.overlay_F61EDCCA_BB40_FB5E_41E4_50521F4A809E",
  "this.overlay_F56A4864_BB41_5B4B_41CD_512DEBB9CE89"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 88.2,
  "pitch": -4.98,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 165.5,
   "backwardYaw": 146.63,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PENDIDIKAN KHAS",
 "id": "panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A3BCB736_B943_D537_41E4_31D4F5FCF746",
  "this.overlay_A232BAE2_B940_DF4E_41DF_16DC82F75F5D",
  "this.overlay_D9C829FE_CC1D_4EEC_41E1_F386C887930C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 146.97,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFF6DE15_CE78_6812_41E4_70724691B14E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -117.2,
  "pitch": -1.37,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -323,
    "yawSpeed": 5.84,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 175.88,
   "backwardYaw": -4.2,
   "distance": 1,
   "panorama": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "SURAU",
 "id": "panorama_A829281C_B9C1_3137_41B7_848A492B12B1",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_8E8C03C2_B9C1_4D4F_41E4_D6BF9D19C00F",
  "this.overlay_8EEE51B1_B9C3_CDCA_41D8_8E6C86A89891",
  "this.overlay_8AA05D0B_B9FF_3ADD_41E4_D8C447F4DB21",
  "this.overlay_8B364780_B9C1_D5CB_41D7_17C92958D580"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -81.76,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_DE8EDD54_CE78_6812_41D6_094F228FA3C7",
 "id": "camera_DE8D3D54_CE78_6812_41DB_B100DDDE899A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 3.26,
  "pitch": -2.57,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_96DEBA72_BEC0_FF4E_41E2_B442D7B8934C",
 "id": "panorama_A834223A_B9C0_D173_41D5_043019F0786B_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 10.9,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF76BDAA_CE78_6836_41D5_024A55A897DF",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "17G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_EE2CABD9_C7AF_1B60_41C6_64E859979461",
 "height": 720,
 "thumbnailUrl": "media/video_EE2CABD9_C7AF_1B60_41C6_64E859979461_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_EE2CABD9_C7AF_1B60_41C6_64E859979461.mp4"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": -105.57,
   "backwardYaw": 128.64,
   "distance": 1,
   "panorama": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 135.94,
   "backwardYaw": 64.81,
   "distance": 1,
   "panorama": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "LALUAN PELAJAR",
 "id": "panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E8C9FCBA_B740_DB3E_41D7_077ECBB41D77",
  "this.overlay_E7345616_B741_D6F7_41C7_D2AC34ABEAD9",
  "this.overlay_D6F8E7BB_B743_353D_41CD_ACD926803254",
  "this.overlay_D39D84CA_B741_4B5F_41CE_8E806DA144DD"
 ]
},
{
 "class": "Video",
 "label": "10",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_96492419_BEC3_CAFD_41DB_1F2511635ABC",
 "height": 720,
 "thumbnailUrl": "media/video_96492419_BEC3_CAFD_41DB_1F2511635ABC_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_96492419_BEC3_CAFD_41DB_1F2511635ABC.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -42.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DED93CFC_CE78_6812_41E6_348E153DB6C5",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -85.62,
  "pitch": -1.54,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_EE2CABD9_C7AF_1B60_41C6_64E859979461",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDFAC3F_CE78_680E_41D5_86C85B3FC361, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDFAC3F_CE78_680E_41D5_86C85B3FC361, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDFAC3F_CE78_680E_41D5_86C85B3FC361",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 157.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF84BC70_CE78_6812_41E0_6178D00E7D50",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_9709D77E_BEC0_F537_41C6_9C292CAB455F",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDE5C3E_CE78_680E_41DA_7208B7BFBD3B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDE5C3E_CE78_680E_41DA_7208B7BFBD3B, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDE5C3E_CE78_680E_41DA_7208B7BFBD3B",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.17,
 "hideDuration": 500,
 "yaw": 5.99,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB",
 "image": {
  "levels": [
   {
    "url": "media/popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB_0_2.jpg",
    "width": 414,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.58,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "class": "Video",
 "label": "6G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_99C27EA2_BAC1_77CF_41AB_1485A760CF45",
 "height": 720,
 "thumbnailUrl": "media/video_99C27EA2_BAC1_77CF_41AB_1485A760CF45_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_99C27EA2_BAC1_77CF_41AB_1485A760CF45.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -85.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_DEF89D1B_CE78_6817_417F_370AA515894C",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_8EA0617C_B9C1_CD3A_41D2_55F5FC82A334",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDFDC3E_CE78_680E_41E9_9884453F6FA3, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDFDC3E_CE78_680E_41E9_9884453F6FA3, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDFDC3E_CE78_680E_41E9_9884453F6FA3",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 134.1,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF569D8A_CE78_68F6_41C7_946BE890F9E6",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -57.05,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFBFFE40_CE78_6872_41E9_111FD3F4EE8F",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "yaw": 55.77,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "class": "PopupPanoramaOverlay",
 "hfov": 10.24,
 "autoplay": true,
 "id": "popup_F957BAB0_CC37_4D74_41BE_9EBF526B9340",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": 6.09,
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43.mp4"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": -45.9,
   "backwardYaw": -33.03,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "BILIK FROG",
 "id": "panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_901C121A_BEC3_4EFE_418F_C4120CD6C323",
  "this.overlay_96EECF45_BEC1_5555_41E3_77D2A95A3B80",
  "this.overlay_FCF7DD5C_BAFF_357B_41D7_1CF90555C50F",
  "this.overlay_FF50889E_BAC0_DBF7_41E3_CD9BDBFB8010"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 34.34,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DC5B4E55_CE78_6812_41C6_EB4958B79FCF",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 160.01,
   "backwardYaw": 157.5,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "BILIK MUZIK",
 "id": "panorama_A8346057_B9C1_7131_41D0_F3F236F09363",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_96F00030_BEC7_4ACA_41CD_46326BAC4A7E",
  "this.overlay_95E0E4B2_BEC0_CBCE_41D6_ABFC00D54131",
  "this.overlay_F1358EAB_BB41_37DD_41D3_DB2F5E05D39E",
  "this.overlay_F33BA6B5_BB41_5734_41E6_30DA492CA6EB"
 ]
},
{
 "class": "Video",
 "label": "16G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_8EA0617C_B9C1_CD3A_41D2_55F5FC82A334",
 "height": 720,
 "thumbnailUrl": "media/video_8EA0617C_B9C1_CD3A_41D2_55F5FC82A334_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8EA0617C_B9C1_CD3A_41D2_55F5FC82A334.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -33.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE3BDCDD_CE78_6812_41E7_BB422615E719",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -76.53,
  "pitch": -2.4,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_camera",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 13.56,
 "hideDuration": 500,
 "yaw": 75.6,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_8127AA5A_B940_DF7E_41E0_DF1821927198",
 "image": {
  "levels": [
   {
    "url": "media/popup_8127AA5A_B940_DF7E_41E0_DF1821927198_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -11.41,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.video_A3E76A26_B943_5113_41C9_0F034C6075E0",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDC7C3D_CE78_6812_41C2_63C3FDC6188F, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDC7C3D_CE78_6812_41C2_63C3FDC6188F, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDC7C3D_CE78_6812_41C2_63C3FDC6188F",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43",
   "start": "this.viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_C3D7E4FF_CE38_380E_41E4_269DF3BCEBB0, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_C3D7E4FF_CE38_380E_41E4_269DF3BCEBB0, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEFVideoPlayer)",
   "player": "this.viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEFVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "PlayList_C3D7E4FF_CE38_380E_41E4_269DF3BCEBB0",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -115.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFC97E00_CE78_6BF2_41C9_A074EC915FC6",
 "class": "PanoramaCamera"
},
{
 "id": "ImageResource_FF8E8496_B947_4BF7_41A1_40396D8F441A",
 "levels": [
  {
   "url": "media/popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -32.95,
  "pitch": -2.23,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -683,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A829281C_B9C1_3137_41B7_848A492B12B1_camera",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 10.29,
 "hideDuration": 500,
 "yaw": 33.63,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7",
 "image": {
  "levels": [
   {
    "url": "media/popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 1.8,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 10.15,
 "hideDuration": 500,
 "yaw": -145.68,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C",
 "image": {
  "levels": [
   {
    "url": "media/popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 9.69,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.video_970DDEA0_BEC3_37CA_41DE_E7178609DF57",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDEFC3E_CE78_680E_41E4_CC892295B9F5, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDEFC3E_CE78_680E_41E4_CC892295B9F5, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDEFC3E_CE78_680E_41E4_CC892295B9F5",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_99C27EA2_BAC1_77CF_41AB_1485A760CF45",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDDCC3E_CE78_680E_41E5_C1F56AAE6901, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDDCC3E_CE78_680E_41E5_C1F56AAE6901, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDDCC3E_CE78_680E_41E5_C1F56AAE6901",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 1,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 358,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A8346057_B9C1_7131_41D0_F3F236F09363_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -135.73,
  "pitch": -2.4,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_970C1598_BEC1_75FB_41D0_481DB4B970B5",
 "id": "panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 0, 1)",
   "camera": "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 1, 2)",
   "camera": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 2, 3)",
   "camera": "this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 3, 4)",
   "camera": "this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 4, 5)",
   "camera": "this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 5, 6)",
   "camera": "this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 6, 7)",
   "camera": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 7, 8)",
   "camera": "this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 8, 9)",
   "camera": "this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 9, 10)",
   "camera": "this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 10, 11)",
   "camera": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 11, 12)",
   "camera": "this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 12, 13)",
   "camera": "this.panorama_A834223A_B9C0_D173_41D5_043019F0786B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 13, 14)",
   "camera": "this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 14, 15)",
   "camera": "this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 15, 16)",
   "camera": "this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 16, 17)",
   "camera": "this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 17, 18)",
   "camera": "this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 18, 19)",
   "camera": "this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 19, 20)",
   "camera": "this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 20, 21)",
   "camera": "this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 21, 22)",
   "camera": "this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 22, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 22)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 22, 23)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 23, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 23)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 23, 24)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 24, 25)",
   "camera": "this.panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 25, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 25)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist, 25, 0)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -22.5,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DED3ED07_CE78_69FE_41E8_616A55C8C7C4",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 8.97,
 "hideDuration": 500,
 "yaw": -129.18,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_80749FF1_B941_754A_41D4_2135B5DF2A03",
 "image": {
  "levels": [
   {
    "url": "media/popup_80749FF1_B941_754A_41D4_2135B5DF2A03_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 3.92,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.69,
 "hideDuration": 500,
 "yaw": 177.12,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC",
 "image": {
  "levels": [
   {
    "url": "media/popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC_0_2.jpg",
    "width": 715,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 5.07,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -44.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE154CBD_CE78_6812_41E7_428E27A4FB56",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "7G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9AE0164A_BAC1_5750_41DA_D7EFF19EA5DB",
 "height": 720,
 "thumbnailUrl": "media/video_9AE0164A_BAC1_5750_41DA_D7EFF19EA5DB_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9AE0164A_BAC1_5750_41DA_D7EFF19EA5DB.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -80.48,
  "pitch": -5.32,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_camera",
 "class": "PanoramaCamera"
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window414"
 },
 "closeButtonPressedBorderSize": 0,
 "bodyPaddingRight": 0,
 "id": "window_C44BE9EB_CE38_6836_41C1_DCC860AE1844",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 3,
 "horizontalAlign": "center",
 "bodyPaddingTop": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "bodyBackgroundOpacity": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "bodyPaddingBottom": 0,
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "footerHeight": 5,
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067C"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "class": "Window",
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonRollOverIconColor": "#666666"
},
{
 "items": [
  {
   "media": "this.video_96492419_BEC3_CAFD_41DB_1F2511635ABC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDEDC3E_CE78_680E_41E7_FEA537D84486, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDEDC3E_CE78_680E_41E7_FEA537D84486, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDEDC3E_CE78_680E_41E7_FEA537D84486",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -4.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -683,
    "yawSpeed": 4.25,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 4.25,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF048DD5_CE78_6812_41BF_3155B00586A7",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -20.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF81BE35_CE78_6812_41DD_01E21E4F10EB",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_9AE0164A_BAC1_5750_41DA_D7EFF19EA5DB",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDD9C3E_CE78_680E_41B0_18214CCF396D, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDD9C3E_CE78_680E_41B0_18214CCF396D, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDD9C3E_CE78_680E_41B0_18214CCF396D",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.84,
 "hideDuration": 500,
 "yaw": -145.68,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB",
 "image": {
  "levels": [
   {
    "url": "media/popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 17.07,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.video_97B5B8E1_BEC0_FB4D_41B4_289AEA9AAC78",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDE9C3E_CE78_680E_41E9_A5FB88AFB925, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDE9C3E_CE78_680E_41E9_A5FB88AFB925, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDE9C3E_CE78_680E_41E9_A5FB88AFB925",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -72.67,
   "backwardYaw": 37.34,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "BILIK KAUNSELING",
 "id": "panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9195F20B_BEDF_4EDE_41B7_E16CCD7307AF",
  "this.overlay_911A955B_BEC1_357E_41CB_AB1F269D1FAD",
  "this.overlay_83804838_BAC1_7B3B_41E2_555EB3D737BF",
  "this.overlay_FBD28ED7_BB40_D775_41D9_E57124F67E8A"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 107.33,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_DEB8AD5F_CE78_680E_41E5_EBDC50D7A607",
 "id": "camera_DEB8BD5F_CE78_680E_41E1_01F38AAFA97E",
 "class": "PanoramaCamera"
},
{
 "id": "ImageResource_FF8FB495_B947_4BF5_41E1_AF574238E7F4",
 "levels": [
  {
   "url": "media/popup_82196980_B94F_3DCB_41E2_9572A87AD21E_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_82196980_B94F_3DCB_41E2_9572A87AD21E_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_82196980_B94F_3DCB_41E2_9572A87AD21E_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_82196980_B94F_3DCB_41E2_9572A87AD21E_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_FF88C494_B947_4BCB_41AF_12525989ACB2",
 "levels": [
  {
   "url": "media/popup_80749FF1_B941_754A_41D4_2135B5DF2A03_0_0.jpg",
   "width": 4032,
   "height": 3024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_80749FF1_B941_754A_41D4_2135B5DF2A03_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_80749FF1_B941_754A_41D4_2135B5DF2A03_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_80749FF1_B941_754A_41D4_2135B5DF2A03_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 74.43,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF3F4DE0_CE78_6832_41E5_EA12E5AA6C08",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_971ACB07_BEDF_DED5_41E2_670B7F83A485",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDD1C3E_CE78_680E_41D7_6AA26E4B520B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDD1C3E_CE78_680E_41D7_6AA26E4B520B, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDD1C3E_CE78_680E_41D7_6AA26E4B520B",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.45,
 "hideDuration": 500,
 "yaw": -19.48,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3",
 "image": {
  "levels": [
   {
    "url": "media/popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.92,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -42.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DEE76D3E_CE78_6811_41DA_5A1D0D4D3AF9",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -103.81,
  "pitch": -1.37,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_camera",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "3G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_A3E76A26_B943_5113_41C9_0F034C6075E0",
 "height": 720,
 "thumbnailUrl": "media/video_A3E76A26_B943_5113_41C9_0F034C6075E0_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A3E76A26_B943_5113_41C9_0F034C6075E0.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 86.74,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFC7DE0B_CE78_6BF6_41A4_1AD7FE379AEE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -106.04,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF2DCDEA_CE78_6836_41C7_272578C1AA1C",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.video_D8E3E862_C7DF_0523_41DF_16B23C6D5BFE",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_DFDF9C3F_CE78_680E_41E2_B88152B05EB6, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_DFDF9C3F_CE78_680E_41E2_B88152B05EB6, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_DFDF9C3F_CE78_680E_41E2_B88152B05EB6",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -90.7,
   "backwardYaw": 171.84,
   "distance": 1,
   "panorama": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 94.71,
   "backwardYaw": 76.19,
   "distance": 1,
   "panorama": "this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "KOPERASI",
 "id": "panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A732DBDF_BAC7_3D75_41E0_B0C438A165AB",
  "this.overlay_984887B0_BAC0_F5CA_41E6_320C0238FA34",
  "this.overlay_8BA2CC57_B9C1_5B75_41CF_EF7099E74F6C",
  "this.overlay_8A3FCC38_B9C0_DB3B_41C3_255CEF4B4FBC",
  "this.overlay_8406FA90_B9C1_DFCA_41E4_3EAE58CE9F4C",
  "this.popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5",
  "this.overlay_8BFFE45F_B9C0_CB75_41D9_4F69ADD1FB07",
  "this.popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7",
  "this.overlay_E96E9AA6_B741_FFD7_418A_6B4C6D3CD4F9",
  "this.overlay_E9112986_B741_7DD7_41E7_1D9C58A47A80"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 68.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF5AED7F_CE78_680E_41DE_6A2DE2FBEF31",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -134.25,
   "backwardYaw": -22.87,
   "distance": 1,
   "panorama": "this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "PINTU UTAMA",
 "id": "panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0",
  "this.overlay_EF0243C0_BB41_CD4A_41E7_66F08DF5C1C1",
  "this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_tcap0",
  "this.overlay_D6639E31_B7C7_56CD_41CB_B4C63FC7C1F0",
  "this.overlay_E062CDA8_B7C3_75DA_41C9_7F8E41D33CAD",
  "this.overlay_DA8ABC16_C7DF_1CE0_41CF_3CA5C524BE3C",
  "this.overlay_E72D18D8_CC75_4D34_41DE_569CCA424DFC",
  "this.overlay_FD8CA892_CC1A_CD34_41E4_6A6BC28B2D38",
  "this.overlay_FD305D5C_CC15_472C_41E6_BFE6CA764B3D",
  "this.popup_F957BAB0_CC37_4D74_41BE_9EBF526B9340"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -51.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -323,
    "yawSpeed": 5.84,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 5.84,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFDA4DF5_CE78_6812_41D3_A1D88721F428",
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 8.78,
 "hideDuration": 500,
 "yaw": -175.89,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_8D8E395F_B94F_3D75_41CD_B23500D625F8",
 "image": {
  "levels": [
   {
    "url": "media/popup_8D8E395F_B94F_3D75_41CD_B23500D625F8_0_1.jpg",
    "width": 1024,
    "height": 527,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -9.44,
 "popupMaxHeight": "95%",
 "popupDistance": 100,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -8.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DE354CE7_CE78_683E_41E3_7B610585AA6E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 77.56,
  "pitch": -3.26,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.19,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.19,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.19,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_camera",
 "class": "PanoramaCamera"
},
{
 "id": "ImageResource_8E23F38D_B940_CDD5_41D5_C65E228E6F4B",
 "levels": [
  {
   "url": "media/popup_8D8E395F_B94F_3D75_41CD_B23500D625F8_0_0.jpg",
   "width": 1459,
   "height": 752,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8D8E395F_B94F_3D75_41CD_B23500D625F8_0_1.jpg",
   "width": 1024,
   "height": 527,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_8D8E395F_B94F_3D75_41CD_B23500D625F8_0_2.jpg",
   "width": 512,
   "height": 263,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 28.66,
  "pitch": -3.09,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_camera",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "2G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_AFEC14D4_B9C3_5137_41CE_25B7C204CCC2",
 "height": 720,
 "thumbnailUrl": "media/video_AFEC14D4_B9C3_5137_41CE_25B7C204CCC2_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_AFEC14D4_B9C3_5137_41CE_25B7C204CCC2.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 108.96,
  "pitch": -4.98,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 3.72,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -125.86,
   "backwardYaw": -33.37,
   "distance": 1,
   "panorama": "this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "label": "DALAM PEJABAT",
 "id": "panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398",
 "cardboardMenu": "this.Menu_DFE9EC51_CE78_6812_41E4_E336150B39BF",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_99340F20_BAC1_56CB_41DD_CDFE7E803B20",
  "this.overlay_9AAF1E97_BAC1_D7F6_41D7_B3A9518005ED"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -137.02,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": "this.sequence_DFAECE4A_CE78_6876_41E3_D515B6A44EDF",
 "id": "camera_DFAEDE4A_CE78_6876_41CC_C24F7B420EFC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 45.75,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "automaticRotationSpeed": 4,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.13,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 2.13,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 2.13,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DFBF9C7B_CE78_6816_41C2_B27693AD73D6",
 "class": "PanoramaCamera"
},
{
 "class": "Video",
 "label": "8G",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_9CE9BB7C_BAC7_5D3A_41E5_F0BBBF8C50D7",
 "height": 720,
 "thumbnailUrl": "media/video_9CE9BB7C_BAC7_5D3A_41E5_F0BBBF8C50D7_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9CE9BB7C_BAC7_5D3A_41E5_F0BBBF8C50D7.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 54.14,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": -18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": -18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DF1C1DC0_CE78_6872_41AA_04D363E03B81",
 "class": "PanoramaCamera"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "13px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#FFFFFF",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "class": "ViewerArea",
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 3,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 4.5,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "children": [
  "this.Container_DF748DD5_C732_2202_41A0_E7C7E5B7F6B3",
  "this.Container_DF745DD5_C732_2202_41C5_2A7A4FC0BEF4",
  "this.Label_DF746DD5_C732_2202_418E_A5955568A343",
  "this.Label_DF747DD5_C732_2202_41D5_29BB7F571348",
  "this.Image_ECD88527_BB40_CAD6_41D5_DFC7D57C2F87"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 569.5,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "height": 133,
 "top": 8,
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "--STICKER"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarMargin": 2,
 "height": 86.5,
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.64,
 "borderRadius": 0,
 "data": {
  "name": "--MENU"
 },
 "overflow": "visible"
},
{
 "itemThumbnailWidth": 75,
 "id": "ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#FFFFFF",
 "horizontalAlign": "left",
 "right": "0.08%",
 "paddingLeft": 20,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "width": 220.5,
 "itemLabelFontFamily": "Arial",
 "itemThumbnailOpacity": 1,
 "scrollBarOpacity": 0.5,
 "itemPaddingRight": 3,
 "verticalAlign": "top",
 "minHeight": 20,
 "itemThumbnailShadowOpacity": 0.54,
 "itemBorderRadius": 0,
 "minWidth": 20,
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemLabelPosition": "bottom",
 "height": "87.484%",
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "itemThumbnailShadowSpread": 1,
 "itemThumbnailShadowVerticalLength": 3,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "itemThumbnailBorderRadius": 5,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "bold",
 "itemThumbnailShadowHorizontalLength": 3,
 "paddingRight": 20,
 "borderSize": 0,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "playList": "this.ThumbnailList_EC46B9C3_BB41_3D4D_41E1_9F3FEBE2E7CA_playlist",
 "top": "3.58%",
 "itemThumbnailShadowBlurRadius": 8,
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "class": "ThumbnailList",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#FFFFFF",
 "layout": "vertical",
 "itemVerticalAlign": "middle",
 "gap": 13,
 "itemBackgroundColorDirection": "vertical",
 "paddingTop": 10,
 "itemThumbnailHeight": 75,
 "itemThumbnailShadow": true,
 "paddingBottom": 10,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelGap": 8,
 "scrollBarWidth": 10,
 "visible": false,
 "itemThumbnailShadowColor": "#000000"
},
{
 "maxHeight": 114,
 "propagateClick": false,
 "id": "Image_B88F9D44_B6C7_F317_41D0_8CCF42DA544B",
 "left": "1.33%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_B88F9D44_B6C7_F317_41D0_8CCF42DA544B.png",
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "7.496%",
 "bottom": "2.39%",
 "minWidth": 1,
 "class": "Image",
 "horizontalAlign": "center",
 "top": "89.29%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "360"
 },
 "maxWidth": 200
},
{
 "transparencyActive": false,
 "maxHeight": 23,
 "propagateClick": false,
 "id": "IconButton_D2AC5501_CC3E_C714_41A5_82356D53D402",
 "paddingRight": 0,
 "right": "2.71%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 35,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_D2AC5501_CC3E_C714_41A5_82356D53D402.png",
 "bottom": "4.29%",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "push",
 "height": 23,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "cursor": "hand",
 "maxWidth": 35,
 "data": {
  "name": "mata"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_E8A0D805_CC35_4D1C_41C0_D8808D70EF25",
 "paddingRight": 0,
 "right": "3.57%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 49.5,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_E8A0D805_CC35_4D1C_41C0_D8808D70EF25.png",
 "minWidth": 0,
 "class": "IconButton",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false); this.setComponentVisibility(this.Container_EF9CCE4E_CC35_452C_41E5_5AA6FF2A0B76, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false); this.setComponentVisibility(this.Container_EF9C3E4E_CC35_452C_41E2_1EC59243AC71, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false); this.setComponentVisibility(this.HTMLText_EF9C2E4E_CC35_452C_41E5_C862D5C67EFF, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false); this.setComponentVisibility(this.IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false); this.setComponentVisibility(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8, true, 0, this.effect_E41A86A1_CC1D_4514_41E2_D8FF68A83683, 'showEffect', false)",
 "height": 50.5,
 "top": "3.57%",
 "rollOverIconURL": "skin/IconButton_E8A0D805_CC35_4D1C_41C0_D8808D70EF25_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_E8A0D805_CC35_4D1C_41C0_D8808D70EF25_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button53071"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1",
 "left": "0%",
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_EF9CCE4E_CC35_452C_41E5_5AA6FF2A0B76"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "click": "this.setComponentVisibility(this.Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1, true, 0, null, null, false); this.setComponentVisibility(this.Container_EF9CCE4E_CC35_452C_41E5_5AA6FF2A0B76, true, 0, null, null, false); this.setComponentVisibility(this.Container_EF9C3E4E_CC35_452C_41E2_1EC59243AC71, true, 0, null, null, false); this.setComponentVisibility(this.HTMLText_EF9C2E4E_CC35_452C_41E5_C862D5C67EFF, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483, true, 0, null, null, false); this.setComponentVisibility(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8, true, 0, null, null, false); this.setComponentVisibility(this.Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1, false, 0, null, null, false); this.setComponentVisibility(this.Container_EF9CCE4E_CC35_452C_41E5_5AA6FF2A0B76, false, 0, null, null, false); this.setComponentVisibility(this.Container_EF9C3E4E_CC35_452C_41E2_1EC59243AC71, false, 0, null, null, false); this.setComponentVisibility(this.HTMLText_EF9C2E4E_CC35_452C_41E5_C862D5C67EFF, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "bottom": 0,
 "minWidth": 0,
 "class": "UIComponent",
 "backgroundColor": [
  "#000000"
 ],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "UIComponent3053"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "bottom": 0,
 "minWidth": 0,
 "class": "ZoomImage",
 "backgroundColor": [],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "ZoomImage3054"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton3055"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "paddingLeft": 5,
 "paddingRight": 5,
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 20,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "iconColor": "#000000",
 "minWidth": 0,
 "class": "CloseButton",
 "iconLineWidth": 5,
 "mode": "push",
 "label": "",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "top": 10,
 "gap": 5,
 "layout": "horizontal",
 "fontSize": "1.29vmin",
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingTop": 5,
 "shadow": false,
 "paddingBottom": 5,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "iconBeforeLabel": true,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "blending": 0,
 "hfov": 89.01,
 "autoplay": true,
 "id": "overlay_90AE304E_BEC3_4B57_41DA_F87F0E6EAA66",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_90AE304E_BEC3_4B57_41DA_F87F0E6EAA66_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -24.24,
 "useHandCursor": true,
 "roll": -2.34,
 "yaw": -49.25,
 "chromaThreshold": 0.23,
 "rotationY": -3.09,
 "rotationX": 24.41,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_96492419_BEC3_CAFD_41DB_1F2511635ABC.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#48D39F",
 "vfov": 74.89,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 43.06,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_0_0.png",
      "width": 727,
      "height": 298,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.2,
   "yaw": -84.85,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_90B47FE6_BECF_7556_41E2_C877CCA427C3",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 43.06,
   "yaw": -84.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 31.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_1_0.png",
      "width": 530,
      "height": 139,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.6,
   "yaw": 109.73,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F0680742_BBC3_F54F_41BF_CA9F35CB1FAD",
 "data": {
  "label": " PADANG SEKOLAH"
 },
 "maps": [
  {
   "hfov": 31.4,
   "yaw": 109.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_1_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9380E010_B95F_CACB_41E2_12F313E03DC6, this.camera_DFAEDE4A_CE78_6876_41CC_C24F7B420EFC); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": 122.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB7EF64F_CD10_9DA8_41E4_68F769A21571",
   "pitch": 1.03,
   "yaw": 122.95,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EC17CAC6_BBC0_DF57_41B8_73A9A6476361",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 41.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_3_0.png",
      "width": 692,
      "height": 95,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "yaw": 74.56,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F095CEF8_BBCF_773A_41E2_5E7158192412",
 "data": {
  "label": "DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 41.01,
   "yaw": 74.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_3_0_map.gif",
      "width": 116,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DC5B4E55_CE78_6812_41C6_EB4958B79FCF); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": 50.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB7E6650_CD10_9DB8_41DE_C3DED581D4CE",
   "pitch": 0.69,
   "yaw": 50.19,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F0C37E08_BBC0_D6DA_41C0_09272966CD4D",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5, this.camera_DF3F4DE0_CE78_6832_41E5_EA12E5AA6C08); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "hfov": 18.5,
   "yaw": 128.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.5,
   "image": "this.AnimatedImageResource_DB40363E_CD10_9DE8_41E9_80481F9AD63C",
   "pitch": -14.67,
   "yaw": 128.64,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8FC6104D_B9C1_4B55_41CD_DBBA3E22E51F",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.8,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_1_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.2,
   "yaw": 20.25,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8BCB480B_B9C1_7ADE_41E1_5FD2904BF0AC",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.8,
   "yaw": 20.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_1_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A829281C_B9C1_3137_41B7_848A492B12B1, this.camera_DF048DD5_CE78_6812_41BF_3155B00586A7); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 11.8,
   "yaw": -4.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.8,
   "image": "this.AnimatedImageResource_DB4FB63E_CD10_9DE8_41E7_015336EA3223",
   "pitch": 4.98,
   "yaw": -4.2,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_886847E1_B9C3_754A_41D0_8F8950C94EB5",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 34.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_3_0.png",
      "width": 579,
      "height": 167,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.06,
   "yaw": 7.21,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8A730345_B9C1_CD55_41DA_1F6E17677EC8",
 "data": {
  "label": "MASUK"
 },
 "maps": [
  {
   "hfov": 34.18,
   "yaw": 7.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_3_0_map.gif",
      "width": 55,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 32.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_6_0.png",
      "width": 579,
      "height": 153,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.08,
   "yaw": 150.66,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E9CDCBC5_BAC1_3D55_41BE_B0DEE4C1983D",
 "data": {
  "label": "SEKITAR STAZ"
 },
 "maps": [
  {
   "hfov": 32.23,
   "yaw": 150.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_6_0_map.gif",
      "width": 60,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 26.64,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_7_0.png",
      "width": 449,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "yaw": -96.49,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E6FB9B87_B741_5DD5_418E_DFC0DF04E345",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 26.64,
   "yaw": -96.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_7_0_0_map.gif",
      "width": 47,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067C",
 "id": "viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067CVideoPlayer",
 "class": "VideoPlayer"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3050"
 }
},
{
 "blending": 0,
 "hfov": 92.15,
 "autoplay": true,
 "id": "overlay_979B4378_BEC1_4D3B_41E5_60451B54A210",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_979B4378_BEC1_4D3B_41E5_60451B54A210_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -28,
 "useHandCursor": true,
 "roll": 3.93,
 "yaw": 94.11,
 "chromaThreshold": 0.2,
 "rotationY": 4.56,
 "rotationX": 27.32,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_97B5B8E1_BEC0_FB4D_41B4_289AEA9AAC78.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 83.51,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.77,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.06,
   "yaw": 115.14,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_957E41F4_BEC3_4D4A_41B3_CFAE060D5A99",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.77,
   "yaw": 115.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_856A65DD_B941_757A_41E2_9C62D2E6EFEC, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_86A51434_B943_4ACB_41E7_558BDE1C98E0, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 5.74,
   "yaw": 177.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.74,
   "image": "this.AnimatedImageResource_DB7CC651_CD10_9DB8_41B5_053689603E1E",
   "pitch": 5.07,
   "yaw": 177.12,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_87903E5E_B941_3777_41A8_8A5B2EB132AB",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_80749FF1_B941_754A_41D4_2135B5DF2A03, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_FF88C494_B947_4BCB_41AF_12525989ACB2, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 8.97,
   "yaw": -129.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.97,
   "image": "this.AnimatedImageResource_DB7C5651_CD10_9DB8_41E9_1E4FFD0D8A66",
   "pitch": 3.92,
   "yaw": -129.18,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_87BBFD77_B941_F535_41E4_77DDDA3A37C9",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_82196980_B94F_3DCB_41E2_9572A87AD21E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_FF8FB495_B947_4BF5_41E1_AF574238E7F4, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 9.91,
   "yaw": -51.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.91,
   "image": "this.AnimatedImageResource_DB7B8651_CD10_9DB8_41D2_A591EC35B229",
   "pitch": 1.61,
   "yaw": -51.28,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_80200BA2_B94F_3DCE_41C4_DAECE8819FDA",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_809521E3_B941_CD4D_41B9_1DB4F7A259A3, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_FF8E8496_B947_4BF7_41A1_40396D8F441A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 9.45,
   "yaw": -19.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.45,
   "image": "this.AnimatedImageResource_DB7B1652_CD10_9DB8_41E0_4053556BDFF5",
   "pitch": 0.92,
   "yaw": -19.48,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8621A599_B941_75FA_41D7_4D4BECEDBE13",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_87A4D2FC_B941_4F3B_41A8_376A211E76CB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_FF8C4496_B947_4BF7_41E3_A6B717F94450, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 10.6,
   "yaw": 5.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.6,
   "image": "this.AnimatedImageResource_DB7B7652_CD10_9DB8_41C7_ED39CC7B5F87",
   "pitch": 0.58,
   "yaw": 5.99,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8024A699_B940_D7FD_41DE_152C89A4EBE7",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DE0B0CC7_CE78_687E_41D3_19CC0469F5B6); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": -169.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB7AA652_CD10_9DB8_41DF_938812BDAEC3",
   "pitch": -0.34,
   "yaw": -169.1,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F9169796_BB43_55F6_41BD_A7FE9784AABD",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 21.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_7_0.png",
      "width": 356,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.51,
   "yaw": -154.86,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FB2D010C_BB40_CADB_41E6_B3049DD26097",
 "data": {
  "label": "KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 21.1,
   "yaw": -154.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_7_0_map.gif",
      "width": 43,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_DC3E5F86_B741_D5D7_41DC_C8AA3338E30C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E3197BBA_B74F_5D3F_41E7_BE3EF41D48FE, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 10.15,
   "yaw": -145.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.15,
   "image": "this.AnimatedImageResource_DB7A2653_CD10_9DB8_41A8_FCE51D25C98F",
   "pitch": 9.69,
   "yaw": -145.68,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E1459B9E_B741_3DF7_41B5_0C98A0B06B7B",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D52D8F49_CC7B_4314_41B1_764B69C1D2DB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_D5017D7B_CC7A_C7F4_41DA_105788ED2DF3, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 9.84,
   "yaw": -145.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_9_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 17.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.84,
   "image": "this.AnimatedImageResource_DB79B653_CD10_9DB8_41E8_AB93497DADA5",
   "pitch": 17.07,
   "yaw": -145.68,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D460CA77_CC7A_CDFC_41E7_63C5AE5ECC09",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_1_0.png",
      "width": 576,
      "height": 185,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.23,
   "yaw": -21.88,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A3D7CC0F_B943_7AD5_41E3_350AD2C74F9F",
 "data": {
  "label": "KEMBALI KE  DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 34,
   "yaw": -21.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_1_0_map.gif",
      "width": 49,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.77,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_2_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.89,
   "yaw": 49.93,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A3E8661F_B941_D6F5_41E2_FE33C1EF5771",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.77,
   "yaw": 49.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_2_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 92.87,
 "autoplay": true,
 "id": "overlay_D8C0B3C7_CC0F_431C_41E1_5B8C22A4E1E0",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_D8C0B3C7_CC0F_431C_41E1_5B8C22A4E1E0_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -26.96,
 "useHandCursor": true,
 "roll": -2.39,
 "yaw": 95.73,
 "chromaThreshold": 0.21,
 "rotationY": -2.53,
 "rotationX": 28.22,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A3E76A26_B943_5113_41C9_0F034C6075E0.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 85.84,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DF81BE35_CE78_6812_41DD_01E21E4F10EB); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": -42.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB40663F_CD10_9DE8_41CF_1D3EBA851C10",
   "pitch": -1.72,
   "yaw": -42.47,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D9C7D3C2_CC1A_C314_41E4_21E97FF3C948",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.89,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_0_0.png",
      "width": 521,
      "height": 176,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.51,
   "yaw": 46.67,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_9B5A804A_BAC0_CB5F_41D7_4DE6EEFA2D94",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.89,
   "yaw": 46.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_0_0_0_map.gif",
      "width": 47,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 92.7,
 "autoplay": true,
 "id": "overlay_9CE958D2_BAC3_3B4E_41E2_3021AA22392C",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_9CE958D2_BAC3_3B4E_41E2_3021AA22392C_t.jpg",
    "width": 1280,
    "height": 720,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -39.54,
 "useHandCursor": true,
 "roll": -4.02,
 "yaw": 4.94,
 "chromaThreshold": 0.23,
 "rotationY": -1.65,
 "rotationX": 38.47,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9B071785_BAC3_D5D5_41C7_547672858165.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#41CF9A",
 "vfov": 91.64,
 "chromaSmoothing": 0.04,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DE038CD2_CE78_6816_41BC_B87161DA69E2); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.78,
   "yaw": 98.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.78,
   "image": "this.AnimatedImageResource_DB70164E_CD10_9DA8_41E3_88195D6558B8",
   "pitch": -5.66,
   "yaw": 98.24,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D55654E0_CC0F_C514_41E0_0A49E516B3EB",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 68.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_2_0.png",
      "width": 1162,
      "height": 136,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.55,
   "yaw": 110.25,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_DB5EEEE6_CC0F_451C_4198_0EEBC88EDE1A",
 "data": {
  "label": "DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 68.21,
   "yaw": 110.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_2_0_map.gif",
      "width": 136,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 72.27,
 "autoplay": true,
 "id": "overlay_98896011_BAC1_CACA_41E3_DB46B848BF11",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_98896011_BAC1_CACA_41E3_DB46B848BF11_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -22.48,
 "useHandCursor": true,
 "roll": -1.17,
 "yaw": -106.51,
 "chromaThreshold": 0.15,
 "rotationY": -1.83,
 "rotationX": 21.86,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_99C27EA2_BAC1_77CF_41AB_1485A760CF45.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 63.96,
 "chromaSmoothing": 0.02,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.82,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.69,
   "yaw": -73.1,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_99F8728E_BAC3_4FD7_41E0_5A643B4D23B7",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.82,
   "yaw": -73.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_D0F6BE79_C6EF_1D21_41CA_661D622EA987, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_C44CD9EB_CE38_6836_41E6_BD6BE4B5D4F4, this.video_D01A6C55_C6E9_3D60_41DF_4DD5F6A84CF5, this.PlayList_C3D6A500_CE38_39F2_41E7_684658531AA0, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10.02,
   "yaw": 17.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_2_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.02,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_2_0.png",
      "width": 169,
      "height": 144,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.83,
   "yaw": 17.03,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F4FF9C00_BB43_5ACA_41C2_6DD9B4A41A64",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DED93CFC_CE78_6812_41E6_348E153DB6C5); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 20.22,
   "yaw": 53.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.22,
   "image": "this.AnimatedImageResource_DB72F64B_CD10_9DA8_41C6_4632DE98CC75",
   "pitch": -3.26,
   "yaw": 53.19,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F63E4141_BB40_CD4A_4158_DE209F1A47B6",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 29.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_4_0.png",
      "width": 507,
      "height": 165,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.46,
   "yaw": 75.07,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F6E97531_BB40_CACA_41B9_FB1FF6098E3B",
 "data": {
  "label": "KLIK UNTUK EMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 29.94,
   "yaw": 75.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_4_0_map.gif",
      "width": 49,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 29.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_5_0.png",
      "width": 495,
      "height": 185,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.26,
   "yaw": 18.62,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E1523A00_C7BB_04DF_41D2_5F128F3DE77F",
 "data": {
  "label": "SUASANA  PEMBELAJARAN"
 },
 "maps": [
  {
   "hfov": 29.17,
   "yaw": 18.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_5_0_map.gif",
      "width": 42,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DFE43E20_CE78_6832_41D2_E8FDF11475C1); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.8,
   "yaw": 137.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.8,
   "image": "this.AnimatedImageResource_DB655656_CD10_9DB8_41D1_95A3A3ADCD9E",
   "pitch": -4.63,
   "yaw": 137.88,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FB64F108_BB47_4ADB_41D8_CB52189D70A5",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 23.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_1_HS_1_0.png",
      "width": 405,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.04,
   "yaw": 124.92,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FA6B677A_BB47_353F_41E2_237B2D72F30B",
 "data": {
  "label": "KEMBALI KE TAPAK PERHIMPUNAN"
 },
 "maps": [
  {
   "hfov": 23.84,
   "yaw": 124.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_1_HS_1_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 46.13,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_0_0.png",
      "width": 779,
      "height": 310,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.89,
   "yaw": -34.58,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_980D4761_BACF_354D_41D5_25605A7B1F68",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 46.13,
   "yaw": -34.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_0_0_0_map.gif",
      "width": 40,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DFC7DE0B_CE78_6BF6_41A4_1AD7FE379AEE); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.83,
   "yaw": 25.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.83,
   "image": "this.AnimatedImageResource_DB764648_CD10_9DA8_41D5_EFA1430559C2",
   "pitch": 2.4,
   "yaw": 25.83,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A73BAC6A_BAC3_5B5F_41E2_BB6600E794EB",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 28.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_2_0.png",
      "width": 486,
      "height": 98,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.29,
   "yaw": 17.16,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_81E2AB14_BADF_DECA_41C2_88EB4381450C",
 "data": {
  "label": "DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 28.82,
   "yaw": 17.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_2_0_map.gif",
      "width": 79,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 93.33,
 "autoplay": true,
 "id": "overlay_AF6CA232_B9C0_D173_41C2_280469EB5C3E",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_AF6CA232_B9C0_D173_41C2_280469EB5C3E_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -24.65,
 "useHandCursor": true,
 "roll": 0.28,
 "yaw": 127.31,
 "chromaThreshold": 0.19,
 "rotationY": 3.71,
 "rotationX": 24.59,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_AFEC14D4_B9C3_5137_41CE_25B7C204CCC2.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 86.59,
 "chromaSmoothing": 0.02,
 "distance": 27.72,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.4,
   "image": "this.AnimatedImageResource_DB44763B_CD10_9DE8_41D4_FB6D6BA242D1",
   "pitch": 4.87,
   "yaw": 5.6,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A0CC6A89_B943_711E_41BD_450661F7CBD9",
 "data": {
  "label": "Info Red 01"
 },
 "maps": [
  {
   "hfov": 7.4,
   "yaw": 5.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 21.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_1_0.png",
      "width": 365,
      "height": 222,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.57,
   "yaw": 19.9,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A13E5573_B941_53F1_41B8_37CB29AFDC5E",
 "data": {
  "label": "PONDOK PENGAWAL"
 },
 "maps": [
  {
   "hfov": 21.6,
   "yaw": 19.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_1_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 35.87,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_2_0.png",
      "width": 608,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.49,
   "yaw": -15.61,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A0F1955F_B940_D332_41DB_0988B0239933",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 35.87,
   "yaw": -15.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_2_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 31.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_4_0.png",
      "width": 559,
      "height": 144,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.3,
   "yaw": 56.37,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8903BBDF_B9C7_7D76_41E0_35B10C677ED2",
 "data": {
  "label": "LALUAN PELAJAR"
 },
 "maps": [
  {
   "hfov": 31.26,
   "yaw": 56.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_4_0_map.gif",
      "width": 62,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4, this.camera_DFA96C85_CE78_68F2_41E0_702A140FCC09); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "KLIK UNTUK \u000dKE KOPERASI"
 },
 "maps": [
  {
   "hfov": 19.88,
   "yaw": 171.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_6_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_6_0.png",
      "width": 350,
      "height": 147,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64,
   "yaw": 171.84,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_89A4B64E_B9C1_5757_41D1_2158E541768C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 22.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_8_0.png",
      "width": 394,
      "height": 170,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.69,
   "yaw": 93.67,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E9DE19FA_BAC1_5D3F_41E5_E543C351CDDA",
 "data": {
  "label": "KLIK UNTUK KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 22.85,
   "yaw": 93.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_8_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 20.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_10_0.png",
      "width": 359,
      "height": 104,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.7,
   "yaw": -18.88,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_DAF22656_B743_3777_41AA_D03DFF9672A8",
 "data": {
  "label": "PINTU UTAMA"
 },
 "maps": [
  {
   "hfov": 20.48,
   "yaw": -18.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_10_0_map.gif",
      "width": 55,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798, this.camera_DFBF9C7B_CE78_6816_41C2_B27693AD73D6); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 18.82,
   "yaw": -22.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_11_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.82,
   "image": "this.AnimatedImageResource_DB42A63C_CD10_9DE8_41E3_76DB6922B867",
   "pitch": -10.21,
   "yaw": -22.87,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E835BBA0_B741_DDCA_41DB_D170207826F3",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4, this.camera_DE102CB2_CE78_6816_41DA_1D299EC5CC20); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 16.61,
   "yaw": 167.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_12_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.61,
   "image": "this.AnimatedImageResource_DB42163C_CD10_9DE8_41CD_2A85B87FEAFB",
   "pitch": -8.92,
   "yaw": 167.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D694B124_B740_CACB_416C_F2A9E8C077EC",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "hfov": 20.52,
   "yaw": 91.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_13_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.52,
   "image": "this.AnimatedImageResource_DB42463C_CD10_9DE8_41E2_67DDBA0514EF",
   "pitch": -4.65,
   "yaw": 91.56,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D99D7DA4_B74F_55CB_4199_56CF83CF223D",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5, this.camera_DE154CBD_CE78_6812_41E7_428E27A4FB56); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "hfov": 18.57,
   "yaw": 64.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_14_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.57,
   "image": "this.AnimatedImageResource_DB41D63D_CD10_9DE8_41E0_CC4911AD273D",
   "pitch": -13.81,
   "yaw": 64.81,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D2A3A28C_CC1B_5D2C_41E3_97A7237F36F6",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 22.99,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_16_0.png",
      "width": 388,
      "height": 124,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "yaw": -55.6,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C2CF5B96_CD13_8AB8_41CC_84C41B39EF0B",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 22.99,
   "yaw": -55.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_16_0_0_map.gif",
      "width": 50,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297AD",
 "id": "viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297ADVideoPlayer",
 "class": "VideoPlayer"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidDF2D6C35_CE78_6812_41E0_DC9F003297AD",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3052"
 }
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 180,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_ccap0",
 "distance": 50,
 "inertia": false,
 "class": "CeilingCapPanoramaOverlay"
},
{
 "blending": 0,
 "hfov": 89.07,
 "autoplay": true,
 "id": "overlay_EE2FD590_C7AF_0FFF_41E6_89D4FEF2F259",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_EE2FD590_C7AF_0FFF_41E6_89D4FEF2F259_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -22.71,
 "useHandCursor": true,
 "roll": -2.96,
 "yaw": -71.88,
 "chromaThreshold": 0.19,
 "rotationY": -0.12,
 "rotationX": 22.11,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_EE2CABD9_C7AF_1B60_41C6_64E859979461.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 79.75,
 "chromaSmoothing": 0.01,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "hfov": 17.97,
   "yaw": 18.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.97,
   "image": "this.AnimatedImageResource_DB666657_CD10_9DB8_41E5_AD4749DA6FD2",
   "pitch": -19.99,
   "yaw": 18.48,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D56AD765_CC15_C31C_41E6_5FB90241F143",
 "class": "HotspotPanoramaOverlay"
},
{
 "blending": 0,
 "hfov": 81.72,
 "autoplay": true,
 "id": "overlay_8C5BD453_B941_4B4D_41DC_B351B0539182",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_8C5BD453_B941_4B4D_41DC_B351B0539182_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -21.17,
 "useHandCursor": true,
 "roll": 0.71,
 "yaw": -67.91,
 "chromaThreshold": 0.2,
 "rotationY": 1.1,
 "rotationX": 19.88,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8CE1EC9E_B941_DBF7_41CC_0C2F8D51DB0B.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 68.83,
 "chromaSmoothing": 0,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.87,
   "yaw": -47.36,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8D362F68_B943_D55A_41E7_2038CC39503C",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.43,
   "yaw": -47.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 28.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_1_0.png",
      "width": 483,
      "height": 98,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.6,
   "yaw": 45.9,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F145B0C2_BBC1_4B4F_41DC_EA296B3AEDC6",
 "data": {
  "label": "KEMBALI KE KE KANTIN"
 },
 "maps": [
  {
   "hfov": 28.65,
   "yaw": 45.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_1_0_map.gif",
      "width": 78,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD, this.camera_DFBFFE40_CE78_6872_41E9_111FD3F4EE8F); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.79,
   "yaw": 42.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.79,
   "image": "this.AnimatedImageResource_DB677655_CD10_9DB8_41C4_150F42737AFB",
   "pitch": 5.49,
   "yaw": 42.98,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EFFC09C1_BBDF_5D4D_41E1_E19A5EF1FCA4",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 46.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_3_0.png",
      "width": 788,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "yaw": -141.39,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F355BE40_BBC1_774A_41E3_228DAFF840D5",
 "data": {
  "label": "KLIK UNTUK KEMBALI KE PINTU UTAMA"
 },
 "maps": [
  {
   "hfov": 46.64,
   "yaw": -141.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_3_0_map.gif",
      "width": 96,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.81,
   "yaw": -166.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_DB660655_CD10_9DB8_41E1_EC10D2954350",
   "pitch": 4.12,
   "yaw": -166.53,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F00092F5_BBC3_4F35_41E1_EAFE87E8BAAE",
 "class": "HotspotPanoramaOverlay"
},
{
 "blending": 0,
 "hfov": 89.91,
 "autoplay": true,
 "id": "overlay_99932C5B_BAC0_DB7D_41DD_4F9E3D021F57",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_99932C5B_BAC0_DB7D_41DD_4F9E3D021F57_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -21.44,
 "useHandCursor": true,
 "roll": 5.66,
 "yaw": -52.85,
 "chromaThreshold": 0.18,
 "rotationY": 3.47,
 "rotationX": 22.8,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9AE0164A_BAC1_5750_41DA_D7EFF19EA5DB.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 85.36,
 "chromaSmoothing": 0.02,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.82,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.86,
   "yaw": -103.3,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_9942FB7F_BAC7_DD35_41E0_ED321A7D333D",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.82,
   "yaw": -103.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398, this.camera_DF1C1DC0_CE78_6872_41AA_04D363E03B81); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 11.83,
   "yaw": -33.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.83,
   "image": "this.AnimatedImageResource_DB71E64C_CD10_9DA8_41E2_58D625D45303",
   "pitch": -2.23,
   "yaw": -33.37,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_9941152F_BAC0_CAD5_41DD_F8BD1AB082C9",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_8127AA5A_B940_DF7E_41E0_DF1821927198, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_85784831_B943_DACD_41D9_2AC7336A11C5, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 13.56,
   "yaw": 75.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.56,
   "image": "this.AnimatedImageResource_DB71764C_CD10_9DA8_41BB_18E85EDE1C0C",
   "pitch": -11.41,
   "yaw": 75.6,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_87FED584_B941_55CA_41E1_6F78800CF7CD",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DF085DCB_CE78_6876_41E9_99923001C647); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.7,
   "yaw": -111.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.7,
   "image": "this.AnimatedImageResource_DB72064C_CD10_9DA8_41C8_99F339521F6A",
   "pitch": 8.75,
   "yaw": -111.28,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_800C4570_BAC7_D54B_41BD_BB09C6F8E548",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 31.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_4_0.png",
      "width": 533,
      "height": 78,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.75,
   "yaw": -92.83,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_81CB8111_BAC0_CACD_41D4_C4631593147A",
 "data": {
  "label": "KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 31.21,
   "yaw": -92.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_4_0_map.gif",
      "width": 109,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 38.5,
   "yaw": 93.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_5_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.5,
   "image": "this.AnimatedImageResource_DB71B64D_CD10_9DA8_41C4_323ABCB1B56A",
   "pitch": -11.24,
   "yaw": 93.75,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DD3B8933_CC0B_CF74_41E0_0D7F8FA99757",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "maps": [
  {
   "hfov": 22.19,
   "yaw": -84.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_6_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.19,
   "image": "this.AnimatedImageResource_DB71C64D_CD10_9DA8_4196_5220A393222D",
   "pitch": -8.32,
   "yaw": -84.88,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DE7F1750_CC37_4334_41E5_19959441AEAF",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 21.06,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_0_0.png",
      "width": 356,
      "height": 121,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.69,
   "yaw": 92.23,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A4A6C6A2_B943_D7CF_41E6_39DCAE4AEDBC",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 21.06,
   "yaw": 92.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_0_0_0_map.gif",
      "width": 47,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 21.78,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_1_0.png",
      "width": 368,
      "height": 98,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.61,
   "yaw": -81.26,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A399B220_B943_4ECA_41D7_9971F3880A63",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 21.78,
   "yaw": -81.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_1_0_0_map.gif",
      "width": 60,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 104.82,
 "autoplay": false,
 "id": "overlay_A4A3CAFE_B947_5F37_41E6_72CDC0CC1B82",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_A4A3CAFE_B947_5F37_41E6_72CDC0CC1B82_t.jpg",
    "width": 1280,
    "height": 720,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -38.37,
 "useHandCursor": true,
 "roll": 6.46,
 "yaw": -5.2,
 "chromaThreshold": 0.2,
 "rotationY": 7.29,
 "rotationX": 37.74,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A4BCA713_B947_36CE_41E2_EC0A227BC2F7.mp4"
 },
 "chromaSmoothing": 0.02,
 "click": "this.overlay_A4A3CAFE_B947_5F37_41E6_72CDC0CC1B82.play()",
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 95.15,
 "videoVisibleOnStop": false,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 22.08,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_4_0.png",
      "width": 376,
      "height": 114,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.49,
   "yaw": 24.83,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A5B3C384_B941_4DCB_41E1_537272167F07",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 22.08,
   "yaw": 24.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_4_0_0_map.gif",
      "width": 52,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD, this.camera_DF40BD94_CE78_6812_41D8_4E87C3FAAFB8); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "KANTIN"
 },
 "maps": [
  {
   "hfov": 15.67,
   "yaw": -145.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_11_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.67,
   "image": "this.AnimatedImageResource_DB4E0641_CD10_9D98_41E1_BE8296662F1B",
   "pitch": 0.12,
   "yaw": -145.66,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_861092C1_B943_4F4D_41D8_9DEB2516590C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8346057_B9C1_7131_41D0_F3F236F09363, this.camera_DEEC1D31_CE78_6813_41E6_8B87A0EFBFE1); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "BILIK MUZIK"
 },
 "maps": [
  {
   "hfov": 5.86,
   "yaw": 157.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_12_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 19.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.86,
   "image": "this.AnimatedImageResource_DB4D8641_CD10_9D98_41DD_370EC162B03E",
   "pitch": 19.56,
   "yaw": 157.5,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_879AC36D_B940_CD55_41BD_F469D6662F94",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A, this.camera_DEB8BD5F_CE78_680E_41E1_01F38AAFA97E); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.3,
   "yaw": 37.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_13_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.3,
   "image": "this.AnimatedImageResource_DB4DF641_CD10_9D98_41B2_14482E0B4153",
   "pitch": 0.46,
   "yaw": 37.34,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_87BC52CE_BAC3_4F56_41D5_9255BBA7A98B",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 38.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_14_0.png",
      "width": 657,
      "height": 154,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.36,
   "yaw": -143.62,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_80424FF5_BAC1_F534_41E4_37F8FE57BAF4",
 "data": {
  "label": "KLIK UNTUK KE KANTIN"
 },
 "maps": [
  {
   "hfov": 38.63,
   "yaw": -143.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_14_0_map.gif",
      "width": 68,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 27.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_15_0.png",
      "width": 548,
      "height": 92,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 31.73,
   "yaw": 94.22,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FC7906C4_BAC0_D74B_41DA_6EF8E9A22344",
 "data": {
  "label": "PUSAT SUMBER"
 },
 "maps": [
  {
   "hfov": 27.64,
   "yaw": 94.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_15_0_map.gif",
      "width": 95,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 31.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 32.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_16_0.png",
      "width": 576,
      "height": 81,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 18.78,
   "yaw": 177.51,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_80E9EFEC_BAC1_755B_41AE_AE3913644631",
 "data": {
  "label": "BILIK MUZIK"
 },
 "maps": [
  {
   "hfov": 32.35,
   "yaw": 177.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_16_0_map.gif",
      "width": 113,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 18.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 25.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_17_0.png",
      "width": 452,
      "height": 59,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 16.68,
   "yaw": -16.08,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8230C763_BAC3_354E_41D4_AFFCE7317010",
 "data": {
  "label": "BILIK FROG"
 },
 "maps": [
  {
   "hfov": 25.74,
   "yaw": -16.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_17_0_map.gif",
      "width": 122,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 16.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 33.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_18_0.png",
      "width": 566,
      "height": 57,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.59,
   "yaw": 57.84,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_81341774_BAC1_F54B_41E2_92B94B236D51",
 "data": {
  "label": "BILIK KAUNSELING"
 },
 "maps": [
  {
   "hfov": 33.65,
   "yaw": 57.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_18_0_map.gif",
      "width": 158,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 15.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_19_0.png",
      "width": 260,
      "height": 110,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.37,
   "yaw": 122.66,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_87B7B280_BACF_CFCB_41CD_F15CF78985BE",
 "data": {
  "label": "PEJABAT"
 },
 "maps": [
  {
   "hfov": 15.14,
   "yaw": 122.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_19_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 34.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_20_0.png",
      "width": 579,
      "height": 138,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.09,
   "yaw": 179.83,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_82D4D7C0_BAC1_D54B_41CC_76624BA24A1D",
 "data": {
  "label": "PRA SEKOLAH"
 },
 "maps": [
  {
   "hfov": 34.32,
   "yaw": 179.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_20_0_map.gif",
      "width": 67,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9, this.camera_DF7C9D9F_CE78_680E_41DB_A0C50FF2666B); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 6.01,
   "yaw": -93.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_21_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.01,
   "image": "this.AnimatedImageResource_DB4C6643_CD10_9D98_41BE_26BFDD6EA2FA",
   "pitch": 1.56,
   "yaw": -93.26,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8776A6FE_BAC1_7737_4197_928D53BC73E0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B, this.camera_DEF16D26_CE78_6831_41E8_9DBCED6B9E18); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.04,
   "yaw": 159.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_22_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.04,
   "image": "this.AnimatedImageResource_DB4BC643_CD10_9D98_41E0_86E7C7E755E5",
   "pitch": 1.46,
   "yaw": 159.84,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FFD237EB_BB40_D55E_41C7_2AF2117FC5C2",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225, this.camera_DF569D8A_CE78_68F6_41C7_946BE890F9E6); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.08,
   "yaw": -33.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_23_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 16.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.08,
   "image": "this.AnimatedImageResource_DB4B3643_CD10_9D98_41CD_C49229369867",
   "pitch": 16.47,
   "yaw": -33.03,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FFEAD286_BB40_CFD7_41DB_BC282A90AE9E",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E, this.camera_DEB4BD69_CE78_6832_41BC_607CE5EEB4A4); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 6.42,
   "yaw": 73.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_24_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 31.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.42,
   "image": "this.AnimatedImageResource_DB4B6644_CD10_9D98_41D6_00BA18355E47",
   "pitch": 31.83,
   "yaw": 73.96,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F80DE862_BB40_DB4E_41C3_604C79E144C0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416, this.camera_DF5AED7F_CE78_680E_41DE_6A2DE2FBEF31); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 111.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_25_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 12.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_DB4AF644_CD10_9D98_41E2_3D1FFA0555CE",
   "pitch": 12.95,
   "yaw": 111.62,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F97F5353_BB41_4D4D_41C3_69B9CC8B4BAD",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1, this.camera_DEAE6D74_CE78_6812_41E4_6DD96ED59E70); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 7.77,
   "yaw": 137.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_26_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.77,
   "image": "this.AnimatedImageResource_DB4A4644_CD10_9D98_41DA_84CCE24E7006",
   "pitch": 10.29,
   "yaw": 137.45,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FE42C1B7_BB41_4D35_41D1_0AD49C7089A2",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 33.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_27_0.png",
      "width": 579,
      "height": 80,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.57,
   "yaw": 157.52,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F82C49FC_BB40_DD3B_41AE_5DCFD5F3EF90",
 "data": {
  "label": "KELAS TAHUN 1"
 },
 "maps": [
  {
   "hfov": 33.84,
   "yaw": 157.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_27_0_map.gif",
      "width": 115,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F, this.camera_DF76BDAA_CE78_6836_41D5_024A55A897DF); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.41,
   "yaw": -41.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_28_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.41,
   "image": "this.AnimatedImageResource_DB49A645_CD10_9D98_41D3_58552F86A52A",
   "pitch": 0.69,
   "yaw": -41.95,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F9EB6259_BB41_4F7D_41DC_D90492573A65",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 20.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_29_0.png",
      "width": 353,
      "height": 83,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.17,
   "yaw": -49.25,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FEF14ED2_BB41_F74C_41CC_39B699DAC164",
 "data": {
  "label": "MAKMAL SAINS"
 },
 "maps": [
  {
   "hfov": 20.93,
   "yaw": -49.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_29_0_map.gif",
      "width": 68,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A, this.camera_DEE76D3E_CE78_6811_41DA_5A1D0D4D3AF9); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 5.38,
   "yaw": 138.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_30_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 18.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.38,
   "image": "this.AnimatedImageResource_DB495645_CD10_9D98_41D9_FA994E72ABC3",
   "pitch": 18.1,
   "yaw": 138.05,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F89B3A16_BB43_3EF7_41A5_616EAB67D112",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4, this.camera_DEF89D1B_CE78_6817_417F_370AA515894C); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "hfov": 13.69,
   "yaw": 76.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_31_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.69,
   "image": "this.AnimatedImageResource_DB48B645_CD10_9D98_41DD_7F11C9E6F62A",
   "pitch": -4.03,
   "yaw": 76.19,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EFE3DC87_BB4F_5BD5_41DC_D9A9FDFAC16C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 34.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_32_0.png",
      "width": 579,
      "height": 83,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.38,
   "yaw": 88.03,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E830FB72_BB41_FD4E_41E1_D34D4BCC0218",
 "data": {
  "label": "KOPERASI"
 },
 "maps": [
  {
   "hfov": 34.03,
   "yaw": 88.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_32_0_map.gif",
      "width": 111,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.media_D60067FC_B6C1_353B_41D6_AF9626FC495A, this.camera_CADE2AE7_C4A7_EF7B_41E0_F66163B64A82); if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_E10774DA_C7BF_0D63_41E3_70A7FB52C015, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_C44BE9EB_CE38_6836_41C1_DCC860AE1844, this.video_EEBA0F0E_C7BF_1CE3_41C9_CAA33E0D74D2, this.PlayList_C3D61500_CE38_39F2_41DE_839BDF1A803E, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.17,
   "yaw": 110.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_35_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.17,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_35_0.png",
      "width": 155,
      "height": 101,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "yaw": 110.46,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_CD880A2F_B6C7_5ED6_41CC_5813F34AF8D6",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 24.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_36_0.png",
      "width": 408,
      "height": 83,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.75,
   "yaw": 113.34,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_D79AE804_B6C3_3ACA_41BE_29ECC1A26F99",
 "data": {
  "label": "NYANYIAN NEGARAKU"
 },
 "maps": [
  {
   "hfov": 24.17,
   "yaw": 113.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_36_0_map.gif",
      "width": 78,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A834223A_B9C0_D173_41D5_043019F0786B, this.camera_DE8D3D54_CE78_6812_41DB_B100DDDE899A); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 8.24,
   "yaw": 43.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_37_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.24,
   "image": "this.AnimatedImageResource_DB77E647_CD10_9D98_41D8_5105745FEE90",
   "pitch": 11.67,
   "yaw": 43.5,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C2E93DD6_CC16_C73C_41D5_068D015CEEDA",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A, this.camera_DE92FD49_CE78_6872_41DF_B2C5856985C7); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "hfov": 6.69,
   "yaw": 146.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_38_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.69,
   "image": "this.AnimatedImageResource_DB775647_CD10_9D98_41C1_7A3E74A19ACC",
   "pitch": 1.46,
   "yaw": 146.63,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D524F2C8_CC75_3D14_41E4_4F9AA9FDB48C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 27.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_39_0.png",
      "width": 470,
      "height": 223,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.61,
   "yaw": 140.62,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_D4C283E6_CC77_431C_41E2_3D9C10326D5E",
 "data": {
  "label": "PENDIDIKAN KHAS"
 },
 "maps": [
  {
   "hfov": 27.82,
   "yaw": 140.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_39_0_map.gif",
      "width": 33,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 12.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_40_0.png",
      "width": 220,
      "height": 56,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.65,
   "yaw": 54.27,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_D5C7D725_CC0D_431C_41E0_653A1470AE11",
 "data": {
  "label": "BILIK GURU"
 },
 "maps": [
  {
   "hfov": 12.77,
   "yaw": 54.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_40_0_map.gif",
      "width": 62,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_DB76E648_CD10_9DA8_41AB_AACAB24FDBE4",
   "pitch": -11.41,
   "yaw": -7.72,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_D7F17774_CC0D_43FC_41D5_9E798E1082F8",
 "data": {
  "label": "Info Red 03"
 },
 "maps": [
  {
   "hfov": 6.39,
   "yaw": -7.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_41_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3E07E9B_BBC1_D7FE_41E3_A0D9C9FB767F",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 3.19,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 3.19,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 3.19,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "blending": 0,
 "hfov": 81.98,
 "autoplay": true,
 "id": "overlay_9524C61C_BEC7_56FB_41C6_D5E2C67FC2C0",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_9524C61C_BEC7_56FB_41C6_D5E2C67FC2C0_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -24.83,
 "useHandCursor": true,
 "roll": -1.44,
 "yaw": 96.08,
 "chromaThreshold": 0.2,
 "rotationY": 2.29,
 "rotationX": 23.23,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8B2A3124_BEC0_CACA_41CE_3DDD0B12434E.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 71.28,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.83,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.35,
   "yaw": 133.16,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_94D02CFA_BEC0_DB3E_41D6_E61738AC9608",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.83,
   "yaw": 133.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_8D8E395F_B94F_3D75_41CD_B23500D625F8, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_8E23F38D_B940_CDD5_41D5_C65E228E6F4B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 8.78,
   "yaw": -175.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.78,
   "image": "this.AnimatedImageResource_DB783654_CD10_9DB8_41E1_B9DE38B36A62",
   "pitch": -9.44,
   "yaw": -175.89,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_94219401_BEBF_4ACD_41D9_0E085D0F7313",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DF2DCDEA_CE78_6836_41C7_272578C1AA1C); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.78,
   "yaw": 119.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.78,
   "image": "this.AnimatedImageResource_DB679654_CD10_9DB8_41C0_E0848741B7DE",
   "pitch": -6.01,
   "yaw": 119.86,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F61EDCCA_BB40_FB5E_41E4_50521F4A809E",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 31.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_3_0.png",
      "width": 536,
      "height": 147,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.04,
   "yaw": 139.76,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F56A4864_BB41_5B4B_41CD_512DEBB9CE89",
 "data": {
  "label": "KLIK UNTUK KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 31.51,
   "yaw": 139.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_3_0_map.gif",
      "width": 58,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.88,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.12,
   "yaw": 73.44,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A3BCB736_B943_D537_41E4_31D4F5FCF746",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.88,
   "yaw": 73.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 19.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_2_0.png",
      "width": 336,
      "height": 165,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "yaw": 170.22,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A232BAE2_B940_DF4E_41DF_16DC82F75F5D",
 "data": {
  "label": "KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 19.89,
   "yaw": 170.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_2_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DE3BDCDD_CE78_6812_41E7_BB422615E719); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 17.27,
   "yaw": 165.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.27,
   "image": "this.AnimatedImageResource_DB4F2640_CD10_9D98_41D9_CC707ACE4832",
   "pitch": -4.89,
   "yaw": 165.5,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D9C829FE_CC1D_4EEC_41E1_F386C887930C",
 "class": "HotspotPanoramaOverlay"
},
{
 "blending": 0,
 "hfov": 93.32,
 "autoplay": true,
 "id": "overlay_8E8C03C2_B9C1_4D4F_41E4_D6BF9D19C00F",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_8E8C03C2_B9C1_4D4F_41E4_D6BF9D19C00F_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -27.53,
 "useHandCursor": true,
 "roll": -1.11,
 "yaw": -29.95,
 "chromaThreshold": 0.2,
 "rotationY": -4.34,
 "rotationX": 27.06,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_8EA0617C_B9C1_CD3A_41D2_55F5FC82A334.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 88.11,
 "chromaSmoothing": 0.02,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 42.7,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_0_0.png",
      "width": 727,
      "height": 243,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.46,
   "yaw": 31.14,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8EEE51B1_B9C3_CDCA_41D8_8E6C86A89891",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 42.7,
   "yaw": 31.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_0_0_0_map.gif",
      "width": 47,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8, this.camera_DF629DB5_CE78_6812_41E8_AD926B7DB2DE); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 8.23,
   "yaw": 175.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.14,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.23,
   "image": "this.AnimatedImageResource_DB65B656_CD10_9DB8_41A2_74B7D0AFE57F",
   "pitch": -2.14,
   "yaw": 175.88,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8AA05D0B_B9FF_3ADD_41E4_D8C447F4DB21",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 15.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_2_0.png",
      "width": 269,
      "height": 115,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.04,
   "yaw": 177.86,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8B364780_B9C1_D5CB_41D7_17C92958D580",
 "data": {
  "label": "KELUAR"
 },
 "maps": [
  {
   "hfov": 15.71,
   "yaw": 177.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_2_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_DE8EDD54_CE78_6812_41D6_094F228FA3C7",
 "movements": [
  {
   "yawDelta": 1,
   "yawSpeed": 1.6,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 358,
   "yawSpeed": 1.6,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 1,
   "yawSpeed": 1.6,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_96DEBA72_BEC0_FF4E_41E2_B442D7B8934C",
 "movements": [
  {
   "yawDelta": 1,
   "yawSpeed": 1.6,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 358,
   "yawSpeed": 1.6,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 1,
   "yawSpeed": 1.6,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8, this.camera_DFDA4DF5_CE78_6812_41D3_A1D88721F428); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "hfov": 13.59,
   "yaw": -105.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.59,
   "image": "this.AnimatedImageResource_DB41563D_CD10_9DE8_41E9_61FB20B0FE38",
   "pitch": -14.15,
   "yaw": -105.57,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E8C9FCBA_B740_DB3E_41D7_077ECBB41D77",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 16.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_2_0.png",
      "width": 305,
      "height": 97,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.57,
   "yaw": -102.52,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E7345616_B741_D6F7_41C7_D2AC34ABEAD9",
 "data": {
  "label": "PINTU A"
 },
 "maps": [
  {
   "hfov": 16.96,
   "yaw": -102.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_2_0_map.gif",
      "width": 50,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 20.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_3_0.png",
      "width": 378,
      "height": 97,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.34,
   "yaw": 141.64,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_D6F8E7BB_B743_353D_41CD_ACD926803254",
 "data": {
  "label": "SEKITAR STAZ"
 },
 "maps": [
  {
   "hfov": 20.4,
   "yaw": 141.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_3_0_map.gif",
      "width": 62,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5, this.camera_DFC97E00_CE78_6BF2_41C9_A074EC915FC6); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 13.28,
   "yaw": 135.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_4_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.28,
   "image": "this.AnimatedImageResource_DB40F63E_CD10_9DE8_41E5_25EB0441F6F5",
   "pitch": -18.68,
   "yaw": 135.94,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D39D84CA_B741_4B5F_41CE_8E806DA144DD",
 "class": "HotspotPanoramaOverlay"
},
{
 "blending": 0,
 "hfov": 71.76,
 "autoplay": true,
 "id": "overlay_901C121A_BEC3_4EFE_418F_C4120CD6C323",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_901C121A_BEC3_4EFE_418F_C4120CD6C323_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -27.48,
 "useHandCursor": true,
 "roll": -1.73,
 "yaw": 2.71,
 "chromaThreshold": 0.19,
 "rotationY": 1.93,
 "rotationX": 27.61,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_970DDEA0_BEC3_37CA_41DE_E7178609DF57.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 65.55,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 31.56,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_0_0.png",
      "width": 536,
      "height": 170,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.18,
   "yaw": 55.85,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_96EECF45_BEC1_5555_41E3_77D2A95A3B80",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 31.56,
   "yaw": 55.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_0_0_0_map.gif",
      "width": 50,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.18,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DFF6DE15_CE78_6812_41E4_70724691B14E); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": -45.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB7D0650_CD10_9DB8_41E7_655F4567FD1C",
   "pitch": -1.37,
   "yaw": -45.9,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FCF7DD5C_BAFF_357B_41D7_1CF90555C50F",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_2_0.png",
      "width": 521,
      "height": 156,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.83,
   "yaw": -28.48,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FF50889E_BAC0_DBF7_41E3_CD9BDBFB8010",
 "data": {
  "label": "KLIK UNTUK KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 30.85,
   "yaw": -28.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_2_0_map.gif",
      "width": 53,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 84.55,
 "autoplay": true,
 "id": "overlay_96F00030_BEC7_4ACA_41CD_46326BAC4A7E",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_96F00030_BEC7_4ACA_41CD_46326BAC4A7E_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -22.06,
 "useHandCursor": true,
 "roll": 1.23,
 "yaw": 24.86,
 "chromaThreshold": 0.19,
 "rotationY": 0.32,
 "rotationX": 21.86,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9709D77E_BEC0_F537_41C6_9C292CAB455F.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 78.64,
 "chromaSmoothing": 0.01,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.87,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.8,
   "yaw": 54.22,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_95E0E4B2_BEC0_CBCE_41D6_ABFC00D54131",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.87,
   "yaw": 54.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DED3ED07_CE78_69FE_41E8_616A55C8C7C4); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Left"
 },
 "maps": [
  {
   "hfov": 11.81,
   "yaw": 160.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_DB792653_CD10_9DB8_41E3_B88CB62C5E29",
   "pitch": 3.95,
   "yaw": 160.01,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F1358EAB_BB41_37DD_41D3_DB2F5E05D39E",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 59.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_2_0.png",
      "width": 1014,
      "height": 92,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.01,
   "yaw": 167.65,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F33BA6B5_BB41_5734_41E6_30DA492CA6EB",
 "data": {
  "label": "KLIK UNTUK KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 59.32,
   "yaw": 167.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_2_0_map.gif",
      "width": 176,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEF",
 "id": "viewer_uidDF3C3C1E_CE78_680E_41D4_64884D3D9CEFVideoPlayer",
 "class": "VideoPlayer"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_970C1598_BEC1_75FB_41D0_481DB4B970B5",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 4.25,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 4.25,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 4.25,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidDF299C2E_CE78_680E_41D2_A9F84367067C",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3051"
 }
},
{
 "blending": 0,
 "hfov": 82.24,
 "autoplay": true,
 "id": "overlay_9195F20B_BEDF_4EDE_41B7_E16CCD7307AF",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_9195F20B_BEDF_4EDE_41B7_E16CCD7307AF_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -18.99,
 "useHandCursor": true,
 "roll": -1.17,
 "yaw": -100.69,
 "chromaThreshold": 0.2,
 "rotationY": 3.31,
 "rotationX": 18.21,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_971ACB07_BEDF_DED5_41E2_670B7F83A485.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 72.29,
 "chromaSmoothing": 0.03,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.73,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_0_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.75,
   "yaw": -140.36,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_911A955B_BEC1_357E_41CB_AB1F269D1FAD",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.73,
   "yaw": -140.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_0_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 65.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_2_0.png",
      "width": 1109,
      "height": 89,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.18,
   "yaw": -57.05,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_83804838_BAC1_7B3B_41E2_555EB3D737BF",
 "data": {
  "label": "KEMBALI KE DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 65.34,
   "yaw": -57.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_2_0_map.gif",
      "width": 199,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.18,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DECD2D12_CE78_6811_41D3_6DFA7C2A3442); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05 Right"
 },
 "maps": [
  {
   "hfov": 11.84,
   "yaw": -72.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_DB7F064F_CD10_9DA8_41D6_075961935A0F",
   "pitch": 0,
   "yaw": -72.67,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FBD28ED7_BB40_D775_41D9_E57124F67E8A",
 "class": "HotspotPanoramaOverlay"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_DEB8AD5F_CE78_680E_41E5_EBDC50D7A607",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 4.25,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 4.25,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 4.25,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "blending": 0,
 "hfov": 79.39,
 "autoplay": true,
 "id": "overlay_A732DBDF_BAC7_3D75_41E0_B0C438A165AB",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_A732DBDF_BAC7_3D75_41E0_B0C438A165AB_t.jpg",
    "width": 2,
    "height": 2,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -23.43,
 "useHandCursor": true,
 "roll": -1.7,
 "yaw": -3.84,
 "chromaThreshold": 0.17,
 "rotationY": -0.03,
 "rotationX": 20.83,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9C77F680_BAC7_D7CB_41D1_888956F3EBE2.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 76.91,
 "chromaSmoothing": 0.01,
 "distance": 28.81,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 32.39,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_0_0.png",
      "width": 634,
      "height": 214,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 30.46,
   "yaw": 2.66,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_984887B0_BAC0_F5CA_41E6_320C0238FA34",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 32.39,
   "yaw": 2.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_0_0_0_map.gif",
      "width": 47,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 30.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE, this.camera_DE2FDCF2_CE78_6816_41C1_BB505559B79D); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 15.65,
   "yaw": 94.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.65,
   "image": "this.AnimatedImageResource_DB753649_CD10_9DA8_41D9_7069AFFFD304",
   "pitch": -6.69,
   "yaw": 94.71,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8BA2CC57_B9C1_5B75_41CF_EF7099E74F6C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 34.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_2_0.png",
      "width": 596,
      "height": 156,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.19,
   "yaw": 101.58,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8A3FCC38_B9C0_DB3B_41C3_255CEF4B4FBC",
 "data": {
  "label": "DATARAN JUARA"
 },
 "maps": [
  {
   "hfov": 34.11,
   "yaw": 101.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_2_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_8BB80877_B9C1_5B35_41B5_EB2E7ABA4AD5, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_872E2B15_B9C1_DECA_41E1_1BC080FC5BBD, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 10.2,
   "yaw": 135.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.2,
   "image": "this.AnimatedImageResource_DB74B649_CD10_9DA8_41C1_18034875C3F0",
   "pitch": 7.81,
   "yaw": 135.39,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8406FA90_B9C1_DFCA_41E4_3EAE58CE9F4C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_84F4DD0D_B9C1_3AD5_41E4_B835E57079A7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_872F5B16_B9C1_DEF6_41E4_122D1B69CA4D, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "maps": [
  {
   "hfov": 10.29,
   "yaw": 33.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.29,
   "image": "this.AnimatedImageResource_DB743649_CD10_9DA8_41BC_1310EBB8D7BF",
   "pitch": 1.8,
   "yaw": 33.63,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8BFFE45F_B9C0_CB75_41D9_4F69ADD1FB07",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5, this.camera_DE354CE7_CE78_683E_41E3_7B610585AA6E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 17.38,
   "yaw": -90.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_5_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.38,
   "image": "this.AnimatedImageResource_DB73964A_CD10_9DA8_41E2_7C74D2C91831",
   "pitch": -10.04,
   "yaw": -90.7,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E96E9AA6_B741_FFD7_418A_6B4C6D3CD4F9",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 25.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_6_0.png",
      "width": 452,
      "height": 142,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.05,
   "yaw": -89.23,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E9112986_B741_7DD7_41E7_1D9C58A47A80",
 "data": {
  "label": "SEKITAR STAZ"
 },
 "maps": [
  {
   "hfov": 25.3,
   "yaw": -89.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_6_0_map.gif",
      "width": 50,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 180,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0",
 "distance": 50,
 "inertia": false,
 "class": "CeilingCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 56.97,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_9_0.png",
      "width": 966,
      "height": 578,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.45,
   "yaw": 20.55,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_EF0243C0_BB41_CD4A_41E7_66F08DF5C1C1",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 56.97,
   "yaw": 20.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_9_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_ccap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 15,
 "id": "panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A82BC405_B9DF_7111_41C3_B06833A844A5, this.camera_DF84BC70_CE78_6812_41E0_6178D00E7D50); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "hfov": 16.43,
   "yaw": -134.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_13_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.43,
   "image": "this.AnimatedImageResource_DB5B8634_CD10_9DF8_41D4_BEB76788089F",
   "pitch": -6.35,
   "yaw": -134.25,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D6639E31_B7C7_56CD_41CB_B4C63FC7C1F0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 42.81,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_16_0.png",
      "width": 723,
      "height": 355,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.54,
   "yaw": -17.67,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E062CDA8_B7C3_75DA_41C9_7F8E41D33CAD",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 42.81,
   "yaw": -17.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_16_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "hfov": 72.96,
 "autoplay": true,
 "id": "overlay_DA8ABC16_C7DF_1CE0_41CF_3CA5C524BE3C",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "levels": [
   {
    "url": "media/overlay_DA8ABC16_C7DF_1CE0_41CF_3CA5C524BE3C_t.jpg",
    "width": 1280,
    "height": 720,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -16.16,
 "useHandCursor": true,
 "roll": -1.51,
 "yaw": -166.12,
 "chromaThreshold": 0.19,
 "rotationY": -1.11,
 "rotationX": 15.97,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_D8E3E862_C7DF_0523_41DF_16B23C6D5BFE.mp4"
 },
 "videoVisibleOnStop": true,
 "data": {
  "label": "Video"
 },
 "chromaColor": "#329D3C",
 "vfov": 64.51,
 "chromaSmoothing": 0.01,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 28.41,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_21_0.png",
      "width": 480,
      "height": 115,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.85,
   "yaw": -128.65,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_E72D18D8_CC75_4D34_41DE_569CCA424DFC",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 28.41,
   "yaw": -128.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_21_0_0_map.gif",
      "width": 66,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_F957BAB0_CC37_4D74_41BE_9EBF526B9340, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_C44AF9EA_CE38_6836_41DB_18B5A4956787, this.video_FA1CAB7C_CC37_C3EC_41E8_6B5A335D9D43, this.PlayList_C3D7E4FF_CE38_380E_41E4_269DF3BCEBB0, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10.24,
   "yaw": 55.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_22_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.24,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_22_0.png",
      "width": 173,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.09,
   "yaw": 55.77,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FD8CA892_CC1A_CD34_41E4_6A6BC28B2D38",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 67.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_23_0.png",
      "width": 1147,
      "height": 266,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.78,
   "yaw": 76.53,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_FD305D5C_CC15_472C_41E6_BFE6CA764B3D",
 "data": {
  "label": "AHLI STAZWARS"
 },
 "maps": [
  {
   "hfov": 67.48,
   "yaw": 76.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_23_0_map.gif",
      "width": 68,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8341266_B9C0_F112_41B6_B6B636E3C416, this.camera_DF925E2A_CE78_6836_41DF_D9C1797CC417); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "maps": [
  {
   "hfov": 11.81,
   "yaw": -125.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_DB71564D_CD10_9DA8_41D3_5A612BC059E9",
   "pitch": -3.95,
   "yaw": -125.86,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_99340F20_BAC1_56CB_41DD_CDFE7E803B20",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 30.83,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_1_HS_1_0.png",
      "width": 521,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.35,
   "yaw": 67.44,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_9AAF1E97_BAC1_D7F6_41D7_B3A9518005ED",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.83,
   "yaw": 67.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_1_HS_1_0_0_map.gif",
      "width": 48,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_DFAECE4A_CE78_6876_41E3_D515B6A44EDF",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 3.19,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 3.19,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 3.19,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "id": "Container_DF748DD5_C732_2202_41A0_E7C7E5B7F6B3",
 "left": 14.95,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "width": 10,
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 70.5,
 "minWidth": 1,
 "top": 10,
 "class": "Container",
 "backgroundColor": [
  "#00CCFF"
 ],
 "shadowBlurRadius": 10,
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "shadowOpacity": 0.5,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "green block"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_DF745DD5_C732_2202_41C5_2A7A4FC0BEF4",
 "left": "3%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 400,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "height": 48,
 "top": "3.16%",
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "--STICKER"
 }
},
{
 "textDecoration": "none",
 "fontFamily": "Otama.ep",
 "propagateClick": false,
 "data": {
  "name": "text 2"
 },
 "id": "Label_DF746DD5_C732_2202_418E_A5955568A343",
 "left": 36,
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 287,
 "minHeight": 1,
 "textShadowOpacity": 1,
 "horizontalAlign": "left",
 "text": "SK TUNKU AZIZAH",
 "textShadowColor": "#000000",
 "verticalAlign": "top",
 "textShadowVerticalLength": 0,
 "minWidth": 1,
 "class": "Label",
 "height": 21.5,
 "fontSize": "21px",
 "top": 55,
 "paddingTop": 0,
 "textShadowHorizontalLength": 0,
 "fontStyle": "normal",
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "fontWeight": "normal",
 "textShadowBlurRadius": 10
},
{
 "textDecoration": "none",
 "fontFamily": "Otama.ep",
 "propagateClick": false,
 "data": {
  "name": "text 1"
 },
 "id": "Label_DF747DD5_C732_2202_41D5_29BB7F571348",
 "left": 36,
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 327.5,
 "minHeight": 1,
 "textShadowOpacity": 1,
 "horizontalAlign": "left",
 "text": "VIRTUAL TOUR",
 "textShadowColor": "#000000",
 "verticalAlign": "top",
 "textShadowVerticalLength": 0,
 "minWidth": 1,
 "class": "Label",
 "height": 34,
 "fontSize": "39px",
 "top": 18.7,
 "paddingTop": 0,
 "textShadowHorizontalLength": 0,
 "fontStyle": "normal",
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "fontWeight": "bold",
 "textShadowBlurRadius": 10
},
{
 "maxHeight": 500,
 "propagateClick": false,
 "id": "Image_ECD88527_BB40_CAD6_41D5_DFC7D57C2F87",
 "paddingRight": 0,
 "right": "25.56%",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_ECD88527_BB40_CAD6_41D5_DFC7D57C2F87.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "11.589%",
 "bottom": "30%",
 "class": "Image",
 "minWidth": 1,
 "height": "60.15%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image166072"
 },
 "maxWidth": 500
},
{
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "id": "Container_EF9CCE4E_CC35_452C_41E5_5AA6FF2A0B76",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_EF9C3E4E_CC35_452C_41E2_1EC59243AC71",
  "this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "7%",
 "class": "Container",
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "layout": "vertical",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "visible": false,
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7EF64F_CD10_9DA8_41E4_68F769A21571",
 "levels": [
  {
   "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7E6650_CD10_9DB8_41DE_C3DED581D4CE",
 "levels": [
  {
   "url": "media/panorama_A83401C1_B9C1_3311_41D9_6ACF1BC6BCBD_1_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB40363E_CD10_9DE8_41E9_80481F9AD63C",
 "levels": [
  {
   "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_0_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4FB63E_CD10_9DE8_41E7_015336EA3223",
 "levels": [
  {
   "url": "media/panorama_A8340FC3_B9C1_2F11_41D6_48316E3B00C8_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7CC651_CD10_9DB8_41B5_053689603E1E",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_1_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7C5651_CD10_9DB8_41E9_1E4FFD0D8A66",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_2_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7B8651_CD10_9DB8_41D2_A591EC35B229",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_3_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7B1652_CD10_9DB8_41E0_4053556BDFF5",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_4_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7B7652_CD10_9DB8_41C7_ED39CC7B5F87",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_5_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7AA652_CD10_9DB8_41DF_938812BDAEC3",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_6_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7A2653_CD10_9DB8_41A8_FCE51D25C98F",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_8_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB79B653_CD10_9DB8_41E8_AB93497DADA5",
 "levels": [
  {
   "url": "media/panorama_A82378DC_B9C1_5137_41B0_726E2FB4477F_1_HS_9_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB40663F_CD10_9DE8_41CF_1D3EBA851C10",
 "levels": [
  {
   "url": "media/panorama_A8326BCC_B9DF_7717_41D2_06B4B8AA3C6B_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB70164E_CD10_9DA8_41E3_88195D6558B8",
 "levels": [
  {
   "url": "media/panorama_A834223A_B9C0_D173_41D5_043019F0786B_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB72F64B_CD10_9DA8_41C6_4632DE98CC75",
 "levels": [
  {
   "url": "media/panorama_A83FCAC2_B9C0_D113_41E0_5AF8AA19B6D1_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB655656_CD10_9DB8_41D1_95A3A3ADCD9E",
 "levels": [
  {
   "url": "media/panorama_A829B872_B9C1_D1F3_41C7_56BA2D494E9A_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB764648_CD10_9DA8_41D5_EFA1430559C2",
 "levels": [
  {
   "url": "media/panorama_A7900C59_BAC1_7B7D_41E3_F9E61FED97E9_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB44763B_CD10_9DE8_41D4_FB6D6BA242D1",
 "levels": [
  {
   "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_0_0.png",
   "width": 780,
   "height": 1170,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB42A63C_CD10_9DE8_41E3_76DB6922B867",
 "levels": [
  {
   "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_11_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB42163C_CD10_9DE8_41CD_2A85B87FEAFB",
 "levels": [
  {
   "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_12_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB42463C_CD10_9DE8_41E2_67DDBA0514EF",
 "levels": [
  {
   "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_13_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB41D63D_CD10_9DE8_41E0_CC4911AD273D",
 "levels": [
  {
   "url": "media/panorama_A82BC405_B9DF_7111_41C3_B06833A844A5_1_HS_14_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB666657_CD10_9DB8_41E5_AD4749DA6FD2",
 "levels": [
  {
   "url": "media/panorama_EDF7A5F2_C7A9_0F23_41C3_ED30B0B0C65C_1_HS_0_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB677655_CD10_9DB8_41C4_150F42737AFB",
 "levels": [
  {
   "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB660655_CD10_9DB8_41E1_EC10D2954350",
 "levels": [
  {
   "url": "media/panorama_9380E010_B95F_CACB_41E2_12F313E03DC6_1_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB71E64C_CD10_9DA8_41E2_58D625D45303",
 "levels": [
  {
   "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB71764C_CD10_9DA8_41BB_18E85EDE1C0C",
 "levels": [
  {
   "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_2_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB72064C_CD10_9DA8_41C8_99F339521F6A",
 "levels": [
  {
   "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB71B64D_CD10_9DA8_41C4_323ABCB1B56A",
 "levels": [
  {
   "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_5_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB71C64D_CD10_9DA8_4196_5220A393222D",
 "levels": [
  {
   "url": "media/panorama_A8341266_B9C0_F112_41B6_B6B636E3C416_1_HS_6_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4E0641_CD10_9D98_41E1_BE8296662F1B",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_11_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4D8641_CD10_9D98_41DD_370EC162B03E",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_12_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4DF641_CD10_9D98_41B2_14482E0B4153",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_13_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4C6643_CD10_9D98_41BE_26BFDD6EA2FA",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_21_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4BC643_CD10_9D98_41E0_86E7C7E755E5",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_22_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4B3643_CD10_9D98_41CD_C49229369867",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_23_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4B6644_CD10_9D98_41D6_00BA18355E47",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_24_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4AF644_CD10_9D98_41E2_3D1FFA0555CE",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_25_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4A4644_CD10_9D98_41DA_84CCE24E7006",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_26_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB49A645_CD10_9D98_41D3_58552F86A52A",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_28_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB495645_CD10_9D98_41D9_FA994E72ABC3",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_30_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB48B645_CD10_9D98_41DD_7F11C9E6F62A",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_31_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB77E647_CD10_9D98_41D8_5105745FEE90",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_37_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB775647_CD10_9D98_41C1_7A3E74A19ACC",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_38_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB76E648_CD10_9DA8_41AB_AACAB24FDBE4",
 "levels": [
  {
   "url": "media/panorama_A8367373_B9DF_37F1_41D2_A5630C8D67FE_1_HS_41_0.png",
   "width": 500,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB783654_CD10_9DB8_41E1_B9DE38B36A62",
 "levels": [
  {
   "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB679654_CD10_9DB8_41C0_E0848741B7DE",
 "levels": [
  {
   "url": "media/panorama_A82747F3_B9C1_7EF1_41E4_894F16A2EC4E_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB4F2640_CD10_9D98_41D9_CC707ACE4832",
 "levels": [
  {
   "url": "media/panorama_A82C53D7_B9DF_5732_41D3_585D143DB63A_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB65B656_CD10_9DB8_41A2_74B7D0AFE57F",
 "levels": [
  {
   "url": "media/panorama_A829281C_B9C1_3137_41B7_848A492B12B1_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB41563D_CD10_9DE8_41E9_61FB20B0FE38",
 "levels": [
  {
   "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_0_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB40F63E_CD10_9DE8_41E5_25EB0441F6F5",
 "levels": [
  {
   "url": "media/panorama_E86C7728_B743_D6DC_41B5_23F36BCEE5A5_1_HS_4_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7D0650_CD10_9DB8_41E7_655F4567FD1C",
 "levels": [
  {
   "url": "media/panorama_A825B9D7_B9C1_3332_41E5_32A67BAF0225_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB792653_CD10_9DB8_41E3_B88CB62C5E29",
 "levels": [
  {
   "url": "media/panorama_A8346057_B9C1_7131_41D0_F3F236F09363_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB7F064F_CD10_9DA8_41D6_075961935A0F",
 "levels": [
  {
   "url": "media/panorama_A822DA25_B9C0_D111_41CD_1B0CFC3FAF1A_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB753649_CD10_9DA8_41D9_7069AFFFD304",
 "levels": [
  {
   "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB74B649_CD10_9DA8_41C1_18034875C3F0",
 "levels": [
  {
   "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_3_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB743649_CD10_9DA8_41BC_1310EBB8D7BF",
 "levels": [
  {
   "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_4_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB73964A_CD10_9DA8_41E2_7C74D2C91831",
 "levels": [
  {
   "url": "media/panorama_A826A2E4_B9C0_D117_41D6_8F3FBF0200B4_1_HS_5_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB5B8634_CD10_9DF8_41D4_BEB76788089F",
 "levels": [
  {
   "url": "media/panorama_A8CE7B7E_B9DF_57F3_41C3_4FD1922F7798_1_HS_13_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB71564D_CD10_9DA8_41D3_5A612BC059E9",
 "levels": [
  {
   "url": "media/panorama_A823AA73_B9C0_F1F1_41D7_5E37FBC80398_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_EF9C3E4E_CC35_452C_41E2_1EC59243AC71",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_EF9C2E4E_CC35_452C_41E5_C862D5C67EFF",
  "this.IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "layout": "absolute",
 "height": 140,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "header"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 70,
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "minHeight": 1,
 "verticalAlign": "middle",
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minWidth": 1,
 "itemLabelFontFamily": "Montserrat",
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "height": "100%",
 "itemBackgroundOpacity": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundOpacity": 0.05,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "itemMinHeight": 50,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_EF9C7E4F_CC35_452C_41E3_45DE682745B8_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "class": "ThumbnailGrid",
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "itemVerticalAlign": "top",
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "visible": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_EF9C2E4E_CC35_452C_41E5_C862D5C67EFF",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "minWidth": 1,
 "height": "100%",
 "width": "77.115%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.16vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.41vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483",
 "paddingRight": 0,
 "right": 20,
 "paddingLeft": 0,
 "borderSize": 0,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "minHeight": 50,
 "iconURL": "skin/IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483.jpg",
 "pressedRollOverIconURL": "skin/IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483_pressed_rollover.jpg",
 "class": "IconButton",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_EF9C6E4F_CC35_452C_41C9_F4595CDA7CA1, false, 0, null, null, false)",
 "height": "36.14%",
 "width": "100%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF9C1E4E_CC35_452C_41D5_34C5364F2483_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
