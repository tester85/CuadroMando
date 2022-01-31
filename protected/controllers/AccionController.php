<?php

class AccionController extends Controller
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
		$model=new Accion;
		if(isset($_POST['nombre']))
		{
			$model->id_objetivo_trabajo	= $_POST['objetivoT'];			  
			$model->nombre_accion = $_POST['nombre'];				  
			$model->avance = $_POST['avance'];	 	
			$model->fecha_cump_accion = $_POST['fecha_cump'];					
			$model->id_cargo_ejecutante = $_POST['ejecutantes']; 
			$model->save();
			if($model->save())
			 	{
				// se buscan los elementos para insertar en la tabla indicador_accion 
					$model_accion_indicador = new IndicadorAccion; 
					$model_accion_indicador->id_accion = $model->id_accion;
					$model_accion_indicador->id_indicador = $_POST['indicador'];
					$model_accion_indicador->save();
					if($model_accion_indicador->save())
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
		$id_indicador_accion = $_POST['id_indicador_accion'];
		
	if(isset($_POST['id_accion']))
		{
		$query = "UPDATE accion	SET 
			nombre_accion='".$_POST['nombre']."',
			id_objetivo_trabajo='".$_POST['objetivoT']."',
			id_cargo_ejecutante='".$_POST['ejecutantes']."', 
			fecha_cump_accion='".$_POST['fecha_cump']."',
			avance='".$_POST['avance']."'  
			WHERE id_accion = '".$_POST['id_accion']."'";
			
		$query2 = "UPDATE indicador_accion SET 
			id_indicador='".$_POST['indicador']."',
			id_accion='".$_POST['id_accion']."'			
			WHERE id_indicador_accion = '".$_POST['id_indicador_accion']."'";
			
			Yii::app()->db->createCommand($query)->execute();
			Yii::app()->db->createCommand($query2)->execute();
			echo 'true';
		}
		else echo 'false';
		
			/*$model=$this->loadModel($_POST['id_accion']); //cargo el modelo
			
			$model->id_objetivo_trabajo	= $_POST['objetivoT'];			  
			$model->nombre_accion = $_POST['nombre'];				  
			$model->avance = $_POST['avance'];	    		
			$model->ponderacion = $_POST['ponderacion'];		
			$model->fecha_cump_accion = $_POST['fecha_cump'];					
			$model->id_cargo_ejecutante = $_POST['ejecutantes']; 
			$model->save();
			if($model->save())
			 	{ 
					$model_accion_indicador = IndicadorAccion::model()->findByPk($id_indicador_accion); 
					$model_accion_indicador->id_accion = $model->id_accion;
					$model_accion_indicador->id_indicador = $_POST['indicador'];
					$model_accion_indicador->save();
					if($model_accion_indicador->save())
					echo 'true';
				} 
		}
		else echo 'false'; */
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		if(isset($_POST['id_indicador_accion']))
		{
			 IndicadorAccion::model()->deleteAllbyAttributes(array('id_indicador_accion'=>$_POST['id_indicador_accion']));
			 Accion::model()->deleteAllbyAttributes(array('id_accion'=>$_POST['id_accion']));
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
		$model=new Accion('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Accion']))
			$model->attributes=$_GET['Accion'];

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
		$model=Accion::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='accion-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	public function actionTodos()
	{ 	
	  
		$sql="select 
		indicador.id_indicador,
		indicador.nombre_indicador, 
		indicador.cierre_anno_anterior,
		indicador.proyectado,
		indicador.descripcion,		 
		indicador.id_cargo_responsable,				 
		objetivo_de_trabajo.nombre_objetivo_trabajo,
		objetivo_de_trabajo.numero_objetivo_trabajo,
		objetivo_de_trabajo.id_objetivo_trabajo,
		indicador_accion.id_indicador_accion,
		accion.id_accion,
		accion.fecha_cump_accion,
		accion.id_cargo_ejecutante,
		cargo.nombre_cargo, 
		accion.id_cargo_ejecutante,
		accion.nombre_accion,
		accion.avance,
		accion.id_accion 
		from accion  
		inner join indicador_accion on indicador_accion.id_accion = accion.id_accion
		inner join indicador on indicador.id_indicador = indicador_accion.id_indicador	
		inner join objetivo_de_trabajo on accion.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo
		inner join cargo on accion.id_cargo_ejecutante = cargo.id_cargo 
		where indicador.id_indicador = '".$_POST['id_indicador']."'
		order by accion.id_accion
		";
		
		$class = Yii::app()->db->createCommand($sql)->queryAll();  
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
		 
	} 
	 
	public function actionIndicadores()
	{ 	 
		if(Yii::app()->session['estructura'] == 'Nacional')
		{		 
			$sql='Select 
			indicador.id_indicador,
			indicador.nombre_indicador,		
			indicador.cierre_anno_anterior,
			indicador.proyectado,
			indicador.descripcion,
			cargo.id_cargo,
			cargo.nombre_cargo 
			from indicador 
			inner join cargo on indicador.id_cargo_responsable = cargo.id_cargo			
			order by id_indicador Asc ';  
		}
		else 
			$sql='Select 
			id_indicador,
			nombre_indicador,		
			cierre_anno_anterior,
			proyectado,
			descripcion,
			cargo.id_cargo,
			cargo.nombre_cargo 
			from indicador 
			inner join cargo on indicador.id_cargo_responsable = cargo.id_cargo
			order by id_indicador Asc ';  
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode($datos); 
	} 
	
	public function actionObjetivosTrabajo()
	{ 	
		$sql='Select 
		numero_objetivo_trabajo,
		nombre_objetivo_trabajo,
		id_objetivo_trabajo,
		id_objetivo_estrategico  
		from objetivo_de_trabajo 
		order by numero_objetivo_trabajo Asc ';  
		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode($datos); 
	}
	 public function actionMeses()
	{	 
		$sql='SELECT  
         dat_mes.id_mes,
         dat_mes.nombre_mes 
             FROM dat_mes';
		
		$data = Yii::app()->db->createCommand($sql)->queryAll();  
		$datos = array(); 
		foreach ($data as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	
	public function actionEjecutante()
	{ 	
		$sql='Select id_cargo,nombre_cargo from cargo order by id_cargo';  		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode($datos); 
	}
		
	public function actionIndicadorObjetivo()
	{
		$query = "select 
		indicador.id_indicador,
		indicador.nombre_indicador, 
		indicador.cierre_anno_anterior,
		indicador.proyectado,
		indicador.descripcion,		 
		indicador.id_cargo_responsable,				 
		objetivo_de_trabajo.nombre_objetivo_trabajo,
		objetivo_de_trabajo.numero_objetivo_trabajo,
		objetivo_de_trabajo.id_objetivo_trabajo 
		from indicador  
		inner join objetivo_de_trabajo on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo
		inner join cargo on indicador.id_cargo_responsable = cargo.id_cargo 
		where indicador.id_indicador = '".$_POST['id_indicador']."'";
		$query = Yii::app()->db->createCommand($query)->queryAll(); 
			$datos_obj = array(); 
			foreach ($query as $rel)
			{
				$datos_obj[] = $rel; 
			}  
		   echo  CJSON::encode(array('datos'=>$datos_obj)); 
	
	}
}
