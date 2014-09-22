var labelSide = "right";
var slider1Val=$('#slider-input').val();
var slider2Val=$('#slider-input2').val();

$('#slider-input').change( function() {
    var val = $(this).val();
    var valRounded = Math.round( val * 10 ) / 10;
    var mid = $(this).attr('max')/2;
  
    $('#slider-label').text( valRounded );
  
    if(val > mid && labelSide == "right") {
        labelSide = "left";
        $('#slider-label').removeClass("isRight").addClass("isLeft");
    
    } else if(val <= mid && labelSide == "left") {
        labelSide = "right";
        $('#slider-label').removeClass("isLeft").addClass("isRight");
    }
    
    slider1Val = val;
});


$('#slider-input2').change( function() {
    var val = $(this).val();
    var valRounded = Math.round( val * 10 ) / 10;
    var mid = $(this).attr('max')/2;
  
    $('#slider-labe2').text( valRounded );
  
    if(val > mid && labelSide == "right") {
        labelSide = "left";
        $('#slider-label').removeClass("isRight").addClass("isLeft");
    
    } else if(val <= mid && labelSide == "left") {
        labelSide = "right";
        $('#slider-label').removeClass("isLeft").addClass("isRight");
    }
    
    slider2Val = val;
});
