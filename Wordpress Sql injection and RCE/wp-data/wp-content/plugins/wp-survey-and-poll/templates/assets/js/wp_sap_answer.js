setTimeout(function(){
jQuery( ".survey_global_percent" ).each(function( index ) {
console.log(jQuery(this).parent().parent().children("input").val());
	jQuery(this).css("width",parseInt(jQuery(this).parent().parent().children("input").val())+"%");
})
},2000);