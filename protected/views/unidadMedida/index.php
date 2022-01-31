<?php
	$this->pageTitle = Yii::app()->name." Gestionar unidades de medida ";
	$this->registerSencha();  

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/UnidadMedida/UnidadMedida.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?> 
 
<div id="unidades"></div>