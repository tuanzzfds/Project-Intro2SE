const isAudioType = (type) => {
   if (type === 'audio/mpeg') {
      return true
   }
   else {
      return false
   }
}

module.exports = {
   isAudioType: isAudioType
}