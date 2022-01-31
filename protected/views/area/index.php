<?php
	$this->pageTitle = Yii::app()->name." Registrar areas ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/area/area.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="area"></div> 
