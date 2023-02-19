jQuery(document).ready(function() {
var survey = [];
var survey_options = [];
if ( sss_params.survey_options != undefined ) {
	survey = JSON.parse( sss_params.survey_options );
}
if ( survey.options != undefined ) {
	survey_options = JSON.parse( survey.options );
}
var	played_question=-1;
var rmdni = false;
var lastScrollTop = 0;
var played = 0;
if ( survey.align == undefined ) {
	survey.align = 'left';
}
if ( survey.width == undefined ) {
	survey.width = '98%';
}
if ( survey.style != 'flat' ) {
	jQuery( "body" ).prepend( '<div id="survey" style="position: fixed;' + survey.align + ':0px;z-index: 999999;width:' + survey.width + ';padding:1%;bottom:-300px;"></div>' );
}

	function detectmob() {
	   if( window.innerWidth <= 800 && window.innerHeight <= 600 ) {
		 return true;
	   } else {
		 return false;
	   }
	}

	if ( survey.style == 'click' ) {
		jQuery( "." + survey.survey_id ).click( function() {
			played_question = 0;
			if ( parseInt( survey_options[ 13 ] ) == 1 ) {
				jQuery("#bglock").fadeIn(1000);
			}
			play_survey();
		})
	}
	if ( parseInt( survey_options[ 13 ] ) == 1 && survey.style != 'flat' ) {
		if ( jQuery( "#bglock" ).length == 0 ) {
			jQuery( "body" ).append( "<div id='bglock'></div>" );
		}
		if ( ( survey.expired != 'true' ) && ( survey.style != 'click' ) && ( survey_options[ 15 ] != 1 ) ) {
			jQuery( "#bglock" ).fadeIn( 1000 );
		}
	}
	if ( survey_options[ 15 ] != 1 && survey.style == 'modal' ) {
		setTimeout( function() {
			played_question = 0;
			play_survey();
		}, 2000 );
	}

	if ( survey_options[ 15 ] != 1 && survey.style != 'modal' ) {
		setTimeout( function() {
			played_question = 0;
			play_survey();
		}, 0 );
	}

  ( function() {        
    var timer;
    jQuery( window ).bind( 'scroll', function () {
	if ( played == 0 ) {
		if ( survey.style == 'flat' && played_question == -1 && jQuery( '#survey' ).visible() ) {
			played_question = 0;
			play_survey();
		}
		else {
			if ( jQuery( window ).scrollTop() + jQuery( window ).height() > jQuery( document ).height() - ( ( jQuery( document ).height() / 100 ) * 10 ) && jQuery( this ).scrollTop() > lastScrollTop && played_question == -1 ) {
				if ( survey.style == 'modal' && survey_options[ 15 ] == 1 ) {
					if ( parseInt( survey_options[ 13 ] ) == 1 ) {
						jQuery("#bglock").fadeIn(1000);
					}
					played_question = 0;
					play_survey();
				}
			}
			parallaxScroll();
			clearTimeout( timer );
			if ( played_question >= 0 ) {
				timer = setTimeout( refresh, 150 );
			}
		}
	}
	});
    var refresh = function () {
	if ( played_question >= 0 ) {	
		if ( survey_options[ 0 ] == "bottom" ) {
			jQuery( '#survey' ).animate( { bottom: '10px'}, parseInt( survey_options[ 11 ] ), 'easeOutBounce', function() {} );
		}
		if ( survey_options[ 0 ] == "center" ) {
			jQuery( '#survey' ).animate( {top: ( ( jQuery( window ).height() - jQuery( '#survey' ).height() ) / 2 ) + "px" }, parseInt( survey_options[ 11 ] ), 'easeOutBounce', function() {} );
		}
		if ( survey_options[ 0 ] == "top" ) {
			jQuery( '#survey' ).animate( {top: '10px'}, parseInt( survey_options[ 11 ] ), 'easeOutBounce', function() {} );
		}
	}
    };
})();
 
 
   	function parallaxScroll() {
   		var scrolledY = jQuery(window).scrollTop();
		if (jQuery('#survey .survey_element').length) {
		if (survey_options[0]=="center") var pos = "top";
		else var pos = survey_options[0];
		if (scrolledY<lastScrollTop)
		{
		jQuery('#survey').css(pos,parseInt(jQuery('#survey').css(pos).replace("px",""))-parseInt(scrolledY/300)+'px');
		}
		else
		{
		jQuery('#survey').css(pos,parseInt(jQuery('#survey').css(pos).replace("px",""))+parseInt(scrolledY/300)+'px');
		}
		}
		lastScrollTop = jQuery(window).scrollTop();
   	}

 	jQuery("body").on( "click", ".survey_answers",function() {
			if (rmdni==false)
			{
			jQuery(this).append('<div id="survey_preloader" style="position:absolute;margin-top:-'+jQuery(this).height()+'px;margin-left:'+(jQuery(this).width()-20)+'px"><img width="20" src="'+survey.plugin_url+'/templates/assets/img/preloader.gif"></div>');
			var thissurvey = [];
			var qa = {};
			qa['sid'] = survey.survey_id;
			qa['qid'] = played_question+1;
			qa['aid'] = jQuery(this).attr("id").replace("survey_answer","");
			thissurvey.push(qa);
			rmdni = true;
			var data = {
				action: 'ajax_survey_answer',
				sspcmd: 'save',
				options: JSON.stringify(thissurvey)
				};
				jQuery.post(survey.admin_url, data, function(response) {
				if (response=="success"	) 
				{	
					jQuery("#survey_preloader").remove();
					//make animation
					played_question++;
					if (survey.style=='flat')
					{
					jQuery( "#survey" ).slideUp( parseInt(survey_options[11]), survey_options[1], function() {
					play_survey();
					// Animation complete.
					});
					}
					else
					{
					if (survey_options[0]=="bottom") {
					jQuery('#survey').animate({bottom: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){play_survey();})
					}
					if (survey_options[0]=="center") {
					if (survey.align=="left") jQuery('#survey').animate({left: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){play_survey();});
					else jQuery('#survey').animate({right: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){play_survey();});
					}
					if (survey_options[0]=="top") {
					jQuery('#survey').animate({top: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){play_survey();})
					}
					}
				}
				rmdni = false;
				});
				}
				else return true;
	})

	function play_survey()
	{
	if (played>0&&(survey.style=='click')) {survey.expired = "true";if (survey.message==undefined) survey.message = 'You already filled out this survey!';}
	if ((survey.expired=='true')&&(survey.style!='click')) return true;
	var survey_content = "";
	var remove_image = "";
	if (((survey.questions.length>0)||(survey.questions.length<played_question+1))||(survey.expired=='true'))
	{
	if (survey.style!='flat')
	{
	jQuery("#survey").css("top","");
	jQuery("#survey").css("bottom","");
	jQuery("#survey").css(survey.align,"0px");
	if (parseInt(survey_options[14])==1) {
		if (survey_options[0]=="top") remove_image = "<img id='close_survey' class='cl_top_survey' src='"+survey.plugin_url+"/templates/assets/img/remove.png' />";
		else remove_image = "<img id='close_survey' class='cl_survey' src='"+survey.plugin_url+"/templates/assets/img/remove.png' />";
	}
	}
	if ((survey.questions.length-1)>=played_question&&(survey.expired!='true'))
	{
	survey_content += '<div class="survey_table"><div class="survey_element survey_question">'+remove_image+''+survey.questions[played_question][0]+'</div>';
	var answers_number = survey.questions[played_question].length-1;
	var separator;
	var different = 0;
	if (answers_number<5||answers_number%4==0) var separator = 4;
	else if (answers_number%3==0) var separator = 3;
	else if (answers_number%4>0) {var separator = 4;different = answers_number%4;}
	else if (answers_number%3>0) {var separator = 3;different = answers_number%3;}
	var counter = 0;
	if (detectmob()==true) {separator = 1;differend = 0;}
	var cr = '<div id="wpsapcr"><a href="https://wordpress.org/plugins/wp-survey-and-poll">Powered by WP Survey and Poll</a></div>';
	for (key in survey.questions[played_question]) {
		if (key!=0)
		{
		  if ((key-1)==(answers_number-different)) {survey_content += '</div></div><div class="survey_table" style="margin-top:-10px;">';}
		  if (counter==separator||counter==0) {survey_content += '<div class="survey_element survey_row">';}
		  counter++;
				survey_content += '<div class="survey_element survey_answers" id="survey_answer'+(parseInt(key))+'">'+survey.questions[played_question][key]+'</div>';
		  if (counter==separator) {survey_content += '</div>';counter = 0;}
		}
	};
	if (different==1) survey_content += '</div>';
	}
	else {survey_content += '<div class="survey_table"><div class="survey_element survey_question">'+survey_options[12].replace(/[|]/gi,"'")+'</div></div>';}
	if (jQuery('#'+survey.survey_id+' #question_'+played_question+' .answer').length<3) survey_content += '</div>';
	jQuery("#survey").html(survey_content);
	//jQuery("#survey").append(cr);
	
	//make the style
	var bgs = survey_options[3].split(";");
	var i;
	for (i = 0; i < bgs.length-1; ++i) {
	jQuery("#survey .survey_element").css("background",jQuery.trim(bgs[i]));
	}
	jQuery("#survey .survey_element").css("color",survey_options[4]);
	jQuery("#survey .survey_element").css("border","solid "+survey_options[6]+"px "+survey_options[5]);
	jQuery("#survey .survey_element").css("padding",survey_options[9]+"px");
	jQuery("#survey .survey_element").css("font-size",survey_options[8]+"px");
	jQuery("#survey .survey_element").css("border-radius",survey_options[7]+"px");

	if (survey_options[2]!="")
	{
		if (!jQuery("link[href='http://fonts.googleapis.com/css?family="+survey_options[2]+"']").length) jQuery('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family='+survey_options[2].replace(' ','+').replace(' ','+').replace(' ','+')+':400,700" type="text/css" />');
		jQuery("#survey .survey_element").css("font-family","'"+survey_options[2]+"', serif");
    }
	//make animation
	if (survey.style=='flat')
	{
	jQuery( "#survey" ).slideDown( parseInt(survey_options[11]), survey_options[1], function() {
    // Animation complete.
	});
	}
	else
	{
	if (survey_options[0]=="bottom") {
	jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");
	jQuery('#survey').animate({bottom: '10px'}, parseInt(survey_options[11]), survey_options[1],function(){})
	}
	if (survey_options[0]=="center") {
	if (survey.align=="left")
	{
	jQuery("#survey").css("left","-5000px");
	jQuery("#survey").css("top",((jQuery(window).height()-jQuery('#survey').height())/2)+"px");
	jQuery('#survey').animate({left: "0px"}, parseInt(survey_options[11]), survey_options[1],function(){});
	}
	else
	{
	jQuery("#survey").css("right","-5000px");
	jQuery("#survey").css("top",((jQuery(window).height()-jQuery('#survey').height())/2)+"px");
	jQuery('#survey').animate({right: "0px"}, parseInt(survey_options[11]), survey_options[1],function(){});		
	}
	}
	if (survey_options[0]=="top") {
	jQuery("#survey").css("top","-"+parseInt(jQuery("#survey").height()+100)+"px");
	jQuery('#survey').animate({top: '10px'}, parseInt(survey_options[11]), survey_options[1],function(){})
	}
	}
	}
	if (((survey.questions.length-1)<played_question)||(survey.expired=='true'))
	{
	played++;
	if (survey.style=='click')
	{
		if (survey.expired=='true') jQuery(".survey_question").html(survey.message.replace(/[|]/gi,"'"));
	}
	if (jQuery("#survey .survey_question").html().indexOf("<a ")>=0)
	{
 	jQuery("body").on( "click", "#survey .survey_question a",function() {
			if (survey_options[0]=="bottom") 
	{
		jQuery('#survey').animate({bottom: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");})
	}
	if (survey_options[0]=="center") 
	{
	if (survey.align=="left")
	{
		jQuery('#survey').animate({left: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");});
	}
	else
	{
		jQuery('#survey').animate({left: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");});	
	}
	}
	if (survey_options[0]=="top") 
	{
		jQuery('#survey').animate({top: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");})
	}
	if (jQuery("#bglock").length>0&&jQuery("#bglock").css("display","block")&&parseInt(survey_options[13])==1) jQuery("#bglock").fadeOut(1000,function(){jQuery("#bglock").remove();});
	played_question = -1;
		})	
	}
	else
	{
		setTimeout(function(){
					if (survey.style=='flat')
					{
					jQuery( "#survey" ).slideUp( parseInt(survey_options[11]), survey_options[1], function() {
					// Animation complete.
					});
					}
					else
					{
						if (survey_options[0]=="bottom") 
						{
							jQuery('#survey').animate({bottom: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");})
						}
						if (survey_options[0]=="center") 
						{
							if (survey.align=="left")
							{
							jQuery('#survey').animate({left: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");});
							}
							else
							{
							jQuery('#survey').animate({right: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");});							
							}
						}
						if (survey_options[0]=="top") 
						{
							jQuery('#survey').animate({top: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){jQuery("#survey").css("bottom","-"+parseInt(jQuery("#survey").height()+100)+"px");jQuery("#survey").css("display","table");})
						}
						if ((jQuery("#bglock").length>0)&&(jQuery("#bglock").css("display")=="block")&&(parseInt(survey_options[13]))==1) jQuery("#bglock").fadeOut(1000,function(){jQuery("#bglock").remove();});
							played_question = -1;
					}
		},3000);	
	}
	}
	}

 	jQuery("body").on( "click", "#close_survey, #bglock",function() {
		if (parseInt(survey_options[14])==1)	
		{
		if (jQuery("#bglock").length>0&&(jQuery("#bglock").css("display")=="block")&&(parseInt(survey_options[13]))==1) jQuery("#bglock").fadeOut(1000,function(){jQuery("#bglock").remove();});
		if (survey_options[0]=="bottom") {
			jQuery('#survey').animate({bottom: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){})
		}
		if (survey_options[0]=="center") {
			if (survey.align=="left")
			{
			jQuery('#survey').animate({left: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){});
			}
			else
			{
			jQuery('#survey').animate({right: "-5000px"}, parseInt(survey_options[11]), survey_options[1],function(){});
			}
		}
		if (survey_options[0]=="top") {
			jQuery('#survey').animate({top: "-"+parseInt(jQuery("#survey").height()+100)+"px"}, parseInt(survey_options[11]), survey_options[1],function(){})
		}
		played_question = -1;
		}
	});
	
})