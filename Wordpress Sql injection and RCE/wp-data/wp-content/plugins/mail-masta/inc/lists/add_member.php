
                <?php

                  $list_id = $_GET['filter_list'];

                //echo $list_id;

                 global $wpdb;

              

              $masta_list = $wpdb->prefix . "masta_list";

             // echo $list_id;

              $list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list WHERE list_id = $list_id ");

            ?>

           

            <legend> <span><b> <a class="mm_title_name" href="<?php echo admin_url(); ?>/admin.php?page=masta-lists&action=view_list&filter_list=<?php echo $list_id; ?>"> <?php echo $list_form_data[0]->list_name; ?></a></b></span> <small>Add members</small> </legend>

                    <div class="panel-body">

                        <div class="container mm_form_style">

           

           

            <?php

              //echo count($list_form_data);

              if(count($list_form_data) > 0) {

               

                    $return_head = '<form method="POST" name="list_form_subscriber" class="admin-class form-horizontal" id="list_form_subscriber" onsubmit="return false">

                  <div style="display:none;font-size: 18px;margin-bottom: 15px;margin-top: 10px;" id="sub_msg"></div>

                                            <div class="form-group mm-row">

                                                <label class="control-label col-sm-2">Email:</label> </label>

                                                <div class="col-sm-4 mm-col-sm-4">

                                                <input type="text" class="validate[required,custom[email]] form-control" id="subscriber_email" name="subscriber_email" Placeholder="email@email.com"> </div>

                                            </div>

                                    ';

                    $return_footer = '<input type="hidden" name="subscriber_list_id" id="subscriber_list_id" value="'.$list_id.'">

                                            <div class="row">

                                                <div class="col-sm-4 col-sm-offset-2">

                                                    <input type="submit" id="subscribe_campaign" name="subscribe_campaign" class="btn btn-success" value="Subscribe">

                                                </div>

                                            </div>

                                            <div id="sub_loading" style="display:none"><img src="'.plugins_url().'/mail-masta/lib/css/images/loading.gif" height="32" width="32"></div>

                                          <input type="hidden" name="server_url" id="server_url" value="'.SUBPATH.'">

                                        </form>';

                    $return_data = '';

                    $row = $list_form_data[0];

                    //print_r($row);

                    $list_form = $row->list_form;

                    $validation = $row->validation;

                    $edit_form = $row->edit_form;

                   

                 

                       

                        $docode_data = json_decode($list_form,true);

                        $decode_validation=json_decode($validation,true);

                        $decode_edit=json_decode($edit_form,true);

                        $ij=0;

                        foreach($decode_edit as $key=>$val){

                            $deed[$ij++]=$key;   

                        }

                           

                        if(is_array($docode_data) && !empty($docode_data)) {

                            $cnt = 1;

                            $ij=0;

                            foreach($docode_data as $key=>$val)://main foreach start here

                              $return_data .= '<div class="form-group mm-row"><label class="control-label col-sm-2">'.$deed[$ij++].':</label>';

                              if(!is_array($val)) {

                                  $vs="'".$decode_validation[$key]['form_req_message']."'";

                                 $return_data .= '<div class="col-sm-4 mm-col-sm-4"><input type="text" class="form-control" id="'.mmasta_add_underscore($key).$cnt.'" onblur="myfunction(this,'.$decode_validation[$key]['form_req'].','.$vs.')"   name="'.mmasta_add_underscore($key).'"> </div></div>';

                                } else {

                                   

                                     $return_data .= '<div class="col-sm-4">';

                                    $field_array = $val;

                                    $filed_type = array_shift( ( array_keys( $field_array ) ) );

                                    if($filed_type == 'radio') { //if type is radio then generate radio buttons.

                                        $label_array = $field_array[$filed_type];

                                        if(is_array($label_array)){

                                             $ccnt = 1;

                                             foreach($label_array as $value):

                                                  

                                                   $return_data .= '&nbsp;&nbsp;'.$value.'<input type="radio" name="'.mmasta_add_underscore($key).'" value="'.$value.'">';

                                                  $ccnt++;

                                                endforeach;

                                        }

                                   

                                    } elseif($filed_type == 'checkbox') { //if type is checkbox then generate chekboxes.

                                        $label_array = $field_array[$filed_type];

                                        if(is_array($label_array)){

                                              $ccnt = 1;

                                             foreach($label_array as $value):

                                                  

                                                   $return_data .= '&nbsp;&nbsp;'.$value.'<input type="checkbox" name="'.mmasta_add_underscore($key).'[]" value="'.$value.'">';

                                                  $ccnt++;

                                                endforeach;

                                        }    

                                       

                                    }

                                    $return_data .= '</div>';

                                     

                                }

                               

                             $cnt++;

                            endforeach;//main foreach end here

                                }

                                        $return_data .='<input type="hidden" id="rfrom" name="rfrom" value="byadmin" >';

                                       

                                        $return_data .= '<div class="row" style="display:none"><div class="col-sm-2 valij"><input type="checkbox" name="ter" checked id="tre"><label>'.$row->terms_message.'</label></div></div>';

                            $return_data .='<input type="hidden" id="subs" name="subs" value="" >';

                            $return_data .='<input type="hidden" id="substype" name="substype" value="1" >';

                   

                   

                    $main_return = $return_head.$return_data.$return_footer;

               

                   

                } else {

                  echo 'invalid request';   

                }

               

                echo $main_return; ?>

               

                <hr />

               <script src="http://malsup.github.com/jquery.form.js"></script>

