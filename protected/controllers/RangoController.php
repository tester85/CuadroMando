<?php

class RangoController extends Controller
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
		
		if(isset($_POST['id_indicador']))
		{
			$model = Rango::model()->findByAttributes(array('id_indicador'=>$_POST['id_indicador']));
			if($model)
			{
				echo '';
			}
			else {					
					if(isset($_POST['valor_minimo_rojo']))
					{						
						$sql1 = "INSERT INTO rango_cumplimiento( id_indicador,  categoria, valor_minimo, valor_maximo,comp_valor_min, comp_valor_max )
							VALUES ( '".$_POST['id_indicador']."', '".$_POST['categoria_rojo']."', '".$_POST['valor_minimo_rojo']."', '".$_POST['valor_maximo_rojo']."', '".$_POST['comp_valor_min_rojo']."', '".$_POST['comp_valor_max_rojo']."')";		 
						Yii::app()->db->createCommand($sql1)->execute();  
					}
					
					if(isset($_POST['valor_minimo_amarillo']))
					{						
						$sql1 = "INSERT INTO rango_cumplimiento( id_indicador,  categoria, valor_minimo, valor_maximo,comp_valor_min, comp_valor_max )
							VALUES ( '".$_POST['id_indicador']."', '".$_POST['categoria_amarillo']."', '".$_POST['valor_minimo_amarillo']."', '".$_POST['valor_maximo_amarillo']."', '".$_POST['comp_valor_min_amarillo']."', '".$_POST['comp_valor_max_amarillo']."')";		 
						Yii::app()->db->createCommand($sql1)->execute();  
					}
					
					if(isset($_POST['valor_minimo_verde']))
					{						
						$sql1 = "INSERT INTO rango_cumplimiento( id_indicador,  categoria, valor_minimo, valor_maximo,comp_valor_min, comp_valor_max )
							VALUES ( '".$_POST['id_indicador']."', '".$_POST['categoria_verde']."', '".$_POST['valor_minimo_verde']."', '".$_POST['valor_maximo_verde']."', '".$_POST['comp_valor_min_verde']."', '".$_POST['comp_valor_max_verde']."')";		 
						Yii::app()->db->createCommand($sql1)->execute();  
					} 
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
		$query_update = "UPDATE rango_cumplimiento
		SET id_indicador='".$_POST['id_indicador']."', id_rango='".$_POST['id_rango']."', categoria='".$_POST['categoria']."', valor_minimo='".$_POST['valor_min']."', valor_maximo='".$_POST['valor_max']."', comp_valor_min='".$_POST['comp_valor_min']."', comp_valor_max='".$_POST['comp_valor_max']."'
		WHERE id_rango = '".$_POST['id_rango']."'";
		if(Yii::app()->db->createCommand($query_update)->execute())
			echo 'true';
			else echo 'false'; 
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			$this->loadModel($id)->delete();

			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Rango');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Rango('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Rango']))
			$model->attributes=$_GET['Rango'];

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
		$model=Rango::model()->findByPk((int)$id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='rango-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	public function actionTodosIndicadores()
	{ 	
		$sql='select 
		indicador.id_indicador,
		indicador.nombre_indicador,
		indicador.id_cargo_responsable,
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
		inner join objetivo_de_trabajo on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo 
		order by indicador.id_indicador ASC';  
		
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
		
	public function actionRangoIndicador()
	{	 
		$sql="Select 
				public.rango_cumplimiento.categoria,
				public.rango_cumplimiento.valor_minimo,
				public.rango_cumplimiento.valor_maximo,
				public.rango_cumplimiento.comp_valor_min,
				public.rango_cumplimiento.comp_valor_max,
				public.rango_cumplimiento.id_rango,
				public.rango_cumplimiento.id_indicador 
				FROM
				public.rango_cumplimiento
				INNER JOIN public.indicador ON (public.rango_cumplimiento.id_indicador = public.indicador.id_indicador)
				WHERE indicador.id_indicador = '".$_POST['id_indicador']."'
				order by rango_cumplimiento.id_rango"; 
				
		$class = Yii::app()->db->createCommand($sql)->queryAll(); //busco por ID... 	 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
}
