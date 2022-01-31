 <?php
	$this->pageTitle = Yii::app()->name." Gestionar usuarios ";
	$this->registerSencha(); 
 

	$script = Yii::app()->assetManager->publish(Yii::app()->basePath.'/views/usuario/usuario.js');
	Yii::app()->clientScript->registerScriptFile($script); 
?>   
	 <div id="usuario"></div> 

