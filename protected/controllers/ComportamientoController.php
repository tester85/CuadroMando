<?php

class ComportamientoController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}  
	public function EstaDentroRango($comp_min,$valor_min,$comp_max,$valor_max,$porciento) 
	 {
		if($comp_min == '>' && $comp_max == '<')
			{
				if($porciento > $valor_min && $porciento < $valor_max)
				{
					return true;
				}
				else return false; 
			}
		else // dentro del rango -- mayor que min  igual que max
			if($comp_min == '>' && $comp_max == '=')
			{ 
				if($porciento > $valor_max)		
						return false;
				else if($porciento < $valor_min)
					return false;			
				else return true;
			}
		else		 // dentro del rango -- mayor que min  menor igual que max
			if($comp_min == '>' && $comp_max == '<=')
			{ 
				if($porciento > $valor_min  && $porciento <= $valor_max)		
					{
						return true;
					}
				else return false;
			}  
		else	 // dentro del rango -- mayor igual que min  menor igual que max
			if($comp_min == '>=' && $comp_max == '<=')
			{ 
				if($porciento >= $valor_min  && $porciento <= $valor_max)		
					{
						return true;
					}
				else return false;
			}
		else	 // dentro del rango -- mayor igual que min  igual que max
			if($comp_min == '>=' && $comp_max == '<=')
			{ 
				if($porciento >= $valor_min  && $porciento <= $valor_max)		
					{
						return true;
					}
				else return false;
			}
		else // dentro del rango -- mayor igual que min  igual que max
			if($comp_min == '>=' && $comp_max == '=')
			{ 
				if($porciento > $valor_max)		
						return false;
				else if($porciento < $valor_min)
					return false; 
				else return true;
			}
		else 
			if($comp_min == '>=' && $comp_max == '<')
			{
				if($porciento >= $valor_min && $porciento < $valor_max)
				{
					return true;
				}
				else return false; 
			}
		 
	//-**********************************************************************************************

	//-************************--Iniciando con Menores o Menores iguales --**********************************

		else  // intervalos exteriores de las escalas -- menor que min mayor que max
			if($comp_min == '<' && $comp_max == '>')
			{ 
				if($porciento >= $valor_min && $porciento <= $valor_max)
				{
					return false;
				}
				else return true;
			}
		else  // dentro del rango  -- menor igual que min mayor que max
			if($comp_min == '<=' && $comp_max == '>')
			{ 
				if($porciento > $valor_min && $porciento < $valor_max)
				{
					return false;
				}
				else return true;
			}
		else  // dentro del rango  -- menor igual que min mayor igual que max
			if($comp_min == '<=' && $comp_max == '>=')
			{ 
				if($porciento > $valor_min && $porciento < $valor_max)
				{
					return false;
				}
				else return true;
			} 
		
	//-************************--Valores Iguales--**********************************
		
		else  // intervalos con valores iguales -- igual que min igual que max
			if($comp_min == '=' && $comp_max == '=')
			{ 
				if($porciento == $valor_min )
				{
				  return true;
				}
				else return false;	
			} 
	 
	 }  
	
	public function actionTodos()
	{				
		//  localizo en la BD todos los datos de los planes 
		//  no realizo una sola consulta pues pueden existir meses con plan asignado que no posean
		//  un real
		$id_indicador = $_POST['id_indicador']; 
		 
		$query_plan_indicador = "Select 
				indicador.cierre_anno_anterior,
				indicador.nombre_indicador,
				indicador.id_indicador,				
				unidad_medida.nombre,				
				dat_mes.id_mes,
				dat_mes.nombre_mes,
				plan.valor_plan_mes,
				plan.id_plan,				
				plan.id_indicador 
				from plan 
				inner join indicador on plan.id_indicador = indicador.id_indicador				
				inner join dat_mes on plan.id_mes = dat_mes.id_mes
				inner join unidad_medida on  indicador.id_unidad_medida = unidad_medida.id_unidad_medida 
				where indicador.id_indicador = '".$id_indicador."'
				order by dat_mes.id_mes"; 
				
	//  localizo en la BD todos los datos de los reales existentes asociados a cada plan  
		$query_real_indicador = "Select 
				indicador.cierre_anno_anterior,
				indicador.nombre_indicador,
				indicador.id_indicador,				
				dat_mes.id_mes,
				dat_mes.nombre_mes,
				plan.valor_plan_mes,
				plan.id_plan,
				real.valor_real,
				real.id_real,				
				real.observacion,				
				real.solucion,				
				plan.id_indicador 
				from plan 
				inner join indicador on plan.id_indicador = indicador.id_indicador
				inner join real on plan.id_plan = real.id_plan
				inner join dat_mes on plan.id_mes = dat_mes.id_mes
				where indicador.id_indicador = '".$id_indicador."'";
				
			$datos_real = array();		
			$datos_plan = array();
			$todos = array();
			
		$q1 = Yii::app()->db->createCommand($query_plan_indicador)->queryAll();
		$q2 = Yii::app()->db->createCommand($query_real_indicador)->queryAll();
		
		// almaceno en 2 arreglos ambos resultados para luego mostrarlos en uno solo para la 
		// vista en el grid
		  
		foreach($q1 as $plan_indicador)
		{
			$datos_plan[] = $plan_indicador;
			$todos[] = $plan_indicador;	 // almaceno todos los planes a devolver
		}
			
		foreach($q2 as $plan_real)
		{
			$datos_real[] = $plan_real;	
		}	
		$planes = count($datos_plan);
		$reales = count($datos_real); 
		
		// busco en los planes los que tengan un real definido
		
		for($i=0;$i<$planes;$i++)
		{
			for($j=0;$j<$reales;$j++)
			{
				if($datos_plan[$i]['id_plan'] == $datos_real[$j]['id_plan'])
				{ 
					// reemplazo el plan de esta posicion por un nuevo arreglo
					// que posee el valor del real con el id de la tabla relacionada
					// -- el resto de los datos quedan intactos 
					
					$todos[$i] = array_merge($datos_plan[$i],$datos_real[$j]); 
				}
			}
		} 
		 
		
	 	for($i=0;$i<count($todos);$i++)
		{
		  if($todos[$i]['nombre_indicador']=="Salario Medio / Productividad")
			{
			  $todos[$i]['valor_plan_mes']*=10;
			  $todos[$i]['valor_real']*=10;
			}
		} 
		 echo  CJSON::encode(array('datos'=>$todos));		
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
