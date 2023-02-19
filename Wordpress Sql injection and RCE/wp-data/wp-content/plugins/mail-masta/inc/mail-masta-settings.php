<meta charset="utf-8">
<script>
document.title = "Mail Masta";
</script>
<div class="mm_container">
  <ul class="nav nav-tabs">
   <li class="first"><a href="admin.php?page=masta-campaign">Campaigns</a></li>
     <?php if(get_option('masta-active-checked')=='true'){ ?>
    <li><a href="admin.php?page=masta-autoresponder">Autoresponders</a></li>
    <?php } ?>
    <li><a href="admin.php?page=masta-lists">Lists</a></li>
    <li class="active"><a href="admin.php?page=masta-settings">Settings</a></li>
     <li><a class="" href="admin.php?page=masta-license">License</a></li>
    
  </ul>
   <div class="tab-content">	
        <div id="mm_settings" class="tab-pane active">
          <?php include('mail-settings-data.php')?>
        </div>
  </div>
</div>