var subtitleCleaner = function() {

    // public methods
    return {
        cleanSubtitle: function(subtitleString) {
            return subtitleString;
        },

        highlightSubtitle: function(subtitleString) {
            return '<font color="red">'
            + subtitleString
            + '</font>';
        }
    }
}();