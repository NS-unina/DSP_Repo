jQuery(window).load(function() {
	jQuery("#wpbody-content .wrap").css("visibility","visible");
	jQuery("#screen_preloader").fadeOut("slow",function(){jQuery(this).remove();});
	var rmdni = false;
	var lastScrollTop = 0;
	var surveysystem = jQuery.noConflict();
	var buttonspan_global = "";
	var active_survey;
	var played_question = 0;
	surveysystem(function() {
	surveysystem("#wp_sap_tabs").tabs();
	surveysystem('.open-tab').click(function (event) {
		surveysystem( "#wp_sap_tabs" ).tabs( "option", "active", 0 );
    });
	surveysystem("#survey_name").focus();
	 surveysystem(function() {
    surveysystem( "#wp_sap_accordion" ).accordion({
      collapsible: true,
	  heightStyle: "content"
    });
  });
	surveysystem( '.copytext' ).click( function() {
		surveysystem( this ).select();
	});
	initialize_sliders();
  (function() {        
    var timer;
    surveysystem(window).bind('scroll',function () {
   		parallaxScroll();
        clearTimeout(timer);
        if (played_question>0) {timer = setTimeout( refresh , 150 );}
    });
    var refresh = function () {
	if (played_question>0) 
	{	
		if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") surveysystem('#survey').animate({bottom: '10px'}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), 'easeOutBounce',function(){})
		if (surveysystem('#'+active_survey+' .display_style').val()=="center") surveysystem('#survey').animate({top: ((surveysystem(window).height()-surveysystem('#survey').height())/2)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), 'easeOutBounce',function(){})
		if (surveysystem('#'+active_survey+' .display_style').val()=="top") surveysystem('#survey').animate({top: '10px'}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), 'easeOutBounce',function(){})
	}
    };
})();
 
 
   	function parallaxScroll(){
   		var scrolledY = surveysystem(window).scrollTop();
		if (surveysystem('#survey .survey_element').length) {
		if (surveysystem('#'+active_survey+' .display_style').val()=="center") var pos = "top";
		else var pos = surveysystem('#'+active_survey+' .display_style').val();
		if (scrolledY<lastScrollTop)
		{
		surveysystem('#survey').css(pos,parseInt(surveysystem('#survey').css(pos).replace("px",""))-parseInt(scrolledY*0.03)+'px');
		}
		else
		{
		surveysystem('#survey').css(pos,parseInt(surveysystem('#survey').css(pos).replace("px",""))+parseInt(scrolledY*0.03)+'px');
		}
		}
		lastScrollTop = surveysystem(window).scrollTop();
   	}

	function toHex(n) 
	{
		n = parseInt(n,10);
		if (isNaN(n)) return "00";
		n = Math.max(0,Math.min(n,255));
		return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
	}

	function rgbToHex(RGB) 
	{ 
		var rgb_colors = RGB.replace("rgb(","").replace(")","").split(",");
		return "#"+toHex(rgb_colors[0])+toHex(rgb_colors[1])+toHex(rgb_colors[2]);
	}
	
	function initialize_sliders()
	{
	initialize_tooltips();
	surveysystem("#wp_sap_accordion .wp_sap_line_height").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	initialize_question_accordions(survey_id);
	jQuery('#'+survey_id+' .datepicker').datetimepicker({
			dateFormat: 'dd-mm-yy',
			minDate: getFormattedDate(new Date()),
			showAnim: 'slide'
		});
	create_graph(survey_id,1);
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_line_height_value" ).val().replace("Line Height: ","").replace("px","");
	  	//initialize the line-height property slider
			surveysystem( "#"+survey_id+" .wp_sap_line_height" ).slider({
			range: "min",
			value: thisvalue,
			min: 0,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_line_height_value" ).val( "Line Height: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("line-height",ui.value + "px");
			}
			});
	})
	
	surveysystem("#wp_sap_accordion .wp_sap_font_size").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_font_size_value" ).val().replace("Font Size: ","").replace("px","");
	  	//initialize the font-size property slider
			surveysystem( "#"+survey_id+" .wp_sap_font_size" ).slider({
			range: "min",
			value: thisvalue,
			min: 6,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_font_size_value" ).val( "Font Size: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("font-size",ui.value + "px");
			}
			});
	})
	
	surveysystem("#wp_sap_accordion .wp_sap_padding").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_padding_value" ).val().replace("Padding: ","").replace("px","");
	  	//initialize the padding property slider
			surveysystem( "#"+survey_id+" .wp_sap_padding" ).slider({
			range: "min",
			value: thisvalue,
			min: 0,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_padding_value" ).val( "Padding: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("padding",ui.value + "px");
			}
			});
	})

	surveysystem("#wp_sap_accordion .wp_sap_border_width").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_border_width_value" ).val().replace("Border Width: ","").replace("px","");
	  	//initialize the border-width property slider
			surveysystem( "#"+survey_id+" .wp_sap_border_width" ).slider({
			range: "min",
			value: thisvalue,
			min: 0,
			max: 20,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_border_width_value" ).val( "Border Width: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("border",ui.value+"px solid "+surveysystem("#"+survey_id+" .wp_sap_preview1003").css("background-color"));
			}
			});
	})

	surveysystem("#wp_sap_accordion .wp_sap_border_radius").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_border_radius_value" ).val().replace("Border Radius: ","").replace("px","");
	  	//initialize the border-radius property slider
			surveysystem( "#"+survey_id+" .wp_sap_border_radius" ).slider({
			range: "min",
			value: thisvalue,
			min: 0,
			max: 100,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_border_radius_value" ).val( "Border Radius: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("border-radius",ui.value+"px "+ui.value+"px "+ui.value+"px "+ui.value+"px");
				surveysystem("#survey .survey_answers").css("border-radius",ui.value+"px "+ui.value+"px "+ui.value+"px "+ui.value+"px");
			}
	})
	})

	surveysystem("#wp_sap_accordion .wp_sap_animation_speed").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	var thisvalue = surveysystem( "#"+survey_id+" .wp_sap_animation_speed_value" ).val().replace("Animation Speed: ","").replace("sec","");
	  	//initialize the animation speed property slider
			surveysystem( "#"+survey_id+" .wp_sap_animation_speed" ).slider({
			range: "min",
			step: 0.1,
			value: thisvalue,
			min: 0.1,
			max: 5,
			slide: function( event, ui ) {
			jQuery( "#"+survey_id+" .wp_sap_animation_speed_value" ).val( "Animation Speed: "+ui.value + "sec" );
			}
			});
	})

	surveysystem("#wp_sap_accordion .wp_sap_preview1001").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().attr("id");
	var colors = surveysystem(this).children().children("input.bgcolor").val().split(')",');
	var ecolors = colors[0].split(';');
	var rcolors = parseRGB(ecolors[0]);
	var rpercent = parsePercentage(ecolors[0]);
	var key;
	var ctype;
	var cdir;
	if (ecolors[0].indexOf("circle")>=0) {
	ctype="circle";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];	
	}
	if (ecolors[0].indexOf("ellipse")>=0) {
	ctype="ellipse";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];
	}
	if (ecolors[0].indexOf("linear")>=0) {
	ctype="linear";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];
	}
	if (cdir==undefined) cdir = 'center , circle cover';
	var gradxcolors = [];
	for (key in rcolors) {
    if (arrayHasOwnIndex(rcolors, key)) {
	var gradxparams = {};
			gradxparams.color = rgbToHex(rcolors[key]);
			if (arrayHasOwnIndex(rpercent, key)) gradxparams.position = rpercent[key].replace("%","");
			else gradxparams.position = '0';
			gradxcolors.push(gradxparams);
		}
	}
	surveysystem("#ms_preview_inner"+survey_id).click(function() {
	surveysystem("#gradX").css("display","block");
            gradX("#gradX", {
                targets: ["#survey .survey_element","#"+survey_id+" .inner"],
				type: ctype,
				direction: cdir.replace(" , circle cover","").replace(" , ellipse cover",""),
				sliders: gradxcolors
            });
		})
	surveysystem("#survey .survey_row").css('background', '');
	})
	surveysystem("#wp_sap_accordion .wp_sap_preview1002").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
		surveysystem("#"+survey_id+" .wp_sap_preview1002").spectrum({
                move: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1002").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('color', rgba);
                },
                change: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1002").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('color', rgba);
                },
                showAlpha: true,
                color: surveysystem(this).css("background-color"),
                clickoutFiresChange: true,
                showInput: true,
                showButtons: true
            });	
	})
	surveysystem("#wp_sap_accordion .wp_sap_preview1003").each(function( index ) {
	var survey_id = surveysystem(this).parent().parent().parent().attr("id");
	surveysystem("#"+survey_id+" .wp_sap_preview1003").spectrum({
                move: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1003").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('border-color', rgba);
                },
                change: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1003").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('border-color', rgba);
                },
                showAlpha: true,
                color: surveysystem(this).css("background-color"),
                clickoutFiresChange: true,
                showInput: true,
                showButtons: true
            });	
	})
			//bind event to change font family
		surveysystem(".font_family").on("change", function(){
			if (surveysystem(this).val()=="") surveysystem("#survey").css("font-family","");
			else
			{
				if (!surveysystem("link[href='http://fonts.googleapis.com/css?family="+surveysystem(this).val()+"']").length) surveysystem('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family='+surveysystem(this).val()+'" type="text/css" />');
				if (surveysystem("#survey").length!=0) surveysystem("#survey").css("font-family",surveysystem(this).val()+", serif");
			}
		});

	}

	function parseRGB ( string ) {
    var rgbRegex = /(rgb\([^)]*\))/gi;
    var rgbArray = string.match(rgbRegex); 

    return rgbArray;
	}

	function parsePercentage ( string ) {
    var prcRegex = /[0-9]*\.?[0-9]+%/gi;
    var prcArray = string.match(prcRegex); 

    return prcArray;
	}

	
	function arrayHasOwnIndex(array, prop) {
		if (array!=null) return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
	}	

 	surveysystem("body").on( "click", "#close_survey, #bglock",function() {
		if (surveysystem("#bglock").length>0&&(surveysystem("#bglock").css("display")=="block")&&surveysystem('#'+active_survey+' .lock_bg').val()==1) surveysystem("#bglock").fadeOut(1000,function(){surveysystem("#bglock").remove();});
		if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") {
			surveysystem('#survey').animate({bottom: "-"+parseInt(surveysystem("#survey").height()+1000)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem('#survey').css("display","none");})
		}
		if (surveysystem('#'+active_survey+' .display_style').val()=="center") {
			surveysystem('#survey').animate({left: "-5000px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem('#survey').css("display","none");});
		}
		if (surveysystem('#'+active_survey+' .display_style').val()=="top") {
			surveysystem('#survey').animate({top: "-"+parseInt(surveysystem("#survey").height()+1000)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem('#survey').css("display","none");})
		}
		played_question = 0;
	});
	
 	surveysystem("body").on( "click", ".survey_answers",function() {
	//make animation
	played_question++;
	if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") surveysystem('#survey').animate({bottom: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){play_survey();})
	if (surveysystem('#'+active_survey+' .display_style').val()=="center") {
	surveysystem('#survey').animate({left: "-5000px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){play_survey();});
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="top") surveysystem('#survey').animate({top: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){play_survey();})
	})

	function play_survey()
	{
	var survey_content = "";
	var remove_image = "";
	surveysystem('#survey').css("display","block");
	if ((surveysystem("#"+active_survey+" #question_"+played_question).length>0)||((surveysystem("#"+active_survey+" #new_questions .one_question").length)<played_question+1))
	{
	surveysystem("#survey").css("top","");
	surveysystem("#survey").css("bottom","");
	surveysystem("#survey").css("left","0px");
		if (surveysystem('#'+active_survey+' .display_style').val()=="top") remove_image = "<img id='close_survey' class='cl_top_survey' src='"+sspa_params.plugin_url+"/templates/assets/img/remove.png' />";
		else remove_image = "<img id='close_survey' class='cl_survey' src='"+sspa_params.plugin_url+"/templates/assets/img/remove.png' />";
	if (surveysystem("#"+active_survey+" #new_questions .one_question").length>=played_question)
	{
	survey_content += '<div class="survey_table"><div class="survey_element survey_question">'+remove_image+''+surveysystem("#"+active_survey+" #question_"+played_question+" .question_text").val()+'</div>';
	var answers_number = surveysystem('#'+active_survey+' #question_'+played_question+' .answer').length;
	var separator;
	var different = 0;
	if (answers_number<5||answers_number%4==0) var separator = 4;
	else if (answers_number%3==0) var separator = 3;
	else if (answers_number%4>0) {var separator = 4;different = answers_number%4;}
	else if (answers_number%3>0) {var separator = 3;different = answers_number%3;}
	var counter = 0;
	  surveysystem('#'+active_survey+' #question_'+played_question+' .answer').each(function( index ) {
	  if (index==(answers_number-different)) {survey_content += '</div></div><div class="survey_table" style="margin-top:-10px;">';}
	  if (counter==separator||counter==0) {survey_content += '<div class="survey_element survey_row">';}
	  counter++;
			survey_content += '<div class="survey_element survey_answers" id="survey_answer'+(index+1)+'">'+surveysystem(this).val()+'</div>';
	  if (counter==separator) {survey_content += '</div>';counter = 0;}
	});
	if (different==1) survey_content += '</div>';
	}
	else {survey_content += '<div class="survey_table"><div class="survey_element survey_question">'+surveysystem('#'+active_survey+' .text .thankyou').val()+'</div></div>';}
	if (surveysystem('#'+active_survey+' #question_'+played_question+' .answer').length<3) survey_content += '</div>';
	surveysystem("#survey").html(survey_content);
	
	//make the style
	var bgs = surveysystem('#'+active_survey+' .bgcolor').val().split(";");
	var i;
	for (i = 0; i < bgs.length-1; ++i) {
	surveysystem("#survey .survey_element").css("background",surveysystem.trim(bgs[i]));
	}
	surveysystem("#survey .survey_element").css("color",surveysystem('#'+active_survey+' .wp_sap_preview1002').css("background"));
	surveysystem("#survey .survey_element").css("border","solid "+surveysystem('#'+active_survey+' .wp_sap_border_width_value').val().replace("Border Width: ","")+" "+rgbToHex(surveysystem('#'+active_survey+' .wp_sap_preview1003').css("background-color")));
	surveysystem("#survey .survey_element").css("padding",surveysystem('#'+active_survey+' .wp_sap_padding_value').val().replace("Padding: ",""));
	surveysystem("#survey .survey_element").css("font-size",surveysystem('#'+active_survey+' .wp_sap_font_size_value').val().replace("Font Size: ",""));
	surveysystem("#survey .survey_element").css("border-radius",surveysystem('#'+active_survey+' .wp_sap_border_radius_value').val().replace("Border Radius: ",""));
	surveysystem("#survey .survey_element").css("line-height",surveysystem('#'+active_survey+' .wp_sap_line_height_value').val().replace("Line Height: ",""));

	if (surveysystem('#'+active_survey+' .font_family').val()!="")
	{
		if (!surveysystem("link[href='http://fonts.googleapis.com/css?family="+surveysystem('#'+active_survey+' .font_family').val()+"']").length) surveysystem('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family='+surveysystem('#'+active_survey+' .font_family').val()+'" type="text/css" />');
		surveysystem("#survey .survey_element").css("font-family",surveysystem('#'+active_survey+' .font_family').val()+", serif");
    }
	surveysystem("#survey .survey_row").css('background', '');
	//make animation
	if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") {
	surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");
	surveysystem('#survey').animate({bottom: '10px'}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){})
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="center") {
	surveysystem("#survey").css("left","-5000px");
	surveysystem("#survey").css("top",((surveysystem(window).height()-surveysystem('#survey').height())/2)+"px");
	surveysystem('#survey').animate({left: "0px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){});
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="top") {
	surveysystem("#survey").css("top","-"+parseInt(surveysystem("#survey").height()+100)+"px");
	surveysystem('#survey').animate({top: '10px'}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){})
	}
	}
	if (surveysystem("#"+active_survey+" #new_questions .one_question").length<played_question)
	{
	if (surveysystem("#survey .survey_question").html().indexOf("<a ")>=0)
	{
 	surveysystem("body").on( "click", "#survey .survey_question a",function() {
			if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") 
	{
		surveysystem('#survey').animate({bottom: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");})
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="center") 
	{
		surveysystem('#survey').animate({left: "-5000px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");});
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="top") 
	{
		surveysystem('#survey').animate({top: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");})
	}
	if (surveysystem("#bglock").length>0&&surveysystem("#bglock").css("display","block")&&surveysystem('#'+active_survey+' .lock_bg').val()==1) surveysystem("#bglock").fadeOut(1000,function(){surveysystem("#bglock").remove();});
		})	
	}
	else
	{
		setTimeout(function(){
		
	if (surveysystem('#'+active_survey+' .display_style').val()=="bottom") 
	{
		surveysystem('#survey').animate({bottom: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");})
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="center") 
	{
		surveysystem('#survey').animate({left: "-5000px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");});
	}
	if (surveysystem('#'+active_survey+' .display_style').val()=="top") 
	{
		surveysystem('#survey').animate({top: "-"+parseInt(surveysystem("#survey").height()+100)+"px"}, parseInt(surveysystem('#'+active_survey+' .wp_sap_animation_speed_value').val().replace("Animation Speed: ","").replace("sec","")*1000), surveysystem('#'+active_survey+' .animation_easing').val(),function(){surveysystem("#survey").css("bottom","-"+parseInt(surveysystem("#survey").height()+100)+"px");surveysystem("#survey").css("display","table");})
	}
	if (surveysystem("#bglock").length>0&&(surveysystem("#bglock").css("display")=="block")&&surveysystem('#'+active_survey+' .lock_bg').val()==1) surveysystem("#bglock").fadeOut(1000,function(){surveysystem("#bglock").remove();});
		},3000);	
	}
		played_question = 0;
	}
	}
	
	surveysystem("body").on( "click", ".play_button",function() {
	var s_id = surveysystem(this).parent().parent().attr("id");
	active_survey = s_id;
	played_question=1;
	if (surveysystem("#"+active_survey+" .lock_bg").val()==1) 
	{
		if (surveysystem("#bglock").length==0) surveysystem("body").append("<div id='bglock'></div>");
		surveysystem("#bglock").fadeIn(1000);
	}
	play_survey();
	})
	
function add_survey()
{
		var error = "0";
		var survey_id = Math.abs(surveysystem("#survey_name").val().split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));
		if (surveysystem("#survey_name").val()=="") error = "The survey name can't be empty!";
		if (surveysystem("#"+survey_id).length>0) error = "This survey name is already exist";
		if (error=="0")
		{
		surveysystem("#new_survey_content div:first").attr("id",survey_id);
		surveysystem("#new_survey_content").find("span").attr("id","answers_"+survey_id);
		surveysystem("#error_log").text("");
		surveysystem("#new_survey_content").children("h3").text(surveysystem("#survey_name").val());
		surveysystem(".accordion_survey_header").attr("class","header_"+survey_id);
		surveysystem("#wp_sap_accordion").prepend(surveysystem("#new_survey_content").html());
		surveysystem("#new_survey_content .header_"+survey_id).attr("class","accordion_survey_header");
		surveysystem( "#wp_sap_accordion" ).accordion("refresh" );
		surveysystem("#new_survey_content>div").attr("id","");
		surveysystem( "#wp_sap_accordion" ).accordion({ active: 0 });
		surveysystem("#"+survey_id+" .question_text").attr("id","question_"+survey_id);
		surveysystem("#"+survey_id+" .question_text").val(surveysystem("#survey_name").val());
		surveysystem("#"+survey_id).prepend('<div class="shortcode_section" style="float:right;font-size: 12px;">Shortcode: [survey id='+survey_id+']</div>');
		surveysystem("#new_survey_content").find("span").attr("id","");
		surveysystem("#survey_name").val("");
		surveysystem("#"+survey_id+" .right_half").html('<canvas id="wp_sap_pro_graph_'+survey_id+'_1" class="canvas_graph" height="250" width="250"></canvas>');
		surveysystem("#"+survey_id+" .right_half").attr('id','chart1');
		surveysystem("#"+survey_id+" .wp_sap_preview1001").attr('id','ms_preview_inner'+survey_id);
        surveysystem('#'+survey_id+' .answer_count').each(function( index ) {
			surveysystem(this).attr("id","answer_count"+(index+1));
		surveysystem("#"+survey_id+" .datepicker").datetimepicker({
			dateFormat: 'dd-mm-yy',
			minDate: getFormattedDate(new Date()),
			showAnim: 'slide'
		});
		});
		create_graph(survey_id,'1');
	    initialize_question_accordions(survey_id);
		initialize_tooltips();
		//initialize the line-height property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_line_height" ).slider({
			range: "min",
			value: 12,
			min: 0,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_line_height_value" ).val( "Line Height: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("line-height",ui.value + "px");
			}
			});
		});

	  	//initialize the font-size property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_font_size" ).slider({
			range: "min",
			value: 12,
			min: 6,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_font_size_value" ).val( "Font Size: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("font-size",ui.value + "px");
			}
			});
		});

	  	//initialize the padding property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_padding" ).slider({
			range: "min",
			value: 10,
			min: 0,
			max: 40,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_padding_value" ).val( "Padding: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("padding",ui.value + "px");
			}
			});
		});

	  	//initialize the border-width property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_border_width" ).slider({
			range: "min",
			value: 1,
			min: 0,
			max: 20,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_border_width_value" ).val( "Border Width: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("border",ui.value+"px solid "+surveysystem("#"+survey_id+" .wp_sap_preview1003").css("background-color"));
			}
			});
		});

	  	//initialize the border-radius property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_border_radius" ).slider({
			range: "min",
			value: 5,
			min: 0,
			max: 100,
			slide: function( event, ui ) {
				surveysystem( "#"+survey_id+" .wp_sap_border_radius_value" ).val( "Border Radius: "+ui.value + "px" );
				surveysystem("#survey .survey_element").css("border-radius",ui.value+"px "+ui.value+"px "+ui.value+"px "+ui.value+"px");
			}
			});
		});

	  	//initialize the animation speed property slider
		surveysystem(function() {
			surveysystem( "#"+survey_id+" .wp_sap_animation_speed" ).slider({
			range: "min",
			step: 0.1,
			value: 0.5,
			min: 0.1,
			max: 5,
			slide: function( event, ui ) {
			jQuery( "#"+survey_id+" .wp_sap_animation_speed_value" ).val( "Animation Speed: "+ui.value + "sec" );
			}
			});
		});

		//bind event to change font family
		surveysystem(".font_family").on("change", function(){
			if (surveysystem(this).val()=="") surveysystem("#survey").css("font-family","");
			else
			{
				if (!surveysystem("link[href='http://fonts.googleapis.com/css?family="+surveysystem(this).val()+"']").length) surveysystem('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family='+surveysystem(this).val()+'" type="text/css" />');
				if (surveysystem("#survey").length!=0) surveysystem("#survey, .survey_element").css("font-family",surveysystem(this).val()+", serif");
			}
		});
		
	surveysystem("#ms_preview_inner"+survey_id).click(function() {
	//surveysystem("body").on( "click", "#ms_preview_inner"+survey_id,function() {
	var survey_id = surveysystem(this).parent().parent().attr("id");
	var colors = surveysystem("#"+survey_id+" input.bgcolor").val().split(')",');
	var ecolors = colors[0].split(';');
	var rcolors = parseRGB(ecolors[0]);
	var rpercent = parsePercentage(ecolors[0]);
	var key;
	var ctype;
	var cdir;
	if (ecolors[0].indexOf("circle")>=0) {
	ctype="circle";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];	
	}
	if (ecolors[0].indexOf("ellipse")>=0) {
	ctype="ellipse";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];
	}
	if (ecolors[0].indexOf("linear")>=0) {
	ctype="linear";
	var cutcolor = ecolors[0].split("(");
	var cutc = cutcolor[1].split(" , rgb");
	cdir = cutc[0];
	}
	var gradxcolors = [];
	for (key in rcolors) {
    if (arrayHasOwnIndex(rcolors, key)) {
	var gradxparams = {};
			gradxparams.color = rgbToHex(rcolors[key]);
			if (arrayHasOwnIndex(rpercent, key)) gradxparams.position = rpercent[key].replace("%","");
			else gradxparams.position = '0';
			gradxcolors.push(gradxparams);
		}
	}
	surveysystem("#gradX").css("display","block");
            gradX("#gradX", {
                targets: ["#survey .survey_element","#"+survey_id+" .inner"],
				type: ctype,
				direction: cdir.replace(" , circle cover","").replace(" , ellipse cover",""),
				sliders: gradxcolors
            });
		})

	surveysystem("#"+survey_id+" .wp_sap_preview1002").spectrum({
                move: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1002").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('color', rgba);
                },
                change: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1002").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('color', rgba);
                },
                showAlpha: true,
                color: "#FFFFFF",
                clickoutFiresChange: true,
                showInput: true,
                showButtons: true

            });	
	
	surveysystem("#"+survey_id+" .wp_sap_preview1003").spectrum({
                move: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1003").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('border-color', rgba);
                },
                change: function(color) {
					var rgba = color.toRgbString();
					surveysystem("#"+survey_id+" .wp_sap_preview1003").css('background-color', rgba);
					surveysystem("#survey .survey_element").css('border-color', rgba);
                },
                showAlpha: true,
                color: "#FFFFFF",
                clickoutFiresChange: true,
                showInput: true,
                showButtons: true

            });	

	  }
		else surveysystem("#error_log").text(error);
}
function initialize_question_accordions(survey_id)
{
	surveysystem( "#"+survey_id+" #new_questions" ).accordion({
      collapsible: true,
	  heightStyle: "content",
	  header: "> div > h3",
	  beforeActivate: function( event, ui ) {
		if (surveysystem(ui.newHeader).attr("id")!=undefined) {
			var canvas = document.getElementById("wp_sap_pro_graph_"+survey_id+'_'+(parseInt(surveysystem(ui.newHeader).attr("id").replace("ui-accordion-new_questions-header-",""))+1));
		}
	  },
	  activate: function( event, ui ) {
		if (surveysystem(ui.newHeader).attr("id")!=undefined) {
			var canvas = document.getElementById("wp_sap_pro_graph_"+survey_id+'_'+(parseInt(surveysystem(ui.newHeader).attr("id").replace("ui-accordion-new_questions-header-",""))+1));
			create_graph(survey_id,(parseInt(surveysystem(ui.newHeader).attr("id").replace("ui-accordion-new_questions-header-",""))+1));
		}
	  }
    }).sortable({
        axis: "y",
        handle: "h3",
        stop: function( event, ui ) {
          ui.item.children( "h3" ).triggerHandler( "focusout" );
		  var survey_id = ui.item.parent().parent().attr("id");
		  surveysystem("#"+survey_id+" #new_questions h3").each(function( index ) {
			surveysystem(this).html('<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>'+(index+1)+'. question');
		  })
        }
      });
};
	surveysystem( "#survey_name" ).keypress(function( event ) {
	if ( event.which == 13 ) {
	event.preventDefault();
	add_survey();
	}
	});
  
  	surveysystem('#add_new_survey').click(function (event) {
	add_survey();
	});
	});
  	surveysystem("body").on( "click", ".add_answer",function() {
	var answer_area = surveysystem(this).parent().parent().attr("id");
	var question_num = surveysystem(this).parent().parent().parent().attr("id").replace("question_","");
	var answer_num = surveysystem("#"+answer_area.replace("answers_","")+" #question_"+question_num+" .answer").length+1;
	surveysystem("#"+answer_area.replace("answers_","")+" #question_"+question_num).append('<p class="added_answers" id="answer_element_'+answer_area.replace("answers_","")+'_'+answer_num+'"><span>'+answer_num+'.</span> answer: <input type="text" id="answer'+answer_num+'" name="answer[]" class="answer" value="" /><span id="answer_count'+answer_num+'" class="answer_count">0 - 0%</span><a class="remove_answer" id="remove_'+answer_area+'_'+answer_num+'"><img class="wp_sap_tooltip" title="Remove Answer" src="'+sspa_params.plugin_url+'/templates/assets/img/delete.png"></a></p>');
	create_graph(answer_area.replace("answers_",""),question_num);
	initialize_tooltips();
	surveysystem("#answer_element_"+answer_area.replace("answers_","")+"_"+answer_num+" input").focus();
	});
  	surveysystem("body").on( "click", ".add_question",function() {
		var answer_area = surveysystem(this).parent().parent().attr("id");
		var question_num = (surveysystem("#"+answer_area+" .question_text").length+1);
		surveysystem("#"+answer_area+" #new_questions").append('<div class="group"><h3>'+question_num+'. question<span class="question-subheader"></span></h3><div class="one_question" id="question_section'+question_num+'"><div class="left_half"><div id="question_'+question_num+'" class="questions_block"><p>Question:&nbsp; <textarea name="question[]" id="question'+question_num+'" style="width: 75%;" class="question_text"></textarea><a class="add_question"><img class="remove_question modal_survey_tooltip" title="Remove Question" id="remove_question_'+answer_area+'_'+question_num+'" src="'+sspa_params.plugin_url+'/templates/assets/img/delete.png"></a></p><span><p>1. answer: <input type="text" name="answer[]" class="answer" id="answer1" style="width: 50%;" value="Yes" placeholder="Yes" /><span id="answer_count1" class="answer_count">0 - 0%</span></p><p>2. answer: <input type="text" name="answer[]" class="answer" id="answer2" style="width: 50%;" value="No" placeholder="No" /><span id="answer_count2" class="answer_count">0 - 0%</span><a class="add_answer"><img class="modal_survey_tooltip" title="Add New Answer" src="'+sspa_params.plugin_url+'/templates/assets/img/add.png"></a></p></span></div></div><div id="chart'+question_num+'" class="right_half"></div></div>');
		surveysystem("#"+answer_area+" #chart"+question_num).html('<canvas id="modal_survey_pro_graph_'+answer_area+'_'+question_num+'" class="canvas_graph" height="250" width="250"></canvas>');
		surveysystem("#"+answer_area+" .left_half "+"#question_"+question_num+">span").attr("id","answers_"+answer_area);
		create_graph(answer_area,question_num,"true");
		surveysystem( "#"+answer_area+" #new_questions" ).accordion("refresh" );
		surveysystem( "#"+answer_area+" #new_questions" ).accordion({ active: question_num-1 });
		var demo_questions = ["Was this information helpful?","Do you like this website?","Did you find this website easily?","Did you find this website through Search Engine?","Did you already bookmark this website?","Do you like this survey?","Do you visit this website first time?","Are you employed?"];
		initialize_tooltips();
		var random_question = Math.floor( Math.random() * demo_questions.length );
		surveysystem("#"+answer_area+" #question"+question_num).val( demo_questions[ random_question ] );
		surveysystem( "#question_section" + question_num ).parent().find( "h3" ).children( ".question-subheader" ).html( demo_questions[ random_question ] );
		surveysystem("#"+answer_area+" #question"+question_num).select();
	});
  	surveysystem("body").on( "click", ".remove_answer",function() {
	var remove_id = surveysystem(this).attr("id");
	var survey_id = remove_id.split("_");
	var question_id = surveysystem(this).parent().parent().attr("id").replace("question_","");
	surveysystem("#"+survey_id[2]+" #question_"+question_id+" #answer_element_"+remove_id.replace("remove_answers_","")).remove();
	surveysystem( "#"+survey_id[2]+" #question_"+question_id+" .added_answers" ).each(function( index ) {
	surveysystem(this).children("span:first").text(index+3+'.');
	});
	create_graph(survey_id[2],question_id)
	});
  	surveysystem("body").on( "click", ".remove_question",function() {
	var remove_id = surveysystem(this).attr("id");
	var survey_id = remove_id.split("_");
	surveysystem(this).parent().parent().parent().parent().parent().parent().fadeOut('slow',
	function(){
	surveysystem(this).remove();
	surveysystem( "#"+survey_id[2]+" h3" ).each(function( index ) {
	surveysystem(this).text((index+1)+" .question");
	});
	
	});
	});
	
 	surveysystem( "body" ).on( "keyup", ".question_text", function() {
		var thisq = surveysystem( this ).attr( "id" ).replace( "question", "" );
		surveysystem( "#question_section" + thisq ).parent().find( "h3" ).children( ".question-subheader" ).html( surveysystem( this ).val().replace(/(<([^>]+)>)/ig,"") );
	});
	surveysystem("body").on( "click", ".global_survey, .lock_bg, .closeable, .atbottom",function() {
		if (surveysystem(this).val()==0) {surveysystem(this).val("1");surveysystem(this).attr("checked","checked");}
		else {surveysystem(this).val("0");surveysystem(this).removeAttr("checked","");}
	})
		
 	surveysystem("body").on( "click", "#gradx_close",function() {
	surveysystem("#gradX").css("display","none");
	})
	
	function getFormattedDate(date) {
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear().toString().slice(2);
		return day + '-' + month + '-' + year;
	}
	
 	surveysystem("body").on( "click", ".save_survey",function() {
		if (rmdni==false)
			{
			var survey_id = surveysystem(this).parent().parent().parent().attr("id");
			var buttonspan = surveysystem(this).parent();
			var error = false;
			var checker;
			var answers_array = [];
			surveysystem("#"+survey_id+" .survey_error_span").html('');
				surveysystem( "#answers_"+survey_id+" .answer" ).each(function( index ) {
				if ((index==0||index==1)&&(surveysystem(this).val()=="")) {error = true;surveysystem("#"+survey_id+" .survey_error_span").html('<span style="margin-left: 5px; font-size: 12px;line-height:25px;">Missing answers!</span>');}
					answers_array[index] = surveysystem(this).val();
				});
			var options = [surveysystem("#"+survey_id+" .display_style").val(),surveysystem("#"+survey_id+" .animation_easing").val(),surveysystem("#"+survey_id+" .font_family").val(),surveysystem("#"+survey_id+" .bgcolor").val(),surveysystem("#"+survey_id+" .wp_sap_preview1002").css("background-color"),surveysystem("#"+survey_id+" .wp_sap_preview1003").css("background-color"),surveysystem("#"+survey_id+" .wp_sap_border_width_value").val().replace("Border Width: ","").replace("px",""),surveysystem("#"+survey_id+" .wp_sap_border_radius_value").val().replace("Border Radius: ","").replace("px",""),surveysystem("#"+survey_id+" .wp_sap_font_size_value").val().replace("Font Size: ","").replace("px",""),surveysystem("#"+survey_id+" .wp_sap_padding_value").val().replace("Padding: ","").replace("px",""),surveysystem("#"+survey_id+" .wp_sap_line_height_value").val().replace("Line Height: ","").replace("px",""),(surveysystem("#"+survey_id+" .wp_sap_animation_speed_value").val().replace("Animation Speed: ","").replace("sec",""))*1000,surveysystem("#"+survey_id+" .thankyou input").val(),surveysystem("#"+survey_id+" .lock_bg").val(),surveysystem("#"+survey_id+" .closeable").val(),surveysystem("#"+survey_id+" .atbottom").val()];
			if (error==false)
			{
			rmdni = true;
		surveysystem(buttonspan).html('<img width="20" style="margin-left:50px;" src="'+sspa_params.plugin_url+'/templates/assets/img/preloader.gif">');
		var thissurvey = [];
		surveysystem( "#"+survey_id+" .question_text" ).each(function( index ) {
			var qa = {};
			qa[0] = surveysystem(this).val();
			var thisquestion = surveysystem( this ).parent().parent().attr("id");
		surveysystem( "#"+survey_id+" #"+thisquestion+" p input.answer" ).each(function( index2 ) {
		var thiscount = surveysystem("#"+survey_id+" #"+thisquestion+" p span#answer_count"+(index2+1)).text().split(" - ");
			qa[(index2+1)] = surveysystem(this).val()+'->'+thiscount[0];
		})
					thissurvey.push(qa);
		})

			var data = {
				action: 'ajax_wpspsurvey',
				sspcmd: 'save',
				survey_id: survey_id,
				survey_name: surveysystem(".header_"+survey_id).text(),
				start_time: surveysystem("#"+survey_id+" .start_time").val(),
				expiry_time: surveysystem("#"+survey_id+" .expiry_time").val(),
				global_use: surveysystem("#"+survey_id+" .global_survey").val(),
				options: JSON.stringify( options ),
				qa: JSON.stringify( thissurvey )
				};
				checker = setTimeout(function(){if (surveysystem(buttonspan).html()!='<input type="submit" name="save_survey" class="save_survey button" value="SAVE">'||surveysystem(buttonspan).html()!='<input type="submit" name="save_survey" class="save_survey button" value="UPDATE">')
			{
			surveysystem(buttonspan).html('<input type="submit" name="save_survey" class="save_survey button" value="TRY AGAIN"><span style="margin-left: 35px;line-height:25px;color: #FC0303;">Error during the save process</span>')
			}
			},15000);
				surveysystem.post(sspa_params.admin_url, data, function(response) {
				if (response=="success"||response=="updated") 
				{
				clearTimeout(checker);
				if (response=="success") var buttontext = "SAVE";
				else var buttontext = "UPDATE";
				surveysystem(buttonspan).html('<span style="margin-left: 35px;line-height:25px;"><strong>'+buttontext+'D</strong></span>');
				setTimeout(function(){surveysystem(buttonspan).html('<input type="submit" name="save_survey" class="save_survey button" value="'+buttontext+'">')},2000);
				}
					rmdni = false;
				});
			
			};
			}
		});
    surveysystem( "#dialog-confirm" ).dialog({
      resizable: false,
      height:220,
	  autoOpen: false,
      modal: true,
      buttons: {
        "Delete Survey": function() {
		remove_survey();
          surveysystem( this ).dialog( "close" );
        },
        Cancel: function() {
          surveysystem( this ).dialog( "close" );
        }
      }
    });
 	
    surveysystem( "#dialog-confirm2" ).dialog({
      resizable: false,
      height:220,
	  autoOpen: false,
      modal: true,
      buttons: {
        "Reset Survey": function() {
		reset_survey();
          surveysystem( this ).dialog( "close" );
        },
        Cancel: function() {
          surveysystem( this ).dialog( "close" );
        }
      }
    });
 	
   surveysystem( "#dialog-confirm3" ).dialog({
      resizable: false,
      height:300,
	  width:400,
	  autoOpen: false,
      modal: true,
      buttons: {
        Cancel: function() {
          surveysystem( this ).dialog( "close" );
        },
        "Purchase Now": function() {
		window.open(
		  'http://codecanyon.net/item/modal-survey-wordpress-poll-survey-quiz-plugin/6533863?ref=pantherius',
		  '_blank'
		);
        }
      }
    });
   surveysystem( "#dialog-confirm4" ).dialog({
      resizable: false,
      height:300,
	  width:400,
	  autoOpen: false,
      modal: true,
      buttons: {
        Cancel: function() {
          surveysystem( this ).dialog( "close" );
        },
        "Purchase Now": function() {
		window.open(
		  'http://codecanyon.net/item/modal-survey-wordpress-poll-survey-quiz-plugin/6533863?ref=pantherius',
		  '_blank'
		);
        }
      }
    });
	surveysystem("body").on( "click", ".delete_survey",function() {
		buttonspan_global = surveysystem(this).parent();
		surveysystem( "#dialog-confirm" ).dialog( "open" );
	})

	surveysystem("body").on( "click", ".reset_survey",function() {
		buttonspan_global = surveysystem(this).parent();
		surveysystem( "#dialog-confirm2" ).dialog( "open" );
	})

