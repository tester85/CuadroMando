<?php

class ClasificacionController extends Controller
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
				'actions'=>array('index','view','create','update'),
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
		$model=new Clasificacion; 
		if(isset($_POST['nombre_clasificacion']))
		{ 	 				
			$model->nombre_clasificacion=$_POST['nombre_clasificacion'];
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
		$model=$this->loadModel($_POST['id_clasificacion']); 
		if(isset($model))
		{
			$model->nombre_clasificacion=$_POST['nombre_clasificacion'];
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
		if(isset($_POST['id_clasificacion']))
		{
		 $id = $_POST['id_clasificacion'];
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
		$model=new Clasificacion('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Clasificacion']))
			$model->attributes=$_GET['Clasificacion'];

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
		$model=Clasificacion::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='clasificacion-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	public function actionClasificacion()
	{	 
		$sql='Select id_clasificacion,nombre_clasificacion from clasificacion';
		$class = Clasificacion::model()->findAllBySql($sql);
		 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel->attributes; 
		} 
		
		$pageSize = 20;
		if(isset($_POST['limit']))
			$pageSize = $_POST['limit'];
		$currentPage = 0;
		$start=0;
		if(isset($_POST['start']))
		 {
			$currentPage = $_POST['start'] / $pageSize;
			$start=$_POST['start'];
		 }
		$total=count($datos);
		$datos2=array_splice($datos,$start,$pageSize, $total);
		
	   echo  CJSON::encode(array('datos'=>$datos2, 'total'=>$total)); 
	}
	
}
