 <?php
	$this->pageTitle = Yii::app()->name." Gestionar rangos";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/rango/rango.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="rango"></div>