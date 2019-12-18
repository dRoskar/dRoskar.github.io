$(document).ready(function() {

$("#junk_button").click(function(){
    window.location.href = "junk.html"
});

$("#myAge").html("\<span\>Age\<\/span\>" + getMyAge());

});


function getMyAge() {
    var myBirthday = new Date(1991, 11, 24, 12);
    var ageDifference = Date.now() - myBirthday.getTime();
    var ageDate = new Date(ageDifference);
    // return Math.abs(ageDate.getUTCFullYear() - 1970);
    return 28;
}