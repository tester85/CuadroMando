<?php

class ComportamientoPerspectivasController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	} 
	 
	 
	  
	public function actionComportamiento()
	{
	 	$mes = date('m'); 
		$sql_perspectivas = "SELECT DISTINCT   
							public.perspectiva.nombre_perspectiva,
							public.perspectiva.id_perspectiva
							FROM public.perspectiva order by perspectiva.id_perspectiva"; 
		$persp = Yii::app()->db->createCommand($sql_perspectivas)->queryAll(); 
		 
		foreach($persp as $listado_p)
		{ 
			$perspectivas[] = $listado_p;
			//print_r("->".$listado_p['id_perspectiva']);			// nivel perspectiva - objetivos
			$sql_objetivos_estr = "SELECT DISTINCT  
				objetivo_de_trabajo.id_objetivo_trabajo, 				
				objetivo_estrategico.id_perspectiva,
				objetivo_estrategico.id_objetivo_estrategico
				FROM
				public.objetivo_estrategico
				INNER JOIN public.objetivo_de_trabajo ON (public.objetivo_estrategico.id_objetivo_estrategico = public.objetivo_de_trabajo.id_objetivo_estrategico)				
				WHERE
				objetivo_estrategico.id_perspectiva ='".$listado_p['id_perspectiva']."' 
				order by objetivo_estrategico.id_perspectiva";
				
				$objetivo_persp = Yii::app()->db->createCommand($sql_objetivos_estr)->queryAll();
				 
			
				foreach($objetivo_persp as $listado_objetivos)
				{
					$objetivos_perspectivas[] = $listado_objetivos; 
				}	 
		}  
			
		$resultado = array();
		//
		for($i=0;$i<count($objetivos_perspectivas);$i++)
			{
				for($j=0;$j<count($perspectivas);$j++)
				{
					if($objetivos_perspectivas[$i]['id_perspectiva'] == $perspectivas[$j]['id_perspectiva'])
					{ 
					//  junto los resultados hasta el momento						
						$objetivos_perspectivas[$i] = array_merge($objetivos_perspectivas[$i],$perspectivas[$j]); 
					}
				}
			} 
				
		foreach($objetivos_perspectivas as $listado_objetivos_perspectivas)
		{
			// nivel objetivos-indicador
			$sql_indicador = " select 
				indicador.id_indicador,
				indicador.id_objetivo_trabajo 
				from indicador
				INNER JOIN public.objetivo_de_trabajo ON (public.objetivo_de_trabajo.id_objetivo_trabajo = indicador.id_objetivo_trabajo)				
				WHERE
				objetivo_de_trabajo.id_objetivo_trabajo ='".$listado_objetivos_perspectivas['id_objetivo_trabajo']."' 
				order by objetivo_de_trabajo.id_objetivo_trabajo";
				
				$indicador = Yii::app()->db->createCommand($sql_indicador)->queryAll();
			
				foreach($indicador as $listado_indicadores)
				{					
					$indicadores[] = $listado_indicadores;
				}	
		} 
		
		$planes = array();
		foreach($indicadores as $indicadores_id)
		{
			$sql_plan = "SELECT DISTINCT 
				sum(public.plan.valor_plan_mes) as total_plan_mes ,
				public.indicador.id_indicador 
				FROM
				public.indicador
				INNER JOIN public.plan ON (public.indicador.id_indicador = public.plan.id_indicador)
				INNER JOIN public.dat_mes ON (public.plan.id_mes = public.dat_mes.id_mes)
				WHERE indicador.id_indicador = '".$indicadores_id['id_indicador']."' and public.dat_mes.id_mes < $mes
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
		for($i=0;$i<count($indicadores);$i++)
		{
			for($j=0;$j<count($planes);$j++)
			{
				if($indicadores[$i]['id_indicador'] == $planes[$j]['id_indicador'])
				{ 
			//  junto los resultados hasta el momento						
					$indicadores[$i] = array_merge($indicadores[$i],$planes[$j]); 
				}
			}
		} 
		
		
		for($i=0;$i<count($indicadores);$i++)
		{
			for($j=0;$j<count($objetivos_perspectivas);$j++)
			{
				if($indicadores[$i]['id_objetivo_trabajo'] == $objetivos_perspectivas[$j]['id_objetivo_trabajo'])
				{ 
			//  junto los resultados hasta el momento						
					$indicadores[$i] = array_merge($indicadores[$i],$objetivos_perspectivas[$j]); 
				}
			}
		}  
		 
		$datos_finales = array();  
		$temp = array(); 
		
		for($k=0;$k<count($indicadores);$k++)
		{ 
		$temp[$k]['id_indicador'] = 0;
		$temp[$k]['id_objetivo_trabajo'] = 0;
		$temp[$k]['total_plan_mes'] = 0;
		$temp[$k]['total_real_plan'] = 0;
		$temp[$k]['id_perspectiva'] = 0;
		$temp[$k]['id_objetivo_estrategico'] = 0;
		$temp[$k]['nombre_perspectiva'] = "";
		} 
		 
		 
		for($k=0;$k<count($perspectivas);$k++)
		{ 
			for($i=0;$i<count($indicadores);$i++)
			{ 
				if($perspectivas[$k]['id_perspectiva']===$indicadores[$i]['id_perspectiva'])
				{
				$temp[$k]['nombre_perspectiva'] = $indicadores[$i]['nombre_perspectiva']; 
				$temp[$k]['id_perspectiva'] = $indicadores[$i]['id_perspectiva']; 
				if(isset($indicadores[$i]['total_real_plan']))  
				$temp[$k]['total_real_plan'] += $indicadores[$i]['total_real_plan']; 
				if(isset($indicadores[$i]['total_plan_mes']))  
				$temp[$k]['total_plan_mes'] += $indicadores[$i]['total_plan_mes'];  
				} 
			}
			$datos_finales[] = $temp[$k];
		}
		 
		
		for($i=0;$i<count($perspectivas);$i++)
		{
			for($j=0;$j<count($datos_finales);$j++)
			{
			if($perspectivas[$i]['id_perspectiva'] == $datos_finales[$j]['id_perspectiva'])
				{ 								
					$perspectivas[$i] = array_merge($perspectivas[$i],$datos_finales[$j]); 
				}
			}
		} 
		$totales_resultados = new stdclass;
		$totales_resultados = $perspectivas[0];
		
		$todo = array();
		$pos = 0;

		for($i =0; $i<count($perspectivas);$i++)
		{
			$totales_resultados['nombre_perspectiva'] = $perspectivas[$i]['nombre_perspectiva'];
			$totales_resultados['id_perspectiva'] = $perspectivas[$i]['id_perspectiva'];
			
			if(isset($perspectivas[$i]['id_indicador']))  
			$totales_resultados['id_indicador'] = $perspectivas[$i]['id_indicador'];
			else $totales_resultados['id_indicador'] = 0;
			
			if(isset($perspectivas[$i]['id_objetivo_trabajo']))  
			$totales_resultados['id_objetivo_trabajo'] = $perspectivas[$i]['id_objetivo_trabajo'];
			else $totales_resultados['total_plan_mes'] = 0;
				
			if(isset($perspectivas[$i]['total_plan_mes']))  
			$totales_resultados['total_plan_mes'] = $perspectivas[$i]['total_plan_mes'];
			else $totales_resultados['total_plan_mes'] = 0;
			
			if(isset($perspectivas[$i]['total_real_plan']))  
			$totales_resultados['total_real_plan'] = $perspectivas[$i]['total_real_plan'];
			else $totales_resultados['total_real_plan'] = 0;
			
			if(isset($perspectivas[$i]['id_objetivo_estrategico']))  
			$totales_resultados['id_objetivo_estrategico'] = $perspectivas[$i]['id_objetivo_estrategico'];
			else $totales_resultados['id_objetivo_estrategico'] = 0;
			
				if($totales_resultados['total_plan_mes'])
				{
					if(isset($perspectivas[$i]['total_real_plan']) || isset($perspectivas[$i]['total_plan_mes']))  
					{
						 if($perspectivas[$i]['total_plan_mes'] != 0)
						$totales_resultados['porciento_cumplimiento'] = round(($perspectivas[$i]['total_real_plan']/$perspectivas[$i]['total_plan_mes'])*100,2);
						else $totales_resultados['porciento_cumplimiento'] = 0;
					}
				}
				else $totales_resultados['porciento_cumplimiento'] = 0;
			$query_objetivos = "select count(*) as total_obj from  objetivo_de_trabajo 
						inner join objetivo_estrategico on objetivo_estrategico.id_objetivo_estrategico = objetivo_de_trabajo.id_objetivo_estrategico
						where id_perspectiva = '".$perspectivas[$i]['id_perspectiva']."'";
			$obj_resultados = Yii::app()->db->createCommand($query_objetivos)->queryAll(); 
			$totales_resultados['total_obj'] = $obj_resultados[0]['total_obj'];	
			
			$query_indicadores = "select count(*) as total_ind from  indicador 
			inner join objetivo_de_trabajo on indicador.id_objetivo_trabajo = objetivo_de_trabajo.id_objetivo_trabajo
			inner join objetivo_estrategico on objetivo_estrategico.id_objetivo_estrategico = objetivo_de_trabajo.id_objetivo_estrategico
			where id_perspectiva = '".$perspectivas[$i]['id_perspectiva']."'";
			$ind_resultados = Yii::app()->db->createCommand($query_indicadores)->queryAll(); 
			$totales_resultados['total_ind'] = $ind_resultados[0]['total_ind'];	
			 
			$todo[] = $totales_resultados;						
			} 
			 
		  echo  CJSON::encode(array('datos'=>$todo)); 
		 
	}
}
