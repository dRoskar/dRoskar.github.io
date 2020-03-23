$(document).ready(function() {

    $("#junk_button").click(function(){
        window.location.href = "junk.html"
    });

    $("#myAge").html("\<span\>Age\<\/span\>" + getMyAge());
    $("#yearsOfExp").html(getMyYearsOfExperience());

});

function getMyAge() {
    var myBirthday = new Date(1991, 10, 24, 12);
    var ageDifference = Date.now() - myBirthday.getTime();
    var ageDate = new Date(ageDifference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getMyYearsOfExperience() {
    var myStart = new Date(2014, 6, 15);
    var expDiff = Date.now() - myStart.getTime();
    var expDiffDate = new Date(expDiff);
    return Math.abs(expDiffDate.getUTCFullYear() - 1970);
}