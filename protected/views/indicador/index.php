<?php
	$this->pageTitle = Yii::app()->name." Gestionar indicadores";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/indicador/indicador.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="indicador"></div>