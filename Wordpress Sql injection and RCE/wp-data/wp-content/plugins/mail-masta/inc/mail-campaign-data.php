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


		list_valid='';


		jQuery(document).ready(function(){


					


						  


					jQuery('#ccampia').click(function(){


							


								var count_list=jQuery.trim(jQuery('#list_s_0').val());	


								if(count_list=='0' || count_list=='')


								{


										alert("You have to create a list first");


								}


								else


								{


									


										window.location.href="admin.php?page=masta-campaign&action=add_campaign&step=first_step&new=newCampaign";


									


								}


								


						});


					jQuery('.crun').click(function(){


						var playid=jQuery(this).attr('id');


						


						jQuery(this).removeClass('fa-pause');


						jQuery(this).addClass('fa-pause');


						


						var fles=jQuery(this).attr('camcon');


						playidarr=playid.split('-');


  						var urd=jQuery('.fra-'+playidarr[1]+' iframe').attr('refs')+'&play='+fles;


  						jQuery('.fra-'+playidarr[1]+' iframe').attr('src','');


  						jQuery('.fra-'+playidarr[1]).show();


  						jQuery('.fra-'+playidarr[1]+' iframe').attr('src',urd);


					


						if(fles=='start'){


							jQuery(this).attr('camcon','stop');


							jQuery(this).find('i').removeClass('fa-play');


							jQuery(this).find('i').addClass('fa-pause');


						}


						else if(fles=='stop'){


								jQuery(this).attr('camcon', 'start');


								jQuery(this).find('i').removeClass('fa-pause');


								jQuery(this).find('i').addClass('fa-play');


						}


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


									


									var url='<?php echo dirname( __FILE__ ) ?>/campaign/test_mail.php';


								


									jQuery.post(ajaxurl,{'action': 'my_action', 'url': url, 'camp_id' : c_id, 'test_mail': t_mail  }, function(resp){





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


						   var $ready=0;


						     	var list_id=jQuery('#sender_selected_list').val();


						  			var url= '<?php echo  dirname( __FILE__ ) ?>/campaign_save.php';


									jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'sender_selected_list_check':'check', 'list_id' : list_id}, function(resp){


										


																				


										if(parseInt(resp)>0)


										{


																				


														


                          if (status) {


									


														 


	


									


                                jQuery('#loader').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');


                                          var camp_name = jQuery(".f_step input[name='campaign_name']").val();


                                          var sender_name = jQuery(".f_step input[name='sender_name']").val();


                                          var sender_email = jQuery("#sender_email").val();


                                          var sender_list = jQuery("#sender_selected_list").val();


										  


										  var subject = jQuery("#subject").val();


                                          var camp_step = "first_step";


                                          


                                          


                                           var url = '<?php echo dirname( __FILE__ ) ."/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';


                                         


												


												 


                                             jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url,  'camp':camp_name,'subject':subject,'slistid':sender_list,'sname':sender_name,'semail':sender_email,'step':camp_step}, function (resp){


												 	


												 


												    if (resp != '')


                                                         {


                                                            form.validationEngine('detach');


                                                               form.submit();  


                                                         }


                                                         else


                                                         {


                                                          


                                                            //   alert("dfsfds");


                                                               alert(resp);


                                                         }


                                                     


                                                   }) 


                                          }else {


                                                    


                                                   


                                                    return false;


                                                }


												


												


												


												


												}


												


												


												else {


													


													alert('There are no subscribers in the selected list.');


													


													}


										


										});


						   


                                                


                                              } 


                                              


                                              });


                                            


                      /*First step end*/


                  


                      


                        /*Second step start*/


                       


                      jQuery("#s_step").validationEngine("attach",{


                       onValidationComplete:function(form,status){


                          if (status)


                              {


                                   jQuery('#loader2').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');


                                   var sender_list = jQuery("#sender_selected_list").val();


                                   var camp_step = "second_step";


                                         var url = '<?php echo dirname( __FILE__ ) ."/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';


										 	   


                                        jQuery.post( ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'slistid':sender_list,'step':camp_step}, function (resp){


                                              


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


                                  


                                  return false;


                              }


                              


                            } 


                            


                            });


                          


                      /*Second step end*/


                      


                      


                        /*Third step start*/


                        


                      jQuery("#t_step").validationEngine("attach",{


                       onValidationComplete:function(form,status){


                          if (status) {


                               jQuery('#loader3').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');


                               var design_data = jQuery("#campcontent").val();


                                 var camp_step = "third_step";


                                 


                                 jQuery('.step-3').append('<div class="das" style="display:none">'+design_data+'</div>');	


                                


                                jQuery(".das a" ).each(function( index ) {


									var ref=jQuery(this).attr("href");


									ref= ref.replace('http://', '');


									ref= ref.replace('https://', '');


									jQuery(this).attr("href","<?php echo home_url()."?id=mailmastadata";  ?>&link=" + ref);


									


									


								});


                                var ddata=jQuery('.das').html();


                                


                                    var url = '<?php echo dirname( __FILE__ ) ."/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';


                                    jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url, 'campbody':design_data,'step':camp_step,'cammail':ddata}, function (resp){


                                             


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


                              jQuery('#loader4').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');


                               


                              


                 var radio = jQuery("input[name='radio']:checked").val(); 


                


                              if (jQuery("#datepicker").val()!="") {


                                  var time_interval = jQuery("#datepicker").val();  


                              }else{


                                    


                                    var time_interval =  "";


                                    


                              }


                               


                                 var camp_step = "fourth_step";


                                 var cam_type = jQuery( "input:radio[name=radio]:checked" ).val();


                              //   alert(cam_type);


 var url = '<?php echo dirname( __FILE__ ) ."/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';


 


                                    jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action',  'url': url,  'timestamp':time_interval,'step':camp_step,'radio':radio,'type':cam_type}, function (resp){


                        


                                                              if (resp == 2)


                                                {


                                                    


														


                                                window.location.href="admin.php?page=masta-campaign";


                                                }


                                                else{


                                                      var temp = resp.split("_");


                                                      var camp_id = temp[1];


                                                      //alert(camp_id);return false;


                                                      


                                                         window.location.href="admin.php?page=masta-campaign&action=immediate_send&send_id="+camp_id;


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


                                   jQuery('#loader5').html('<img src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');


                                 var last_step = "last_step";


                                 var cam_status = jQuery("#ca_status").val();


                                 var cam_type = jQuery("#ca_type").val();


                                  var url = '<?php echo dirname( __FILE__ ) ."/".(($action =="add_campaign")? "campaign_save.php" : "campaign_edit.php?id=".$id) ; ?>';


                                    jQuery.post(ajaxurl+'?id=<?php echo $id ?>',{'action': 'my_action', 'url': url,  step :last_step,status:cam_status,type:cam_type}, function (resp){


                                       // alert(resp);return false;


                                         if (resp != '')


                                          {


                                               


                                                 if (resp == 2)


                                                {


                                                     // alert(resp);return false;


                                                window.location.href="admin.php?page=masta-campaign";


                                                }


                                                else{


                                                      var temp = resp.split("_");


                                                      var camp_id = temp[1];


                                                      //alert(camp_id);return false;


                                                         window.location.href="admin.php?page=masta-campaign&action=immediate_send&send_id="+camp_id;


                                                  }


                                          }


                                         else


                                          {


                                              alert("Seems connection problem !! Try again");    


                                          }


                                     


                                         })


                               


                               });


                      


                                


                               jQuery(".duplicate_campaign").on('click',function (e)


                                    {


                                      //alert("dsadsa");


                                    


									       var url = '<?php echo dirname( __FILE__ ) ."/duplicate_campaign.php" ?>';


                                	  


                                	      var id = jQuery(this).attr('id');


                                        jQuery.post(ajaxurl, {'action': 'my_action', 'url': url, 'camp_id' : id}, function (resp){


                                         // alert(resp);return false;


                                                if (resp != '' && resp != 1)


                                                {


									var newid = resp;


									window.location.href="admin.php?page=masta-campaign&id="+newid+"&action=edit_campaign&step=first_step";


                                               


                                                }


                                                else


                                                {


                                                  alert("Something went wrong");


                                                }


                                            


                                          })


                                   


                                      


                                       


                                    }); 


                                


                          });


        


        		


        function deleteCamp(CampId)


          {


             if (confirm("Are You sure want to delete this campaign?")) {


               window.location.href="admin.php?page=masta-campaign&id="+CampId+"&action=delete_campaign";


             } else {


               


               return false;


             }


           


           


          }       


        


	</script>


  <div class="mail_masta_wrapper">


   


        <div class="clearfix heading">


            <div class="mm_float_left">


                <h1><a href="<?php echo admin_url(); ?>/admin.php?page=masta-campaign">Campaigns</a></h1>


            </div>


            <?php


            $query="";


            $query = (string) $query; 


            if(!isset($_GET["action"]) || $_GET["action"]=='immediatesend') { ?>


            <div class="mm_float_right">


                <a href="javascript:void(0)" id="ccampia" class="btn btn-success"><i class="fa fa-plus-circle"></i> Create Campaign</a>


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


            


                      <?php if($camp_action=="delete_campaign")


                        {  


                            


                            global $wpdb;


                            $masta_campaign = $wpdb->prefix . "masta_campaign";


                            $camp_id = $_GET["id"];


							//echo "DELETE FROM $masta_campaign WHERE camp_id = $camp_id";


							//echo $list_id;exit;


                           include ( dirname( __FILE__ ) . '/campaign/campaign-delete.php' );


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


                             include ( dirname( __FILE__ ) . '/campaign/immediate_campaign.php' );


                             ?>


                        


                                


                             </div><!--.view_list-->


                  <?php  } ?>                  


            <?php if($camp_action =="" || $camp_action=='immediatesend'){ ?>


           


            <div class="table-responsive">


                <table class="table table-bordered">


                  <tbody>


                    <?php


                    global $wpdb;


                    $masta_campaign = $wpdb->prefix . "masta_campaign";


                    $masta_reports = $wpdb->prefix . "masta_reports";


                    $masta_subscribers = $wpdb->prefix . "masta_subscribers";


                    $campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign");


                    if(count($campaigndata) > 0) { 


                    foreach($campaigndata as $cdata){


                        $timing = $cdata->create_date;


                        $modified_date = date("F j, Y",strtotime($timing));


                        


                        $timing2 = $cdata->shedule_date;


                        $sch_date = date("F j, Y",strtotime($timing2));


                        


                        


                        $camp_status = $cdata->status;


                        $campId = $cdata->camp_id;


                        $listId = $cdata->to_list;


                        $opened = 0;


                        $ttl_subscriber = 0;


                        $clicked = 0;


                        if($camp_status == 1) {


							


							


							$avg_sql = "SELECT count(id) as ttl_sent,


							(select count(id) from $masta_reports where `camp_id` = $campId and `status` = 1 and `sub_status` = 1 and `opened` = 1) as ttl_opened, 


							(select count(id) from $masta_reports where `camp_id` = $campId and `status` = 1 and `sub_status` = 1 and `clicked` = 1) as ttl_clicked


							  FROM $masta_reports WHERE `camp_id` = $campId and `status` = 1 and `sub_status` = 1";


							


							 $reportdata = $wpdb->get_results($avg_sql);


							 


							 $ttlsent = (!empty($reportdata[0]->ttl_sent)) ? $reportdata[0]->ttl_sent : '0';


							 $ttlopened = (!empty($reportdata[0]->ttl_opened)) ? $reportdata[0]->ttl_opened : '0';


							 $ttlclicked = (!empty($reportdata[0]->ttl_clicked)) ? $reportdata[0]->ttl_clicked : '0'; 


							 if($ttlsent != '0' && $ttlopened != '0'){


									$opened = ($ttlopened / $ttlsent ) *100; 


								}


								if($ttlsent != '0' && $ttlclicked != '0'){


									$clicked = ($ttlclicked / $ttlsent ) *100; 


								} 


							


							


							$users_sql = "select count(id) as ttl_subscriber from $masta_reports WHERE `camp_id` = $campId and `sub_status` = 1 ";


							$userdata = $wpdb->get_results($users_sql);


							if(count($userdata) > 0) {


								$ttl_subscriber = $userdata[0]->ttl_subscriber; 	


							}


						} else {


								


								$users_sql = "select count(id) as ttl_subscriber from $masta_subscribers WHERE `list_id` = $listId and `status` = 1 ";


								$userdata = $wpdb->get_results($users_sql);


								if(count($userdata) > 0) {


									$ttl_subscriber = $userdata[0]->ttl_subscriber; 	


								}


		


						}


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


											  $class =  "fa fa-calendar";


											  $status='Scheduled';


											  break;


											  }	


										default :{


											 $class =  "";


											  $status='';	  		     	   


										  }


									  }


                                      ?> 


						


                      <td class="icon-col" title="<?php echo $status;?>"><i class="<?php echo $class; ?>"></i></td>


                      <td class="campaign-heading">


						  <?php if($cdata->status == 3 || $cdata->status == 5 ){ 


							?>


					<a href="admin.php?page=masta-campaign&id=<?php echo $cdata->camp_id; ?>&action=edit_campaign&step=first_step"><?php   echo $cdata->campaign_name; ?></a>


							<?php   } else {


								    echo $cdata->campaign_name;


								    } 


							?>


                          


                      	<div class="mm_view_desc">


						  <?php  echo '<strong>'.$status.'</strong>';  


						  


						  if($status=='Sent'){


							  echo ' on '.$modified_date;  


							  }


							else if($status=='Scheduled'){


							  echo " for ".$sch_date;	


							}


						  


						  ?> 


						</div>	


						


					   


					   </td>


                       


                       <?php $selected_list =  $cdata->to_list;


                     


				      //~ $camp_subscribers = $wpdb->get_var( $wpdb->prepare("SELECT COUNT( `list_id` ) FROM $masta_subscribers WHERE list_id= $selected_list",$query));


							 ?>


							   <?php if($cdata->status==4 ) { ?>


								<td colspan="3"><div class="fra fra-<?php echo $cdata->camp_id; ?>" style="width: 100%; margin-top:20px; "><iframe style="height: 45px; overflow: hidden; width: 100%;" src="<?php  echo admin_url(); ?>/admin.php?page=immsend&play=start&id=<?php echo $cdata->camp_id; ?>" refs="<?php  echo admin_url(); ?>/admin.php?page=immsend&play=start&id=<?php echo $cdata->camp_id; ?>"></iframe></div></td>


								<?php }


                else if($cdata->status==2){


                  ?>


                 <td colspan="3"><div class="fra fra-<?php echo $cdata->camp_id; ?>" style="width: 100%; margin-top:20px; "><iframe style="height: 45px; overflow: hidden; width: 100%;" src="<?php  echo plugins_url(); ?>/mail-masta/inc/campaign/view-campaign-list.php?play=stop&id=<?php echo $cdata->camp_id; ?>" refs="<?php  echo plugins_url(); ?>/mail-masta/inc/campaign/view-campaign-list.php?id=<?php echo $cdata->camp_id; ?>"></iframe></div></td> 


                  <?php


                }


              else {	 ?>


									


                      <td><?php echo $ttl_subscriber; ?> subscribers</td>


					<?php if($cdata->status!=3) { ?>


                      <td><?php echo round($opened,2).'%';?> open </td>


                      <td><?php echo round($clicked,2).'%';?> click </td>


					<?php } else { ?>


						<td>-</td>


                        <td>-</td>


					<?php } ?>			


						<?php } ?>


                      <td class="text-center action_wrp">


                        <?php if($cdata->status!=1 && $cdata->status!=2 && $cdata->status!=4 ){ ?> 


                        


                        <a href="admin.php?page=masta-campaign&id=<?php echo $cdata->camp_id; ?>&action=edit_campaign&step=first_step" class="action_icons"><i class="fa fa-pencil"></i> <p>Edit</p></a>


                        <?php } else { 


								if($cdata->status==2) {


										$cls = 'fa fa-play';


										$p_text = 'Resume';


								?>


								  <a href="javascript:void(0)"  class="crun action_icons" camcon="start" id="crun-<?php echo $cdata->camp_id; ?>" ><i class="<?php echo $cls;?>"></i> <p><?php echo $p_text;?></p></a>


								<?php		


										


								} 


                else if($cdata->status==4) {


                    $cls = 'fa fa-pause';


                    $p_text = 'Pause';


                ?>


                  <a href="javascript:void(0)"  class="crun action_icons" camcon="stop" id="crun-<?php echo $cdata->camp_id; ?>" ><i class="<?php echo $cls;?>"></i> <p><?php echo $p_text;?></p></a>


                <?php   


                    


                }


                else {


									    $cls = 'fa fa-eye';


									    $p_text = 'Report';	


									?>


									 <a href="admin.php?page=masta-campaign&id=<?php echo $cdata->camp_id; ?>&action=view_campaign" class="action_icons report_bar" ><p><?php echo $p_text;?></p></a>	


									


									<?php


								}


							?>


                          


                      


                        <?php } ?>


                        <?php


                        	if($cdata->status != 3) {  


						?>


                        <a href="javascript:void(0);" id="<?php echo $cdata->camp_id; ?>" class="action_icons duplicate_campaign"><i class="fa fa-copy"></i> <p>Duplicate</p></a>


                        <?php } ?>


                        <a onclick ="return deleteCamp(this.id)" href="javascript:void(0)" class="action_icons" id="<?php echo $cdata->camp_id; ?>"><i class="fa fa-trash-o"></i> <p>Delete </p></a>


                    


                 


                    


                      </td>


                      


                      </tr>


					


					


					


                    


                    <?php } 


                       


					   } else {


						   


						   $masta_list=$wpdb->prefix.'masta_list';


						   $masta_list=$wpdb->get_var("SELECT count(*) from $masta_list");


						    echo '<h2>There are no campaigns yet.<h2>';							   


						    echo "<input type='hidden' id='list_s_0'  value='". $masta_list ."'>";


						}


                    ?>


                  </tbody>


                </table>


                


            </div>


            <?php }


			


			$masta_list=$wpdb->prefix.'masta_list';


			$masta_list=$wpdb->get_var("SELECT count(*) from $masta_list");


			echo "<input type='hidden' id='list_s_0'  value='". $masta_list ."'>";


			


			 ?>


             


            <?php if($camp_action =="view_campaign")


                  {


                          global $wpdb;


                          $masta_campaign = $wpdb->prefix . "masta_campaign";


                          $camp_id = $_GET["id"];


                          include ( dirname( __FILE__ ) . '/campaign/view-campaign.php' );


                  


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


              <div class="panel-heading">Create Campaign</div>


              <div class="panel-body">


                <div class="container">


                    <div class="row">


                        <div class="col-sm-12">


                            <div class="step_navigation">


                                <ul>


                                    <li class="filled">


										


										<a href="admin.php?page=masta-campaign&action=add_campaign&step=first_step">Info</a>


                                    


                                    </li>


                                    


                                    <?php if(!empty($_SESSION['add']['campaign_name']) && !empty($_SESSION['add']['sender_name']) && !empty($_SESSION['add']['sender_email']) && $step != 'first_step'){ $to_cls = 'filled'; 


										if($step != 'second_step'){$to_url = 'admin.php?page=masta-campaign&action=add_campaign&step=second_step';} 


                                     }else { $to_cls = '';$to_url = 'javascript:void(0)';}?>


                                    <li class="<?php echo $to_cls;?>">


										<a href="<?php echo $to_url;?>">Design</a>


									</li>


                                    


                                    <?php if(!empty($_SESSION['add']['campaign_name']) && !empty($_SESSION['add']['sender_name']) && !empty($_SESSION['add']['sender_email']) && !empty($_SESSION['add']['sender_selected_list']) && $step != 'first_step' && $step != 'second_step'){


									 $design_cls = 'filled';


										 if($step != 'third_step') {


											$design_url = 'admin.php?page=masta-campaign&action=add_campaign&step=third_step';


										  }


									 }else { $design_cls = '';$design_url = 'javascript:void(0)';}?>


                                    <li class="<?php echo $design_cls;?>">


                                        <a href="<?php echo $design_url;?>">Setting</a>


                                    </li>


                                    


                                    


                             


                                </ul>


                            </div><!--.step_navigation-->


                        </div>


                    </div>


                </div>


                


                <div class="container mm_form_style">


                


                 


                    <div class="step-1 <?php if($step=="first_step"){echo "";}else{echo"none";} ?>">


                        <form id="f_step" class="f_step form-horizontal" action=  "admin.php?page=masta-campaign&action=add_campaign&step=second_step" method="POST" name="f_step">


                              


                              <div class="form-group">


                              	<label class="control-label col-sm-3">Campaign Name:</label>


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


                                <div class="col-sm-4">


									<?php 


								    global $wpdb;


									error_reporting(0);


									$masta_settings = $wpdb->prefix."masta_settings";


									$app_details = $wpdb->get_results("SELECT * FROM $masta_settings");


									$rows_data = $app_details[0];


									$send_type = $rows_data->send_type;


									//print_r($rows_data);


									if($send_type == 1) { 


									$ses = new SimpleEmailService($rows_data->accesskey, $rows_data->secretkey);


									$data = $ses->getSendQuota();


									$verified_senders = $ses->listVerifiedEmailAddresses();


									


									if(!empty($verified_senders['Addresses'])){


										


									   $sender_emails = $verified_senders['Addresses'];


									}


								


								   


								?>


									<select name="sender_email"  id="sender_email" class="validate[required] form-control select_sty">


											<option value=""></option>


											<?php


											      if(count($sender_emails) > 0) {


														foreach($sender_emails as $smail):


																$check = (!empty($_SESSION['add']['sender_email']) && $_SESSION['add']['sender_email'] == $smail)? 'checked="checked"' : ''; 


														       echo '<option value="'.$smail.'" '.$check.'>'.$smail.'</option>';


														endforeach;


													  


													}


											?>


									</select>


									


								<?php } else {


								?>


								 <input type="text" style="z-index: 1; position: static;"  value="<?php if(!empty($_SESSION['add']['sender_email'])){ echo $_SESSION['add']['sender_email'];} ?>" name="sender_email" id="sender_email" class="validate[required,custom[email]] form-control"> 


									


									


									


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


                        <form id="t_step" class="t_step" action="admin.php?page=masta-campaign&action=add_campaign&step=third_step" method="POST">


                         


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


                    


                               <div class="col-sm-12 form-group" id="testdiv">


											<input class="col-sm-4" type="text" id="test_input" placeholder="email@domain.com"> <input class="col-sm-1 btn btn-success" type="submit" id="mail_test" value="test" style="margin-left:13px">


  </div>


  


                   


                        <form id="time_setup" name="time_setup" class="ff_step" action="admin.php?page=masta-campaign&action=add_campaign&step=fourth_step" method="POST">


                            <div class="row">


                                <div class="col-sm-12">


                                   <!-- <input type="submit" value="Send" class="btn btn-default" />


                                    <hr />-->


                                    <div class="select_opt">


                                        <p><input type="radio" name="radio" id="rightnow" value="1" class="validate[required]"/> Send now </p>


                                        <p><input type="radio" name="radio" id="schedule" value="2" <?php echo get_option('masta-active-checked')=='' || get_option('masta-active-checked')=='false'?'disabled':''; ?> class="validate[required]"/> Schedule</p>


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


                                          jQuery(document).ready(function()


                                          {


                                               


                                                jQuery('#datepicker').datetimepicker


                                                ({


                                                


                                                      showOn: "both",


                                                      buttonImageOnly: true,


                                                      dateFormat: 'yy-mm-dd',


                                                      buttonImage:'<?php echo plugins_url();?>/mail-masta/lib/css/images/calendar.png',


                                                      buttonText: "Calendar",


                                                      minDate: new Date()


                                                


                                                });


                                          


                                          });


                                                


                                          


                                   


                                         


                                        </script>


                                    <div class="select_settings" style="<?php if(!empty($_SESSION['add']['scheduled_time'])) {echo "display: block";} else{echo "display: none";}?>">


                                         <div class="well">


                                           


                                                <div class="input-group calendar_icon">


                                                      <input value="<?php if(!empty($_SESSION['add']['scheduled_time'])){echo $_SESSION['add']['scheduled_time'];} ?>" type="text" class="form-control" id="datepicker" name="schedule_time">


                                                     


                                                </div>


                                                


                                                <?php


                               global $wpdb;


                               $masta_campaign = $wpdb->prefix . "masta_campaign";


                               $campaign_id = $_SESSION['add']['camp_id'];


                               $campaigndata = $wpdb->get_results("SELECT * FROM $masta_campaign WHERE `camp_id` = $campaign_id ");


                 $extract_data = $campaigndata[0];


                           // echo $extract_data->shedule_date;


                           // echo $extract_data->status;


                           //echo $extract_data->campaign_type;


                           ?>


                          


                        <input type="hidden" id="ca_status" name="ca_status" value="<?php echo $extract_data->status ;?>">


             <input type="hidden" name="ca_type" id="ca_type" value="<?php echo $extract_data->campaign_type;?>">


                                                       


                                                  


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


            


<?php if($camp_action =="edit_campaign"){    ?>


    


                      <?php   global $wpdb;


            $masta_campaign = $wpdb->prefix . "masta_campaign";


            $step = $_GET["step"];


            $camp_id=$_GET["id"];


            $campaigndata = $wpdb->get_results( "SELECT * FROM $masta_campaign WHERE camp_id = $camp_id");


            //print_r($campaigndata);


            //print_r($_POST);


            //print_r($_SESSION);


            foreach($campaigndata as $campdata)


            {


                                        $campname = $campdata->campaign_name;


										$subject = $campdata->subject;


                                        $campsender = $campdata->from_name;


                                        $camperemail = $campdata->from_email;


                                        $camplist = $campdata->to_list;


                                        $campbody = $campdata->body;


                                        $campaignType = $campdata->campaign_type;


                                        $sheduleDate = $campdata->shedule_date;


                                        //print_r($campbody);


                                      //step2


                                      if(!empty($_POST['campaign_name']) && !empty($_POST['sender_name']) && !empty($_POST['sender_email']))


                                      {


                                                      


                                             $_SESSION['edit']['campaign_name'] = $_POST['campaign_name'];


											 


											 


											 $_SESSION['edit']['subject'] = $_POST['subject'];


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


                                    }


                                      


                              ?>


              


                  <div class="panel panel-default">


                    <div class="panel-heading">Edit Campaign</div>


                    <div class="panel-body">


                      <div class="container">


                         <div class="row">


                              <div class="col-sm-12">


                                  <div class="step_navigation edit_step_navigation">


                                      <ul>


                                          <li class="filled">


                                                                                      


                                              <a href="admin.php?page=masta-campaign&id=<?php echo $camp_id;?>&action=edit_campaign&step=first_step">Info</a>


                                          


                                          </li>


                                         


                                         


                                          <?php if($campbody!='' || $step=='second_step') { 


                            if($step=='second_step') { $to_cls='filled'; $design_cls='filled'; }


                            $design_url = 'admin.php?page=masta-campaign&id='.$camp_id.'&action=edit_campaign&step=second_step';


                      }  else { 


                            $design_cls = '';$design_url = 'javascript:void(0)';


                          } ?>


                                          


                                         


                                     


                                          


                                 


                                                                              


                                             <?php if($campbody!='' || $step=='third_step') {


                            if($step=='third_step') { $to_cls='filled'; $design_cls='filled'; $setting_cls='filled'; }


                            $setting_url = 'admin.php?page=masta-campaign&id='.$camp_id.'&action=edit_campaign&step=third_step';


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


                                    </div></div></div>


                                        <div class="container mm_form_style">


                          <div class="step-1 <?php if($step=="first_step"){echo "";}else{echo"none";} ?>">


                              <form id="f_step" class="f_step form-horizontal" action="admin.php?page=masta-campaign&id=<?php echo $camp_id;?>&action=edit_campaign&step=second_step" method="POST" name="f_step">


                                    


                                    <div class="form-group">


                                     <label class="control-label col-sm-3">Campaign Name:</label>


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


                                  


                                  <div class="row">


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


                                      <div class="control-label col-sm-3"><label>Send to list:</label> </div>


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


                              <form id="t_step" class="t_step" action="admin.php?page=masta-campaign&id=<?php echo $camp_id;?>&action=edit_campaign&step=third_step" method="POST">


                               


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


                          


                       <div class="col-sm-12 form-group" id="testdiv">


											<input class="col-sm-4" type="text" id="test_input" placeholder="email@domain.com"> <input class="col-sm-1 btn btn-success" type="submit" id="mail_test" value="test" style="margin-left:13px">


  </div>


                                       


                               <form id="time_setup" class="ff_step" action="admin.php?page=masta-campaign&id=<?php echo $camp_id;?>&action=edit_campaign&step=fifth_step" method="POST">


                                   <div class="row">


									


										


                                      <div class="col-sm-12">


                                           <div class="select_opt">


                                           


                                           


                                              <p><input type="radio" name="radio" id="rightnow" <?php if($campaignType =='1') { echo "checked"; } ?>  value="1" /> Send now </p>


                                              <p><input type="radio" <?php echo get_option('masta-active-checked')=='' || get_option('masta-active-checked')=='false' ?'disabled':''; ?> name="radio" id="schedule" <?php if($campaignType =='2') { echo "checked"; } ?> value="2" /> Schedule</p>


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


                                                jQuery(document).ready(function()


                                                {


                                                     


                                                      jQuery('#datepicker').datetimepicker


                                                      ({


                                                      


                                                            showOn: "both",


                                                            buttonImageOnly: true,


                                                            dateFormat: 'yy-mm-dd',


                                                            buttonImage:'<?php echo plugins_url();?>/mail-masta/lib/css/images/calendar.png',


                                                            buttonText: "Calendar",


                                                            minDate: new Date()


                                                      


                                                      });


                                                


                                                });


                                                      


                                                


                                         


                                               


                                              </script>


                                          <div class="select_settings" style="<?php if($campaignType=='2') {echo "display: block";} else{echo "display: none";}?>">


                                               <div class="well">


                                                 


                                                      <div class="input-group calendar_icon">


                                                            <input value="<?php echo $sheduleDate; ?>" type="text" class="form-control" id="datepicker" name="schedule_time">


                                                           


                                                      </div>


                                                      


                                                             


                                                        


                                              </div>


                                            


                                          </div><!--.select_settings-->


                                              <div class="confirm_msg">


                        <input type="hidden" id="ca_status" name="ca_status" value="<?php echo $extract_data->status ;?>">


             <input type="hidden" name="ca_type" id="ca_type" value="<?php echo $extract_data->campaign_type;?>">


                                          


                                          <input type="submit" value="Confirm" class="btn btn-success" name="fourth_sub" id="fourth_sub">


                       <div id="loader4" class="ld_style"></div>  


                                      </div>


                                      </div>


                                    </div>


                                </form>   


                             </div>


                           </div>


                             


                    </div>


                </div>


              </div>


      <?php }  ?>


            


            


            


            <!--Campaign editing end-->


            


            


            


        </div>


        


    </div><!--.mail_masta_wrapper-->


