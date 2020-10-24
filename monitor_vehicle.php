<script type="text/javascript">
onload = function(){
	initialize_kendaraan();
	openNav();
}

var refreshId = setInterval(function(){
	update_kendaraan();
	cek_alert();
}, 60000);

</script>

<div class="right_col" role="main">



<div class="row">
<div class="col-md-12 col-sm-12 col-xs-12">
<div class="x_panel">
<?php 
if($_SESSION['userid']==451){
	$qn=mysql_query("select id_perangkat,no_kendaraan,tipe_ikon from perangkat where id_perangkat='2170'");
	$dt=mysql_fetch_array($qn);
}else{
	$qn=mysql_query("select id_perangkat,no_kendaraan,tipe_ikon from perangkat where id_perangkat='$_SESSION[id_perangkat]'");
	$dt=mysql_fetch_array($qn);
}

 ?>
<div class="row x_title">
<div class="col-md-12 col-sm-12 col-xs-12">
<label><i class="fa fa-desktop"></i> Monitor Vehicle  [ <?php echo $dt['no_kendaraan']; ?> <canvas id="canvas" style="height:10px;display:none;"></canvas> ]</label>
</div>
</div>
<?php 
$hasil1=mysql_query("select * from alarm where id_perangkat='$_SESSION[id_perangkat]' order by waktu desc limit 0,1");
$jumlah1=mysql_num_rows($hasil1);

$q=mysql_query("select * from perangkat where id_perangkat='$_SESSION[id_perangkat]'");
$calc = mysql_num_rows($q);
if($calc>=1){
	while($sql_tipe=mysql_fetch_array($q)){
		echo "<input type=hidden id=id_tipe name=id_tipe value='$sql_tipe[id_tipe]'>";
	}
}
else{
	echo "<DIV class='ui-layout-center' style=height:500px;>";
	echo "<div id=pad_msg><div id=inside_msg><center><b>NO DATA TO DISPLAY</b></center></div></div>";
	echo "</DIV>";
}
$z=mysql_query("select id_tingkat from pengguna where id_pengguna='$_SESSION[userid]'");
while($pengguna=mysql_fetch_array($z)){
	echo "<input type=hidden id=id_tingkat name=id_tingkat value='$pengguna[id_tingkat]'>";
}
echo "<input type=hidden id=uid name=uid value='$_SESSION[userid]'>";
echo "<form name='kondisi'><input type=hidden id=photo name=photo value='true'></form>";
echo "<input type=hidden id=grupp name=grupp value='$_SESSION[id_grups]'>";
echo "<input type=hidden id=id_perangkat name=id_perangkat value='$dt[id_perangkat]'>";

 ?>

<div id='map_kendaraan'></div>

<div id='floating-panel'>
	<div class='col-md-12 col-sm-12 col-xs-12'>
		<input type='text' id='start' class='form-control' placeholder='From'><div style="height:5px"></div>
		<input type='text' id='end' class='form-control' placeholder='To'><div style="height:5px"></div>
		<label id='btn_measure' class='btn btn-xs btn-primary'><i class='fa fa-map-marker'></i> Measure</label>
		<label id='total'></label>
	</div>
</div>

</div>  <!-- /x_panel -->
</div>  <!-- /col-md -->
</div>  <!-- /row -->

</div>
