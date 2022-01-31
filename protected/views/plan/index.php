<?php
	$this->pageTitle = Yii::app()->name." Gestionar plan ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/plan/plan.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="plan"></div> 
