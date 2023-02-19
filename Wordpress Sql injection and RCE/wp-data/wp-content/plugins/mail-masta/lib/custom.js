jQuery(document).ready(function(){
	
	jQuery(".select_sty").selectbox();	
	var add_new_field_form_index=1;
	jQuery("#add_new_field").live("click",function(){
          //alert("dsgdsgd");
         		add_new_field_form_index++;
		jQuery(this).parent().before(jQuery("#add_new_field_form").clone().attr("id","add_new_field_form" + add_new_field_form_index));
		jQuery("#add_new_field_form" + add_new_field_form_index).css("display","inline");
		jQuery("#add_new_field_form" + add_new_field_form_index + " :input").each(function(){
			jQuery(this).attr("name",jQuery(this).attr("name") + add_new_field_form_index);
			jQuery(this).attr("id",jQuery(this).attr("id") + add_new_field_form_index);
			//jQuery("#list_input_type"+add_new_field_form_index).selectbox();
			});
			jQuery("#remove_field" + add_new_field_form_index).click(function(){
			jQuery(this).closest(".none").remove();
			
		});
                
               $("#ttl_count").val(add_new_field_form_index);  
	}); 
});


function createfiled(Id,Value)
{
	var tempval = $("#cnt_"+Id).val();
	//alert(tempval);
  if((Value == 'radio' || Value == 'checkbox' )){
	  
	  if(Value == 'radio') {
		  
		 var icn_cls = '<i class="fa fa-circle-o"></i>'; 
		 var icn_bld_cls = '<span id="radio_'+Id+'" class="fa fa-dot-circle-o"></span>'; 
		 
		} else {
		
		 var icn_cls = '<i class="fa fa-square-o"></i>';
		 var icn_bld_cls = '<span id="checkbox_'+Id+'" class="fa fa-check-square-o"></span>'; 	
		
		}
	  
	  if(tempval == ''){
$("#"+Id).after("<div id='"+Id+"_div' class='custome_filed'><div class='inline_field'>"+icn_bld_cls+"<input type='text' name='"+Id+"_option1' id='"+Id+"_option1' class='form-control'></div><div class='inline_field'>"+icn_cls+"<input type='text' name='"+Id+"_option2' id='"+Id+"_option2' class='form-control'></div><div class='inline_field'>"+icn_cls+"<input type='text' name='"+Id+"_option3' id='"+Id+"_option3' class='form-control'></div><input type='hidden' name='"+Id+"_cnt' id='"+Id+"_cnt' value='4'><div id='"+Id+"_expanddiv'><span class='fa fa-plus fa-2x' onclick='expnd(this.id)' id='"+Id+"aaexp' style='color:green'></span><span class='fa fa-minus fa-2x' onclick='collaps(this.id)' id='"+Id+"aaclp' style='float:right;display:none;color:red;'></span></div></div>");
		   $("#cnt_"+Id).val("5");
	  } else {
		  
			if(Value == 'radio'){
			
			//alert("radio_"+Id);
			jQuery("#checkbox_"+Id).removeClass("fa-check-square-o");
			jQuery("#checkbox_"+Id).addClass("fa-dot-circle-o");
			jQuery("#checkbox_"+Id).attr("id","radio_"+Id);
			
			jQuery("#"+Id+"_div").find("i").each(function(){
				var currentElement = jQuery(this);
				jQuery(currentElement).removeClass("fa fa-square-o");
				jQuery(currentElement).addClass("fa fa-circle-o");
				
			});
			
		} else {
			
			//alert("radio_"+Id);
			jQuery("#radio_"+Id).removeClass("fa-dot-circle-o");
			jQuery("#radio_"+Id).addClass("fa-check-square-o");
			jQuery("#radio_"+Id).attr("id","checkbox_"+Id);
			
			jQuery("#"+Id+"_div").find("i").each(function(){
			  var currentElement = jQuery(this);
				jQuery(currentElement).removeClass("fa fa-circle-o");
				jQuery(currentElement).addClass("fa fa-square-o");	
							
			});
			
		}
	  }  
	  
	} else  {
		
		 $("#cnt_"+Id).val("");
	   $("#"+Id+"_div").remove();	
	}
	
}

function expnd(icn) {
	
	
	if(icn != ''){
	  
	 var brkvar = icn.split("aa");
	 var action = brkvar[1];
	 var mainid = brkvar[0]; 
	// alert("#"+mainid+"aaclp");
	 jQuery("#"+mainid+"aaclp").show();
	 var selectval = jQuery("#"+mainid).val();
	 var field_count = jQuery("#"+mainid+"_cnt").val();
	 
	 
	 if(field_count < 11) {
		  
		  if(selectval == 'radio') {
				var icn_cls = '<i class="fa fa-circle-o"></i>'; 
			} else {
				var icn_cls = '<i class="fa fa-square-o"></i>';
			}
			
	jQuery("#"+mainid+"_expanddiv").before("<div class='inline_field' id='"+mainid+"_fielddiv"+field_count+"'>"+icn_cls+"<input type='text' name='"+mainid+"_option"+field_count+"' id='"+mainid+"_option"+field_count+"' class='form-control'></div>");
		 jQuery("#"+mainid+"_cnt").val(++field_count);
      }	 else {
			//alert("your reach max limit");
	  }
	}
}

function collaps(icn) {
	
	
	if(icn != ''){
	
		 var brkvar = icn.split("aa");
		 var action = brkvar[1];
		 var mainid = brkvar[0]; 
		 var selectval = jQuery("#"+mainid).val();
		 
		 var field_count = jQuery("#"+mainid+"_cnt").val();
		 
		 if(field_count > 4 ) {
		 
			// alert("before"+field_count);
			 var newval = --field_count;
			 jQuery("#"+mainid+"_cnt").val(newval);
			 jQuery("#"+mainid+"_fielddiv"+newval).hide("slow",function(){ jQuery(this).remove();});
		     if(newval == 4) {
				 jQuery("#"+icn).hide();
				}
		 
		} else {
			  
				jQuery("#"+icn).hide();
		}
	}
}
