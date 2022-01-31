<?php
	$this->pageTitle = Yii::app()->name." Gestionar acciones";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/accion/accion.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="accion"></div>