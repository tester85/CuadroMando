<?php

class ObjetivoEstrategicoController extends Controller
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
		$model=new ObjetivoEstrategico; 
		 
		if(isset($_POST['nombre_objetivo_estrategico']))
		{
			$model->nombre_objetivo_est=$_POST['nombre_objetivo_estrategico']; 
			$model->id_perspectiva=$_POST['id_perspectiva']; 
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
		$id=$_POST['id_objetivo_estrategico'];  
		$model=$this->loadModel($id);  
		if(isset($_POST['id_objetivo_estrategico']))
		{ 
			$model->nombre_objetivo_est=$_POST['nombre_objetivo_estrategico'];
			$model->id_perspectiva=$_POST['id_perspectiva'];   
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
		 if(isset($_POST['id_objetivo_estrategico']))
		{			
			$id = $_POST['id_objetivo_estrategico'];
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
		//$dataProvider=new CActiveDataProvider('ObjetivoEstrategico');
		$this->render('index');//,array('dataProvider'=>$dataProvider,));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new ObjetivoEstrategico('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['ObjetivoEstrategico']))
			$model->attributes=$_GET['ObjetivoEstrategico'];

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
		$model=ObjetivoEstrategico::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='objetivo-estrategico-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	public function actionTodos()
	{	 
		$sql="Select 
		perspectiva.id_perspectiva,
		perspectiva.nombre_perspectiva,
		objetivo_estrategico.nombre_objetivo_est, 
		objetivo_estrategico.id_objetivo_estrategico
		from perspectiva 
		inner join objetivo_estrategico 
		on perspectiva.id_perspectiva = objetivo_estrategico.id_perspectiva
		order by objetivo_estrategico.id_objetivo_estrategico";
		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
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
