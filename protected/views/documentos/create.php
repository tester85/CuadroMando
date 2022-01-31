<?php
$this->breadcrumbs=array(
	'Documentoses'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Documentos', 'url'=>array('index')),
	array('label'=>'Manage Documentos', 'url'=>array('admin')),
);
?>

<h1>Create Documentos</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>