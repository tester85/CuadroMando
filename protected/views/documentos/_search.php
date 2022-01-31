<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id_documento'); ?>
		<?php echo $form->textField($model,'id_documento'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'url_documento'); ?>
		<?php echo $form->textField($model,'url_documento',array('size'=>60,'maxlength'=>200)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'nombre_documento'); ?>
		<?php echo $form->textField($model,'nombre_documento',array('size'=>60,'maxlength'=>250)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'descripcion_documento'); ?>
		<?php echo $form->textField($model,'descripcion_documento',array('size'=>60,'maxlength'=>250)); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->