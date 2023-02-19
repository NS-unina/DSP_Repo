	<script type="text/javascript">
jQuery(function() {
	jQuery( "#sortable1, #sortable2" ).sortable({
		connectWith: ".connectedSortable"
	}).disableSelection();
});
</script>
	<script>
		jQuery(document).ready(function(){
			
			//alert("fd");
		
		});
	</script>
		
<div class="panel-heading clearfix">
		<?php
			global $wpdb;
			$mail_list=$wpdb->prefix.'masta_list';
			$list_id=$_GET["id"];
			$list_ans= $wpdb->get_results("select * from $mail_list where list_id=$list_id");
			$lists_name=$list_ans[0]->list_name;
			$unsubs=$list_ans[0]->unsubs;
		?>
              Edit List
           </div>
           <div class="panel-body">
               <div class="container mm_form_style mm_create">
                   <form id="list_creation" class="form-horizontal" action ="admin.php?page=masta-lists" method="post" onsubmit='return false' enctype="multipart/form-data">
						<div class="row">
						<div class="col-sm-12">
						   <div class="step_navigation edit_step_navigation">
						        <ul>
 						            <li class="filled"><a href="javascript:void(0)" class="cli"> Edit List</a></li>
                                    <li><a href="javascript:void(0)" class="cfi"> Signup Form </a></li>
                                    <li><a href="javascript:void(0)" class="cci"> Confirm	</a></li>
								</ul>
                                
                                  	</div><!--.step_navigation-->
                                
								
                           	
                                
                                
                      <style type="text/css"> 
					 	#list_creation .step_navigation {
						list-style: none;
						overflow: hidden;
						margin: 11px 0px;
						}
						
						#list_creation .needhelp {
						height: 45px;
						margin-left: 6px;
						font-size: 40px !important;
						}
					  </style>         
                                
                                
                                
                                <!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div style="z-index: 99999999999;
position: absolute;
width: 68%;
margin: 34px auto !important;
margin-left: 20% !important;
line-height: 29px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel"> How to design your signup form and put it on your website</h4>
      </div>
      <div class="modal-body">
     	
        	
 			<ol class=""  style="font-family: "Open Sans",sans-serif; font-size: 15px;">
                            
                <li>
                    Give your list a title and description so that users know what are they signing up for
                </li>
                
                <li>
                    Select one of the 4 predefined styles.	
                    <br><br>
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/2.png" title="Select one of the 4 predefined styles.">
                    <br><br>
                </li>
                
                <li>
                     By default signup form always collects email address. You can collect additional information such as first name, last name, age, etc.. Just Add new text box and rename the Field label.
                    <br><br>
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/3.png">
                    <br><br>
                </li>
                
                <li>
                    If you select required box users will be required to fill that field.
                    <br><br>
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/4.png">
                    <br><br>
                </li>
                
                <li>
                    Custom validation message will be displayed in case users will leave that field blank.
                    <br><br>
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/5.png">
                    <br><br>
                </li>
                
                <li>
                    You can also drag the field boxes to change their order.
                  
                </li>
                
                <li>
                    You can edit the submit button label.
                    
                </li>
                
                <li>
                    Hit the Preview button to check how your new awesome signup form will look like.
                
                </li>
                
                <li>
                    Once you create and confirm your list and signup form you can add it to any Wordpress page/post or widget.
                    <br><br>
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/9.png">
                    <img style="max-width: 100%;" src="<?php echo plugins_url() ?>/mail-masta/lib/css/images/9-2.png">
                    <br><br>
                </li>
              </ol>
