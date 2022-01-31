<?php
	$this->pageTitle = Yii::app()->name." Gestionar riesgos";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/riesgo/riesgo.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="riesgo"></div>