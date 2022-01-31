<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />
    <link rel="shortcut icon" href="<?php echo Yii::app()->request->baseUrl; ?>/images/IconoCMI.ico" />
	<!-- blueprint CSS framework -->
	
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/print.css" media="print" />
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
	<![endif]-->
	 

		
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/form.css" />

	
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default.css"/>	
<?php

	$jqueryslidemenupath = Yii::app()->assetManager->publish(Yii::app()->basePath.'/scripts/jqueryslidemenu/'); 
	//Register jQuery, JS and CSS files 
	Yii::app()->clientScript->registerCoreScript('jquery'); 
	Yii::app()->clientScript->registerCssFile($jqueryslidemenupath.'/jqueryslidemenu.css'); 
	Yii::app()->clientScript->registerScriptFile($jqueryslidemenupath.'/jqueryslidemenu.js'); 
 
?>
 	<title><?php // echo CHtml::encode($this->pageTitle); ?></title>  
</head>
 
<div class="k_container">
	<div class="contenedor_cuerpo_principal">
	
	
		<div class="contenendor_exterior_cinta_horizontal_superior">
        	<div class="borde_izquierdo_cinta_horizontal_superior"></div>
            <div class="cuerpo_cinta_horizontal_superior">
            	<div class="contenido_cuerpo_cinta_horizontal_superior">
                <!--	<div class="contenedor_nombre_aplicacion"></div> -->
              	</div>
            </div>
           <!-- <div class="borde_derecho_cinta_horizontal_superior">
            </div> -->
        </div>
			 
        <div class="contenedor_exterior_menu_horizontal">
        	<div class="borde_izquierdo_menu_horizontal"></div>
            <div class="contenedor_exterior_cuerpo_menu_horizontal">
            	 
				
 <!--   <div id="myslidemenu" class="jqueryslidemenu"> -->
	<div id="myslidemenu" class="mainmenu" >  
		<?php  $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Inicio', 'url'=>array('site/index'), 	 
					'items'=>array(			
				/*	array('label'=>'Area', 'url'=>array('/DatArea/index'),'visible'=>!Yii::app()->user->isGuest), 
					array('label'=>'Usuarios', 'url'=>array('srbac/Default/Index'),'visible'=>!Yii::app()->user->isGuest), */
					),),
		/* 	array('label'=>'Gestionar datos', 'url'=>array(''), 'visible'=>!Yii::app()->user->isGuest,	 
					'items'=>array(			
					//	array('label'=>'Perspectivas', 'url'=>array('/Perspectiva/index')),  
					//	array('label'=>'Objetivos Estrategicos', 'url'=>array('/ObjetivoEstrategico/index')),
					//	array('label'=>'Areas', 'url'=>array('/Area/index')),
					//	array('label'=>'Unidad de Medida', 'url'=>array('/UnidadMedida/index')),
					//	array('label'=>'Clasificacion', 'url'=>array('/Clasificacion/index')), 
					//	array('label'=>'Objetivos de Trabajo', 'url'=>array('/ObjetivoDeTrabajo/index')),
					//	array('label'=>'Indicadores', 'url'=>array('/Indicador/index')),
						array('label'=>'Accion', 'url'=>array('/Accion/index')),
					//	array('label'=>'Riesgo', 'url'=>array('/Riesgo/index')),
					//	array('label'=>'Mitigacion', 'url'=>array('/Mitigacion/index')),
					),	 
				),*/  
			array('label'=>'Configuracion', 'url'=>array(''),'visible'=>(Yii::app()->session['estructura'] === 'Nacional'),	 
					'items'=>array(			
						array('label'=>'Provincias', 'url'=>array('Provincia/index')),  
						array('label'=>'UEBs', 'url'=>array('Ueb/index')),  
						array('label'=>'Usuarios', 'url'=>array('Usuario/index')),  
						array('label'=>'Areas', 'url'=>array('/Area/index')),
						array('label'=>'Cargos', 'url'=>array('Cargo/index')),
						array('label'=>'Unidades de Medida', 'url'=>array('/UnidadMedida/index')),
						//array('label'=>'Formulas', 'url'=>array('')), 
					),	 
				),				
			array('label'=>'Gestion de datos', 'url'=>array(''),
			 //'visible'=>(Yii::app()->session['role'] === 'Nacional'), 	 
					'items'=>array(			
						array('label'=>'Perspectivas', 'url'=>array('/Perspectiva/index')),  
						array('label'=>'Objetivos estrategicos', 'url'=>array('/ObjetivoEstrategico/index')),
						array('label'=>'Objetivos de trabajo', 'url'=>array('/ObjetivoDeTrabajo/index')),
						array('label'=>'Indicadores', 'url'=>array('/Indicador/index')),
						array('label'=>'Rangos cumplimiento', 'url'=>array('Rango/index')),
						array('label'=>'Acciones', 'url'=>array('/Accion/index')),
						array('label'=>'Planes', 'url'=>array('/Plan/index'),
								'visible'=>(Yii::app()->session['estructura'] === 'Ueb' || 
									 Yii::app()->session['estructura'] === 'Provincial' ||
									 Yii::app()->session['estructura'] === 'Nacional' 
									 )),
						array('label'=>'Reales', 'url'=>array('/Real/index'),
								'visible'=>(Yii::app()->session['estructura'] === 'Ueb' || 
									 Yii::app()->session['estructura'] === 'Provincial' ||
									 Yii::app()->session['estructura'] === 'Nacional' 
									 )),						
						array('label'=>'Riesgos', 'url'=>array('/Riesgo/index')),
						array('label'=>'Plan de mitigacion', 'url'=>array('/Mitigacion/index')),
					),	 
				 ),	
			array('label'=>'Salidas', 'url'=>array(''),	 
					'items'=>array(			
						array('label'=>'Perspectivas', 'url'=>array('/ComportamientoPerspectivas/index')),  
						array('label'=>'Indicadores', 'url'=>array('/Comportamiento/index')),
						//array('label'=>'Acciones', 'url'=>array('')),
						//array('label'=>'Riesgos', 'url'=>array('')),
					),	 
				),	
			/*array('label'=>'Salidas', 'url'=>array(''), 'visible'=>!Yii::app()->user->isGuest,	 
					'items'=>array(			
						array('label'=>'Reportes', 'url'=>array('/Comportamiento/index')),  
						array('label'=>'Graficos', 'url'=>array('')),  
					),	 
				),	*/	 
		/*	array('label'=>'Exportar/Importar', 'url'=>array(''),'visible'=>(Yii::app()->session['role'] === 'administrador'),
				'items'=>array(			
						array('label'=>'Exportar', 'url'=>array('site/Exportar')), 
                        array('label'=>'Importar', 'url'=>array('')),						
					),		
				),	*/	
				array('label'=>'Gestion documental', 'url'=>array(''), 'visible'=>!Yii::app()->user->isGuest, 
					'items'=>array(			
						array('label'=>'Documentos', 'url'=>array('site/Documentos'))
					//	array('label'=>'Subir archivos', 'url'=>array('Documentos/index'),'visible'=>(Yii::app()->session['role'] === 'administrador')),)
				),	
				
				array('label'=>'Registrarse', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest), 
				array('label'=>'Salir .: '.Yii::app()->user->name.' :.', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest), 
			), 
		)); 

		?>  <br > <br style="clear:left" />
			
	</div>   
                </div>
             
            <div class="borde_derecho_menu_horizontal"></div>
        </div>
		
		
        <div class="contenedor_exterior_contenido_pagina">
            <div class="contenedor_contenido_pagina">
            	<div class="borde_derecho_contenedor_contenido_pagina"></div>
                <div class="contenedor_exterior_cuerpo_contenido_pagina">
                	<div class="cuerpo_contenido_pagina"> 
                        <div class="contenido_pagina" id="mostrar">                           
							<?php 
							echo $content; 
						    ?> 
                        </div>
                    </div>
                </div>
          </div>
        </div>
	<div class="contenedor_exterior_pie_pagina">
        	 
        </div>
  </div>    
</div>

</body>
<body>

 
