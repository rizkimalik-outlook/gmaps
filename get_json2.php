<?php
header('Content-type: application/json');
// Open Connection
$con = @mysqli_connect('localhost', 'root', 'Kosong07', 'ticket');
// include ("config/dbconfig.php");
if (!$con) {
    echo "Error: " . mysqli_connect_error();
	exit();
}

// Some Query
$sql = "select * from point where id_point='".$_REQUEST['id_point']."'";
$query 	= mysqli_query($con, $sql);
$listcallid = array();
while($post = mysqli_fetch_assoc($query)) 
{
	$listcallid[] = $post;
}
	
echo json_encode($listcallid);

// Close connection
mysqli_close ($con);

?>