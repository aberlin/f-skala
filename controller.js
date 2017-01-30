$(document).ready(function () {

var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var numberOfOptions;
var options=new Array();

var score=0;


 		$.getJSON('activity.json', function(data) {
		for(i=0;i<data.quizlist.length;i++){
			questionBank[i]=new Array;
			questionBank[i][0]=data.quizlist[i].question;
		}
		 numberOfQuestions=questionBank.length;


		 for(i=0;i<data.answers.length;i++){
 		options[i]=new Array;
 			options[i][0]=data.answers[i].option;
 		}
 		 numberOfOptions=options.length;

		displayQuestion();
	})//got .json





function displayQuestion(){


$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]);

//generate the options
for(i=0;i<numberOfOptions;i++){
	$(stage).append('<div id="'+String(i)+'" class="option">'+options[i]+'</div>');

}
 $('.option').click(function(){
  if(questionLock==false){questionLock=true;
		score+=parseInt(this.id)
  //liberal answer
  if(parseInt(this.id)<2){
   $(stage).append('<div class="feedback1">NICE!</div>');


   }
  //authoritative  answer
  if(parseInt(this.id)>2){
   $(stage).append('<div class="feedback2">REALLY?!</div>');
  }
  setTimeout(function(){changeQuestion()},1000);
 }})
}//display question






	function changeQuestion(){

		questionNumber++;

	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}

	if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}

	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question




	function displayFinalSlide(){

		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>your scale is around '+String(Math.round(score/(numberOfQuestions*(numberOfOptions-1))*10))+' of  10'+'</div>');

	}//display final slide







	});
