<?php
	$this->pageTitle = Yii::app()->name." Gestionar perspectivas";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/perspectiva/perspectiva.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>  
 
	 <div id="perspectiva"></div> 
