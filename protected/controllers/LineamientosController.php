<?php

class LineamientosController extends Controller
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
		$sql_insert = "INSERT INTO lineamientos(
            numero_lineamiento, descripcion_lineamiento)
			VALUES ('".$_POST['numero_lineamiento']."', '".$_POST['descripcion_lineamiento']."');";
		
		if(isset($_POST['numero_lineamiento']))
		{    
			if(Yii::app()->db->createCommand($sql_insert)->execute())			 
				{
					echo 'true';   
				}
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
	
		if(isset($_POST['id_lineamiento']))
		{  		 
			$query_update = "UPDATE lineamientos
			SET 
			numero_lineamiento='". $_POST['numero_lineamiento']."',
			descripcion_lineamiento='". $_POST['descripcion_lineamiento']."' 
			WHERE id_lineamiento = '".$_POST['id_lineamiento']."'";
			
			if(Yii::app()->db->createCommand($query_update)->execute())
			{
				echo 'true';  
			} 
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
		if(isset($_POST['id_lineamiento']))
		{ 
			$id = $_POST['id_lineamiento'];
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
		$model=new Lineamientos('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Lineamientos']))
			$model->attributes=$_GET['Lineamientos'];

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
		$model=Lineamientos::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='lineamientos-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	public function actionTodos()
	{ 	
		$sql='Select 
		lineamientos.id_lineamiento,
		lineamientos.numero_lineamiento,
		lineamientos.descripcion_lineamiento		 
		FROM
		public.lineamientos		
		order by numero_lineamiento Asc ';  
		
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
	
	public function actionObjetivosAsociados()
	{	
		$sql = "SELECT * FROM objetivo_de_trabajo inner join lineamientos_objetivo
				on objetivo_de_trabajo.id_objetivo_trabajo = lineamientos_objetivo.id_objetivo_trabajo
				where lineamientos_objetivo.id_lineamiento = '".$_POST['id_lineamiento']."'";
	
		$class =  Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos));
	}
	
	public function actionAddObjetivosAsoc()
	{    
		 if(isset($_POST['id_lineamiento']))
		 {
		 $model_Lineamiento_O = LineamientosObjetivo::model()->findAllByAttributes(array('id_lineamiento'=>$_POST['id_lineamiento']));
			if($model_Lineamiento_O)
			 {
			 LineamientosObjetivo::model()->deleteAllByAttributes(array('id_lineamiento'=>$_POST['id_lineamiento']));
			 }
			 
			 $model_Lineamiento_O = new LineamientosObjetivo; 
			 $obj_asociados = json_decode($_POST['id_objetivos_trabajo']); 
			 $cant = 0;
			 $real = 0;
			 $cant = count($obj_asociados);
			  foreach($obj_asociados as $objetivos)
				 {
					 $sql_insert = "INSERT INTO lineamientos_objetivo(
						 id_lineamiento,id_objetivo_trabajo)
						VALUES ('".$_POST['id_lineamiento']."', '".$objetivos."')";
					 Yii::app()->db->createCommand($sql_insert)->execute(); 
					 $real++;
				 } 
			if($cant === $real)
			echo 'true';
		 }
			else echo 'false';	 
	}
	public function actionElimAsociacion()
	{
		 if(isset($_POST['id_objetivo_trabajo']))
		 {
			$id_objetivo_trabajo = $_POST['id_objetivo_trabajo'];
			LineamientosObjetivo::model()->deleteAllByAttributes(array('id_objetivo_trabajo'=>$id_objetivo_trabajo));
			echo 'true';		
		}
		else echo 'false';
	}
	
}
