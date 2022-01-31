<?php
	$this->pageTitle = Yii::app()->name." Gestionar clasificación";
	$this->registerSencha();  

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/Clasificacion/clasificacion.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?> 
 
<div id="clasificacion"></div>