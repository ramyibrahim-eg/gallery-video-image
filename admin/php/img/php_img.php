<?php
  $file_name =  $_FILES['file']['name'];
  $tmp_name = $_FILES['file']['tmp_name'];
  $new_file_name = "images-";
  $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);
  $file_up_name = $new_file_name.time().'.'.$file_extension;
  $file_up_path = "../../../upload/images/".$file_up_name;
  move_uploaded_file($tmp_name, $file_up_path);
?>