<?php

class ComportamientoObjetivoController extends Controller
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
		$mes = date('m'); 
		
		$id_objetivo_trabajo = $_POST['id_objetivo_trabajo']; 
		$query_indicador = "select * from indicador where id_objetivo_trabajo='".$id_objetivo_trabajo."'";
		$result_query_indicador = Yii::app()->db->createCommand($query_indicador)->queryAll();
		
		 //print_r($result_query_indicador); die;
		 $sin_resultados = array();
		if($result_query_indicador)
		{
			foreach($result_query_indicador as $indicador)
			{
				$sql_plan = "SELECT DISTINCT 
					sum(public.plan.valor_plan_mes) as total_plan_mes ,
					public.indicador.id_indicador 
					FROM
					public.indicador
					INNER JOIN public.plan ON (public.indicador.id_indicador = public.plan.id_indicador)
					INNER JOIN public.dat_mes ON (public.plan.id_mes = public.dat_mes.id_mes)
					WHERE indicador.id_indicador = '".$indicador['id_indicador']."' and public.dat_mes.id_mes < $mes
					group by indicador.id_indicador 
					order by indicador.id_indicador 
					";
					
					$plan_indicador = Yii::app()->db->createCommand($sql_plan)->queryAll(); 
					foreach($plan_indicador as $sub_total_plan)
					{
						//planes contiene la suma del todos los planes por indicador con si id_indicador
						//total_plan_mes... id_indicador
						$planes[] = $sub_total_plan;
						  
					} 
			}
			
			foreach($planes as $indicadores_planes_totales)
			{
				$sql_real = "SELECT 
					sum(public.real.valor_real) AS total_real_plan,
					public.plan.id_indicador
					FROM
					public.real
					INNER JOIN public.plan ON (public.real.id_plan = public.plan.id_plan)
					AND (public.real.id_indicador = public.plan.id_indicador)
					INNER JOIN public.dat_mes ON (public.plan.id_mes = public.dat_mes.id_mes)
					WHERE
					plan.id_indicador = '".$indicadores_planes_totales['id_indicador']."' and public.dat_mes.id_mes < $mes				
					group by plan.id_indicador"; 
					
					$plan_real = Yii::app()->db->createCommand($sql_real)->queryAll();
					
					foreach($plan_real as $real_total)
					{
						//planes contiene la suma del todos los reales por indicador con su id_indicador
						//[total_real_plan] .. [id_indicador] 
						$reales[] = $real_total;
					}   
			}   
			
			for($i=0;$i<count($planes);$i++)
				{
					for($j=0;$j<count($reales);$j++)
					{
						if($planes[$i]['id_indicador'] == $reales[$j]['id_indicador'])
						{ 
					//  junto los resultados hasta el momento						
							$planes[$i] = array_merge($planes[$i],$reales[$j]); 
						}
					}
				}
			for($i=0;$i<count($result_query_indicador);$i++)
			{
				for($j=0;$j<count($planes);$j++)
				{
					if($result_query_indicador[$i]['id_indicador'] == $planes[$j]['id_indicador'])
					{ 
				//  junto los resultados hasta el momento						
						$result_query_indicador[$i] = array_merge($result_query_indicador[$i],$planes[$j]); 
					}
				}
			} 
			$indicadores = array();
			foreach($result_query_indicador as $indicador)
			{
				$indicador['porciento'] = 0; 
				if($indicador['total_plan_mes']!=0)
				{			
					$indicador['porciento'] = round(($indicador['total_real_plan']/$indicador['total_plan_mes'])*100,2);
					$indicadores[] = $indicador;
				} 
				else $indicadores[] = $indicador;
			}
			
			for($i=0;$i<count($indicadores);$i++)
			{		
				
				$query_rangos = "select * from rango_cumplimiento where id_indicador = '".$indicadores[$i]['id_indicador']."'";
				$rangos_c = Yii::app()->db->createCommand($query_rangos)->queryAll(); 
					
					//obtengo los rangos del indicador en la posicion i 
					
				for($j=0;$j<count($rangos_c);$j++)
				{ 
					// por cada rango que posee el indicador compruebo mediente la funcion EstaDentroRango()
					// en que rango se encuentra y lo incluyo en el arreglo final de datos
					
					if($this->EstaDentroRango($rangos_c[$j]['comp_valor_min'],$rangos_c[$j]['valor_minimo'],$rangos_c[$j]['comp_valor_max'],$rangos_c[$j]['valor_maximo'],$indicadores[$i]['porciento'])
					)
					{
					$indicadores[$i]['categoria'] = $rangos_c[$j]['categoria'];
					}
					else $indicadores[$i]['categoria'] = 'Rojo';
				} 
			} 
			
		$resultado = array();  
		
		// construyo el array de resultados para el grafico de pastel
		
		$Rojo = array();
		$Rojo['cantidad'] = 0;
		$Rojo['categoria'] = "Rojo";
		$Rojo['id_objetivo_trabajo'] = 0;

		$Amarillo = array();
		$Amarillo['cantidad'] = 0; 
		$Amarillo['categoria'] = "Amarillo";
		$Amarillo['id_objetivo_trabajo'] = 0; 

		$Verde = array();
		$Verde['cantidad'] = 0; 
		$Verde['categoria'] = "Verde";
		$Verde['id_objetivo_trabajo'] = 0; 
		 
		 for($i = 0;$i<count($indicadores);$i++)
			{
				if($indicadores[$i]['categoria'] == 'Rojo')
				{  
					$Rojo['categoria'] = $indicadores[$i]['categoria'];
					$Rojo['cantidad']++;  
				}
				else if($indicadores[$i]['categoria'] == 'Amarillo')
				{
					$Amarillo['categoria'] = $indicadores[$i]['categoria'];
					$Amarillo['cantidad']++; 		 				
				}
				else if($indicadores[$i]['categoria'] == 'Verde')
				{
					$Verde['categoria'] = $indicadores[$i]['categoria']; 
					$Verde['cantidad']++; 		 				
				}
				
				$Rojo['id_objetivo_trabajo'] = $_POST['id_objetivo_trabajo'];				
				$Amarillo['id_objetivo_trabajo'] = $_POST['id_objetivo_trabajo'];
				$Verde['id_objetivo_trabajo'] = $_POST['id_objetivo_trabajo'];
			}
			
		 	$resultado[] = $Rojo;
			$resultado[] = $Amarillo;
			$resultado[] = $Verde; 
			 
			echo  CJSON::encode($resultado); 
		}	
			
		else echo 'false';//CJSON::encode(array('datos'=>$sin_resultados));	  
	}
	
	public function actionTodasAreas()
	{ 	 
		$query_area = "select * from objetivo_de_trabajo 
							inner join objetivo_de_trabajo_area on objetivo_de_trabajo.id_objetivo_trabajo = objetivo_de_trabajo_area.id_objetivo_trabajo
							inner join area on objetivo_de_trabajo_area.id_area =
							area.id_area where objetivo_de_trabajo.id_objetivo_trabajo = '".$_POST['id_objetivo_trabajo']."'";	 
							
		$result_area_objetivos = Yii::app()->db->createCommand($query_area)->queryAll();
		
		$vacio = array();
		
		if(count($result_area_objetivos) == 0)
		{
			echo "false";
		}
		else 
		{
			foreach ($result_area_objetivos as $rel)
			{  
				$datos[] = $rel; 
			}  
				echo  CJSON::encode(array('datos'=>$datos)); 
		}
	}
	 
	
	public function actionTodosIndicadores()
	{ 	 
		$query_objetivos = "select * from objetivo_de_trabajo 
					inner join objetivo_estrategico on objetivo_de_trabajo.id_objetivo_estrategico = objetivo_estrategico.id_objetivo_estrategico
					inner join perspectiva on objetivo_estrategico.id_perspectiva =
					perspectiva.id_perspectiva";	 
		$result_query_objetivos = Yii::app()->db->createCommand($query_objetivos)->queryAll();
		
		foreach ($result_query_objetivos as $rel)
		{  
			$datos[] = $rel; 
		}  
	   echo  CJSON::encode(array('datos'=>$datos)); 
	}
}
