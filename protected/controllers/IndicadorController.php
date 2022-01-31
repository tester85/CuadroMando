<?php

class IndicadorController extends Controller
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
		$model=new Indicador;	
		
		if(isset($_POST['nombre_indicador']))
		{
			$model->nombre_indicador = $_POST['nombre_indicador'];
			$model->id_cargo_responsable = $_POST['responsable'];
			$model->id_cargo_encargado = $_POST['encargado'];
			$model->descripcion = $_POST['descripcion'];
			$model->cierre_anno_anterior = $_POST['cierre_anno'];
			$model->proyectado = $_POST['proyectado'];
			$model->id_unidad_medida = $_POST['unidad_medida'];
			$model->id_objetivo_trabajo = $_POST['objetivo_trabajo'];
			$model->clasificacion_gi = $_POST['clasificacion_gi'];
			
			if($model->save())
				{
					if(Yii::app()->session['estructura']=='Provincial')
					{
						$sql_provincia_indicador = "INSERT INTO provincia_indicador(
						id_provincia, id_indicador)
						VALUES ('".Yii::app()->session['id_provincia']."', '".$model->id_indicador."')";
						if(Yii::app()->db->createCommand($sql_provincia_indicador)->execute())
							echo 'true';
					}
					if(Yii::app()->session['estructura']=='Ueb')
					{
						 $sql_ueb_indicador = "INSERT INTO ueb_indicador(
								id_ueb, id_indicador)
								VALUES ('".Yii::app()->session['id_ueb']."', '".$model->id_indicador."')";
						 if(Yii::app()->db->createCommand($sql_ueb_indicador)->execute())
						 	echo 'true';
					}
					if(Yii::app()->session['estructura']=='Nacional')
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
		if(isset($_POST['id_indicador']))
		{
			$id = $_POST['id_indicador'];
			$model=$this->loadModel($id);
			
			$model->nombre_indicador = $_POST['nombre_indicador'];  
			$model->id_cargo_responsable = $_POST['responsable'];
			$model->descripcion = $_POST['descripcion'];
			$model->cierre_anno_anterior = $_POST['cierre_anno'];
			$model->proyectado = $_POST['proyectado'];
			$model->id_unidad_medida = $_POST['unidad_medida'];
			$model->id_objetivo_trabajo = $_POST['objetivo_trabajo'];
			$model->clasificacion_gi = $_POST['clasificacion_gi']; 
			$model->id_cargo_encargado = $_POST['encargado'];				
			$model->save();
			if($model->save()) 
				echo 'true';  
		} //  no quiere ejecutar el metodo save();
		else echo 'false';
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		 if (isset($_POST['id_indicador']))
			{ 
				$id = $_POST['id_indicador'];
				$this->loadModel($id)->delete();			
				echo 'true';
			}
			else
				echo'false';
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
		$model=new Indicador('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Indicador']))
			$model->attributes=$_GET['Indicador'];

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
		$model=Indicador::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='indicador-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	public function actionTodos()
	{ 	
	$query = "select 
				indicador.id_indicador,
				indicador.nombre_indicador,
				indicador.id_cargo_responsable,
				indicador.id_cargo_encargado,
				indicador.cierre_anno_anterior, 
				indicador.proyectado,
				indicador.descripcion,
				indicador.clasificacion_gi,
				unidad_medida.id_unidad_medida,
				unidad_medida.nombre as nombre_unidad_medida,
				cargo.nombre_cargo,		 
				objetivo_de_trabajo.nombre_objetivo_trabajo,
				objetivo_de_trabajo.numero_objetivo_trabajo,
				objetivo_de_trabajo.id_objetivo_trabajo  
				from indicador 		
				inner join unidad_medida on indicador.id_unidad_medida = unidad_medida.id_unidad_medida
				inner join cargo on cargo.id_cargo = indicador.id_cargo_responsable
				inner join objetivo_de_trabajo on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo "; 
	$orden = "order by indicador.id_indicador ASC";
		
		if(Yii::app()->session['role'] === 'administrador')
		{
				/*Solo administradores*/  
				$sql= $query.$orden;    
		}
		else if(Yii::app()->session['role'] === 'responsable')
		{		
	//--------------------------------------------------------------------------
	// lista todos los indicadores asociados al responsable dado el nivel de 
	// acceso definido para el usuario 
	//----------------------------------------------------------------------
			
			$condicion = "where usuario.id_usuario = '".Yii::app()->session['id_usuario']."' ";
			$union_indicador_provincia_usuario = " inner join usuario_indicador 
			on indicador.id_indicador = usuario_indicador.id_indicador
			inner join usuario on usuario.id_usuario = usuario_indicador.id_usuario ";
			
			$sql= $query.$union_indicador_provincia_usuario.$condicion.$orden; 
				
			//--------------------------------------------------------------------------
		}
		 
		else $sql= $query.$orden;    
		
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
	
	public function actionUnidadMedida()
	{ 	
		$sql='Select 
		id_unidad_medida,
		nombre as nombre_unidad_medida
		from unidad_medida
		order by id_unidad_medida Asc';  
		
		$class = Yii::app()->db->createCommand($sql)->queryAll(); 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode($datos); 
	} 
	public function actionResponsable()
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
}
