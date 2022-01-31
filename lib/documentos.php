<?php 

$dir = "Documentos/"; 
$ach = scandir($dir); 
$cnt = count($ach); 
for($i=2;$i<$cnt;$i++){ 
  echo '<a href="Documentos/'.$ach[$i].'"> '.$ach[$i].'</a> <br>'; 
} 
 
  

?>