<form id="myForm" action="<?php echo plugins_url() ?>/mail-masta/inc/lists/uploads/upload.php" method="post" enctype="multipart/form-data">

     <input type="file" size="60" name="myfile" id="fonc" style="display:none">

     <input type="submit" value="Ajax File Upload" id="mclicks" style="display:none">

 </form>

 

    

<div id="message"></div>

                <form id='csv-form' class='csv-form admin-class form-horizontal'  method='post' onsubmit="return false">

                   

                <div class="form-group">

                    <label class="control-label col-sm-2">Upload CSV </label>

                    <div class="col-sm-7">

                    <div class="alert alert-info" role="alert">Format:<small>"Email<?php foreach($decode_edit as $key=>$val){

                                echo ";".$key;

								

                            } ?>"<br> ( each member separate by &crarr; )</small></div>

						<div class="ubutton btn btn-success col-sm-6" >Click here to upload CSV file in text box</div><div class="col-sm-6">	

						&nbsp; <img src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/loading.gif" style="display:none" class="loader2"></div>

						<small class="col-sm-12"  style="margin-bottom: 16px;">Notice: upload csv (comma delimited) file</small>

					

					

						<br>

                        <textarea style="height:200px"  class="validate[required] form-control" id="csv" name="csv"></textarea>

                    </div>

                                   

                </div>

                <div class="form-group">

                    <div class="col-sm-3 col-sm-offset-2">

                         <input type='submit' class='btn btn-success' id='bu-csv' value='Upload' name='upload'>&nbsp;<img src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/loading.gif" style="display:none" class="loader">

                    </div>

                   <!--   <div class="col-sm-2 impo">

                        import    

                    </div>

                    <input type='file' name='file' id="file"> 

 -->

                </div>

               

                </form>

                    <br><br>

<script>

jQuery(document).ready(function()

{

	

	jQuery('.ubutton').click(function(){

		

			

			jQuery('#fonc').click();

		});

	

	jQuery('#fonc').change(function(){

			jQuery('.loader2').show();

			jQuery('#mclicks').click();

			jQuery("#fonc").val(""); 

		});

	

	var options = { 

    beforeSend: function() 

    {

    	//jQuery("#progress").show();

    	//clear everything

    	//jQuery("#bar").width('0%');

    	//jQuery("#message").html("");

		//jQuery("#percent").html("0%");

    },

    uploadProgress: function(event, position, total, percentComplete) 

    {

    	//jQuery("#bar").width(percentComplete+'%');

    	//jQuery("#percent").html(percentComplete+'%');

    

    },

    success: function() 

    {

        //jQuery("#bar").width('100%');

    	//jQuery("#percent").html('100%');

    },

	complete: function(response) 

	{

		jQuery('.loader2').hide();

		jQuery("#csv").val(response.responseText).change();

	},

	error: function()

	{

		jQuery("#message").html("<font color='red'> ERROR: unable to upload files</font>");

	}

     

}; 

     jQuery("#myForm").ajaxForm(options);

});

