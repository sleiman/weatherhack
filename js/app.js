// Parse
$.parse.init({
    app_id : "aOmfYWxfdaqrD9aMOtp7a3UinrfOAqNMyVxIjLzm", 
    rest_key : "AkHGq6xQCd67e8Tj9xcXY3PirvzZstur7DBaURuX" 
});


$('#info').hide();
$('#start').hide();
$('#done').hide();
$('#score').hide();


$('#start').click(function(){
	$('#logo').hide();
	$('#info').fadeIn();
	$('body').css('background', '#B9D2D7');
});



$.parse.get("QuestionAnswerKey", function(json) {
        
      data = json.results;
      console.log(data);

      i=0;
      $("#template-container").loadTemplate($("#template"+data[i].questionType),
      {
          location: data[i].city,
          question: data[i].question,
      });

     
      $( document ).on( "click", ".answer", function(e) {

          var temp = $('#temp').val();
  
          if (!temp){
            var answer = $(this).data('answer');
          } else {
            var answer = temp;
          }
          console.log('answer is',answer.toString());
          i++;
          if (jQuery.isEmptyObject(data[i])){
                 $('#template-container').hide();
                 $('#done').show();
                 
                } else {
           $("#template-container").loadTemplate($("#template"+data[i].questionType),
            {
                location: data[i].city,
                question: data[i].question,
            }); 
          }
         $.parse.post('Game',{ userAnswer : answer.toString(), username:localStorage['userID'], gameId:data[i].objectId.toString(), answerKey:data[i].objectId.toString(), eventDate:data[i].date}, function(json){
           console.log(json);
          });
        });

      }); // end parse get



 $( document ).on( "click", "#scores", function(e) {
$('#score').show();
$('#scores').hide();
$('#logo').hide();
$('#info').hide();
$('#start').hide();
$('#done').hide();
$('body').css('background', '#B9D2D7');

$.parse.get("Score", {order : "-cumulativeScore"}, function(json) {
        
      data = json.results;
      console.log(data);
      b=0;
      $.each(data, function() {
            console.log(data[b]);

            $( "#score-container" ).append( "<li id='sections-container'>"+data[b].firstname+" : "+Math.round(data[b].cumulativeScore)+"</li>" );
            b++; 
            });      



      });

  });

