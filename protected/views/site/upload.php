 <?php
	$this->pageTitle = Yii::app()->name." Subir archivos";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/site/upload.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div align='center' id="upload"></div>

 