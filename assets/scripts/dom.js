$(document). ready(() => {

    var Enter = $("#enter");
    var Jumbo = $("#jumbo");
    var Row1  = $("#row_1");
    var Row2  = $("#row_2");
    var Row3  = $("#row_3");
    var Row4  = $("#row_4");
    var Row5  = $("#row_5");

    Row3.hide();
    Row4.hide();
    Row5.hide();

    Enter.on('click', () => {
    Jumbo.hide();
    Row1.hide();
    Row2.hide();
    Row3.show();
    Row4.show();
    Row5.show();
})

});