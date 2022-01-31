<?php
	$this->pageTitle = Yii::app()->name." Gestionar planes reales";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/real/real.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="real"></div> 
