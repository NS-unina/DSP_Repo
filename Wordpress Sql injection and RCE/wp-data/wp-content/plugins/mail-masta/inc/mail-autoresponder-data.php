<?php session_start();

if(!empty($_GET["action"])){

      

  $action = $_GET["action"];    

} else {

        

   $action = '';

}

if(!empty($_GET["id"])){

      

  $id = $_GET["id"];    

} else {

        

   $id = '';

}

?>

		

  	<script>

		jQuery(document).ready(function(){

			

						 //jQuery(".select_sty").selectbox();

	

						jQuery('#ccampia').click(function(){

								

								

								var count_list=jQuery.trim(jQuery('#list_s_0').val());	

								

								if(count_list==0)

								{

										alert("You have to create a list first");

								}

								else

								{

									

										window.location.href="admin.php?page=masta-autoresponder&action=add_campaign&step=first_step&new=newCampaign";

									

								}

								

						});

						

						jQuery('.pick').change(function(){

							var day_count=jQuery('#sdays').val();

							var hour_count=jQuery('#shours').val();

							var min_count=jQuery('#smins').val();

							jQuery('.form-control-p').val(day_count+":"+hour_count+":"+min_count).change();

							});

        

        

                       

							jQuery('#mail_test').click(function(){

								jQuery('#testdiv').append('&nbsp; &nbsp; <img id="loa" src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');

								var t_mail=jQuery('#test_input').val();

								

								if(t_mail!=''){

									

									if("<?php echo $_GET['action'] ?>"=='edit_campaign'){

									

									var c_id="<?php echo $_GET['id']; ?>";

								

									 }

									 else

									{ 

								

									var c_id="<?php echo $_SESSION['add']['camp_id']; ?>";

								

									 } 				

									 

									 var url='<?php echo dirname( __FILE__ ) ?>/autoresponder/campaign/test_mail.php';				

									

									jQuery.post(ajaxurl,{ 'action': 'my_action', 'url': url, 'camp_id' : c_id, 'test_mail': t_mail  }, function(resp){

										jQuery('#loa').remove();

										jQuery('#testdiv').append('<i class="tickclass btn  fa fa-check"></i>');

										

										

										});

								}

								else{

									

										alert('Invalid Email_id');

									

									}

								

							});	

							

							

                        

                          

                        

                       /*First step start*/

					   

                       

                      jQuery("#f_step").validationEngine("attach",{

                       onValidationComplete:function(form,status){

                          if (status) {

                                jQuery('#loader').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');

                                          var camp_name = jQuery(".f_step input[name='campaign_name']").val();

                                          var sender_name = jQuery(".f_step input[name='sender_name']").val();

                                          var sender_email = jQuery(".f_step #sender_email").val();

                                          var sender_list = jQuery("#sender_selected_list").val();

										  

										  var subject = jQuery("#subject").val();

                                      // alert(sender_list);

                                          

                                          var camp_step = "first_step";

                                          

                                          

                                          var url = '<?php echo dirname( __FILE__ ) ."/autoresponder/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';

                                         

                                            

                                           jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'slistid':sender_list, 'camp':camp_name,'sname':sender_name,'semail':sender_email,'step':camp_step, 'subject':subject}, function (resp){

                                                    if (resp != '')

                                                         {

                                                            form.validationEngine('detach');

                                                               form.submit();  

                                                         }

                                                         else

                                                         {

                                                          

                                                               

                                                               alert(resp);

                                                         }

                                                     

                                                   }) 

                                          }else {

                                                    

                                                    //alert(status);

                                                    return false;

                                                }

                                                

                                              } 

                                              

                                              });

                                            

                      /*First step end*/

                      

                      

                      

                      

                        /*Second step start*/

                       

                      jQuery("#s_step").validationEngine("attach",{

                       onValidationComplete:function(form,status){

                          if (status)

                              {

                                     jQuery('#loader2').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif"> ');

                                   var sender_list = jQuery("#sender_selected_list").val();

                                     var camp_step = "second_step";

                                    



										       var url = '<?php echo dirname( __FILE__ ) ."/autoresponder/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';

										 

                                        jQuery.post( ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'slistid':sender_list,'step':camp_step}, function (resp){

                                              //jQuery("#f_step").trigger('submit');

                                                  

                                                   if (resp != '')

                                                    {

                                                       form.validationEngine('detach');

                                                          form.submit(); 

                                                    }

                                                    else

                                                    {

                                                          alert(resp);

                                                    }

                                                

                                              })

                                  

                                  

                                  

                                  

                              }else

                              {

                                  

                                  //alert(status);

                                  return false;

                              }

                              

                            } 

                            

                            });

                          

                      /*Second step end*/

                      

                      

                        /*Third step start*/

                        

                      jQuery("#t_step").validationEngine("attach",{

                       onValidationComplete:function(form,status){

                          if (status) {

                               jQuery('#loader3').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif"> ');

                               var design_data = jQuery("#campcontent").val();

                                 var camp_step = "third_step";

                                

                                             jQuery('.step-3').append('<div class="das" style="display:none">'+design_data+'</div>');	

                                

                                jQuery(".das a" ).each(function( index ) {

									var ref=jQuery(this).attr("href");

									ref= ref.replace('http://', '');

									ref= ref.replace('https://', '');

									jQuery(this).attr("href","<?php echo home_url()."?respid=mailmastadata";  ?>&resplink=" + ref);

									

									

								});

                                var ddata=jQuery('.das').html();

                               // alert(ddata);

                                

                                var url = '<?php echo dirname( __FILE__ ) ."/autoresponder/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';

                                    jQuery.post( ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'campbody':design_data,'step':camp_step,'resmail':ddata}, function (resp){

                                               //alert(resp);return false;

                                               if (resp != '')

                                                {

                                                       form.validationEngine('detach');

                                                      form.submit();

                                                     

                                                }

                                                else

                                                {

                                                     alert(resp); 

                                                }

                                            

                                          })

                              

                          }else {

                              

                             // alert(status);

                              return false;

                          }

                          

                        } 

                        

                        });

                      

                      /*Fourth step start*/

                         jQuery("#time_setup").validationEngine("attach",{

                       onValidationComplete:function(form,status){

                          if (status) {

                               jQuery('#loader4').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif"> ');

							   var radio = jQuery("input[name='radio']:checked").val(); 

							  

                              if (jQuery("#datepicker").val()!="") {

                                  var time_interval = jQuery("#sdays").val()+":"+jQuery("#shours").val()+":"+jQuery("#smins").val();  

                              }else{

                                    

                                    var time_interval =  "";

                                    

                              }

                               

                                 var camp_step = "fourth_step";

                                  var url = '<?php echo dirname( __FILE__ ) ."/autoresponder/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';

                                    jQuery.post( ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'timestamp':time_interval,'step':camp_step,'radio':radio}, function (resp){

                        

                                               if (resp != '')

                                                {

                                                      form.validationEngine('detach');

                                                      window.location.href="admin.php?page=masta-autoresponder";

                                               

                                                }

                                                else

                                                {

                                                         alert(resp);    

                                                }

                                            

                                          })

                              

                                    }else {

                                        

                                        //alert(status);

                                        return false;

                                    }

                                    

                                  } 

                                  

                                  });

                                   

                                  

                                 /*Fourth step end*/

                                 

                                   /*Last step end*/

                                 

                                  jQuery("#l_last_step").submit(function (e)

                              {

                                  e.preventDefault();

                                   jQuery('#loader5').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif"> ');

                                 var last_step = "last_step";

                                 var cam_status = jQuery("#ca_status").val();

                                 var cam_type = jQuery("#ca_type").val();

								 

                                  var url = '<?php echo dirname( __FILE__ ) ."/autoresponder/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';

								  

								  

                                     jQuery.post( ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url,  'step' :last_step,'status':cam_status,'type':cam_type}, function (resp){

                                       // alert(resp);return false;

                                         if (resp != '')

                                          {

                                               

                                                 if (resp == 2)

                                                {

                                                     // alert(resp);return false;

                                                window.location.href="admin.php?page=masta-autoresponder";

                                                }

                                                else{

                                                      var temp = resp.split("_");

                                                      var camp_id = temp[1];

                                                      //alert(camp_id);return false;

                                                       window.location.href="admin.php?page=masta-autoresponder&action=immediate_send&send_id="+camp_id;

                                                }

                                          }

                                         else

                                          {

                                              alert("Seems connection problem !! Try again");    

                                          }

                                     

                                         })

                               

                               });

                      

                                

                               jQuery(".duplicate_responder").on('click',function (e)

                                    {

                                      //alert("dsadsa");

                                      

                                      var id = jQuery(this).attr('id');

									  var url="<?php echo dirname( __FILE__ ).'autoresponder/duplicate_responder.php'; ?>";



                                        jQuery.post(ajaxurl, {'action': 'my_action', 'url': url, 'responder_id' : id}, function (resp){

                                         

                                         

                                                if (resp != '' && resp != 1)

                                                {

                                             var newid = resp;

									window.location.href="admin.php?page=masta-autoresponder&id="+newid+"&action=edit_campaign&step=first_step";

                                           

                                                }

                                                else

                                                {

                                                  alert("aaa Something went wrong");

                                                }

                                            

                                          })

                                   

                                      

                                       

                                    }); 

                                

                          });

        

        		

        function deleteResponder(ResponderId)

          {

             if (confirm("Are You sure want to delete this auto responder?")) {

               window.location.href="admin.php?page=masta-autoresponder&id="+ResponderId+"&action=delete_responder";

             } else {

               

               return false;

             }

           

           

          }       

          

                  function pausedResponder(ResponderId)

          {

             if (confirm("Are you sure want to pause this auto responder?")) {

               window.location.href="admin.php?page=masta-autoresponder&id="+ResponderId+"&action=paused_responder";

             } else {

               

               return false;

             }

           

           

          }

          

        

	</script>

        

          <div class="mail_masta_wrapper">

        <div class="clearfix heading">

            <div class="mm_float_left">

                <h1><a href="<?php echo admin_url(); ?>/admin.php?page=masta-autoresponder">Autoresponder</a></h1>

            </div>

            <?php

            $query="";

            $query = (string) $query; 

            echo $camp_action;

            if($_GET["action"] == "") { ?>

            <div class="mm_float_right">

                <a href="javascript:void(0)" id="ccampia" class="btn btn-success"><i class="fa fa-plus-circle"></i> Create Autoresponder</a>

            </div>

            <?php } ?>

        </div>

          <?php  

                    if(isset($_POST['addCampaign']) || (!empty($_GET['new']) && $_GET['new']=='newCampaign'))

                    {

                        unset($_SESSION['add']);

                         $_SESSION['add']='';

                       

                    }

                 

             if(!empty($_GET["action"])){ 

                  $camp_action = $_GET["action"];

             } else {

                  $camp_action = ""; 

             }

        ?>

        <div class="mm_wrap">

            

						

                      <?php  if($camp_action=="delete_responder")

                        {  

                            

                            global $wpdb;

                            $masta_responder = $wpdb->prefix . "masta_responder";

                            echo $masta_responder;

                            $responder_id = $_GET["id"];

                            echo $responder_id;

                          //echo "DELETE FROM $masta_campaign WHERE camp_id = $camp_id";

                          //echo $list_id;exit;

                           include ( dirname( __FILE__ ) . '/autoresponder/responder_delete.php' );

                        }

                           ?>

                           

                            <?php  if($camp_action=="paused_responder")

                        {  

                            

                            global $wpdb;

                            $masta_responder = $wpdb->prefix . "masta_responder";

                            echo $masta_responder;

                            $responder_id = $_GET["id"];

                            echo $responder_id;

                          //echo "DELETE FROM $masta_campaign WHERE camp_id = $camp_id";

                          //echo $list_id;exit;

                           include ( dirname( __FILE__ ) . '/autoresponder/responder_paused.php' );

                        }

                           ?>

                           

                            <?php  if($camp_action=="play_responder")

                        {  

                            

                            global $wpdb;

                            $masta_responder = $wpdb->prefix . "masta_responder";

                            echo $masta_responder;

                            $responder_id = $_GET["id"];

                            echo $responder_id;

                          //echo "DELETE FROM $masta_campaign WHERE camp_id = $camp_id";

                          //echo $list_id;exit;

                           include ( dirname( __FILE__ ) . '/autoresponder/responder_play.php' );

                        }

                           ?>

                   <?php if($camp_action=="immediate_send") {  //echo "you rocks..";?>

                        

                            <div class="immediate_send">

                             

                              <?php

                              global $wpdb;

                              $masta_campaign = $wpdb->prefix . "masta_campaign";

                              $send_campaign_id = $_GET["send_id"];

                            //echo "DELETE FROM $masta_campaign WHERE camp_id = $camp_id";

                            //echo $list_id;exit;

                             include ( dirname( __FILE__ ) . '/autoresponder/campaign/immediate_campaign.php' );

                             ?>

                        

                                

                             </div><!--.view_list-->

                  <?php  } ?>                  

            <?php if($camp_action ==""){ ?>

           

            <div class="table-responsive">

             

                

                    <?php

                    global $wpdb;

                    $masta_responder = $wpdb->prefix . "masta_responder";

                    $masta_subscribers = $wpdb->prefix . "masta_subscribers";

                    $campaigndata = $wpdb->get_results( "SELECT * FROM $masta_responder	");

                    if(count($campaigndata))  { 

					

					?>

                    

                       <table class="table table-bordered">

                  <tbody>

                  

                    <?php

                    foreach($campaigndata as $cdata){

						?>

                        

                     

                  

                  <?php

                        $timing = $cdata->create_date;

                        $modified_date = date("F j, Y",strtotime($timing));

                        $list_id = $cdata->to_list;

                        //echo $list_id.'<br>';

                        $ttl_subscriber = 0;

                    ?>

                     <tr> 

						  <?php 	 

						          switch($cdata->status){

								    case 1:{

										  $class =  "fa fa-check";

										  $status='Sent';

										  break;

										  }

									case 2:{

										  $class =  "fa fa-pause";

										  $status='Paused';

										  break;

										  }	 

									case 3:{

										  $class =  "fa fa-edit";

										  $status='Draft';

										  break;

										  }	

									case 4:{

										  $class =  "fa fa-envelope";

										  $status='Sending....';

										  break;

										  }		

									case 5:{

										  $class =  "fa fa-check";

										  $status='';

										  break;

										  }	

									default :{

										 $class =  "";

										  $status='';	  		     	   

									  }

									  }

                                      ?> 

						

                      <td class="icon-col" title="<?php echo $status;?>"><i class="<?php echo $class; ?>"></i></td>

                      <td class="campaign-heading"> <?php echo $cdata->responder_name; ?>

                      

                      <div class="mm_view_desc">

						  <?php if($cdata->responder_type=='1' && $cdata->status=='5'){ ?>

                                send immediatly after subscribes

                          <?php } 

                           else if($cdata->responder_type=='2' &&  $cdata->status=='5') { 

                                    $arr_of_time = explode(':', $cdata->timeinterval); ?>

                                    send to new subscriber <?php //echo $arr_of_time[0]; ?>  <?php //echo $arr_of_time[1]; ?>  <?php //echo $arr_of_time[1]; ?>                       

                            <?php }

                            else if($cdata->status=='3'){

                                    echo '<strong>'.$status.'</strong>';

                                    ?> last modified  on <?php echo $modified_date; ?> at <?php echo date("g:i a",strtotime($timing)); ?>

                            <?php }

                            

                            else if($cdata->status=='2'){

                                echo '<strong>'.$status.'</strong>';

                                }

                             ?>

                         </div>

                        

                      </td>

                      

                      <?php 

                      

                      $masta_responder_reports = $wpdb->prefix . "masta_responder_reports";

                      $masta_subscribers = $wpdb->prefix . "masta_subscribers";

                      

                      $responesid=$cdata->responder_id;

                      $countclickedopen=$wpdb->get_results("select count(*) opencount from $masta_responder_reports where responder_id=$responesid and opened=1"); 

					  $countclickedopen2=$wpdb->get_results("select count(*) clicked from $masta_responder_reports where responder_id=$responesid and clicked=1");

					  $countclickedopen3=$wpdb->get_results("select count(*) sent from $masta_responder_reports where responder_id=$responesid and status=1");	

                      

                      if($countclickedopen3[0]->sent!='0'){

						  $peropen=((int)$countclickedopen[0]->opencount/(int)$countclickedopen3[0]->sent)*100;

						  $perclick=((int)$countclickedopen2[0]->clicked/(int)$countclickedopen3[0]->sent)*100;

						}

					  else{

							$peropen=0;

							$perclick=0;

						  }

                      

                      

						

							

							

							$users_sql = "select count(id) as ttl_subscriber from $masta_subscribers WHERE `list_id` = $list_id and `status` = 1 ";

							//echo $users_sql.'<br>';

								$userdata = $wpdb->get_results($users_sql);

								//print_r($userdata);

								if(count($userdata) > 0) {

									$ttl_subscriber = $userdata[0]->ttl_subscriber; 	

								}

							

							

                      ?>

                      

                      <td><?php echo $ttl_subscriber; ?> subscribers</td>

					

					<?php if($cdata->status!=3) { ?>

                      <td><?php echo round($peropen,2).'%';?> open </td>

                      <td><?php echo round($perclick,2).'%';?> click </td>

					<?php } else { ?>

						<td align="center">-</td>

                        <td align="center">-</td>

					<?php } ?>	

                    

                     

                      <td class="text-center mm-button-group action_wrp" style="min-width: 283px;">

                       

                       

                        <?php if($cdata->status==5 || $cdata->status==2 ){ ?> 

                         

                            <a href="admin.php?page=masta-autoresponder&id=<?php echo $cdata->responder_id; ?>&action=view_campaign" class="action_icons report_bar"><p>Report</p></a>

                                 

                      

                       <?php }  ?>

                       

                       

                       <a href="admin.php?page=masta-autoresponder&id=<?php echo $cdata->responder_id; ?>&action=edit_campaign&step=first_step" class="action_icons"><i class="fa fa-pencil"></i><p>Edit</p></a>

                       

                        <a href="javascript:void(0);" id="<?php echo $cdata->responder_id; ?>" class="duplicate_responder action_icons"><i class="fa fa-copy"></i><p>Duplicate</p></a>

                        

                        <a onclick ="return deleteResponder(this.id)" href="javascript:void(0)" class="action_icons" id="<?php echo $cdata->responder_id; ?>"><i class="fa fa-trash-o"></i><p>Delete</p></a>

						

						<?php if($cdata->status==5) { ?>

						

							<a onclick ="return pausedResponder(this.id)" href="javascript:void(0)" class="action_icons" id="<?php echo $cdata->responder_id; ?>"><i class="fa fa-pause"></i><p>Pause</p></a>

						

						<?php }

						else if($cdata->status==2)

						{ ?>

							

							<a href ="admin.php?page=masta-autoresponder&id=<?php echo $cdata->responder_id; ?>&action=play_responder"  class="action_icons" id="<?php echo $cdata->responder_id; ?>"><i class="fa fa-play"></i><p>Resume</p></a>

						

						<?php } ?>

                      

                      </td>

                      

                      </tr>

               

                    <?php }

?>

						    </tbody>

                </table>

  <?php              

				

				       } else {

						   

						   $masta_list=$wpdb->prefix.'masta_list';

						   $masta_list=$wpdb->get_var("SELECT count(*) from $masta_list");

						    echo '<h2>There are no autoresponders yet.</h2>';							   

						    echo "<input type='hidden' id='list_s_0'  value='". $masta_list ."'>";

						}

                     ?>

                   

                  

                

            </div>

            <?php } 

			

			

			

			$masta_list=$wpdb->prefix.'masta_list';

			$masta_list=$wpdb->get_var("SELECT count(*) from $masta_list");

			echo "<input type='hidden' id='list_s_0'  value='". $masta_list ."'>";

			

			

			

			?>

             

            <?php if($camp_action =="view_campaign")

                  {

                          global $wpdb;

                          $masta_campaign = $wpdb->prefix . "masta_responder";

                          $responder_id = $_GET["id"];

                         // echo dirname( __FILE__ ) . '/autoresponder/campaign/view-campaign.php' ;

                         

                          include ( dirname( __FILE__ ) . '/autoresponder/campaign/view-campaign.php' );

                  

                  } ?>

                  

               

            

            <?php if($camp_action =="add_campaign") {

				  $step = $_GET["step"]; 

					

				//step2

				if(!empty($_POST['campaign_name']) && !empty($_POST['sender_name']) && !empty($_POST['sender_email'])) {

                                     //print_r($_POST);

                                    //echo '<br>';

                                    //print_r($_SESSION);

                        $_SESSION['add']['campaign_name']  = $_POST['campaign_name'];

						 $_SESSION['add']['subject'] = $_POST['subject'];

                        $_SESSION['add']['sender_name']  = $_POST['sender_name'];

                        $_SESSION['add']['sender_email'] = $_POST['sender_email'];

						

						

                     			

                }

				

				//step3

				if(!empty($_POST['sender_selected_list'])) {

                                     //print_r($_POST);

                                    //echo '<br>';

                                   // print_r($_SESSION);

					$_SESSION['add']['sender_selected_list'] = $_POST['sender_selected_list']; 

			        

			    }

				

				//step4

				if(!empty($_POST['campcontent'])) {

                                    //print_r($_POST);

                                    //echo '<br>';

                                    //print_r($_SESSION);

					$_SESSION['add']['design_data'] = $_POST['campcontent'];

				}

				

				//step5

				if(!empty($_POST['radio'])) {

				  	$_SESSION['add']['camp_type'] = $_POST['radio'];

				  	if($_POST['radio'] == '2'){

						$_SESSION['add']['schedule_time'] = $_POST['schedule_time'];

					}

				}

				

				$to_url = 'javascript:void(0)';

				$design_url = 'javascript:void(0)';

				$setting_url = 'javascript:void(0)';

				$confirm_url = 'javascript:void(0)';

				

			?>

            <div class="panel panel-default">

              <div class="panel-heading">Create Autoresponder</div>

              <div class="panel-body">

                <div class="container">

                    <div class="row">

                        <div class="col-sm-12">

                            <div class="step_navigation">

                                <ul>

                                    <li class="filled">

										

										<a href="admin.php?page=masta-autoresponder&action=add_campaign&step=first_step">Info</a>

                                    

                                    </li>

                                    

                                   

                                    

                                    <?php if(!empty($_SESSION['add']['campaign_name']) && !empty($_SESSION['add']['sender_name']) && !empty($_SESSION['add']['sender_email']) && !empty($_SESSION['add']['sender_selected_list']) && $step != 'first_step'){

									 $design_cls = 'filled';

										 if($step != 'second_step') {

											$design_url = 'admin.php?page=masta-autoresponder&action=add_campaign&step=second_step';

										  }

									 }else { $design_cls = '';$design_url = 'javascript:void(0)';}?>

                                    <li class="<?php echo $design_cls;?>">

                                        <a href="<?php echo $design_url;?>">Design</a>

                                    </li>

                                    

                                    <?php if(!empty($_SESSION['add']['campaign_name']) && !empty($_SESSION['add']['sender_name']) && !empty($_SESSION['add']['sender_email']) && !empty($_SESSION['add']['sender_selected_list']) && !empty($_SESSION['add']['design_data']) && $step != 'first_step' && $step != 'second_step'){

										 $setting_cls = 'filled';

											 if($step != 'third_step') {

												$setting_url = 'admin.php?page=masta-autoresponder&action=add_campaign&step=third_step';

											  }

									}else { $setting_cls = '';$setting_url = 'javascript:void(0)';}?>

                                    <li class="<?php echo $setting_cls;?>">

                                        <a href="<?php echo $setting_url;?>">Settings</a>

                                    </li>

                                    

                                    

                                    

                                    

                                </ul>

                            </div><!--.step_navigation-->

                        </div>

                    </div>

                </div>

                

                <div class="container mm_form_style">

                 

                    <div class="step-1 <?php if($step=="first_step"){echo "";}else{echo"none";} ?>">

                        <form id="f_step" class="f_step form-horizontal" action=  "admin.php?page=masta-autoresponder&action=add_campaign&step=second_step" method="POST" name="f_step">

                              

                              <div class="form-group">

                                <label class="control-label col-sm-3">Autoresponder Name:</label>

                                <div class="col-sm-4"><input type="text" value="<?php if(!empty($_SESSION['add']['campaign_name'])){ echo $_SESSION['add']['campaign_name'];} ?>" name="campaign_name" id="campaign_name" class="validate[required] form-control"> </div>

                            </div>

							

							

							 <div class="form-group">

                                <label class="control-label col-sm-3">Subject:</label>

                                <div class="col-sm-4"><input type="text" value="<?php if(!empty($_SESSION['add']['subject'])){ echo $_SESSION['add']['subject'];} ?>" name="subject" id="subject" class="validate[required] form-control"> </div>

                            </div>

                            <div class="form-group">

                                <label class="control-label col-sm-3">From Name:</label>

                                <div class="col-sm-4"><input type="text" value="<?php if(!empty($_SESSION['add']['sender_name'])){ echo $_SESSION['add']['sender_name']; }?>" name="sender_name" id="sender_name" class="validate[required] form-control"> </div>

                            </div>

                            <div class="form-group">

                                <label class="control-label col-sm-3">From Email:</label>

                                <div class="col-sm-4">	<?php 

								    global $wpdb;

									error_reporting(0);

									$masta_settings = $wpdb->prefix."masta_settings";

									$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");

									$rows_data = $app_details[0];

									$send_type = $rows_data->send_type;

									

									if($send_type == 1) { 

									$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);

									$data = $ses->getSendQuota();

									$verified_senders = $ses->listVerifiedEmailAddresses();

									//print_r($verified_senders);

									if(!empty($verified_senders['Addresses'])){

										

									   $sender_emails = $verified_senders['Addresses'];

									}

								

								   

								?>

									<select name="sender_email"   id="sender_email" class="validate[required] form-control select_sty">

											<option value="">

										

											</option>

											<?php

											      if(count($sender_emails) > 0) {

														foreach($sender_emails as $smail):

																$check = (!empty($_SESSION['add']['sender_email']) && $_SESSION['add']['sender_email'] == $smail)? 'selected' : ''; 

														       echo '<option value="'.$smail.'" '.$check.'>'.$smail.'</option>';

														endforeach;

													  

													}

											?>

									</select>

									

								<?php } else {

								?>

								 <input type="text" style="z-index: 1; position: static;" value="<?php if(!empty($_SESSION['add']['sender_email'])){ echo $_SESSION['add']['sender_email'];} ?>" name="sender_email" id="sender_email" class="validate[required,custom[email]] form-control"> 

									

									

									

							<?php } ?>	

							

							 </div>

                            </div>

                             <div class="form-group">

                                <label class="control-label col-sm-3">Send to list:</label>

                                <div class="col-sm-4">

                                    <select class="validate[required] form-control select_sty" id="sender_selected_list" name="sender_selected_list">

                                          <?php 

                                                global $wpdb;

                                                $list_data_id = $_GET['id'];

                                                $masta_list = $wpdb->prefix . "masta_list";

                                                $listdata = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $masta_list"));

                                                if(empty($_POST['first_sub']) && !empty($_SESSION['add']['sender_selected_list'])){ $lid = $_SESSION['add']['sender_selected_list'];}else{$lid = '';}

                                                ?>

                                       <option value=""></option>

                                       <?php foreach($listdata as $listdetails) { ?>

                                        <option value="<?php echo $listdetails->list_id; ?>"  <?php if($lid == $listdetails->list_id){echo "selected='selected'";}?>> <?php echo $listdetails->list_name; ?> </option>

                                       

                                        <?php } ?>

                                    </select>

                                </div>

                            </div>

                            

                            <div class="form-group">

                                <div class="col-sm-4 col-sm-offset-3">

                                    <input type="submit" value="Save & Next" class="btn btn-success" name="first_sub" id="first_sub">

                                      <div id="loader" class="ld_style"></div>     

                                </div>

                                

                            </div>

                        </form>

                    </div>

                    

                   

                    

                    <div class="step-2 <?php if($step=="second_step"){echo "";}else{echo"none";} ?>">

                        <form id="t_step" class="t_step" action="admin.php?page=masta-autoresponder&action=add_campaign&step=third_step" method="POST">

                         

                            <div class="row">

                                <div class="col-sm-12">

				     <?php if(empty($_POST['sender_selected_list']) && !empty($_SESSION['add']['design_data'])){ $dt = stripslashes($_SESSION['add']['design_data']); }else { $dt = '';}?>

                                    <div class="editor_wrapper"><?php wp_editor( $dt , 'campcontent' ); ?></div>

                                </div>

                            </div>

                            <div>&nbsp;</div>

                            <div class="row">

                                    <div class="col-sm-3">

                                          <input type="submit" value="Save & Next" class="btn btn-success" >

                                           <div id="loader3" class="ld_style"></div>

                                    </div>

                                                           

                            </div>

                        </form>

                    </div><!--.step-3-->

                    

                    <div class="step-3 <?php if($step=="third_step"){echo "";}else{echo"none";} ?>">

					<div class="col-sm-12 form-group" id='testdiv'>

											<input class="col-sm-4" type="text" id="test_input" placeholder="email@domain.com"> <input class="col-sm-1 btn btn-success" type="submit" id="mail_test" value="test" style="margin-left:13px">

                                            

                   </div>

                        <form id="time_setup" name="time_setup" class="ff_step" action="admin.php?page=masta-autoresponder&action=add_campaign&step=fourth_step" method="POST">

                            <div class="row">

                                <div class="col-sm-12">

                                   <!-- <input type="submit" value="Send" class="btn btn-default" />

                                    <hr />-->

                                    <div class="select_opt">

                                      <!--  <p><input type="radio" name="radio" id="rightnow" value="1" class="validate[required]"/> when there is new content </p> -->

									<p><input type="radio" name="radio" id="imm" value="1" /> send immediatly after subscribes </p>

                                        <p><input type="radio" name="radio" id="schedule" value="2" checked='checked'  class="validate[required]"/> x time after user subscribes to the selected listt</p>

                                    </div>

                                    

                                    <script type="text/javascript">

                                           jQuery("#rightnow").live("click",function()

                                            {

                                             jQuery(".select_settings").hide("slow");

                                            }); 

                                            jQuery("#schedule").live("click",function()

                                            {

                                            jQuery(".select_settings").show("slow");

                                            });     

                                          

                                    </script>

                                            <script type="text/javascript">

                                          //jQuery(document).ready(function()

                                          //{

                                               

                                               // jQuery('#datepicker').datetimepicker

                                               // ({

                                                

                                                      //showOn: "both",

                                                      //buttonImageOnly: true,

                                                    //  dateFormat: 'yy-mm-dd',

                                                  //    buttonImage:'<?php echo plugins_url();?>/mail-masta/lib/css/images/calendar.png',

                                                //      buttonText: "Calendar",

                                              //        minDate: new Date()

                                                

                                            //    });

                                          

                                          //});

                                                

                                          

                                   

                                         

                                        </script>

                                    <div class="select_settings">

                                         <div class="well">

                                           

                                                <div class="input-group calendar_icon">

													

													

													<?php 

													$see_arr=array(0,0,0);

													

													if(!empty($_SESSION['add']['scheduled_time'])){

														

														$see_arr=explode(':', $_SESSION['add']['scheduled_time']);

														

														//echo $_SESSION['add']['scheduled_time'];

														}

													

													 ?>

													 

													<select name="schedule_days " id="sdays" class='pick'  >

													

													<?php for($d=0; $d<=30; $d++){ ?>

													

													<option  value=<?php echo $d ?> <?php if($see_arr[0]==$d){ echo "selected"; } ?>  ><?php echo $d; ?></option>	

													

													<?php } ?>

													

													</select> days and

													

													&nbsp; &nbsp;

													

													

													<select name="schedule_hours" id="shours"  class='pick' >

													

													<?php for($h=0; $h<=24; $h++){ ?>

													

													<option  value=<?php echo $h ?> <?php if($see_arr[1]==$h){ echo "selected"; } ?> ><?php echo $h; ?></option>	

													

													<?php } ?>

													

													</select> Hours and

													

													&nbsp; &nbsp;

													

													

													<select name="schedule_mins" id="smins" class='pick'>

													

													<?php for($m=0; $m<=30; $m++){ ?>

													

													<option  value=<?php echo $m ?> <?php if($see_arr[2]==$m){ echo "selected"; } ?>  ><?php echo $m; ?></option>	

													

													<?php } ?> 

													

													</select> minutes

													

													

													

                                                       <input value="<?php if(!empty($_SESSION['add']['scheduled_time'])){echo $_SESSION['add']['scheduled_time'];}    ?>" type="hidden" class="form-control-p" id="datepicker" name="schedule_time">

    

                                                     

                                                </div>

                                                

                                                       

                                                  

                                        </div>

                                      

                                    </div><!--.select_settings-->

                                    

                                    <input type="submit" value="Confirm" class="btn btn-success" name="fourth_sub" id="fourth_sub">

                                      <div id="loader4" class="ld_style"></div>

                                </div>

                                     

                            </div>

                        </form>

                    </div><!--.step-4-->

                    

                    

                    

                

              </div><!--.container-->

            </div><!--.panel-body-->

            

         </div>

            <?php } ?>

            

            

            <!--Campaign editing start-->

          <!----   # ################################### Edit  ##################################################       -->              

            

