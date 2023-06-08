<?php
$dir = "../../upload/images/";
$files = array_diff(scandir($dir), array('..', '.'));
$filesArray = array_values($files);
header('Content-Type: application/json');
echo json_encode($filesArray);
?>
