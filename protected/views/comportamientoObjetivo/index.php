<?php
	$this->pageTitle = Yii::app()->name." Comportamiento de los objetivos ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/comportamientoObjetivo/comportamientoObjetivo.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="comportamientoObjetivo" style="margin-left:25px; margin-bottom:10px""></div> 
