<?php
	$this->pageTitle = Yii::app()->name." Comportamiento de las Acciones ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/comportamientoAcciones/comportamientoAcciones.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="comportamientoAcciones" style="margin-left:25px; margin-bottom:15px"></div> 
