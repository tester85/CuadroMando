<?php
	$this->pageTitle = Yii::app()->name." Gestionar objetivos de trabajo";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/objetivoDeTrabajo/ObjetivoDeTrabajo.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="objetivo"></div>