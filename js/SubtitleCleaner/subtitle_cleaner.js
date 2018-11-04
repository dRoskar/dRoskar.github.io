var subtitleCleaner = function() {

    var removeLinePattern = /(^<?[iub]?>? *-? *(<?[iub]?>? *[\(\[|][\w ]+[\)\]|] *<?\/?[iub]?>?) *<?\/?[iub]?>?$)/igm
    var removeCCPattern = /(^<?[iub]?>? *-? *(<?[iub]?>? *[\(\[|][\w ]+[\)\]|] *<?\/?[iub]?>? *)[\S]* *<?\/?[iub]?>?$)/igm

    // public methods
    return {
        cleanSubtitle: function(subtitleString) {
           // run for whole line remover
           subtitleString = subtitleString.replace(removeLinePattern,
            "");

            /// run for CC remover
            subtitleString = subtitleString.replace(removeCCPattern, function(match, p1, p2){
                return p1.replace(p2, "");
            });

            return subtitleString;
        },

        highlightSubtitle: function(subtitleString) {

            // run for whole line remover
            subtitleString = subtitleString.replace(removeLinePattern,
            '<strong><font color="red">$1</font></strong>');

            /// run for CC remover
            subtitleString = subtitleString.replace(removeCCPattern, function(match, p1, p2){
                return p1.replace(p2, '<strong><font color="red">' + p2 + '</font></strong>');
            });

            return subtitleString;
        }
    }
}();