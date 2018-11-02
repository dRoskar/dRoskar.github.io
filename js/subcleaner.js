$(document).ready(function() {
    $("#file-upload").change(readFile)
    
});


function readFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    if (!file) {
        return;
    }

    reader.readAsText(file)

    reader.onerror = errorHandler;
    reader.onload = fileLoaded;
}

function fileLoaded(e) {
    var fileString = e.target.result;
    console.log(fileString);
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      console.error("The file could not be read");
    }
  }