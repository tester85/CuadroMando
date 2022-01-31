<?php
	$this->pageTitle = Yii::app()->name." Registrar áreas ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/provincia/provincia.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="provincia"></div> 
