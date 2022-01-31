<?php

class MitigacionController extends Controller
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
			//'accessControl', // perform access control for CRUD operations
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
		$model=new Mitigacion;
		if(isset($_POST['id_riesgo']))
		{
			$model->nombre_mitigacion = $_POST['nombre_accion'];
			$model->fecha_cumplimiento_mitigacion = $_POST['fecha_cump'];
			$model->id_riesgo = $_POST['id_riesgo'];
			$model->estado = $_POST['estado'];
			$model->id_cargo_responsable = $_POST['responsables'];
			$model->id_cargo_ejecutante  = $_POST['ejecutantes'];
			if($model->save())
			echo 'true'; 
		}
		else echo 'false';
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate()
	{
		if(isset($_POST['id_mitigacion']))
		{
			$model=$this->loadModel($_POST['id_mitigacion']); 
			$model->nombre_mitigacion = $_POST['nombre_accion'];
			$model->fecha_cumplimiento_mitigacion = $_POST['fecha_cump'];
			$model->id_riesgo = $_POST['id_riesgo'];
			$model->estado = $_POST['estado'];
			$model->id_cargo_responsable = $_POST['responsables'];
			$model->id_cargo_ejecutante  = $_POST['ejecutantes'];
			//$model->id_mitigacion = $_POST['id_mitigacion'];
				//		print_r($model['estado']);  die;
			if($model->save())
			echo 'true'; 
		}
		else echo 'false';
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		 if(isset($_POST['id_mitigacion']))
		 {
			if($this->loadModel($_POST['id_mitigacion'])->delete())
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
		$model=new Mitigacion('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Mitigacion']))
			$model->attributes=$_GET['Mitigacion'];

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
		$model=Mitigacion::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='mitigacion-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	public function actionTodos()
	{ 	
		$sql="select 
		indicador.nombre_indicador, 
		indicador.cierre_anno_anterior,
		indicador.proyectado,
		indicador.descripcion, 
		riesgo.id_indicador, 
		riesgo.id_riesgo, 
		riesgo.nombre_riesgo,
		riesgo.clasificacion 	
		from riesgo 		
		inner join indicador 
		on riesgo.id_indicador = indicador.id_indicador
		where indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
		 
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	public function actionAccionesMitigar()
	{ 	
		$sql="Select 
		riesgo.id_indicador, 
		riesgo.nombre_riesgo,
		riesgo.clasificacion,
		riesgo.id_riesgo,
		mitigacion.nombre_mitigacion,
		mitigacion.id_cargo_responsable,
		mitigacion.id_cargo_ejecutante,
		mitigacion.estado,
		mitigacion.id_mitigacion,
		mitigacion.fecha_cumplimiento_mitigacion,
		cargo.nombre_cargo 
		from mitigacion
		inner join riesgo on riesgo.id_riesgo = mitigacion.id_riesgo
		inner join cargo on cargo.id_cargo = mitigacion.id_cargo_ejecutante
		where riesgo.id_riesgo = '".$_POST['id_riesgo']."'		
		order by id_riesgo Asc";  		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	} 
}
