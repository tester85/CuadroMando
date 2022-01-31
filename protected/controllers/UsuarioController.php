<?php

class UsuarioController extends Controller
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
		if($_POST['role'])
		{
		$indicadores_usuarios = json_decode($_POST['indicadores']); 
		$cant_indicadores = count($indicadores_usuarios); 
		
		$model=new Usuario;  
			if(isset($_POST['role']))
			{				
				$model->nombre_usuario = $_POST['nombre_usuario'];
				$model->contrasena = $_POST['contrasena'];
				$model->role = $_POST['role']; 
				$model->salt = md5($_POST['contrasena']); 
				
				//print_r($model->role); die;
				if($model->save())
				{  
					 if($_POST['role'] != 'responsable')
					{				
						echo 'true';
					}
					else  // ---- okok
					{ 
					 $model_indicador_usuario = new UsuarioIndicador;	
						
					 foreach($indicadores_usuarios as $indicador)
					 {
						 $sql_insert = "INSERT INTO usuario_indicador(
							id_usuario, id_indicador)
							VALUES ('".$model->id_usuario."', '".$indicador."')";
						 Yii::app()->db->createCommand($sql_insert)->execute(); 
					 }
					 echo 'true';
					} 
				}
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
		if(isset($_POST['id_usuario']))
		{
			UsuarioIndicador::model()->deleteAllByAttributes(array('id_usuario'=>$_POST['id_usuario']));			
			if($this->loadModel($_POST['id_usuario'])->delete())
				$this->actionCreate();
		}
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		if(isset($_POST['id_usuario']))
		{
			UsuarioIndicador::model()->deleteAllByAttributes(array('id_usuario'=>$_POST['id_usuario']));			
			if($this->loadModel($_POST['id_usuario'])->delete())
			echo 'true';
			
		}
		else echo 'false';
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Usuario');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Usuario('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Usuario']))
			$model->attributes=$_GET['Usuario'];

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
		$model=Usuario::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='usuario-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	public function actionTodos()
	{
		$resultado = array();
		$sql_usuario = "select * from usuario order by id_usuario";
		$data = Yii::app()->db->createCommand($sql_usuario)->queryAll();
		
		foreach($data as $usuario)
		{
			$resultado[] = $usuario;
			}
		 echo  CJSON::encode(array('datos'=>$resultado)); 
		
	}
	public function actionIndicadores()
	{
		$resultado = array();
		$sql_Indicadores = "select * from indicador order by id_indicador";
		$data = Yii::app()->db->createCommand($sql_Indicadores)->queryAll();
		
		foreach($data as $Indicador)
		{
			$resultado[] = $Indicador;
			}
		 echo  CJSON::encode(array('datos'=>$resultado)); 
		
	}
	public function actionIndicadoresAsociados()
	{
		$resultado = array();
		$sql_Indicadores = "select * from indicador
			inner join usuario_indicador 
			on indicador.id_indicador = usuario_indicador.id_indicador
			where usuario_indicador.id_usuario = '".$_POST['id_usuario']."'
		order by indicador.id_indicador";
		$data = Yii::app()->db->createCommand($sql_Indicadores)->queryAll();
		
		foreach($data as $Indicador)
		{
			$resultado[] = $Indicador;
			}
		 echo  CJSON::encode(array('datos'=>$resultado)); 
		
	}
}