<h4>Start collecting new subscribers!<h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
		                
		                 </div>
                         </div>
		
						<!--First step start-->
						<div style="" class="first hideshow">
							
                       <div class="form-group">
                           <label class="control-label col-sm-2">List name:</label>
                           <div class="col-sm-4"><input type='text' value='<?php echo $lists_name; ?>' class="required validate[required] form-control" onblur="requiredf(this)"  name='list_name' id="list_name" ></div>
							<input type='hidden' name='hidden_id' value="<?php echo $_GET['id']; ?>">
						
                       </div>
						<!--First step end-->
						</div>
							
							
							<!--second step start-->
						<div style="display:none" class="second hideshow">
						      <div class="needhelp" >
		                                <p>
                                        	<a class="" data-toggle="modal" data-target="#myModal" href="#">Need help?</a> 
                                            Learn how to design your signup form and put it on your website
                                        </p>
								</div>	
							
							<div class='form-group'>
								<label class="control-label col-sm-3">Signup Form Title:</label>
	                            <div class="col-sm-4">
									<input type='text' value="<?php echo $list_ans[0]->list_title; ?>" class='list_title form-control' id='list_title' name='list_title'>
								</div>
							</div>
							<div class='form-group'>
								<label class="control-label col-sm-3">Signup Form Description:</label>
	                            <div class="col-sm-4">
									<textarea class='list_desp form-control' id='list_desp' name='list_desp'><?php echo $list_ans[0]->list_description; ?></textarea>
								</div>
							</div>	
							
							 <div class="form-group">
			                     <label class="control-label col-sm-3">Select Style:</label>
			                      <div class="col-sm-4">
			                           <select name='cssstyle' class="select_sty">
			                               <option value='1' <?php if($list_ans[0]->style==1) echo "selected"; ?>>Style 1</option>	
			                               <option value='2' <?php if($list_ans[0]->style==2) echo "selected"; ?>>Style 2</option>	
			                               <option value='3' <?php if($list_ans[0]->style==3) echo "selected"; ?>>Style 3</option>	
			                               <option value='4' <?php if($list_ans[0]->style==4) echo "selected"; ?>>Style 4</option>	
			                            </select>
			                            </div>
			                       </div>	
						
                       <div class="form-group">
                           
                           <div class="col-sm-3">&nbsp;</div>
                           <div class="col-sm-4" id="des_part">
							<?php
							
							//	print_r($list_ans);
								$list_form=$list_ans[0]->edit_form;
								$olist_form=$list_ans[0]->list_form;
								$validation=$list_ans[0]->validation;
								$after_submit=$list_ans[0]->after_submit;
								$docode_odata=array();
								
								$docode_data=array();
								
								$vali=array();
								
								$docode_odata_vr=array();
									$docode_odata_kr=array();
									
									$docode_data_vr=array();
									$docode_data_kr=array();
								
								
								$docode_odata= json_decode($olist_form,true);
								$docode_data = json_decode($list_form,true);
								//print_r($docode_data);
								// 
								$vali=json_decode($validation,true);
								//print_r($vali);
								
								$j=0;
								?>
									<input type="hidden" id="ttl_count" value="<?php echo count($docode_data) ?>" name='ttl_count'>
									<input type="hidden" id="list-order" value="<?php echo $list_ans[0]->order_list; ?>" name='list-order'>
								
									
									<?php
									
									$newarray=explode(',',$list_ans[0]->order_list);
									
								if(is_array($docode_odata)){
									$docode_odata_vr=array_values ($docode_odata);
									$docode_odata_kr=array_keys($docode_odata);
								}
								
								if(is_array($docode_data)){
									
									$docode_data_vr=array_values ($docode_data);
									$docode_data_kr=array_keys($docode_data);
								}
									
										foreach($newarray as $marr){		
											$teKyey=$docode_data_kr[$marr-1];		
											$docode_t[$teKyey]=$docode_data_vr[$marr-1];
											$teKyey2=$docode_odata_kr[$marr-1];		
											$docode_ft[$teKyey2]=$docode_odata_vr[$marr-1];
										}
									
									foreach($newarray as $marr){		
										$teKyey=$docode_data_kr[$marr-1];		
										$docode_t[$teKyey]=$docode_data_vr[$marr-1];
										
										$teKyey2=$docode_odata_kr[$marr-1];		
										$docode_ft[$teKyey2]=$docode_odata_vr[$marr-1];
									}
									//	print_r($docode_t);
										
									 foreach($docode_ft as $key=>$dd){
										
										$i=$newarray[$j];
										?>
									<input value="<?php echo $key ?>" type='hidden' name='ofield_name<?php echo $i ?>'>
								
								
									<?php
										$keyarray[$i]=$key;
										
									$j++; }
								
										$j=0;
										
										
                                        $jkl=1; $fl=1; ?>
								  <ul id="sortable1" class="connectedSortable"><?php
									 foreach($docode_t as $key=>$dd){
										if(count($docode_data)==0){
											break;
										}
									$i=$newarray[$j];
									?>
										<?php if($jkl==$list_ans[0]->email_position)  { ?>
									
										<li class='ui-state-default'>
	                                       <div class='fieldboxe' id='fbme'>
												<div class='fieldbox_uae' id='fbe'>Email</div>
	                                        </div>
										</li>
										<?php $fl=2; } $jkl++; ?>
								
									<li class='ui-state-default'>
                                       <div class='fieldbox' id='fbm-<?php echo $i ?>'><div class='fieldbox_ua' id='fbc-<?php echo $i ?>'><?php echo $key ?></div>
                                            <div style='display:none' class='fieldbox_ac fbc<?php echo $i ?>'>
                                             <input value="<?php echo $dd ?>"  type='hidden' name='list_input_type<?php echo $i ?>'>
                                                <input value="<?php echo $key ?>" id="in-<?php echo $i ?>" class="in-cf required rvalue form-control" onblur="requiredf(this)" type='text' name='field_name<?php echo $i ?>' placeholder="Field label">
                                                <div class="req_error"></div>
                                                <input class='order' type='hidden' name='order<?php echo $i ?>'>
                                                <div class="form-group" style='margin-left:0'>
                                                <input type='checkbox' <?php if($vali[$keyarray[$i]]["form_req"]==1){ echo "checked"; } ?> name='req<?php echo $i ?>'> Required</div> 
                                                <input type='text' value='<?php echo $vali[$keyarray[$i]]['form_req_message']; ?>' name='validation_message<?php echo $i ?>' class="form-control"><br>
    
                                            </div>
                                        </div>
									</li>
								<?php $j++; }?>
								
									<?php if($fl==1)  { ?>
								
									<li class='ui-state-default'>
                                       <div class='fieldboxe' id='fbme'>
											<div class='fieldbox_uae' id='fbe'>Email</div>
                                        </div>
									</li>
									<?php  }  ?>
							
                          		</ul>
 							</div>
                       </div>
					<div class="form-group" style="">
							<label class="control-label col-sm-3 ">
								Submit Button Label
							</label>
							<div class="col-sm-4">
								<input type="text" id="sub_button_text" value="<?php echo $list_ans[0]->sub_button_text; ?>" name="sub_button_text" class="form-control sub_button_text">
							</div>
                     </div>
                     
                     <!--   
                    <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-2 terms">
                            	 <input type="checkbox" id='terms_c' <?php if($list_ans[0]->Terms==1){ echo "checked"; } ?>  name="terms_c">Show field for terms
                        <textarea id='term_mess' class="form-control" placeholder="Message for terms" value="" name='term_mess'><?php echo $list_ans[0]->terms_message ?></textarea>
                        </div>
                    </div>
					-->
                       
                       <div class="form-group" style="display:none">
                       		 <label class="control-label col-sm-2">Position of Email Field:</label>
                            <div class="col-sm-4">
                            	<input type="text" id='email_po' value="<?php echo $list_ans[0]->email_position ?>"  name='email_po' size ='2' class="form-control">
                            </div>
                       </div>
						</div>
                       <!--second step end-->
							<!--url or message-->
						<div  class="third hideshow col-sm-12" style="display:none">
							<legend>Subcribtion</legend>
							<div class="col-sm-6">
								<label class="col-sm-12"><input type="radio" <?php if($after_submit==1) { echo "checked"; } ?>  value="1" id="uss1" name="uss"> show success message</label>
								 <div class="col-sm-12">
										<textarea class="form-control"  id="success_message" name="success_message"><?php echo $list_ans[0]->success_message ?></textarea>
								 </div>
							</div>
                        <!--
                        <div class="form-group form-actions succ-op succ-op-1" style="display:none">
                        	<label class="control-label col-sm-2">success message:</label>
                            <div class="col-sm-7">
                            	<textarea name="success_message" id='success_message' value='' class="form-control"></textarea>
                            </div>
                        </div>
                        
                        -->
							<div class="col-sm-6">
								<label class="col-sm-12"><input type="radio" <?php if($after_submit==2) { echo "checked"; } ?> value="2" id="uss2" name="uss"> go to success URL</label>		
								<div class="col-sm-12">
										<input type="text" class="form-control" value="<?php echo $list_ans[0]->url ?>" id="urls" name="urls">
								</div>
							</div>
							
						</div>
						
						
						<div class="third hideshow col-sm-12" style="display:none">
							  <legend>Unsubcribtion</legend>
							 <div class="form-group">
								<label class="control-label col-sm-2">Unsubscribtion URL</label>
								<div class="col-sm-6">
									<input name="unsubcribtions" id='unsubcribtions' value='<?php echo $list_ans[0]->unsubs //bloginfo("url")   ?>' class="form-control">
								</div>
							</div>
						</div>
						
						
						
						
						
						<div class="form-group">
							<div class="col-sm-2 col-md-offset-2">
                                <input type="submit" onclick="return false" class="btn btn-success btn-sm next firsts" value="Next" name="next" id="next">
                            </div>
                            </div>
                        		 <div class="third hideshow col-sm-12 form-group"  style="display:none">
								<div class="col-sm-6 col-sm-offset-2">
	                                <input type="submit" class="btn btn-success btn-sm" value="Save and Exit" name="updatelist" id="listsub">
                                    <!-- <a href="javascript:void(0);" id="bu1" class="btn btn-sm btn-black">Preview</a> -->
	                   	         </div>
								</div>
								<div class="second hideshow form-group"  style="display:none">	
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <input type="submit"  onclick="return false" class="btn btn-success btn-sm  next seconds" style="display:none" value="Next" name="next" id="next">
                                        <a href="javascript:void(0);" id="bu" class="btn btn-sm btn-black">Preview</a>
                                    </div>
								</div>
                            <div id='spnCursor'></div>
                   </form>
				<script type="text/javascript">
				
				
				
					
					
				
				var fl=0;
				function requiredf(element){
					if(element.value==''){
						jQuery(element).parent().children( ".req_error" ).html('Required field');		
						fl=1;
					}
					else{
						jQuery(element).parent().children( ".req_error" ).html('');	
					}
				}
				
				
				jQuery(document).ready(function(){
							
					
								jQuery("input[name='uss']").click (function(){
								  var thisCheck = jQuery(this);
									jQuery('.succ-op').hide();
									jQuery('.succ-op-'+thisCheck.val()).slideDown();
								});
					
						
							jQuery('.ui-state-default').keyup(function(){
								jQuery(this).find('.fieldbox_ua').html(jQuery(this).find('.in-cf').val());
								if(jQuery(this).find('.in-cf').val()==''){
									jQuery(this).find('.fieldbox_ua').html('required field');
								}
						
							});
						
					
						var wher=1;
						jQuery('#next.firsts').click(function(){
							jQuery('#list_name').blur();
							if(jQuery('#list_name').val()!=''){
							jQuery('.hideshow').hide();
							jQuery('.next').hide();
							jQuery('.second').show();
							jQuery('.seconds').show();
							jQuery('.cfi').parent().addClass('filled');
							wher=2;
							}
						});
						jQuery('#next.seconds').click(function(){
							jQuery('.required').blur();
							var chvali=0;
							jQuery('.required').each(function(){
									if(jQuery(this).val()==''){
										chvali=1;
										jQuery(this).parent().show();
									}
								});
							if(chvali==0)
							{
								jQuery('.hideshow').hide();
								jQuery('.next').hide();
								jQuery('.third').show();
								jQuery('.cci').parent().addClass('filled');
								wher=3;
							}
						});
						jQuery('.cli').click(function(){
								if(checkempty()){
								jQuery('.hideshow').hide();
								jQuery('.next').hide();
								jQuery('.firsts').show();
								jQuery('.first').show();
								jQuery('.cfi').parent().removeClass('filled');
								jQuery('.cci').parent().removeClass('filled');
								wher=1;
								}
						});
						jQuery('.cfi').click(function(){
								if(checkempty()){
								jQuery('.hideshow').hide();
								jQuery('.next').hide();
								jQuery('.seconds').show();
								jQuery('.second').show();
								jQuery('.cfi').parent().addClass('filled');
								jQuery('.cci').parent().removeClass('filled');
								wher=2;
								}
						});
						jQuery('.cci').click(function(){
								if(checkempty()){
								jQuery('.hideshow').hide();
								jQuery('.next').hide();
								jQuery('.third').show();
								jQuery('.cfi').parent().addClass('filled');
								jQuery('.cci').parent().addClass('filled');
								wher=3;
								}
						});
					function checkempty(){
							if(wher==1){
									jQuery('#list_name').blur();
									if(jQuery('#list_name').val()==''){
										return false;
									}
									else{
										return true;
									}
							}
							else if(wher==2){
									var chvali=0;
									jQuery('.required').blur();
									jQuery('.required').each(function(){
											if(jQuery(this).val()==''){
												chvali=1;
												jQuery(this).parent().show();	
											}
										});
										if(chvali==1){
											return false;
										}
										else{
											return true;
										}
							}
							else if(wher==3){
								return true;
							}
					}	
					
					
					
					
						jQuery('.fieldboxe').click(function(){
						var pot=parseInt(jQuery(this).parent().index());
						pot++;
						jQuery('#email_po').val(pot).change();
						});
						
						
					
					jQuery('#bu,#bu1').click(function(){
						var email_po=jQuery('#email_po').change().val();
						var styles=jQuery('.select_sty').change().val();
						var cou_ttl=jQuery('#ttl_count').val(); vrr="<?php echo admin_url(); ?>/admin.php?page=demo_list&email_po="+email_po+"&styles="+styles+"&count="+cou_ttl;
						if( jQuery('#terms_c').is(':checked') ){
							vrr=vrr+"&term_mess="+jQuery('#term_mess').change().val();
						} 
						
						jQuery('.fieldbox .required').each(function(index){
							vrr=vrr+'&fi'+(index+1)+"="+jQuery(this).val();
						});
							vrr=vrr+"&list_desp="+jQuery('#list_desp').val();
							vrr=vrr+"&list_title="+jQuery('#list_title').val();
							
							vrr=vrr+"&sub_text="+jQuery('#sub_button_text').change().val();
						window.open(vrr, 'windowName', "height=450,width=340");
					});
					
					
					
					jQuery('#listsub').click(function(){
							fl=0;
							jQuery('.required').blur();
							if(fl==0){
								jQuery('#list_creation').attr('onsubmit','return true');
								jQuery('#list_creation').submit();
							}
					});
					
					jQuery(".fieldbox_ua").click(function(){
						 var idu=jQuery(this).attr('id');  
						var id_ar=idu.split('-');
						var id_s=id_ar[1];
						jQuery(".fbc"+id_s).slideToggle();
					
						var toar='';
						jQuery('.ui-state-default .fieldbox').each(function(){
							var idsrs=jQuery(this).attr('id').split('-');
							toar=toar+idsrs[1]+',';
						});
						toar=toar.substring(0,toar.length - 1);
						jQuery('#list-order').val(toar).change();
					
					
						jQuery('.fieldbox_ac input').click(function(){
							jQuery(this).select();
						});
						
							var pot=parseInt(jQuery('.fieldboxe').parent().index());
							pot++;
							jQuery('#email_po').val(pot).change();
					});
				});
				</script>
               </div>
           </div>
<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery(".select_sty").selectbox();    
	});
</script>