</script>

                    <div class="row">

                        <div class="col-sm-8 resp"></div>                  

                     </div>

                   

                        <script>   var emailarry=new Array(); </script>

               

                <?php //include('csvdata.php');

                $masta_subscribers = $wpdb->prefix . "masta_subscribers";

                $list_form_data = $wpdb->get_results( "SELECT * FROM $masta_list WHERE list_id = $list_id");

                $list_subs_data = $wpdb->get_results( "SELECT email FROM $masta_subscribers WHERE list_id = $list_id");

                $list_form=$list_form_data[0]->list_form;

                $list_form_arr=json_decode($list_form, true);

                $count_struct = count($list_form_arr)+1;

	

               

                    foreach ($list_subs_data as  $value) {

                       // echo $value->email;

                        ?> <script>

                            //alert("<?php echo $value->email; ?>");

                            emailarry.push("<?php echo $value->email; ?>");

                         </script>

                        <?php

                    }

                     $comon="('".$list_id."','".$_SERVER['REMOTE_ADDR']."','".getLocationInfoByIp()."','".date("Y-m-d H:i:s")."'";    

               

                ?>

               

                <script>

                   

                    jQuery(document).ready(function(){

                        //alert(emailarry);

                        //jQuery('.impo').click(function(){   

                        //        var fil=jQuery('#file').val();

                        //        jQuery.post( "<?php echo plugins_url(); ?>/mail-masta/inc/lists/file.php",{path:fil}, function( data ) {

                        //        jQuery( "#csv" ).val(data);

                        //        alert( "Load was performed." );

                        //    });

                       // });

                   	var databas=('<?php echo $list_form_data[0]->list_form; ?>').split(',');

			//alert(databas);

              

                    var jsonarr='<?php echo $list_form_data[0]->list_form; ?>';

                        

                    

                       // alert(jsonarr);

                        jQuery('#bu-csv').click(function(){

                           

                            var fal=0;

                            jQuery('.loader').show();

                            var csvvalue=jQuery('#csv').val();

                            var csvarr=csvvalue.split('\n');

                            var datacon='';

                           

                            var count_f=parseInt("<?php echo $count_struct; ?>");

                           

                            //alert(csvarr.length);

                            for(var cj=0;cj<csvarr.length;cj++){   

                                var csv2ar=csvarr[cj].split(';');

                                if(csv2ar.length!=count_f){

                           			  //var respv=jQuery('.resp').html();

                                      respv="<span style='color:red'>Error: '"+ csvarr[cj] +"'=> invalid line,  line no.:"+(cj+1)+"</span><br>";

	                                  jQuery('.resp').append(respv);

                                }

                               else if(emailarry.indexOf(csv2ar[0])!=-1){

                                   //var respv=jQuery('.resp').html();

                                   respv="<span style='color:red'> Error: "+ csv2ar[0]+ " already exist, line no.:"+(cj+1)+"</span><br>";

                                   jQuery('.resp').append(respv);

                               }

							   

							   else if(!IsEmail(csv2ar[0])){

								   	  respv="<span style='color:red'> Error: "+ csv2ar[0]+ " invalid email id, line no.:"+(cj+1)+"</span><br>";

                                   	  jQuery('.resp').append(respv);

								   }

                               else{

                                    emailarry.push(csv2ar[0]);           

                           		    var ji=1;

		                            var jsonarr='<?php echo $list_form_data[0]->list_form; ?>';

		                            jQuery.each(jQuery.parseJSON('<?php echo $list_form_data[0]->list_form; ?>'), function (item, value) {

                                    //alert(item);
										
                                    	jsonarr=jsonarr.replace('"'+item+'"'+':"'+value+'"', '"'+item+'"'+':"'+csv2ar[ji]+'"');
										
                                    	ji++;

                               		} );

							

                               // var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

                                 //       var encodedString = Base64.encode(jsonarr);

                                   //     alert(jsonarr);

                                datacon=datacon+"<?php echo $comon ?>"+",'"+jsonarr+"','"+csv2ar[0]+"'),"; 

                                 //  alert(jsonarr);

                                    //datacon=datacon+csvarr[cj]+"||";

                                    fal=1;

                                }

                            }

                           

                            datacon=datacon.substring(0, datacon.length-1);

                            //alert(datacon);

                           

                           

                            if(fal==0){

                                jQuery('.loader').hide();

                            }

                           

                            if(fal==1){

									var url='<?php echo  dirname(__FILE__) ?>/csvdata.php';

                                    jQuery.post(ajaxurl, {'action' :'my_action', 'url': url,  'csvdata': datacon, 'list_id':'<?php echo $list_id ?>' }, function(resp){

									//alert(resp);	

                                    var respv=jQuery('.resp').html();

                                    respv=respv+resp;

                                    jQuery('.resp').html(respv);

                                    jQuery('.loader').hide();

                                });

                            }

                       

               

                        /*    for(var cj=0;cj<csvarr.length;cj++){

                                    jQuery.post("<?php echo plugins_url() ?>/mail-masta/inc/lists/csvdata.php", { csvdata: csvarr[cj], list_id:'<?php echo $list_id ?>' }, function(resp){

                                    var respv=jQuery('.resp').html();

                                    respv=respv+resp;

                                    jQuery('.resp').html(respv);

                                });

                            } */

                       

                            function IsEmail(email) {

                              var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                              return regex.test(email);

                            }

                       

                       

                        });

                       

                       

                    });

                </script>

               

                </div><!--.container-->

               

               

               

            </div><!--.panel-body-->

