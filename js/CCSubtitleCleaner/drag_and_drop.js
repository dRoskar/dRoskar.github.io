var dragAndDropHandler = function () {

    var timeoutVariable = undefined;

    // private methods
    var removeDragData = function (event) {
        if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
        } else {
            event.dataTransfer.clearData();
        }
    };

    var removeDragOverStyle = function () {
        $("#drop-box").removeClass("drag-over");

        timeoutVariable = undefined;
    }

    // public methods
    return {
        handleDrop: function (event) {
            var file;
            event.preventDefault();

            $("#drop-box").removeClass("drag-over");

            if (event.dataTransfer.items) {
                if (event.dataTransfer.items[0].kind === 'file') {
                    file = event.dataTransfer.items[0].getAsFile();
                }
            } else {
                for (var i = 0; i < event.dataTransfer.files.length; i++) {
                    file = event.dataTransfer.files[0];
                }
            }

            if (typeof (dragAndDropHandler.fileProcessor) === 'function') {
                dragAndDropHandler.fileProcessor(file);
            } else {
                if (typeof (dragAndDropHandler.fileProcessor) === 'undefined') {
                    console.error("Please configure a file processor function for dragAndDropHandler");
                } else {
                    console.error("fileProcessor needs to be a function");
                }
            }

            removeDragData(event)
        },

        handleDragOver: function (event) {
            event.preventDefault();

            if (!$("#drop-box").hasClass("drag-over")) {
                $("#drop-box").addClass("drag-over");
            }

            if(timeoutVariable !== undefined) {
                clearTimeout(timeoutVariable);
            }
            timeoutVariable = setTimeout(removeDragOverStyle, 100);
        },

        fileProcessor: undefined
    }
}();