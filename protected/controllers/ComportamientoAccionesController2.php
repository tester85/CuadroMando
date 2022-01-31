<?php

class ComportamientoAccionesController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}  
 
	public function actionTodasAcciones()
	{				
	  $id_indicador = $_POST['id_indicador'];  
		 
		$query_accion_indicador = " select distinct * from accion
									inner join objetivo_de_trabajo on objetivo_de_trabajo.id_objetivo_trabajo = accion.id_objetivo_trabajo
									inner join indicador on objetivo_de_trabajo.id_objetivo_trabajo = indicador.id_objetivo_trabajo
									where indicador.id_indicador = '".$id_indicador."'";   
		$q1 = Yii::app()->db->createCommand($query_accion_indicador)->queryAll(); 
				
		/*
				Buscar acciones incumplidas (avance <> 100 y que la fecha sea anterior a la fecha actual) y cumplidas
				la cantidad de resultados de la consulta es la cntidad de elementos que cumplen las condiciones -- count(query) = acciones_incumplidas.. etc
			*/	
		$query_acciones = "select distinct count(*) as cant_acciones, indicador.id_indicador
					from accion
					inner join objetivo_de_trabajo on objetivo_de_trabajo.id_objetivo_trabajo = accion.id_objetivo_trabajo
					inner join indicador on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo";
					
		$condicion_incumplidas = " where accion.fecha_cump_accion <= (select current_date) and accion.avance != 100 and indicador.id_indicador = '".$_POST['id_indicador']."' ";
		
		$condicion_cumplidas = " where accion.fecha_cump_accion <= (select current_date) and accion.avance = 100 and indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		$condicion_a_cumplir = " where accion.fecha_cump_accion >= (select current_date) and accion.avance != 100 and indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		$group_by = " group by indicador.id_indicador"; 
		
		// accciones incumplidas por la empresa	
		
		$acciones_incumplidas = array();
		$acciones_incumplidas['cantidad'] = 0;
		$acciones_incumplidas['categoria'] = "Incumplidas";
		$acciones_incumplidas['id_indicador'] = $_POST['id_indicador'];
		
		$query_incumplidas = Yii::app()->db->createCommand($query_acciones.$condicion_incumplidas.$group_by)->queryAll(); 
		
	if($query_incumplidas) 		// si tiene resultados actualizo el valor
		$acciones_incumplidas['cantidad'] = $query_incumplidas[0]['cant_acciones'];
	
	 
	// acciones cumplidas por la empresa	
		
		$acciones_cumplidas = array();
		$acciones_cumplidas['cantidad'] = 0;
		$acciones_cumplidas['categoria'] = "Cumplidas";
		$acciones_cumplidas['id_indicador'] = $_POST['id_indicador'];
		
		$query_cumplidas = Yii::app()->db->createCommand($query_acciones.$condicion_cumplidas.$group_by)->queryAll(); 
		
	if($query_cumplidas)
		$acciones_cumplidas['cantidad'] = $query_cumplidas[0]['cant_acciones'];
		
		// acciones a cumplir por la empresa	
		
		$acciones_por_cumplir = array();
		$acciones_por_cumplir['cantidad'] = 0;
		$acciones_por_cumplir['categoria'] = "En fecha";
		$acciones_por_cumplir['id_indicador'] = $_POST['id_indicador'];
		
		$query_por_cumplir = Yii::app()->db->createCommand($query_acciones.$condicion_a_cumplir.$group_by)->queryAll();	
		
	if($query_por_cumplir)
		$acciones_por_cumplir['cantidad'] = $query_por_cumplir[0]['cant_acciones'];
	
		$todos = array();
		$todos[] = $acciones_incumplidas;
		$todos[] = $acciones_cumplidas;
		$todos[] = $acciones_por_cumplir; 
		
	echo  CJSON::encode(array('data'=>$todos));	
	
	} 
	
