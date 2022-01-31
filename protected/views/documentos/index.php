<?php /*
$this->breadcrumbs=array(
	'Documentoses',
);

$this->menu=array(
	array('label'=>'Create Documentos', 'url'=>array('create')),
	array('label'=>'Manage Documentos', 'url'=>array('admin')),
);*/
//<h1>Documentoses</h1>
?>



<?php /* $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); */?>
<?php
	$this->pageTitle = Yii::app()->name." Gestionar objetivos";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/documentos/upload.js');
	Yii::app()->clientScript->registerScriptFile($script);  
	//<div id="upload"></div>
?> 
<form method="post" enctype="multipart/form-data" action ="Documentos/SubirArchivos">
<input name="MAX_FILE_SIZE" type="hidden" value="1000000000">         
         Archivo : <input name="file" type="file"/> <br/>  <br/>  
	    <input name="button" type="submit" value="Subir"/>

</form>
<?php /*
echo "<h3>Index</h3>\n";
echo "<table>\n";
$directorio = opendir("c:/wamp/www/".Yii::app()->baseUrl."/Documentos/");
while ($archivo = readdir($directorio))
   {
   $nombreArch = ucwords($archivo);
   $nombreArch = str_replace("..", "Atras", $nombreArch);
   echo "<tr>\n<td>\n<a href='$archivo'>\n";
   echo "<img src='./imagenes/carpeta.png' alt='Ver $nombreArch'";
   echo " border=0>\n";
   echo "<b>&nbsp;".$nombreArch."</b></a></td>\n";
   echo "\n</tr>\n";
   }
closedir($directorio); 
echo "</table>\n"; */

?>