<?php if($camp_action =="edit_campaign"){

	

			if(!empty($_POST['campaign_name']) && !empty($_POST['sender_name']) && !empty($_POST['sender_email'])) {

                                     //print_r($_POST);

                                    //echo '<br>';

                                    //print_r($_SESSION);

                        $_SESSION['add']['campaign_name']  = $_POST['campaign_name'];

						 $_SESSION['add']['subject']  = $_POST['subject'];

						 

                        $_SESSION['add']['sender_name']  = $_POST['sender_name'];

                        $_SESSION['add']['sender_email'] = $_POST['sender_email'];

                       

                     			

                }

                

                	if(!empty($_POST['campcontent'])) {

                                    //print_r($_POST);

                                    //echo '<br>';

                                    //print_r($_SESSION);

					$_SESSION['add']['design_data'] = $_POST['campcontent'];

				}

				

                

            global $wpdb;

            $masta_campaign = $wpdb->prefix . "masta_responder";

            $step = $_GET["step"];

            $responder_id=$_GET["id"];

      

            

            $campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE responder_id = $responder_id");

            //print_r($campaigndata);

            //print_r($_POST);

            //print_r($_SESSION);

            foreach($campaigndata as $campdata)

            {

                                        $campname = $campdata->responder_name;

										

										

										$subject = $campdata->subject;

                                        $campsender = $campdata->from_name;

                                        $camperemail = $campdata->from_email;

                                        $camplist = $campdata->to_list;

                                        $campbody = $campdata->body;

                                        $campaignType = $campdata->responder_type;

                                        $sheduleDate = $campdata->shedule_date;

                                        $timeinterval = $campdata->timeinterval;

                                        $arr_of_time=explode(":",$timeinterval);

                                        

                                        //print_r($campbody);

                                      //step2

                                      if(!empty($_POST['campaign_name']) && !empty($_POST['sender_name']) && !empty($_POST['sender_email']))

                                      {

                                                      

                                             $_SESSION['edit']['campaign_name'] = $_POST['campaign_name'];

											 

											 

											 $_SESSION['subject']['campaign_name'] = $_POST['subject'];

                                             $_SESSION['edit']['sender_name']  = $_POST['sender_name'];

                                             $_SESSION['edit']['sender_email'] = $_POST['sender_email'];

                                      }

                                      

                                      //step3

                                      if(!empty($_POST['sender_selected_list'])) {

                                              $_SESSION['edit']['sender_selected_list'] = $_POST['sender_selected_list']; 

                                      

                                  }

                                      

                                      //step4

                                      if(!empty($_POST['campcontent'])) {

                                              $_SESSION['edit']['design_data'] = $_POST['campcontent'];

                                      }

                                      

                                      //step5

                                      if(!empty($_POST['radio'])) {

                                              $_SESSION['edit']['camp_type'] = $_POST['radio'];

                                              if($_POST['radio'] == '2'){

                                                      $_SESSION['edit']['schedule_time'] = $_POST['schedule_time'];

                                              }

                                      }

                                      

                                      $to_url = 'javascript:void(0)';

                                      $design_url = 'javascript:void(0)';

                                      $setting_url = 'javascript:void(0)';

                                      $confirm_url = 'javascript:void(0)';

                                      

                              ?>

                  <div class="panel panel-default">

                    <div class="panel-heading">Edit Autoresponder</div>

                    <div class="panel-body">

                      <div class="container">

                          <div class="row">

                              <div class="col-sm-12">

                                  <div class="step_navigation edit_step_navigation">

                                       <ul>

                                          <li class="filled">

                                                                                      

                                              <a href="admin.php?page=masta-autoresponder&id=<?php echo $responder_id;?>&action=edit_campaign&step=first_step">Info</a>

                                          

                                          </li>

                                          

                                 

                                       

                                          <?php if($campbody!='' || $step=='second_step') { 

														if($step=='second_step') { $to_cls='filled'; $design_cls='filled'; }

											 			$design_url = 'admin.php?page=masta-autoresponder&id='.$responder_id.'&action=edit_campaign&step=second_step';

											}  else { 

														$design_cls = '';$design_url = 'javascript:void(0)';

													} ?>

                                          

                                                                              

                                             <?php if($campbody!='' || $step=='third_step') { 

														if($step=='third_step') { $to_cls='filled'; $design_cls='filled'; $setting_cls='filled'; }

											 			 $setting_url = 'admin.php?page=masta-autoresponder&id='.$responder_id.'&action=edit_campaign&step=third_step';

											}  else { 

														$setting_url = '';$setting_url = 'javascript:void(0)';

													} ?>

                                          

                                

                                        

                                           

                                         

                                         

                                          <li class="<?php echo $design_cls;?>">

                                              <a href="<?php echo $design_url;?>">Design</a>

                                          </li>

                                           

                                           <li class="<?php echo $setting_cls;?>">

                                              <a href="<?php echo $setting_url;?>">Settings</a>

                                          </li>  

                                            

                                          

                                          

                                       

                                          

                                      </ul>

                                  </div><!--.step_navigation-->

                              </div>

                          </div>

                      </div>

                      

                      <div class="container">

                          <div class="step-1 <?php if($step=="first_step"){echo "";}else{echo"none";} ?>">

                              <form id="f_step" class="f_step form-horizontal" action="admin.php?page=masta-autoresponder&id=<?php echo $responder_id;?>&action=edit_campaign&step=second_step" method="POST" name="f_step">

                                    

                                    <div class="form-group">

                                      <label class="control-label col-sm-3">Autoresponder Name:</label>

                                      <div class="col-sm-4"><input type="text" value="<?php echo $campname; ?>" name="campaign_name" id="campaign_name" class="validate[required] form-control"> </div>

                                  </div>

								  

								     <div class="form-group">

                                      <label class="control-label col-sm-3">Subject:</label>

                                      <div class="col-sm-4"><input type="text" value="<?php echo $subject; ?>" name="subject" id="subject" class="validate[required] form-control"> </div>

                                  </div>

                                    

                                  <div class="form-group">

                                      <label class="control-label col-sm-3">From Name:</label>

                                      <div class="col-sm-4"><input type="text" value="<?php echo $campsender; ?>" name="sender_name" id="sender_name" class="validate[required] form-control"> </div>

                                  </div>

                                  

                                  <div class="form-group">

                                      <label class="control-label col-sm-3">From Email:</label>

                                      <div class="col-sm-4">

											  <?php 

								    global $wpdb;

									error_reporting(0);

									$masta_settings = $wpdb->prefix."masta_settings";

									$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");

									$rows_data = $app_details[0];

									$send_type = $rows_data->send_type;

									

									if($send_type == 1) { 

									$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);

									$data = $ses->getSendQuota();

									$verified_senders = $ses->listVerifiedEmailAddresses();

									//print_r($verified_senders);

									if(!empty($verified_senders['Addresses'])){

										

									   $sender_emails = $verified_senders['Addresses'];

									}

									

									   //echo $camperemail;

									?>

										 <select name="sender_email" id="sender_email" class="validate[required] form-control select_sty">

											<option value="">

											   

											</option>

											<?php

											      if(count($sender_emails) > 0) {

														foreach($sender_emails as $smail):

																$check = (!empty($camperemail) && $camperemail == $smail)? 'selected="selected"' : ''; 

														       echo '<option value="'.$smail.'" '.$check.'>'.$smail.'</option>';

														endforeach;

													  

													}

											?>

									</select>

									<?php } else { ?>	 

										  <input type="text" style="z-index: 1; position: static;" value="<?php echo $camperemail; ?>" name="sender_email" id="sender_email" class="validate[required,custom[email]] form-control"> 

									<?php } ?>

									

									   </div>

                                  </div>

                                    <div class="form-group">

                                      <label class="control-label col-sm-3">Send to list:</label>

                                      <div class="col-sm-4">

                                          <select class="validate[required] form-control select_sty" id="sender_selected_list" name="sender_selected_list">

                                                <?php 

                                                      global $wpdb;

                                                      $list_data_id = $camplist;

                                                      $masta_list = $wpdb->prefix . "masta_list";

                                                      $listdata = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $masta_list"));

                                                      if(empty($_POST['first_sub']) && !empty($camplist)){ $lid = $camplist;}else{$lid = '';}

                                                      ?>

                                             <option value=""></option>

                                             <?php foreach($listdata as $listdetails) { ?>

                                              <option value="<?php echo $listdetails->list_id; ?>"  <?php if($lid == $listdetails->list_id){echo "selected='selected'";}?>> <?php echo $listdetails->list_name; ?> </option>

                                             

                                              <?php } ?>

                                          </select>

                                      </div>

                                  </div>

                                  

                                  <div class="form-group">

                                      <div class="col-sm-4 col-sm-offset-3">

                                          <input type="submit" value="Save & Next" class="btn btn-success" name="first_sub" id="first_sub">

                                          <div id="loader" class="ld_style"></div>

                                      </div>

                                  </div>

                              </form>

                          </div>

                          

                         

                          

                          <div class="step-2 <?php if($step=="second_step"){echo "";}else{echo"none";} ?>">

                              <form id="t_step" class="t_step" action="admin.php?page=masta-autoresponder&id=<?php echo $responder_id;?>&action=edit_campaign&step=third_step" method="POST">

                               

                                  <div class="row">

                                      <div class="col-sm-12">

                                           <?php $dt = stripslashes($campbody);?>

                                          <div class="editor_wrapper"><?php wp_editor( $dt, 'campcontent' ); ?></div>

                                      </div>

                                  </div>

                                  <div>&nbsp;</div>

                                  <div class="row">

                                      <div class="col-sm-3">

                                            <input type="submit" value="Save & Next" class="btn btn-success" >

                                            <div id="loader3" class="ld_style"></div>

                                      </div>

                                  </div>

                              </form>

                          </div><!--.step-3-->

                          

                          <div class="step-3 <?php if($step=="third_step"){echo "";}else{echo"none";} ?>">

                         	<div class="col-sm-12 form-group" id='testdiv'>

											<input class="col-sm-4" type="text" id="test_input" placeholder="email@domain.com"> <input class="col-sm-1 btn-success" type="submit" id="mail_test" value="test" style="margin-left:13px">

                                            </div>

                                            

                              <form id="time_setup" class="ff_step" action="admin.php?page=masta-autoresponder&id=<?php echo $responder_id;?>&action=edit_campaign&step=fourth_step" method="POST">

                                  <div class="row">

                                      <div class="col-sm-12">

                                         <!-- <input type="submit" value="Send" class="btn btn-default" />

                                          <hr />-->

                                          <div class="select_opt">

											  

														<p><input type="radio" name="radio" id="imm" value="1" /> send immediatly after subscribes </p>			

																<p><input type="radio" name="radio" id="schedule" checked='checked' value="2" /> x time after user subscribes to the selected listt	</p>		

                                          </div>

                                          

                                          <script type="text/javascript">

                                                 jQuery("#rightnow").live("click",function()

                                                  {

                                                   jQuery(".select_settings").hide("slow");

                                                  }); 

                                                  jQuery("#schedule").live("click",function()

                                                  {

                                                  jQuery(".select_settings").show("slow");

                                                  });     

                                                

                                          </script>

                                    

                                          <div class="select_settings" ">

                                               <div class="well">

                                                 

                                                      <div class="input-group calendar_icon">

                                                           <select name="schedule_days" id="sdays" class="">

													

													<?php for($d=0; $d<=30; $d++){ 

													$te=(int)$arr_of_time[0];

													?>

													<option value=<?php echo $d ?> <?php if($te== $d){ echo "selected"; } ?>  ><?php echo $d; ?></option>	

													

													<?php } ?>

													

													</select> days and

													

													&nbsp; &nbsp;

													

													

													<select name="schedule_hours" id="shours" class="">

													

													<?php for($h=0; $h<=24; $h++){ 

														

														 $te=(int)$arr_of_time[1];

													  ?>

													<option value=<?php echo $h ?>  <?php if($te== $h){ echo "selected"; } ?> ><?php echo $h; ?></option>	

													

													<?php } ?>

													

													</select> Hours and

													

													&nbsp; &nbsp;

													

													

													<select name="schedule_mins" id="smins" class="">

													

													<?php for($m=0; $m<=30; $m++){ 

														 $te=(int)$arr_of_time[2];

													  ?>

													

													<option value=<?php echo $m ?> <?php if($te== $m){ echo "selected"; } ?> ><?php echo $m; ?></option>	

													

													<?php } ?>

													

													</select> minutes

													

													

													

                                                           <!--

                                                            <input value="<?php //echo $sheduleDate; ?>" type="text" class="form-control" id="datepicker" name="schedule_time">

                                                           -->

                                                      </div>

                                                      

                                                             

                                                        

                                              </div>

                                            

                                          </div><!--.select_settings-->

                                          

                                          <input type="submit" value="Save & Next" class="btn btn-success" name="fourth_sub" id="fourth_sub">

                                          <div id="loader4" class="ld_style"></div>

                                      </div>

                                  </div>

                              </form>

                          </div><!--.step-4-->

                          

                          

                          <div class="step-5 <?php if($step=="fifth_step"){echo "";}else{echo"none";} ?>">

                         

                              <form class="l_first_step" id="l_first_step" action="admin.php?page=masta-autoresponder" method="post">

                                  

                                  <div class="row">

                                      <div class="col-sm-2">

                                          <label>Test email address:</label>

                                      </div>

                                      <div class="col-sm-3 single">

                                          <input name="single_email" type="text" class="validate[required]  form-control">

                                           <div class="success contact-success">Check your email.</div>

                                      </div>

                                      <div class="col-sm-3">

                                          <input type="submit" value="Send Test Email" class="btn btn-success">

                                      </div>

                                      

                                  </div>

                              </form>

                              

                              <form class="l_step" id="l_last_step" action="admin.php?page=masta-autoresponder" method="POST">

                                     <?php

                               global $wpdb;

                               $masta_campaign = $wpdb->prefix . "masta_responder";

                               $campaign_id = $responder_id;

                               $campaigndata = $wpdb->get_results("SELECT * FROM $masta_campaign WHERE `responder_id` = $campaign_id ");

                               $extract_data = $campaigndata[0];

                            

                         

                           ?>

                            <div class="confirm_msg">

                        <input type="hidden" id="ca_status" name="ca_status" value="<?php echo $extract_data->status ;?>">

             <input type="hidden" name="ca_type" id="ca_type" value="<?php echo $extract_data->campaign_type;?>">

                                      <div class="row">

                                          <div class="col-sm-2">

                                              From :

                                          </div>

                                          <div class="col-sm-4">

                                              <?php echo $extract_data->responder_name; ?> <i class="fa fa-check-circle"></i>

                                          </div>

                                      </div>

                                      

                                      <div class="row">

                                          <div class="col-sm-2">

                                              From Email :

                                          </div>

                                          <div class="col-sm-4">

                                              <?php echo $extract_data->from_email; ?> <i class="fa fa-check-circle"></i>

                                          </div>

                                      </div>

                                      

                                      <div class="row">

                                          <div class="col-sm-2">

                                              To list 

                                          </div>

                                          <div class="col-sm-4">

                                               <?php  $listname = $wpdb->get_results("SELECT * FROM $masta_list WHERE `list_id` =" . $extract_data->to_list);

                                              foreach($listname as $lists)

                                              {

                                                echo $lists->list_name;

                                              }

                                                ?>

                                                <i class="fa fa-check-circle"></i>

                                          </div>

                                      </div>

                                      

                                      <div class="row">

                                          <div class="col-sm-2">

                                              Email:

                                          </div>

                                          <div class="col-sm-6">

                                              <textarea class="form-control" rows="8"><?php echo $extract_data->body; ?></textarea>

                                          </div>

                                      </div>

                                      <?php

                                      if(!empty($_POST['schedule_time'])){

                                       $_SESSION['edit']['scheduled_time'] = $_POST['schedule_time'];

                                       }

                                      if(!empty($_SESSION['edit']['scheduled_time'])) { ?>

                                      

                                      <div class="row">

                                          <div class="col-sm-2">&nbsp;</div>

                                          <div class="col-sm-10">

											  <?php 

											     //if(!empty($extract_data->campaign_type) && $extract_data->campaign_type != 1){

												if(false){

											  ?>

                                              <div class="alert_msg">Scheduled on <?php echo date("F j, Y, g:i a", strtotime($_SESSION['edit']['scheduled_time']));?>  <i class="fa fa-check-circle"></i></div>

                                             <?php } ?>

                                          </div>

                                      </div>

                                      <?php  } ?>

                                      

                                      <div class="row">

                                          <div class="col-sm-2">&nbsp;</div>

                                          <div class="col-sm-3">

                                              <input type="submit" name="Confirm" value="Confirm" class="btn btn-success">

                                              <div id="loader5" class="ld_style"></div>

                                          </div>

                                      </div>

                                  </div>

                              </form>

                          </div><!--.step-5-->

                          

                          

                      

                    </div><!--.container-->

                  </div><!--.panel-body-->

                  

               </div>

      

      <?php } } ?>

 

        </div>

        

    </div><!--.mail_masta_wrapper-->

