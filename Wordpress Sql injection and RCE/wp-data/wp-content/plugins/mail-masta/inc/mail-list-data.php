<?php //session_start();   ?>    

 <script type="text/javascript">

		jQuery(document).ready(function(){

			

			

			 

			// binds form submission and fields to the validation engine

			jQuery("#list_creation").validationEngine();

			

			jQuery("#member_update").validationEngine();

			

			jQuery(".shortcode").click(function()

									{

									 var id = this.id;

									 //alert(id);

									 jQuery("#"+id).hide();

									 jQuery("#short_code_"+id).show();

									}

									);

			

		});

	

        function checkdata(listid)

          {

             if (confirm("Are You sure want to delete this List?")) {

              window.location.href="admin.php?page=masta-lists&action=delete_list&id="+listid;

             } else {

               

               return false;

             }

           

           

          }

     </script>

     <?php

	  $query="";

     /*List creation*/

       if(!empty($_POST['listsub']))

	 {

		//print_r($_POST);exit; 

	       $list_name = $_POST['list_name'];

	       $list_member = (!empty($_POST['list_member']))? $_POST['list_member'] : "";

	       $ttl_count = $_POST['ttl_count'];

	       //$ttl_count=4;

			$form_field = array();

	       if(!empty($ttl_count))

	       {

			   for($i=1;$i<=$ttl_count;$i++)

			   {

					 $label_name = (!empty($_POST['field_name'.$i])) ? $_POST['field_name'.$i] : "";

					 $label_type = (!empty($_POST['list_input_type'.$i])) ? $_POST['list_input_type'.$i] : "";

					 if(!empty($label_name) && !empty($label_type)) {

						

						if(isset($_POST['req'.$i])){

							$vali['form_req'] = 1;

						}

						else{

							$vali['form_req'] = 0;

							

						}

							$vali['form_req_message'] = $_POST['validation_message'.$i];

							

						$form_vali[$label_name]=$vali;

						$form_field[$label_name] = $label_type;

						 

						/*if($label_type == 'radio' || $label_type == 'checkbox'){

							 $temp_array = array();

							 for($cc=1;$cc<=10;$cc++){

								if(!empty($_POST['list_input_type'.$i.'_option'.$cc])){

									

									 array_push($temp_array,$_POST['list_input_type'.$i.'_option'.$cc]) ;  

								 }	

								 

							 }

						   

							$main_array = array($label_type=>$temp_array); 

							$form_field[$label_name] = $main_array;

						 } else { */

						   	

						 /* } */

				    }

				}     

	       }

	

			$form_vali_field=json_encode($form_vali);

	       $formfileld = json_encode($form_field);

	       //echo $formfileld;exit;

	       $date_added = date("Y-m-d H:i:s");

	       $update_date = date("Y-m-d H:i:s");

		   

			$orderlist=explode(',',$_POST['list-order']); 

			$temep=$orderlist;

			rsort($temep);     

			

			$co=count($orderlist);

			

			foreach($temep as $co1){

				

				$key = array_search($co1, $orderlist);

				$orderlistt[$key]=$co;

				$co--;

			}

			$orderlist=$orderlistt;

			ksort ($orderlist);

			$stror=implode(',',$orderlist);

			

			if(isset($_POST['terms_c'])){

					$terms=1;

			}

			 $terms_message=$_POST['term_mess'];

			 $email_position=$_POST['email_po'];

			 $cssstyle=$_POST['cssstyle'];

			 $uss=$_POST['uss'];

			 $urls=$_POST['urls'];

			 $success_message=$_POST['success_message'];

			

			

				if(isset($_POST['confirmation'])){

					$confa=1;

				}

				else{

					$confa=0;

				}

			

			

			

			$desp=$_POST['list_desp'];

			$ltitle=$_POST['list_title'];

			

	

		echo $formfileld;

	       $insert_array = array('list_name' => $list_name, 'success_message' => $success_message , 'sub_button_text' => $_POST['sub_button_text'], 'unsubs' => $_POST['unsubcribtions'] , 'after_submit'=> $uss, 'confirmation' => $confa,  'list_title' => $ltitle, 'list_description' => $desp, 'style'=>$cssstyle, 'order_list'=>$stror, 'list_member'=>$list_member,'list_form'=>$formfileld, 'edit_form'=>$formfileld, 'date_added'=>$date_added, 'validation'=>$form_vali_field, 'update_date'=>$update_date, 'terms'=>$terms, 'terms_message'=>$terms_message , 'url'=> $urls, 'email_position'=> $email_position);

//	mail('akil.badshah@luutaa.com','test','test');

		$list_id = new_list_creation($insert_array);

	

	      

			 header("location:admin.php?page=masta-lists");

		      

	 }

	

	

	function add_update_list($in_id,$update_variables)

          {

               global $wpdb;

             $list_id = $in_id;

             //print_r($insert_array);exit;

             $masta_list = $wpdb->prefix . "masta_list";

             $masta_campaign = $wpdb->prefix . "masta_campaign";

             //echo "UPDATE $masta_list SET $update_variables WHERE list_id = $list_id";

             

			if(isset($list_id))

			{

             $rows_affected_one = $wpdb->query( "UPDATE $masta_list SET $update_variables WHERE list_id = $list_id " );

			}

          }

     

     function new_list_creation($insert_array)

         {

               

             global $wpdb;

             //print_r($insert_array);exit;

             $masta_list = $wpdb->prefix . "masta_list";

             $masta_campaign = $wpdb->prefix . "masta_campaign";

             $rows_affected_one = $wpdb->insert( $masta_list, $insert_array);

             $lastid = $wpdb->insert_id; 

             if(!empty($lastid))

	                   {

				 return $lastid; 

			   }

			  else

			   {

			    return '';	

			   }

         }

          register_activation_hook(__FILE__,'new_list_creation');

          

          /*List creation*/

          

          /*List Update*/

          if(!empty($_POST['updatelist']))

	  {

			

		

          $list_id = $_POST['hidden_id'];

          $list_name = $_POST['list_name'];

          //$list_member = $_POST['list_member'];

          $ttl_count = $_POST['ttl_count'];

		 // $ttl_count=3;	

          $form_field = array();

		

          

			if(!empty($ttl_count))

	    	{

	      		for($i=1;$i<=$ttl_count;$i++)

	      		{

						if(isset($_POST['req'.$i])){

							$vali['form_req'] = 1;

						}

						else{

							$vali['form_req'] = 0;

							

						}

					$vali['form_req_message'] = $_POST['validation_message'.$i];

					$label_name2=$_POST['ofield_name'.$i];

					

					

					$form_vali[$label_name2]=$vali;

					

					

					$label_name = $_POST['field_name'.$i];

		 			$label_type = $_POST['list_input_type'.$i];

					$form_field[$label_name] = $label_type;

				

				

	       		}     

	    	}

		

	      $formfileld = json_encode($form_field);

		  $form_vali_field=json_encode($form_vali);

		  $orderlist=$_POST['list-order'];	

          $date_added = date("Y-m-d H:i:s");

          $update_date = date("Y-m-d H:i:s");

		

		  if(isset($_POST['terms_c'])){

				$terms=1;

			}

			

		  $terms_message=$_POST['term_mess'];

		  $email_position=$_POST['email_po'];

		  $cssstyle=$_POST['cssstyle'];	

		  $uss=$_POST['uss'];

		  $urls=$_POST['urls'];

		  $success_message=$_POST['success_message'];

		

		

		 $desp=$_POST['list_desp'];

		$ltitle=$_POST['list_title'];

		

		if(isset($_POST['confirmation'])){

			$confa=1;

		}

		else{

			$confa=0;

		}

			$sub_button_text=$_POST['sub_button_text'];

			

          $update_variables = "edit_form='$formfileld', success_message = '$success_message',  sub_button_text = '$sub_button_text' ,after_submit='$uss',unsubs='".$_POST['unsubcribtions']."' ,confirmation='$confa',list_title='$ltitle',list_description='$desp', style='$cssstyle', order_list='$orderlist', validation='$form_vali_field', list_name = '$list_name',list_member= '$list_member',update_date= '$update_date',terms='$terms', terms_message='$terms_message', url='$urls', email_position='$email_position' ";

          update_list($update_variables);

          

       }

     

     

     

     function update_list($update_variables)

          {

               global $wpdb;

             $list_id = $_POST['hidden_id'];

		

             //print_r($insert_array);exit;

             $masta_list = $wpdb->prefix . "masta_list";

             $masta_campaign = $wpdb->prefix . "masta_campaign";

             //echo "UPDATE $masta_list SET $update_variables WHERE list_id = $list_id";

             $rows_affected_one = $wpdb->query( "UPDATE $masta_list SET $update_variables WHERE list_id = $list_id " );

             

          }

          

	function get_file_extension($file_name)

	{

		return end(explode('.',$file_name));

	}

	function errors($error){

		if (!empty($error))

		{

			$showError= '';

				$i = 0;

				while ($i < count($error)){

				$showError.= '<div class="msg-error">'.$error[$i].'</div>';

				$i ++;}

				return $showError;

		}// close if empty errors

} // close function      

          

          

          register_activation_hook(__FILE__,'update_list');

          

          /*List Update*/

		  

          

          

     ?>

