<?php
	$this->pageTitle = Yii::app()->name." Comportamiento de indicadores ";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/comportamiento/comportamiento.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="comportamiento"style="margin-left:25px; margin-bottom:10px"></div> 
