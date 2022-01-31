<?php
	$this->pageTitle = Yii::app()->name." Registrar áreas ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/ueb/ueb.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="ueb"></div> 
