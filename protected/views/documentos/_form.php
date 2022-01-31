<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'documentos-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'url_documento'); ?>
		<?php echo $form->textField($model,'url_documento',array('size'=>60,'maxlength'=>200)); ?>
		<?php echo $form->error($model,'url_documento'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'nombre_documento'); ?>
		<?php echo $form->textField($model,'nombre_documento',array('size'=>60,'maxlength'=>250)); ?>
		<?php echo $form->error($model,'nombre_documento'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'descripcion_documento'); ?>
		<?php echo $form->textField($model,'descripcion_documento',array('size'=>60,'maxlength'=>250)); ?>
		<?php echo $form->error($model,'descripcion_documento'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->