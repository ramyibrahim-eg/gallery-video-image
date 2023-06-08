<?php
$dir = "../../upload/videos/videos_width/";
$files = array_diff(scandir($dir), array('..', '.'));
$filesArray = array_values($files);
header('Content-Type: application/json');
echo json_encode($filesArray);
?>
