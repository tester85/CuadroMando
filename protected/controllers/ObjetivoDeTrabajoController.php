<?php

class ObjetivoDeTrabajoController extends Controller
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
		$model=new ObjetivoDeTrabajo; 
		
		if(isset($_POST['numero_objetivo']))
		{   
			$model->nombre_objetivo_trabajo = $_POST['nombre_objetivo'];
			$model->numero_objetivo_trabajo = $_POST['numero_objetivo']; 
			$model->id_objetivo_estrategico = $_POST['id_objetivo_estrategico'];  
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
	 $id=$_POST['id_objetivo_trabajo']; 
	 if(isset($id))
		{  			
			$query_update = "UPDATE objetivo_de_trabajo
			SET 
			numero_objetivo_trabajo='". $_POST['numero_objetivo']."',
			nombre_objetivo_trabajo='". $_POST['nombre_objetivo']."', 
			id_objetivo_estrategico='". $_POST['id_objetivo_estrategico']."'
			WHERE id_objetivo_trabajo = '".$id."'";
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
		if(isset($_POST['id_objetivo_trabajo']))
		{ 
			$id = $_POST['id_objetivo_trabajo'];
			$this->loadModel($id)->delete();
				echo 'true'; 
		}
		else echo'false';
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
		$model=new ObjetivoDeTrabajo('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['ObjetivoDeTrabajo']))
			$model->attributes=$_GET['ObjetivoDeTrabajo'];

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
		$model=ObjetivoDeTrabajo::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='objetivo-de-trabajo-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	
	public function actionAreas()
	{	 
		$sql='Select id_area,nombre_area from area';
		$class = Area::model()->findAllBySql($sql);		
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel->attributes; 
		}  
	   echo  CJSON::encode($datos); 
	}
	
	
	public function actionObjetivosEstrategicos()
	{	 
		$sql="Select 
		objetivo_estrategico.nombre_objetivo_est,
		objetivo_estrategico.fecha_cumplimiento,
		objetivo_estrategico.id_objetivo_estrategico,  
		objetivo_estrategico.id_perspectiva
		from  objetivo_estrategico";
		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}   
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	
	public function actionTodos()
	{ 	
		$sql='Select 
		objetivo_de_trabajo.numero_objetivo_trabajo,
		objetivo_de_trabajo.nombre_objetivo_trabajo,
		objetivo_de_trabajo.id_objetivo_trabajo,
		objetivo_de_trabajo.id_objetivo_estrategico,
		objetivo_estrategico.nombre_objetivo_est,
		objetivo_estrategico.fecha_cumplimiento,
		perspectiva.nombre_perspectiva,
		perspectiva.id_perspectiva 
		FROM
		public.objetivo_de_trabajo
		INNER JOIN public.objetivo_estrategico ON (public.objetivo_de_trabajo.id_objetivo_estrategico = public.objetivo_estrategico.id_objetivo_estrategico)
		INNER JOIN public.perspectiva ON (public.objetivo_estrategico.id_perspectiva = public.perspectiva.id_perspectiva)		
		order by numero_objetivo_trabajo Asc ';  
		
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
	 
	public function actionAreasAsoc()
	{	 
		$sql="select 
		area.id_area,
		area.nombre_area,
		objetivo_de_trabajo.numero_objetivo_trabajo,
		objetivo_de_trabajo.nombre_objetivo_trabajo,
		objetivo_de_trabajo.id_objetivo_trabajo
		from  area  
		inner join objetivo_de_trabajo_area 
		on area.id_area = objetivo_de_trabajo_area.id_area 
		inner join objetivo_de_trabajo 
		on objetivo_de_trabajo_area.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo 
		where objetivo_de_trabajo.id_objetivo_trabajo = '".$_POST['id_objetivo_trabajo']."'";
		
		$class =  Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos));
	} 
	
	public function actionAddAreasAsoc()
	{    
		 if(isset($_POST['id_objetivo_trabajo']))
		 {
		 $model_Area_O = ObjetivoDeTrabajoArea::model()->findAllByAttributes(array('id_objetivo_trabajo'=>$_POST['id_objetivo_trabajo']));
			if($model_Area_O)
			 {
			 ObjetivoDeTrabajoArea::model()->deleteAllByAttributes(array('id_objetivo_trabajo'=>$_POST['id_objetivo_trabajo']));
			 }
			 
			 $model_Area_O = new ObjetivoDeTrabajoArea; 
			 $areas_asociadas_obj = json_decode($_POST['id_area']); 
			 $cant = 0;
			 $real = 0;
			 $cant = count($areas_asociadas_obj);
			  foreach($areas_asociadas_obj as $area)
				 {
					 $sql_insert = "INSERT INTO objetivo_de_trabajo_area(
						id_objetivo_trabajo, id_area)
						VALUES ('".$_POST['id_objetivo_trabajo']."', '".$area."')";
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
		 if(isset($_POST['id_area']))
		 {
			$id_area = $_POST['id_area'];
			ObjetivoDeTrabajoArea::model()->deleteAllByAttributes(array('id_area'=>$id_area));
			echo 'true';		
		}
		else echo 'false';
	}
}
