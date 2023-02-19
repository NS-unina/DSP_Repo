				  $step = $_GET["step"]; 
				
				//step2
				if(!empty($_POST['campaign_name']) && !empty($_POST['sender_name']) && !empty($_POST['sender_email'])) {
                                     print_r($_POST);
                                    echo '<br>';
                                    print_r($_SESSION);
                        $_SESSION['campaign_name']  = $_POST['campaign_name'];
                        $_SESSION['sender_name']  = $_POST['sender_name'];
                        $_SESSION['sender_email'] = $_POST['sender_email'];
                       
                }
				
				//step3
				if(!empty($_POST['sender_selected_list'])) {
                                     print_r($_POST);
                                    echo '<br>';
                                    print_r($_SESSION);
					$_SESSION['sender_selected_list'] = $_POST['sender_selected_list']; 
			        
			    }
				
				//step4
				if(!empty($_POST['campcontent'])) {
                                    print_r($_POST);
                                    echo '<br>';
                                    print_r($_SESSION);
					$_SESSION['design_data'] = $_POST['campcontent'];
				}
				
				//step5
				if(!empty($_POST['radio'])) {
				  	$_SESSION['camp_type'] = $_POST['radio'];
				  	if($_POST['radio'] == '2'){
						$_SESSION['schedule_time'] = $_POST['schedule_time'];
					}
				}
				
				$to_url = 'javascript:void(0)';
				$design_url = 'javascript:void(0)';
				$setting_url = 'javascript:void(0)';
				$confirm_url = 'javascript:void(0)';
				
			?>
            <div class="panel panel-default">
              <div class="panel-heading">Create Compaign</div>
              <div class="panel-body">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="step_navigation">
                                <ul>
                                    <li class="filled">
										
										<a href="admin.php?page=masta-campaign&action=add_campaign&step=first_step">From</a>
                                    
                                    </li>
                                    
                                    <?php if(!empty($_SESSION['campaign_name']) && !empty($_SESSION['sender_name']) && !empty($_SESSION['sender_email']) && $step != 'first_step'){ $to_cls = 'filled'; 
										if($step != 'second_step'){$to_url = 'admin.php?page=masta-campaign&action=add_campaign&step=second_step';} 
                                     }else { $to_cls = '';$to_url = 'javascript:void(0)';}?>
                                    <li class="<?php echo $to_cls;?>">
										<a href="<?php echo $to_url;?>">To</a>
									</li>
                                    
                                    <?php if(!empty($_SESSION['campaign_name']) && !empty($_SESSION['sender_name']) && !empty($_SESSION['sender_email']) && !empty($_SESSION['sender_selected_list']) && $step != 'first_step' && $step != 'second_step'){
									 $design_cls = 'filled';
										 if($step != 'third_step') {
											$design_url = 'admin.php?page=masta-campaign&action=add_campaign&step=third_step';
										  }
									 }else { $design_cls = '';$design_url = 'javascript:void(0)';}?>
                                    <li class="<?php echo $design_cls;?>">
                                        <a href="<?php echo $design_url;?>">Design</a>
                                    </li>
                                    
                                    <?php if(!empty($_SESSION['campaign_name']) && !empty($_SESSION['sender_name']) && !empty($_SESSION['sender_email']) && !empty($_SESSION['sender_selected_list']) && !empty($_SESSION['design_data']) && $step != 'first_step' && $step != 'second_step' && $step != 'third_step'){
										 $setting_cls = 'filled';
											 if($step != 'fourth_step') {
												$setting_url = 'admin.php?page=masta-campaign&action=add_campaign&step=fourth_step';
											  }
									}else { $setting_cls = '';$setting_url = 'javascript:void(0)';}?>
                                    <li class="<?php echo $setting_cls;?>">
                                        <a href="<?php echo $setting_url;?>">Settings</a>
                                    </li>
                                    
                                    
                                    <?php if(!empty($_SESSION['campaign_name']) && !empty($_SESSION['sender_name']) && !empty($_SESSION['sender_email']) && !empty($_SESSION['sender_selected_list']) && !empty($_SESSION['design_data']) && !empty($_SESSION['camp_type']) && $step != 'first_step' && $step != 'second_step' && $step != 'third_step' && $step != 'fourth_step'){ $confirm_cls = 'filled';
										if($step != 'fifth_step') {
											$confirm_url = 'admin.php?page=masta-campaign&action=add_campaign&step=fifth_step';
										}
                                    }else { $confirm_cls = '';$confirm_url = 'javascript:void(0)';}?>
                                    <li class="<?php echo $confirm_cls;?>">
                                    
                                       <a href="<?php echo $confirm_url;?>">Confirm</a>
                                    
                                    </li>
                                    
                                    
                                </ul>
                            </div><!--.step_navigation-->
                        </div>
                    </div>
                </div>
                
                <div class="container">
                 
                    <div class="step-1 <?php if($step=="first_step"){echo "";}else{echo"none";} ?>">
                        <form id="f_step" class="f_step" action=  "admin.php?page=masta-campaign&action=add_campaign&step=second_step" method="POST" name="f_step">
                              
                              <div class="row">
                                <div class="col-sm-2"><label>Campaign Name:</label> </div>
                                <div class="col-sm-4"><input type="text" value="<?php echo $_SESSION['campaign_name']; ?>" name="campaign_name" id="campaign_name" class="validate[required] form-control"> </div>
                            </div>
                              
                            <div class="row">
                                <div class="col-sm-2"><label>From Name:</label> </div>
                                <div class="col-sm-4"><input type="text" value="<?php echo $_SESSION['sender_name']; ?>" name="sender_name" id="sender_name" class="validate[required] form-control"> </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-2"><label>From Email:</label> </div>
                                <div class="col-sm-4"><input type="text" value="<?php echo $_SESSION['sender_email']; ?>" name="sender_email" id="sender_email" class="validate[required,custom[email]] form-control"> </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-2">&nbsp;</div>
                                <div class="col-sm-4">
                                    <input type="submit" value="Save & Next" class="btn btn-black" name="first_sub" id="first_sub">
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="step-2 <?php if($step=="second_step"){echo "";}else{echo"none";} ?>">
                        <form id="s_step" class="s_step" action="admin.php?page=masta-campaign&action=add_campaign&step=third_step" method="POST">
                   
                            <div class="row">
                                <div class="col-sm-2"><label>Select List:</label> </div>
                                <div class="col-sm-4">
                                    <select class="validate[required] form-control" id="sender_selected_list" name="sender_selected_list">
                                          <?php 
                                                global $wpdb;
                                                $list_data_id = $_GET['id'];
                                                $masta_list = $wpdb->prefix . "masta_list";
                                                $listdata = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $masta_list"));
                                                if(empty($_POST['first_sub']) && !empty($_SESSION['sender_selected_list'])){ $lid = $_SESSION['sender_selected_list'];}else{$lid = '';}
                                                ?>
                                       <option value=""> Select List </option>
                                       <?php foreach($listdata as $listdetails) { ?>
                                        <option value="<?php echo $listdetails->list_id; ?>"  <?php if($lid == $listdetails->list_id){echo "selected='selected'";}?>> <?php echo $listdetails->list_name; ?> </option>
                                       
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-2">&nbsp;</div>
                                <div class="col-sm-4">
                                    <div class="add_list">
                                        <button class="btn btn-default btn-sm" id="add_new_field" type="button">
                                            <i class="fa fa-plus-circle"></i>
                                        </button>
                                        <p>Add more lists</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-sm-2">&nbsp;</div>
                                <div class="col-sm-4">
                                    <input type="submit" value="Save & Next" class="btn btn-black" >
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    
                    <div class="step-3 <?php if($step=="third_step"){echo "";}else{echo"none";} ?>">
                        <form id="t_step" class="t_step" action="admin.php?page=masta-campaign&action=add_campaign&step=fourth_step" method="POST">
                         
                            <div class="row">
                                <div class="col-sm-12">
				     <?php if(empty($_POST['sender_selected_list']) && !empty($_SESSION['design_data'])){ $dt = stripslashes($_SESSION['design_data']); }else { $dt = '';}?>
                                    <div class="editor_wrapper"><?php wp_editor( $dt , 'campcontent' ); ?></div>
                                </div>
                            </div>
                            <div>&nbsp;</div>
                            <div class="row">
                                    <div class="col-sm-3">
                                          <input type="submit" value="Save & Next" class="btn btn-black" >
                                    </div>
                            </div>
                        </form>
                    </div><!--.step-3-->
                    
                    <div class="step-4 <?php if($step=="fourth_step"){echo "";}else{echo"none";} ?>">
                   
                        <form id="time_setup" class="ff_step" action="admin.php?page=masta-campaign&action=add_campaign&step=fifth_step" method="POST">
                            <div class="row">
                                <div class="col-sm-12">
                                   <!-- <input type="submit" value="Send" class="btn btn-default" />
                                    <hr />-->
                                    <div class="select_opt">
                                        <p><input type="radio" name="radio" id="rightnow" value="1" /> Send now </p>
                                        <p><input type="radio" name="radio" id="schedule" value="2" /> Schedule</p>
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
                                    <div class="select_settings" style="<?php if(!empty($_SESSION['scheduled_time'])) {echo "display: block";} else{echo "display: none";}?>">
                                         <div class="well">
                                           
                                                <div class="input-group calendar_icon">
                                                      <input value="<?php echo $_SESSION['scheduled_time']; ?>" type="text" class="form-control" id="datepicker" name="schedule_time">
                                                     
                                                </div>
                                                
                                                       
                                                  
                                        </div>
                                      
                                    </div><!--.select_settings-->
                                    
                                    <input type="submit" value="Save & Next" class="btn btn-black" name="fourth_sub" id="fourth_sub">
                                    
                                </div>
                            </div>
                        </form>
                    </div><!--.step-4-->
                    
                    
                    <div class="step-5 <?php if($step=="fifth_step"){echo "";}else{echo"none";} ?>">
                   
                        <form class="l_first_step" id="l_first_step" action="admin.php?page=masta-campaign" method="post">
                            
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Test email address:</label>
                                </div>
                                <div class="col-sm-3 single">
                                    <input name="single_email" type="text" class="validate[required,custom[email]]  form-control">
                                     <div class="success contact-success">Check your mail</div>
                                </div>
                                <div class="col-sm-3">
                                    <input type="submit" value="Send Test Email" class="btn btn-success">
                                </div>
                                
                            </div>
                        </form>
                        
                        <form class="l_step" id="l_last_step" method="POST">
                            <div class="confirm_msg">
                                <div class="row">
                                    <div class="col-sm-2">
                                        From :
                                    </div>
                                    <div class="col-sm-4">
                                        <?php echo $_SESSION['sender_name'];?> <i class="fa fa-check-circle"></i>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-sm-2">
                                        From Email :
                                    </div>
                                    <div class="col-sm-4">
                                        <?php echo $_SESSION['sender_email'];?> <i class="fa fa-check-circle"></i>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-sm-2">
                                        To list 
                                    </div>
                                    <div class="col-sm-4">
                                         <?php  $listname = $wpdb->get_results($wpdb->prepare("SELECT * FROM $masta_list WHERE `list_id` =" . $_SESSION['sender_selected_list']));
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
                                        <textarea class="form-control" rows="8"><?php echo stripslashes($_SESSION['design_data']); ?></textarea>
                                    </div>
                                </div>
                                <?php
                                 $_SESSION['scheduled_time'] = $_POST['schedule_time'];
                                if(!empty($_SESSION['scheduled_time'])){ ?>
                                
                                <div class="row">
                                    <div class="col-sm-2">&nbsp;</div>
                                    <div class="col-sm-10">
                                        <div class="alert_msg">Scheduled on <?php echo date("F j, Y, g:i a", strtotime($_SESSION['scheduled_time']));?>  <i class="fa fa-check-circle"></i></div>
                                    </div>
                                </div>
                                <?php  } ?>
                                
                                <div class="row">
                                    <div class="col-sm-2">&nbsp;</div>
                                    <div class="col-sm-3">
                                        <input type="submit" value="Confirm1" class="btn btn-black">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div><!--.step-5-->
                    
                    
                
              </div><!--.container-->
            </div><!--.panel-body-->
            
         </div>