document.querySelector("#chooseFile").onchange = function () {
  // fire the upload here
  let chosenFile = document.querySelector("#chooseFile").value;
  let fileName = document.querySelector("#fileName").value;
  let list = chosenFile.split("\\");
  let names = list[list.length - 1].split(".");
  let name = "";
  for (let i = 0; i < names.length - 1; ++i) {
    if (i == 0) {
      name += names[i];
    } else {
      name += "." + names[i];
    }
  }
  document.querySelector("#fileName").value = name;
};

function uploadForm() {}
document.querySelector("#uploadForm").addEventListener("submit", uploadForm);
