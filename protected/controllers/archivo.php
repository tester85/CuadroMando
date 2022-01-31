<?php
	class Archivo
	{   
		public function Salvar($archivos)
		{ 	
//$path = Yii::app()->basePath.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.'BdCM2.sql'; 
			if (!is_file($archivos)) { die("<b>404 File not found!</b>"); }
			  $len = filesize($archivos);
			  $filename = basename($archivos);
			  $file_extension = strtolower(substr(strrchr($filename,"."),1)); 
			  $ctype="application/force-download";			 
   			  header("Pragma: public");
			  header("Expires: 0");
			  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			  header("Cache-Control: public");
			  header("Content-Description: File Transfer");
			  header("Content-Type: $ctype");
			  $header="Content-Disposition: attachment; filename=".$filename.";";
			  
			  header($header);
			  header("Content-Transfer-Encoding: binary");
			  header("Content-Length: ".$len);
			  @readfile($archivos);
			  fclose($archivos);  				  
			  
			  /*
		  
			header("Content-Type: text/plain");
			header('Content-Disposition: attachment; filename="'.date("d-m-y").'.sigba"');
			header("Content-Length: ".filesize($path)); 
			readfile($path);*/
		}
	}
?>
