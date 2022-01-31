<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_documento')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id_documento), array('view', 'id'=>$data->id_documento)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('url_documento')); ?>:</b>
	<?php echo CHtml::encode($data->url_documento); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('nombre_documento')); ?>:</b>
	<?php echo CHtml::encode($data->nombre_documento); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('descripcion_documento')); ?>:</b>
	<?php echo CHtml::encode($data->descripcion_documento); ?>
	<br />


</div>