function reset_survey() {
		var survey_id = surveysystem(buttonspan_global).parent().parent().attr("id");
		var parent = surveysystem("#"+survey_id);
		surveysystem("#"+survey_id+" .answer_count").text("0 - 0%");
		var head = parent.prev('h3');
					rmdni = true;
			var data = {
				action: 'ajax_wpspsurvey',
				sspcmd: 'reset',
				survey_id: survey_id
				};
				surveysystem.post(sspa_params.admin_url, data, function(response) {
					rmdni = false;
				});
}
	
	
function remove_survey() {
		var survey_id = surveysystem(buttonspan_global).parent().parent().attr("id");
		var parent = surveysystem("#"+survey_id);
		var head = parent.prev('h3');
					rmdni = true;
			var data = {
				action: 'ajax_wpspsurvey',
				sspcmd: 'delete',
				survey_id: survey_id
				};
				surveysystem.post(sspa_params.admin_url, data, function(response) {
					rmdni = false;
				});

		parent.add(head).fadeOut('slow',function(){
		surveysystem(this).remove();
		surveysystem('html, body').animate({scrollTop: "0px"}, 1000, 'easeOutCirc',function(){surveysystem("#survey_name").focus();});
		});
}
	
function create_graph(survey_id,question_id)
{
					var options = {
					tooltips: {
						fontSize: '75.4%'
					}
				};
	element = [];
	var answer_counter = 0;
		surveysystem( "#"+survey_id+" #question_"+question_id+" .answer" ).each(function( index ) {
		var thisid = surveysystem(this).attr("id").replace("answer","");
		var thisval = surveysystem("#"+survey_id+" #question_"+question_id+" #answer_count"+thisid).text().split("-");
		answer_counter += parseInt(thisval[1].replace("%","").trim());
	})

	surveysystem( "#"+survey_id+" #question_"+question_id+" .answer" ).each(function( index ) {
	var parameters = {};
	if (answer_counter==0) parameters.value = 100/surveysystem( "#"+survey_id+" #question_"+question_id+" .answer" ).length;
	else
	{
		var thisid = surveysystem(this).attr("id").replace("answer","");
		var thisval = surveysystem("#"+survey_id+" #question_"+question_id+" #answer_count"+thisid).text().split("-");
		parameters.value = parseInt(thisval[1].replace("%","").trim());
	}
	parameters.color = get_random_color();
	parameters.label = index+1;
	parameters.labelColor = "rgb(0,0,0)";
	parameters.labelFontSize = "175%";
	parameters.labelAlign = "center";
	element.push(parameters);
	})
	if (document.getElementById("wp_sap_pro_graph_"+survey_id+'_'+question_id)!=undefined)
	{
					var myChart = new Chart(document.getElementById("wp_sap_pro_graph_"+survey_id+'_'+question_id).getContext("2d"), options);
					var myPie = myChart.Pie(element, {
						animationEasing: 'easeOutBounce'
					});
	}		
			
	}		
	
		function initialize_tooltips()
	{
		surveysystem(".wp_sap_tooltip").tooltip({
			  content: function () {
				  return jQuery(this).prop('title');
			  },
			show: { effect: "drop", duration: 300 },
			hide: { effect: "drop", duration: 100 },
			});	
	}

	function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
});
