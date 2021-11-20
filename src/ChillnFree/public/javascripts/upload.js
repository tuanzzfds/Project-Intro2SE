const jsmediatags = window.jsmediatags;
const picture_cover = document.querySelector("#picture-cover")
const fileInput = document.querySelector("#chooseFile")

const getMediaTagsFromAudioFile = (input, fields = ["album", "artist", "genre", "picture", "title", "track", "year"]) => {
   return new Promise(async (resolve, reject) => {
      await new jsmediatags.Reader(input)
         // .setTagsToRead(fields)
         .read(
            {
               onSuccess: (metadata) => {
                  console.log(metadata);
                  mediaTags = metadata.tags;
                  resolve(metadata.tags)
               },
               onError: (error) => {
                  console.log(':(', error.type, error.info)
                  reject(error)
               }
            }
         );
   })
}

const arrayBufferToBase64 = (buffer) => {
   var binary = '';
   var bytes = new Uint8Array(buffer);
   var len = bytes.byteLength;
   for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
   }
   return window.btoa(binary);

}
picture_cover.reset = () => {
   picture_cover.src = ''
   picture_cover.classList.add('d-none')
}

fileInput.onchange = async (event) => {
   const file = document.querySelector("#chooseFile").files[0];
   //get tags from file
   if (!file || file.length === 0) {
      document.querySelector('#uploadForm').reset() //reset form fields   
      picture_cover.reset() //reset picture cover
      return
   }
   getMediaTagsFromAudioFile(file).then((mediaTags) => {
      //add base64String to picture cover front src and show it
      const base64String = arrayBufferToBase64(mediaTags.picture.data)
      picture_cover.src = `data:${mediaTags.picture.format};base64,${base64String}`
      picture_cover.classList.remove("d-none");
      document.querySelector('#image').value = `data:${mediaTags.picture.format};base64,${base64String}`

      //add title to title field in form
      document.querySelector('#title').value = mediaTags.title
      
      //add artist to title field in form
      document.querySelector('#artist').value = mediaTags.artist
   }).catch(error => console(error));
};

function uploadForm() { }
document.querySelector("#uploadForm").addEventListener("submit", uploadForm);
