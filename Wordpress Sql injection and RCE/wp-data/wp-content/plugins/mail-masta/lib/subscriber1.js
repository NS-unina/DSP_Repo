//alert("dfs");

//list_form_subscriber



var fl=1;


function myfunction(element,req,error){

	



	

	if(req==1 && element.value==''){

		//var text = document.createTextNode(error);

		//element.parentNode.insertBefore(text, element);

		jQuery(element).parent().children( ".req_error" ).html(error);	

		fl=1;	

	}

	else{

			jQuery(element).parent().children( ".req_error" ).html('');	

	}

}







jQuery(document).ready(function()

{
	
	
	alert("tert");
		
		
//var d = new Date();
 //   d.setTime(d.getTime() + (-1));
//        var expires = "expires="+d.toGMTString();

//document.cookie = 'alert' + "=" + 'no' + "; " + expires;
		jQuery('#clo').click(function() {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = 'alert' + "=" + 'no' + "; " + expires;
	} );
	


	jQuery('#list_form_subscriber .mm-row .mm-col-sm-4, .valij').prepend('<div class="req_error"></div>');

	jQuery('.admin-class .row .col-sm-4').prepend('<div class="req_error"></div>');

	

	jQuery('.form-style-2 .req_error').remove();

	jQuery('.form-style-2 .mm-row .mm-col-sm-4, .form-style-2 .valij').append('<div class="req_error"></div>');

	

	

	jQuery('#subscriber_email').blur(function(){

			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

		    var email_ch=pattern.test(jQuery('#subscriber_email').val());

			

			if(!(email_ch)){

				jQuery('#subscriber_email').parent().children( ".req_error" ).html('Invalid Email ID');

				fl=1;

			}

			else{

				jQuery('#subscriber_email').parent().children( ".req_error" ).html('');

			}

	});

	

	jQuery('#subscribe_campaign').click(function(){

		fl=0;

		jQuery('#list_form_subscriber input').blur();

		var email_id = jQuery('#subscriber_email').val();

			if(email_id==''){

				fl=1;

			}

	

		if(!jQuery("#tre").is(':checked')){

		

				jQuery('#tre').parent().children( ".req_error" ).html('Please except terms and condition');	

				fl=1;

		}	

		else{

				jQuery('#tre').parent().children( ".req_error" ).html('');		

			

		}

		

  		var status;

		if(fl==1){

			status=false;

		}

		else{

			status=true;

			

		}

	

      if (status)

      {

         var list_id = jQuery("#subscriber_list_id").val();



         var target_url = jQuery("#server_url").val();

		var rfrom='';

		rfrom=jQuery('#rfrom').val();

		

         jQuery("#sub_loading").show();

		

		

		if(jQuery('#subscribe_campaign').val()!='update'){

			var data = jQuery("#list_form_subscriber").serialize() + '&list_id=' + list_id + '&request_f='+rfrom;

			//	alert(data);

		}

		else{

			var member_list_id=jQuery('#member_list_id').val();

			var data = jQuery("#list_form_subscriber").serialize() + '&list_id=' + list_id + '&update=yes' + '&member_list_id=' + member_list_id;

		

		}

        

	

         jQuery.post(target_url+"/wp-content/plugins/mail-masta/inc/subscriber_list.php",data, function (resp){

			 
         if (jQuery.trim(resp) == '1') //subscribed successfully.

         {


			jQuery("#sub_loading").hide(); 

			if(jQuery('#substype').val()==1){

					if(jQuery('#subs').val()==''){

						jQuery("#sub_msg").show().html("Email was successfuly subscribed.");

					}

					else{

						jQuery("#sub_msg").show().html(jQuery('#subs').val());

					}

					

			}

			jQuery("#sub_msg").css("color","green");

			jQuery("#list_form_subscriber").trigger("reset");
			
			

			if(jQuery('#substype').val()==2){

					if(jQuery('#subs').val()==''){

						window.location.replace('#');

					}

					else{

						window.location.replace(jQuery('#subs').val()+'?page=subs');

					}

				

			}

			 

         }



		 else if (resp == 6) //subscribed successfully.

         {



		

			window.location.replace(target_url+"/wp-admin/admin.php?page=masta-lists&action=view_list&filter_list="+list_id);



         }



         else if(resp == 2){ // email is already exists.

				jQuery("#sub_loading").hide(); 

			    jQuery("#sub_msg").show().html("You have already subscribed.");

			    jQuery("#sub_msg").css("color","red");

	

		  } else //subscription failed. 

          {

         	jQuery("#sub_msg").show().html("Subscription Failed. Please Try Again !");

			jQuery("#sub_msg").css("color","red"); 



          }

         });

      

      }else

      {

      

         //alert(status);

         return false;

      }

      });





//alert js at top of all page



jQuery('#clo').on('click',function(){



		jQuery('.alert-warning').hide();



});





}) ;