public function actionInformacionAcciones()
	{ 	 
	/*
		@id_indicador -- indicador al que pertenece la accion
		@categoria -- categoria definida dada la fecha de cumplimiento de la accion
				   -- Se clasifica --- En fecha, Incumplidas, Cumplidas
	*/
		$id_indicador = $_POST['id_indicador'];
		$categoria = $_POST['categoria'];     
		  
		$query_accion = " select indicador.id_indicador,
			accion.nombre_accion,
			accion.avance,
			accion.id_accion,
			accion.fecha_cump_accion,
			cargo.nombre_cargo
			from accion
			inner 
			join objetivo_de_trabajo 
			on objetivo_de_trabajo.id_objetivo_trabajo = accion.id_objetivo_trabajo
			inner join indicador 
			on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo
			inner join indicador_accion on accion.id_accion = indicador_accion.id_accion
			inner join cargo on cargo.id_cargo = accion.id_cargo_ejecutante
			"; 
			
		 $condicion_incumplidas = " where accion.fecha_cump_accion <= (select 			current_date) and accion.avance != 100 and indicador.id_indicador = '".$_POST['id_indicador']."' ";
		
		$condicion_cumplidas = " where accion.fecha_cump_accion <= (select current_date) and accion.avance = 100 and indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		$condicion_a_cumplir = " where accion.fecha_cump_accion >= (select current_date) and accion.avance != 100 and indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		$no_categoria = " where indicador.id_indicador = '".$_POST['id_indicador']."'";
		
		if($categoria == "Cumplidas")
		{
			$result_accion = Yii::app()->db->createCommand($query_accion.$condicion_cumplidas)->queryAll();		
		}
		else if($categoria == "Incumplidas")
		{
			$result_accion = Yii::app()->db->createCommand($query_accion.$condicion_incumplidas)->queryAll();		
		}
		else if($categoria == "En fecha")
		{
			$result_accion = Yii::app()->db->createCommand($query_accion.$condicion_a_cumplir)->queryAll();		
		}
		else $result_accion = Yii::app()->db->createCommand($query_accion.$no_categoria)->queryAll();	
		
		 
		foreach ($result_accion as $rel)
		{  
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
	
public function actionTodosIndicadores()
	{ 	 
			$mes = date('m');   
			
			$sql="select sum(valor_plan_mes) as total_plan_mes,
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
			objetivo_de_trabajo.id_objetivo_trabajo,
			perspectiva.nombre_perspectiva,
			perspectiva.id_perspectiva
			from indicador 	
			inner join plan on plan.id_indicador = indicador.id_indicador 
			inner join unidad_medida on indicador.id_unidad_medida = unidad_medida.id_unidad_medida
			inner join cargo on cargo.id_cargo = indicador.id_cargo_responsable
			inner join objetivo_de_trabajo on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo 		
			
			inner join objetivo_estrategico on objetivo_estrategico.id_objetivo_estrategico = objetivo_de_trabajo.id_objetivo_estrategico
			inner join perspectiva on perspectiva.id_perspectiva = objetivo_estrategico.id_perspectiva
			
			where plan.id_mes < $mes
			group by indicador.id_indicador,
			indicador.nombre_indicador,
			indicador.id_cargo_responsable,
			indicador.cierre_anno_anterior, 
			indicador.proyectado,
			indicador.descripcion,
			indicador.clasificacion_gi,
			unidad_medida.id_unidad_medida,
			perspectiva.nombre_perspectiva,
			perspectiva.id_perspectiva,
			nombre_unidad_medida,
			cargo.nombre_cargo,		 
			objetivo_de_trabajo.nombre_objetivo_trabajo,
			objetivo_de_trabajo.numero_objetivo_trabajo,
			objetivo_de_trabajo.id_objetivo_trabajo  
			order by indicador.id_indicador ASC";  
			 
		
		$indicadores = Yii::app()->db->createCommand($sql)->queryAll(); 
  
		$resultado = array(); 
		
		for($i=0;$i<count($indicadores);$i++)
		{
			$query_total_real = "select sum(valor_real) as total_real_mes,
			plan.id_indicador 
			from  plan inner join real 
			on plan.id_plan = real.id_plan where plan.id_indicador = '".$indicadores[$i]['id_indicador']."' and plan.id_mes < $mes
			group by plan.id_indicador"; 
			$reales = Yii::app()->db->createCommand($query_total_real)->queryAll();		
			
			if($reales[0]['total_real_mes'] != '' )
			{
				for($j=0;$j<count($reales);$j++)
				{ 
					if($indicadores[$i]['id_indicador'] == $reales[$j]['id_indicador'])
					{ 	
						// incluyo los reales en los datos
						$resultado[$i] = array_merge($indicadores[$i],$reales[$j]);
						$resultado[$i]['porciento'] = 0;
						$resultado[$i]['categoria'] = '';
					}
				}
			}
			else 
				{
					// actualizo el resto de los campos a editarse
					$resultado[$i] = $indicadores[$i];
					$resultado[$i]['total_real_mes'] = 0;
					$resultado[$i]['porciento'] = 0;
					$resultado[$i]['categoria'] = '';
				}
		}
		//Calculo los porcientos de cumplimiento para todos los indicadores 
		
 		for($i=0;$i<count($resultado);$i++)
		{
			if($resultado[$i]['total_plan_mes'] != 0)
			{
				$resultado[$i]['porciento'] = round(($resultado[$i]['total_real_mes']/$resultado[$i]['total_plan_mes'])*100,2); 
			}  
			else if($resultado[$i]['total_plan_mes'] == 0 && $resultado[$i]['total_real_mes'] == 0)
				{
					$resultado[$i]['porciento'] = 0;
					$resultado[$i]['categoria'] = 'Verde'; 
				}
		 } 
		
		//print_r($resultado); die;
		
		// busco los rangos de cumplimiento para cada indicador e incluyo la colorimetria del
		// indicador dado el porciento de cumplimiento
		
		for($i=0;$i<count($resultado);$i++)
		{		
			$query_rangos = "select * from rango_cumplimiento where id_indicador = '".$resultado[$i]['id_indicador']."'";
			$rangos_c = Yii::app()->db->createCommand($query_rangos)->queryAll(); 
				
				//obtengo los rangos del indicador en la posicion i 
				
			for($j=0;$j<count($rangos_c);$j++)
			{ 
				// por cada rango que posee el indicador compruebo mediente la funcion EstaDentroRango()
				// en que rango se encuentra y lo incluyo en el arreglo final de datos
				
				if($this->EstaDentroRango($rangos_c[$j]['comp_valor_min'],$rangos_c[$j]['valor_minimo'],$rangos_c[$j]['comp_valor_max'],$rangos_c[$j]['valor_maximo'],$resultado[$i]['porciento'])
				)
				$resultado[$i]['categoria'] = $rangos_c[$j]['categoria'];
			} 
		}
			//print_r($resultado); die;
		  
		foreach ($resultado as $rel)
		{ 
			
			if(!$rel['categoria'])
			{
				$rel['categoria'] = 'Rojo';
			}
			$datos[] = $rel; 
		}  
		
		/*
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
		$datos2=array_splice($datos,$start,$pageSize, $total); */
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
}
