<?php

class PlanController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}
	public function actionCreate()
	{
		$cont = 0;
		if(isset($_POST['id_indicador']))
		{
			$model = Plan::model()->findByAttributes(array('id_indicador'=>$_POST['id_indicador']));
			if($model)
			{
				echo '';
			}
			else {					
					if(isset($_POST['enero']))
					{						
						$sql1 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."',1, '".$_POST['enero']."')";
						Yii::app()->db->createCommand($sql1)->execute();  
					}
					if(isset($_POST['febrero']))
					{
						$sql2 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."',2, '".$_POST['febrero']."')";
						Yii::app()->db->createCommand($sql2)->execute();
					}
					if(isset($_POST['marzo']))
					{  
						$sql3 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."',3, '".$_POST['marzo']."')";
						Yii::app()->db->createCommand($sql3)->execute();
					}
					if(isset($_POST['abril']))
					{
						$sql4 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."','4', '".$_POST['abril']."')";
						Yii::app()->db->createCommand($sql4)->execute();
					}
					if(isset($_POST['mayo']))
					{
						$sql5 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 5, '".$_POST['mayo']."')";
						Yii::app()->db->createCommand($sql5)->execute();
					}
					if(isset($_POST['junio']))
					{
						$sql6 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 6, '".$_POST['junio']."')";
						Yii::app()->db->createCommand($sql6)->execute();
					}
					if(isset($_POST['julio']))
					{
						$sql7 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 7, '".$_POST['julio']."')";
						Yii::app()->db->createCommand($sql7)->execute();
					}
					if(isset($_POST['agosto']))
					{
						$sql8 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 8, '".$_POST['agosto']."')";
						Yii::app()->db->createCommand($sql8)->execute();
					}
					if(isset($_POST['septiembre']))
					{
						$sql9 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 9, '".$_POST['septiembre']."');";
						Yii::app()->db->createCommand($sql9)->execute();
					}
					if(isset($_POST['octubre']))
					{
						$sql10 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 10, '".$_POST['octubre']."')";
						Yii::app()->db->createCommand($sql10)->execute();
					}
					if(isset($_POST['noviembre']))
					{
						$sql11 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 11, '".$_POST['noviembre']."')";
						Yii::app()->db->createCommand($sql11)->execute();
					}
					if(isset($_POST['diciembre']))
					{
						$sql12 = "INSERT INTO plan(id_indicador, id_mes, valor_plan_mes)
						VALUES ('".$_POST['id_indicador']."', 12, '".$_POST['diciembre']."')";
						Yii::app()->db->createCommand($sql12)->execute();
					}
					echo 'true'; 
			}
		}
		else echo 'false'; 
	}
	public function actionUpdate()
	{	
		if(isset($_POST['id_plan']))
		{
			$sql = "UPDATE plan
				SET valor_plan_mes='".$_POST['valor_plan']."'
				WHERE id_plan = '".$_POST['id_plan']."'";
			Yii::app()->db->createCommand($sql)->execute();
			echo 'true';
		}
		else echo 'false';
		
	}
	public function actionPlan()
	{	 
		$sql='Select * from plan 
		inner join indicador on plan.id_indicador = indicador.id_indicador
		inner join dat_mes on plan.id_mes = dat_mes.id_mes order by plan.id_mes
		'; 
		$class = Yii::app()->db->createCommand($sql)->queryAll(); // busco todas las areas 	
		
		$datos = array();
		$data = new stdclass();
		
		
		foreach ($class as $rel)
		{
			$datos[] = $rel; 			// almaceno para luego paginar el resultado
		}  
			$total = count($datos);
			
			for($i = 0; $i < $total; $i++)
			{
				if($datos[$i]['nombre_mes'] == 'Enero')
				{
					$data->Enero = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Febrero')
				{
					$data->Febrero = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Marzo')
				{
					$data->Marzo = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Abril')
				{
					$data->Abril = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Mayo')
				{
					$data->Mayo = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Junio')
				{
					$data->Junio = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Julio')
				{
					$data->Julio = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Agosto')
				{
					$data->Agosto = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Septiembre')
				{
					$data->Septiembre = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Octubre')
				{
					$data->Octubre = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Noviembre')
				{
					$data->Noviembre = $datos[$i]['valor_plan_mes'];
				}
				else if($datos[$i]['nombre_mes'] == 'Diciembre')
				{
					$data->Diciembre = $datos[$i]['valor_plan_mes'];
				} 
				
				$valor_total+= $datos[$i]['valor_plan_mes'];
				$data->id_indicador = $datos[$i]['id_indicador'];
				$data->nombre_indicador = $datos[$i]['nombre_indicador'];
				$data->total = $valor_total;
				$data->id_data = $i;
			} 
			 
	   echo  CJSON::encode(array('datos'=>$data));
	 
	}
	public function actionIndicadores()
	{ 	
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
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	public function actionTodosIndicadores()
	{ 	
		
		if(Yii::app()->session['role'] === 'administrador')
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
		}
		else {
			$sql="select 
				indicador.id_indicador,
				indicador.nombre_indicador, 
				indicador.cierre_anno_anterior, 
				indicador.id_cargo_responsable,
				indicador.id_cargo_encargado,
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
				inner join usuario_indicador on indicador.id_indicador = usuario_indicador.id_indicador
				where usuario_indicador.id_usuario = '".Yii::app()->session['id_usuario']."'
				order by indicador.id_indicador ASC 
				";   
		}
		
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
	
	public function actionPlanIndicador()
	{	 
		$sql="Select 
				indicador.cierre_anno_anterior,
				indicador.nombre_indicador,
				indicador.id_indicador,				
				dat_mes.id_mes,
				dat_mes.nombre_mes,
				plan.valor_plan_mes,
				plan.id_plan,
				plan.id_indicador 
				from plan 
				inner join indicador on plan.id_indicador = indicador.id_indicador
				inner join dat_mes on plan.id_mes = dat_mes.id_mes
				where indicador.id_indicador = '".$_POST['id_indicador']."'
				order by plan.id_mes"; 
				
		$class = Yii::app()->db->createCommand($sql)->queryAll(); //busco indicadores por ID... 	 
		$datos = array(); 
		foreach ($class as $rel)
		{
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	
}