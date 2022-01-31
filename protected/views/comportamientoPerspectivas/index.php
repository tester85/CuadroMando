<?php
	$this->pageTitle = Yii::app()->name." Definir real ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/comportamientoPerspectivas/comportamiento.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="comportamiento" style="margin-left:25px; margin-bottom:15px"></div> 
