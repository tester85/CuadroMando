<?php
	$this->pageTitle = Yii::app()->name." Gestionar objetivo estrategico";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/objetivoEstrategico/objetivoEstrategico.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?> 
 
<div id="objetivoEstrategico"></div>