<?php   if(isset($_GET['kaction']) && $_GET['kaction']=='remove'){
	  	do_action('masta_deactivation');	
	  	header("location:  ".admin_url()."/admin.php?page=masta-license");
		
	
	  }
	  ?>
<style type="text/css">
condensed > thead > tr > th, .table-condensed > tbody > tr > th, tr  th, .table-condensed > tfoot > tr > th, .table-condensed > thead > tr > td, .table-condensed > tbody > tr > td, .table-condensed > tfoot > tr > td {
padding: 12px !important;
}
tr.row-even {
background: #eee;
}
#wpfooter {
position: relative;
bottom: 55px !important;
left: 0;
right: 0;
padding: 10px 0;
margin-right: 20px;
color: #777;
}
</style>
<div class="mail_masta_wrapper">
    <div class="clearfix heading">
        <h1 class="setting_heading"><a href="<?php echo admin_url(); ?>/admin.php?page=masta-license">License</a></h1>
	 </div>		
	<?php if(get_option('Secret')=='') { ?>
		
		<div class="clearfix row">     
 	     <div class="col-sm-12"> <h3>Upgrade to Business version</h3></div>
            <div class="col-sm-6">
                <table class="table table-bordered table-condensed" style="border: 1px solid #ddd;">
                    <thead>
                        <th>For 100$ one-time fee you will get additional features:</th>
                    </thead>
                    <tbody>
                        <tr class="row-even"><td>Remove Mail Masta footer from emails</td></tr>
                        <tr  ><td>Schedule campaigns</td></tr>
                        <tr class="row-even" ><td>Create autoresponders</td></tr>
                        <tr  ><td>1 h priority support</td></tr>
                        <tr><td style="text-align:right"><a class="btn btn-success" target="_blank" href="http://getmailmasta.com/purchase.php">Buy Now</a></td></tr>
                     </tbody>
                </table>
             </div>
		</div>        
		
          
    	<br><br>    
        
        <?php } ?>
	 <?php
	  
	   if(isset($_POST['lis_sub2'])  &&  $_POST['lis_sub2']=='submit2'){ echo '<div class="row"><div class="successa col-sm-4 col-sm-offset-2"> successfully activated</div></div>'; update_option('Secret' ,$_POST['keysecret']); update_option('masta-active-checked','false');
	   
	   
	   	$ch = curl_init(); curl_setopt($ch, CURLOPT_URL, "https://getmailmasta.com/curlresp.php?test=".get_option('Secret')); curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  $output = curl_exec($ch); curl_close($ch); $cout=explode(';',$output); update_option( 'msetting', $cout[4]); update_option( 'list', $cout[3]); update_option( 'camp', $cout[1]); update_option( 'auto', $cout[2]);  if(get_option('masta-active-checked')=='false') { update_option('masta-active-checked','true');}
	   
	   
	   
	   	do_action('cron_action');
	   
	    } ?>
	 <script>
	 	jQuery(document).ready(function(){
	 		jQuery('#ssub').click(function(){
	 				var sec=jQuery('#sec').val();
	 				jQuery('#subdiv').append('<img id="loadings" src="<?php echo plugins_url(); ?>/mail-masta/lib/css/images/loading.gif">');
	 				jQuery.post('<?php echo plugins_url() ?>/mail-masta/inc/resp.php',{ sec:sec },function(resp){
		 				jQuery('#loadings').remove();
		 				if(jQuery.trim(resp)=='1'){
		 					jQuery('#sf').attr('onSubmit', 'return true');
		 					jQuery('#sf').submit();
		 				}
		 				else{
		 					alert(resp);
		 				}
	 				});
	 		});
	 		
	 	
	 	});
	 </script>
	<form action="" method='post' id='sf' onSubmit="return false">
    
	  	<div class="row">
	        <div class="col-sm-2">
	        	<label>License key</label><?php //echo get_option('auto'); ?>
	        </div>
	         <div class="col-sm-4">
	        	<input type="text" id='sec' class="form-control" value="<?php echo get_option('Secret'); ?>" name="keysecret"> 	        
	         </div>
	     </div>
	     <div class="row">
	     	 <?php if(get_option('masta-active-checked') == ''){ ?>
		     	<div class="col-sm-4 col-sm-offset-2" id="subdiv">
		     		<input type="hidden"  value="submit2" id='ssub2' class="btn btn-success" name="lis_sub2"> 	
		        	<input type="submit"  value="Activate" id='ssub' class="btn btn-success" name="lis_sub"> 	      
		        </div>
	        <?php } ?> 
	        <?php if(get_option('masta-active-checked') != ''){ ?>
		        <div class="col-sm-4 col-sm-offset-2">
		        		<a href="<?php echo admin_url() ?>/admin.php?page=masta-license&kaction=remove" class="dbb btn btn-success">Deactivate</a> 	 
		        </div>
	        <?php } ?>
	     </div> 
 	</form>	
    </div>
</div>
