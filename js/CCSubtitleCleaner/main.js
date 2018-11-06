var fileName = "subtitles.srt";
var fileType = "application/x-subrip;charset=utf-8";

$(document).ready(function () {
    $("#file-upload").change(getFile)

    $('#file-input-button').click(function () {
        $('#file-upload').click();
    });

    $("#image-slider").twentytwenty();

    $("#drop-box").get(0).ondrop = dragAndDropHandler.handleDrop;
    $("#drop-zone").get(0).ondragover = dragAndDropHandler.handleDragOver;

    dragAndDropHandler.fileProcessor = readFile;
});

function getFile(event) {
    var file = event.target.files[0];
    readFile(file);
}

function readFile(file) {
    var reader = new FileReader();

    if (!file) {
        return;
    }

    fileName = file.name;

    if (!file.name.endsWith(".srt") && !file.name.endsWith(".txt")) {
        console.error("Invalid file type!");
        return;
    }

    if (fileName.endsWith(".txt")) {
        fileType = "text/plain;charset=utf-8";
    }

    reader.readAsText(file)

    reader.onerror = errorHandler;
    reader.onload = fileLoaded;
}

function fileLoaded(event) {
    // clean
    var cleanedSubs = subtitleCleaner.cleanSubtitle(event.target.result);
    var highlightedSubs = subtitleCleaner.highlightSubtitle(event.target.result);

    // create blob
    var blob = new Blob([cleanedSubs], {
        type: fileType
    });

    //display preview
    $("#preview").html(highlightedSubs);
    if ($("#preview-div").is(":hidden")) {
        $("#preview-div").slideToggle(600);
    }

    var url = URL.createObjectURL(blob);
    $("#download-link").attr("download", fileName);
    $("#download-link").attr("href", url);

    if ($("#file-download-button").hasClass("disabled")) {
        $("#file-download-button").removeClass("disabled")
        $("#file-download-button").click(function () {
            if (!$("#file-download-button").hasClass("disabled")) {
                document.getElementById("download-link").click();
            }
        });
    }
}

function errorHandler(event) {
    if (event.target.error.name == "NotReadableError") {
        console.error("The file could not be read");
    }
}