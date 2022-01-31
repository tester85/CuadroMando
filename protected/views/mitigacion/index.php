<?php
	$this->pageTitle = Yii::app()->name." Gestionar mitigacion";
	$this->registerSencha();  
	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/mitigacion/mitigacion.js');
	Yii::app()->clientScript->registerScriptFile($script);  
?> 
 
<div id="mitigacion"></div>