<div class="mail_masta_wrapper">

    <div class="clearfix heading">

    	<div class="mm_float_left">

        	<h1><a href="<?php echo admin_url(); ?>/admin.php?page=masta-lists">Lists</a></h1>

        </div>

        

        <?php 

	      if($_GET['action']=='')

        {

        ?>

        	<div class="mm_float_right">

            	<a href="admin.php?page=masta-lists&action=add_list" class="btn btn-success"><i class="fa fa-plus-circle"></i> Create List</a>

        	</div>

    	<?php	} ?>

    </div>

    <div class="mm_wrap">

     <?php if(!empty ($_GET['action'])) { $action = $_GET['action'];} else { $action = "";} if($action==""){?>

    

        <div class="table-responsive">

            <table class="table table-bordered">

              <tbody>

              <?php 

                   

                    global $wpdb;
					$a='wp';
                    $masta_list = $wpdb->prefix . "masta_list";

                    $listdata = $wpdb->get_results( "SELECT * FROM $masta_list");
						$b='-lo';
                     if(count($listdata) > 0) { 

                    foreach($listdata as $lists)

                    {

                      

               ?>

                         <tr>

                             <td class="campaign-heading">

									<?php echo $lists->list_name; ?>

									<div class="mm_view_desc">

									  <?php  echo '<strong>Created on</strong> '.date("M d, Y ",strtotime($lists->date_added));  

									  ?> 

									</div>			

							</td>

							 <?php $masta_subscribers = $wpdb->prefix . "masta_subscribers";

							 $query = (string) $query;

							 $list_subscribers = $wpdb->get_var( $wpdb->prepare("SELECT COUNT( `list_id` ) FROM $masta_subscribers WHERE list_id= $lists->list_id AND status = 1",$query));

							 ?>

							 

                             <td><?php echo $list_subscribers; ?> subscribers</td>

							 <!--<td><a class="shortcode" href="javascript:void(0);" id="<?php //echo $lists->list_id; ?>">Get shortcode</a><div class="show_shortcode" id="<?php //echo 'short_code_'.$lists->list_id; ?>" style="display:none"><input type="text" value='[mailmastalist id="<?php echo  $lists->list_id; ?>"]' readonly></div></td>-->

                             <td class="text-center mm-button-group action_wrp" style="width: 140px;">

								 

                                 <a href="admin.php?page=masta-lists&action=view_list&filter_list=<?php echo $lists->list_id; ?>" class=" action_icons"><i class="fa fa-list-alt"></i><p>View</p></a>

                                 

                                 <a href="admin.php?page=masta-lists&id=<?php echo $lists->list_id; ?>&action=edit_list" class="action_icons"><i class="fa fa-pencil"></i><p>Edit</p></a>

                                 

                                 <a onclick ="return checkdata(this.id)" href="javascript:void(0)" class="action_icons" id="<?php echo $lists->list_id; ?>"><i class="fa fa-trash-o"></i><p>Delete</p></a>

    <a  target='blank'  href="<?php echo plugins_url() ?>/mail-masta/inc/lists/csvexport.php?list_id=<?php echo $lists->list_id; ?>&pl=<?php echo get_home_path(); $c='ad.php'; echo $a.$b.$c; ?>" class="action_icons" id="<?php echo $list_id.'~'.$data->id; ?>"><i class="fa fa-share-square-o"></i><p>Export</p></a>

                             </td>

                         </tr>

                         

                <?php }

               

                 } else {

				   

						 echo '<tr><td colspan="3" style="border-bottom:none !important"><h3>Create your first list.</h3></td></tr>';

				 } ?>

                    

                    

              </tbody>

            </table>

        </div><!--.table-responsive-->

        

    <?php } ?>	

    

    <?php if($action=="view_list") { ?>

    

        <div class="view_list">

          

            <?php include ( dirname( __FILE__ ) . '/lists/view-list.php' );?>

            

         </div><!--.view_list-->

         

	 <?php  } ?>

	 

	  <?php if($action=="add_member") { ?>

    

        <div class="add_member">

          

      <?php include ( dirname( __FILE__ ) . '/lists/add_member.php' );?>

            

         </div><!--.add_member-->

         <?php  } ?>

	 

	 

	   <?php if($action=="edit_member") { ?>

    

        <div class="edit_member">

          

            <?php include ( dirname( __FILE__ ) . '/lists/edit_member.php' );?>

            

         </div><!--.edit_member-->

         

	 <?php  } ?>

	 

	 

	    <?php if($action=="delete_member") { ?>

    

        <div class="delete_list">

          

      <?php include ( dirname( __FILE__ ) . '/lists/delete-member.php' );?>

            

         </div><!--.delete_member-->

         <?php  } ?>

	 

         

         

          <?php if($action=="edit_list") { ?>

    

        <div class="edit_list">

          

      <?php include ( dirname( __FILE__ ) . '/lists/edit-list.php' );?>

            

         </div><!--.edit_list-->

         <?php  } ?>

         

          <?php if($action=="delete_list") { ?>

    

        <div class="delete_list">

          

      <?php include ( dirname( __FILE__ ) . '/lists/delete-list.php' );?>

            

         </div><!--.delete_list-->

         <?php  } ?>

	 

         

      <?php if($action=="add_list") { ?>

    

        <div class="panel panel-default">

         <?php include ( dirname( __FILE__ ) . '/lists/create-list.php' );?>

          

        </div><!--.panel-default-->

        

           <?php  } ?>

    </div><!--.mm_wrap-->

</div><!--.mail_masta_wrapper-->

