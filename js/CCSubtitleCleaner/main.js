var fileName = "subtitles.srt";
var fileType = "application/x-subrip;charset=utf-8";

$(document).ready(function() {
    $("#file-upload").change(readFile)

    $('#file-input-button').click(function(){
        $('#file-upload').click();
    });

    $("#image-slider").twentytwenty();
});

function readFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    if (!file) {
        return;
    }

    fileName = file.name;

    if(!file.name.endsWith(".srt") && !file.name.endsWith(".txt")){
        console.error("Invalid file type!");
        return;
    }

    if(fileName.endsWith(".txt")) {
        fileType = "text/plain;charset=utf-8";
    }

    reader.readAsText(file)

    reader.onerror = errorHandler;
    reader.onload = fileLoaded;
}

function fileLoaded(e) {
    // clean
    var cleanedSubs = subtitleCleaner.cleanSubtitle(e.target.result);
    var highlightedSubs = subtitleCleaner.highlightSubtitle(e.target.result);

    // create blob
    var blob = new Blob([cleanedSubs], {
        type: fileType
    });

    //display preview
    $("#preview").html(highlightedSubs);
    if($("#preview-div").is(":hidden")){
        $("#preview-div").slideToggle(600);
    }

    var url = URL.createObjectURL(blob);
    $("#download-link").attr("download", fileName);
    $("#download-link").attr("href", url);

    if($("#file-download-button").hasClass("disabled")) {
        $("#file-download-button").removeClass("disabled")
        $("#file-download-button").click(function() {
            if(!$("#file-download-button").hasClass("disabled")) {
                document.getElementById("download-link").click();
            }
        });
    }
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      console.error("The file could not be read");
    }
  }