<div class="panel panel-default">

                  <div class="panel-heading clearfix">

                    <div class="mm_float_left">

                        

                       

                        <script language="javascript">
						
						
							function selectAllList(){

								if (jQuery('#Oacheckbox').attr("checked")){
									
									jQuery('.checkalllist').prop('checked', true);
										
									}
								else{
									
									jQuery('.checkalllist').prop('checked', false);
									
									}
								
								
								
								
								}

                            function validate()

                            {

                            var chks = document.getElementsByName('checkbox[]');

                            var hasChecked = false;

                            for (var i = 0; i < chks.length; i++)

                            {

                            if (chks[i].checked)

                            {

                                hasChecked = true;

                                break;

                            }

                            }

                            if (hasChecked == false)

                            {

                                alert("Please select at least one.");

                                return false;

                            }

                                return true;

                            }

                            

						  function deleteMember(MemberId)

						  {

							 if (confirm("Are you sure you want to delete this member?")) {

								 var temp = MemberId.split("~");

								 var listId = temp[0];

								 var memberId = temp[1];

							   window.location.href="admin.php?page=masta-lists&action=delete_member&filter_list="+listId+"&member_id="+memberId;

							 } else {

							   

							   return false;

							 }

						   

						   

						  }

						  

						  function confirmdel(){

							  

							  if (confirm("Are you sure you want to delete these members?")) {

								  return true;

								} else {

								  return false;	

							  }

							 }

                        </script>

                        <?php

                         global $wpdb;

                         $list_id = $_GET['filter_list'];

                         $masta_list = $wpdb->prefix . "masta_list";

                         $masta_subscribers = $wpdb->prefix . "masta_subscribers";

                         $listdata = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $masta_list WHERE list_id= $list_id",$query));

                         $list_subscribers = $wpdb->get_var( $wpdb->prepare("SELECT COUNT( `list_id` ) FROM $masta_subscribers WHERE list_id= $list_id AND status=1",$query));

                       

                        if(isset($_POST["memberupdate"]))

                        {

                         $first_name = $_POST["fname"];

                         $last_name = $_POST["lname"];

                         $email = $_POST["email"];

                         $member_id = $_POST["member_id"];

                         $update_data  = array('fname' => $first_name,'lname' => $last_name,'email'=> $email); $data_id = array('id'=>$member_id);

                         $rows_affected_one = $wpdb->update( $masta_subscribers, $update_data, $data_id);

                        }

                        

                         if(isset($_POST["addnewmember"]))

                        {

                         $first_name = $_POST["fname"];

                         $last_name = $_POST["lname"];

                         $email = $_POST["email"];

                         $listid = $_POST["list_member"];

                         $rq_ip = $_SERVER['REMOTE_ADDR'];

						 $country = getLocationInfoByIp();

                         $insert_data  = array('list_id'=>$listid,'fname' => $first_name,'lname' => $last_name,'email'=> $email,'sub_ip'=>$rq_ip,'sub_country'=>$country,'date_added' => date("Y-m-d H:i:s"));

                         $rows_affected_one = $wpdb->insert( $masta_subscribers, $insert_data);

                         header("location:admin.php?page=masta-lists&action=view_list&filter_list=".$list_id);

                        }

                         

                       if(isset($_POST['delete'])) // from button name="delete"

                            {

                                   for($i=0;$i<count($_POST['checkbox']);$i++)

                                    { 

                                        $del_id=$_POST['checkbox'][$i];

                                        //print_r($del_id);

                                        //$sql = "DELETE FROM $masta_subscribers WHERE id='$del_id'";

                                        $wpdb->query($wpdb->prepare("DELETE FROM $masta_subscribers WHERE id= $del_id",$query));

                                       // $result = mysql_query($sql);

                                    }

                            }

                         

                         

                         

                         foreach($listdata as $listdetails){ echo  '<span class="mm_title_name">'.$listdetails->list_name.'</span>'; }?> 

                          

                          <small> <?php echo $list_subscribers; ?> subscribers</small>

                         <small>



                          <?php 

                          $show_at_a_time=100;

                        if($_GET['p']=='' || $_GET['p']=='1' ){

                            $current_range=0;

                          }

                          else{

                            $current_range=((int)$_GET['p']-1)*$show_at_a_time;

                          }



                          $list_subscribers_data = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $masta_subscribers WHERE list_id= $list_id AND status = 1  limit  $current_range , $show_at_a_time",$query)); 

                          

                          $list_subscribers_data_count = $wpdb->get_results( $wpdb->prepare("SELECT count(*) totalsubs FROM $masta_subscribers WHERE list_id= $list_id AND status = 1",$query));

                            

                          $lc=$list_subscribers_data_count[0]->totalsubs;



                          pagination($show_at_a_time, $lc);



                           //pagination starts

                          function pagination($show_at_a_time, $lc){                         

                          
							if((int)$lc%$show_at_a_time!=0){
								
    	                        $lsdc=(int)(((int)$lc/$show_at_a_time))+1; 
		
							}
							else{
								
	                            $lsdc=(int)(((int)$lc/$show_at_a_time)); 								
								
								}
                            if($_GET['p']==''){

                                $current_page=1;

                                $current_url=$_SERVER['REQUEST_URI'];

                            }

                            else{

                                $current_page=$_GET['p'];

                                $url_temp_array=explode('&',$_SERVER['REQUEST_URI']);

                                array_pop($url_temp_array);



                                 $current_url=implode('&',$url_temp_array);

                            }

                            $last_page=(int)$current_page-1;

                            $next_page=(int)$current_page+1;





                        ?>



                           <?php

                            $pre=$current_url.'&p=1';

                            $expre=$current_url.'&p='.$last_page;



                            $next=$current_url.'&p='.$next_page;

                            $exnext=$current_url.'&p='.$lsdc;

                             if($_GET['p']<=1) { 

                                $pre='javascript:void(0)';

                                $expre='javascript:void(0)';

                            }



                            if($_GET['p']>=$lsdc) {

                                $next='javascript:void(0)';

                                $exnext='javascript:void(0)'; 

                            }    



                            ?>

                            <a href="<?php echo $pre; ?>"><i class="fa fa-angle-double-left"></i></a>&nbsp;

                            <a href ="<?php echo $expre; ?>" ><i class="fa fa-angle-left"></i></a>&nbsp;

                            



                            <?php echo $current_page;?> of <?php echo $lsdc==0?1:$lsdc;  ?>&nbsp;

                            



                            <a href ="<?php echo $next; ?>"><i class="fa fa-angle-right"></i></a>&nbsp;

                            <a href="<?php echo $exnext; ?>"><i class="fa fa-angle-double-right"></i></a>



                            <?php } //end of pagination ?>





                        </small>





                    </div>



                  <form enctype="multipart/form-data" onsubmit="return validate();" class="view_lists" name="view_lists_data" id="view_lists_data" method="post">

                                 

                                    <div class="mm_float_right">

                                        <a href="admin.php?page=masta-lists&action=add_member&filter_list=<?php echo $list_id; ?>" class="btn btn-default"><i class="fa fa-plus-circle"></i> Add Members</a>

                                        <input name="delete" class="btn btn-default" type="submit" id="delete" value="Delete" onclick=" return confirmdel();">

                                    </div>

                                  </div>

                                  <div class="panel-body">

                                        <div class="table-responsive"> 

                                        

                                        <?php

										global $wpdb;
										$masta_list=$wpdb->prefix.'masta_list';


										$list_decode_var=$wpdb->get_results("SELECT * FROM $masta_list WHERE list_id= $list_id"); 

                                        //echo $list_decode_var[0]->list_form;

										//die();

										

										$list_decode_arr=json_decode($list_decode_var[0]->edit_form);

										//print_r($list_decode_arr);



										

										?>

                                        

                                            <table class="table table-bordered ">

                                                <thead>

                                                    <tr>

                                                    	
														<th><input type="checkbox" value="<?php echo $data->id; ?>" id="Oacheckbox" name="Oacheckbox" onchange="selectAllList()" /></th>
				
                                                   
                                                        <th class="no-border-left">Email</th> 

                                                        <?php foreach($list_decode_arr as $key =>$list_decode_arrs) { ?>

                                                        <th><?php echo $key; ?></th>

                                                        <?php } ?>

                                                        <th class="no-border-right">Date added</th>

                                                        <th width="100" class="no-border-left">&nbsp;</th>

                                                    </tr>

                                                </thead>

                                                

                                                <tbody>

                                                   <?php

                                                    foreach($list_subscribers_data as $data) {

													

														$list_decode_vals=(array)json_decode($data->subscriber_data);

                                                   		//print_r($list_decode_vals);

												    ?>

                                                    <tr>

                                                        <td>

                                                            <input type="checkbox" value="<?php echo $data->id; ?>" id="checkbox[]" class="checkalllist" name="checkbox[]"/>

                                                        </td>

                                                        <td class="mm_anchor_sty"><a href="mailto:<?php echo $data->email; ?>"><?php echo $data->email; ?></a></td>

                                                        

                                                        <?php foreach($list_decode_vals as $list_decode_val){ ?>

                                                        	

                                                        	<?php if(is_object($list_decode_val)){ 

																	echo "<td>";

																	$ch=0;

																	$list_subdecode_val=(array)$list_decode_val;

																	

																	foreach($list_subdecode_val  as $list_subdecode_vals){

																		 if($ch>0){ echo ","; }

																		 echo $list_subdecode_vals; 

																		 $ch++;

																	} 

																	echo "</td>";

															

															}  else { ?>

                                                        	 <td><?php echo $list_decode_val; ?></td>

                                                        	<?php } ?>

                                                        

														<?php } ?>

                                                        

                                                       

                                                        

                                                        <td><?php

                                                        echo date("F j, Y", strtotime($data->date_added));?></td>

														<td class="text-center mm-button-group action_wrp" style="min-width: 150px;">

															<a href="admin.php?page=masta-lists&action=edit_member&filter_list=<?php echo $list_id; ?>&member_id=<?php echo $data->id; ?>" class="action_icons"><i class="fa fa-pencil"></i><p>Edit</p></a>

															

															<a onclick="return deleteMember(this.id)" href="javascript:void(0)" class="action_icons" id="<?php echo $list_id.'~'.$data->id; ?>"><i class="fa fa-trash-o"></i><p>Delete</p></a>

                                                            

															

														</td>

                                                     </tr>

                                                     <?php } ?>

                                                  

                                                </tbody>

                                            </table>

                                        </div>

                                  </div><!--.panel-body-->

                  </form>

             </div><!--.panel-default-->

