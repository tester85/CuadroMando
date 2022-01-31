<?php
	$this->pageTitle = Yii::app()->name." Gestionar Cargos";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/cargo/cargo.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="cargo"></div> 
