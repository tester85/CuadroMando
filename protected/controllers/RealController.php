<?php

class RealController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
		//	'accessControl', // perform access control for CRUD operations
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{ 
		
		$query = "INSERT INTO real(
             id_plan, id_indicador, valor_real, observacion, solucion)
			VALUES ('".$_POST['id_plan']."','".$_POST['id_indicador']."','".$_POST['valor_mes']."', '".$_POST['observacion']."','".$_POST['solucion']."');";
		if(Yii::app()->db->createCommand($query)->execute())
		echo 'true';
		else echo 'false'; 
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate()
	{
		$query = "UPDATE real
		SET 
		valor_real='".$_POST['valor_mes']."', 
		observacion='".$_POST['observacion']."', 
        solucion='".$_POST['solucion']."'
		WHERE id_real = '".$_POST['id_real']."'";
		if(Yii::app()->db->createCommand($query)->execute())
		echo 'true';
		else echo 'false';  
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		if(isset($_POST['id_real']))
		{			
			$id = $_POST['id_real'];
			$this->loadModel($id)->delete();		
			echo 'true';
		}
		else echo 'false';
			
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{  
		$this->render('index');
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Real('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Real']))
			$model->attributes=$_GET['Real'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Real::model()->findByPk((int)$id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='real-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	public function actionTodos()
	{				
		//  localizo en la BD todos los datos de los planes 
		//  no realizo una sola consulta pues pueden existir meses con plan asignado que no posean
		//  un real
		if(Yii::app()->session['role'] === 'administrador')
		{
			$query_plan_indicador = "Select 
					indicador.cierre_anno_anterior,
					indicador.nombre_indicador,
					indicador.id_indicador,				
					unidad_medida.nombre,				
					dat_mes.id_mes,
					dat_mes.nombre_mes,
					plan.valor_plan_mes,
					plan.id_plan,				
					plan.id_indicador 
					from plan 
					inner join indicador on plan.id_indicador = indicador.id_indicador				
					inner join dat_mes on plan.id_mes = dat_mes.id_mes
					inner join unidad_medida on  indicador.id_unidad_medida = unidad_medida.id_unidad_medida 
					where indicador.id_indicador = '".$_POST['id_indicador']."'
					order by dat_mes.id_mes"; 
					
		//  localizo en la BD todos los datos de los reales existentes asociados a cada plan  
			$query_real_indicador = "Select 
					indicador.cierre_anno_anterior,
					indicador.nombre_indicador,
					indicador.id_indicador,				
					dat_mes.id_mes,
					dat_mes.nombre_mes,
					plan.valor_plan_mes,
					plan.id_plan,
					real.valor_real,
					real.id_real,				
					real.observacion,				
					real.solucion,				
					plan.id_indicador 
					from plan 
					inner join indicador on plan.id_indicador = indicador.id_indicador
					inner join real on plan.id_plan = real.id_plan
					inner join dat_mes on plan.id_mes = dat_mes.id_mes
					where indicador.id_indicador = '".$_POST['id_indicador']."'";
		}
		else {
			$query_plan_indicador = "Select 
		indicador.cierre_anno_anterior,
		indicador.nombre_indicador,
		indicador.id_indicador,				
		unidad_medida.nombre,				
		dat_mes.id_mes,
		dat_mes.nombre_mes,
		plan.valor_plan_mes,
		plan.id_plan,				
		plan.id_indicador,
		usuario.role,
		usuario.id_usuario 
		from plan 
		inner join indicador on plan.id_indicador = indicador.id_indicador				
		inner join dat_mes on plan.id_mes = dat_mes.id_mes
		inner join unidad_medida on  indicador.id_unidad_medida = unidad_medida.id_unidad_medida 
		inner join usuario_indicador on  indicador.id_indicador = usuario_indicador.id_indicador 
		inner join usuario on  usuario.id_usuario = usuario_indicador.id_usuario 
		where indicador.id_indicador ='".$_POST['id_indicador']."' and usuario_indicador.id_usuario = '".Yii::app()->session['id_usuario']."'
		order by dat_mes.id_mes "; 
					
		//  localizo en la BD todos los datos de los reales existentes asociados a cada plan  
		$query_real_indicador = "Select 
		indicador.cierre_anno_anterior,
		indicador.nombre_indicador,
		indicador.id_indicador,				
		dat_mes.id_mes,
		dat_mes.nombre_mes,
		plan.valor_plan_mes,
		plan.id_plan,
		real.valor_real,
		real.id_real,				
		real.observacion,				
		real.solucion,				
		plan.id_indicador 
		from plan 
		inner join indicador on plan.id_indicador = indicador.id_indicador
		inner join real on plan.id_plan = real.id_plan
		inner join dat_mes on plan.id_mes = dat_mes.id_mes
		inner join usuario_indicador on  indicador.id_indicador = usuario_indicador.id_indicador 
		inner join usuario on  usuario.id_usuario = usuario_indicador.id_usuario 
		where indicador.id_indicador ='".$_POST['id_indicador']."' and usuario_indicador.id_usuario = '".Yii::app()->session['id_usuario']."' ";
		}
			$datos_real = array();		
			$datos_plan = array();
			$todos = array();
			
		$q1 = Yii::app()->db->createCommand($query_plan_indicador)->queryAll();
		$q2 = Yii::app()->db->createCommand($query_real_indicador)->queryAll();
		
		// almaceno en 2 arreglos ambos resultados para luego mostrarlos en uno solo para la 
		// vista en el grid
		  
		foreach($q1 as $plan_indicador)
		{
			$datos_plan[] = $plan_indicador;
			$todos[] = $plan_indicador;	 // almaceno todos los planes a devolver
		}
			
		foreach($q2 as $plan_real)
		{
			$datos_real[] = $plan_real;	
		}	
		$planes = count($datos_plan);
		$reales = count($datos_real); 
		
		// busco en los planes los que tengan un real definido
		
		for($i=0;$i<$planes;$i++)
		{
			for($j=0;$j<$reales;$j++)
			{
				if($datos_plan[$i]['id_plan'] == $datos_real[$j]['id_plan'])
				{ 
					// reemplazo el plan de esta posicion por un nuevo arreglo
					// que posee el valor del real con el id de la tabla relacionada
					// -- el resto de los datos quedan intactos 
					
					$todos[$i] = array_merge($datos_plan[$i],$datos_real[$j]); 
				}
			}
		} 
		//print_r($todos); die;
		 echo  CJSON::encode(array('datos'=>$todos));		
	}
}
