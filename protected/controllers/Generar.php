<?php
	class Exportar
	{   
		public function fileExport($archivos)
		{ 	
			if (!is_file($archivos)) { die("<b>404 File not found!</b>"); }
			  $len = filesize($archivos);
			  $filename = basename($archivos);
			  $file_extension = strtolower(substr(strrchr($filename,"."),1)); 
			  $ctype="application/force-download";			 
   			  header("Pragma: public");
			  header("Expires: 0");
			  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			  header("Cache-Control: public");
			  header("Content-Description: File Transfer");
			  header("Content-Type: $ctype");
			  $header="Content-Disposition: attachment; filename=".$filename.";";
			  
			  header($header);
			  header("Content-Transfer-Encoding: binary");
			  header("Content-Length: ".$len);
			  @readfile($archivos);
			  fclose($back);  				  
		}
		public function ExportarBD()
		{
			//$password=Yii::app()->db->password; 
			$connString=Yii::app()->db->connectionString;
			$arrayConexion=split('=',$connString);
			$arrayhost=split(';',$arrayConexion[1]);
			$host=$arrayhost[0];  
			$dbname = $arrayConexion[2]; 
			 
			$archivo = Yii::app()->basePath.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR."Reporte".$dbname.".sql";
			//print_r("asas"); die;
		//	chmod($archivo,0777);
		
			if(Yii::app()->session['estructura'] == 'Nacional')
			{
				$res = "select relname as tablename
				from pg_class where relkind in ('r')
				and relname not like 'pg_%' and relname not like 'sql_%' 
				and relname != 'usuario' and relname != 'usuario_indicador' 
				and relname != 'usuario_provincia' and relname != 'usuario_ueb' 
				and relname != 'documentos' and relname != 'plan' 
				and relname != 'real' and relname != 'riesgo' 
				and relname != 'mitigacion' and relname != 'area'  
				order by tablename" ; 
				
			}
			else {
				$res = "select relname as tablename
				from pg_class where relkind in ('r')
				and relname not like 'pg_%' and relname not like 'sql_%' 
				and relname != 'usuario' and relname != 'usuario_indicador' 
				and relname != 'usuario_provincia' and relname != 'usuario_ueb' 
				and relname != 'documentos'  
				order by tablename" ; 
			}
			$back = fopen($archivo,"w");
			
			/*$res = "select relname as tablename from pg_class where relkind in ('r')
				and relname not like 'pg_%' and relname not like 'sql_%' order by tablename";
				*/
			$tablas = Yii::app()->db->createCommand($res)->queryAll(); 
			
			 $str="";
			 foreach($tablas as $row)
			{  
				   $table = $row["tablename"];
				   $str .= "--\n";
				   $str .= "-- Estrutura de la tabla ".$row["tablename"];
				   $str .= "--\n";
				   $str .= "\nDROP TABLE '".$row["tablename"]."' CASCADE;";
				   $str .= "\nCREATE TABLE '".$row["tablename"]."' (";
				  
				  $res2 = "SELECT attnum,attname , typname , atttypmod-4 , attnotnull ,atthasdef ,adsrc AS def FROM pg_attribute, pg_class, pg_type, pg_attrdef WHERE pg_class.oid=attrelid AND pg_type.oid=atttypid AND attnum>0 AND pg_class.oid=adrelid AND adnum=attnum 
						AND atthasdef='t' AND lower(relname)='".$row["tablename"]."' UNION 
						SELECT attnum,attname , typname , atttypmod-4 , attnotnull , atthasdef ,'' AS def 
						FROM pg_attribute, pg_class, pg_type WHERE pg_class.oid=attrelid 
						AND pg_type.oid=atttypid AND attnum>0 AND atthasdef='f' AND lower(relname)='".$row["tablename"]."' "; 
				$atributos = Yii::app()->db->createCommand($res2)->queryAll();
				 
				/*
				0 ['attnum'] -- numero del att
				1 ['attname'] -- nombre
				2 ['typname'] -- tipo
				3 ['?column?'] -- No column
				4 ['attnotnull'] -- 1 | null
				5 ['atthasdef'] -- 1 | null 
				6 ['def']	-- valor por defecto
				*/
				// creo la estructura de los atributos de la tabla a almacenar en el archivo
				foreach($atributos as $attrib)
				{
					$str .= "\n" . $attrib['attname']. " " . $attrib['typname'];
						if ($attrib['typname']=="varchar")
					   {
					   $str .= "(".$attrib['?column?'] .")";
					   }
					   if ($attrib['attnotnull'] == 1)
					   {
					   $str .= " NOT NULL";
					   }
					   if ($attrib['atthasdef']== 1)
					   {
					   $str .= " DEFAULT ".$attrib['def'];
					   }
					   $str .= ","; 
				}  

				$str=rtrim($str, ","); $str .= "\n);\n";

				   $str .= "\n--\n";
				   $str .= "-- Creating data for '".$row["tablename"]."'";
				   $str .= "\n--\n\n";
				// organizo los datos de la tabla
				
				$res3 = "SELECT * FROM ".$row["tablename"];
				
				$datos_tabla =  Yii::app()->db->createCommand($res3)->queryAll();
				 
				foreach($datos_tabla as $datos)
				{
					$sql = "INSERT INTO '".$row["tablename"]."' VALUES ('";
						 $sql .= utf8_decode(implode("','",$datos));
						 $sql .= "');";
						 $str = str_replace("''","NULL",$str);

					$str .= $sql; $str .= "\n"; 
				} 
				
				// organizo los datos de la llaves primarias
				
				$res4 = "SELECT pg_index.indisprimary, 
						pg_catalog.pg_get_indexdef(pg_index.indexrelid)
						FROM pg_catalog.pg_class c, pg_catalog.pg_class c2,
						pg_catalog.pg_index AS pg_index
						WHERE c.relname = '".$row["tablename"]."'
						AND c.oid = pg_index.indrelid
						AND pg_index.indexrelid = c2.oid
						AND pg_index.indisprimary";
						
				$llaves =  Yii::app()->db->createCommand($res4)->queryAll();
				/*
	0	['indisprimary'] -- 1 = llave primaria
	1	['pg_get_indexdef'] = CREATE UNIQUE INDEX "PK5_1" ON accion USING tree(id_accion)
					*/
				 
				foreach($llaves as $dat)
				{ 		
						$str .= "\n\n--\n";
						$str .= "-- Creating index for '".$row["tablename"]."'";
						$str .= "\n--\n\n"; 
						$t = str_replace("CREATE UNIQUE INDEX", "", $dat['pg_get_indexdef']);
						$t = str_replace("USING btree", "|", $t);
						// Next Line Can be improved!!!
						$t = str_replace("ON", "|", $t);					
						$Temparray = explode("|", $t);
						$str .= "ALTER TABLE ONLY ". $Temparray[1] . " ADD CONSTRAINT " . $Temparray[0] . " PRIMARY KEY " . $Temparray[2] .";\n"; 
				}  
			}

			// relaciones

			 $res5 = "SELECT
					cl.relname AS tabla,
					ct.conname,
					pg_get_constraintdef(ct.oid)
					FROM pg_catalog.pg_attribute a
					JOIN pg_catalog.pg_class cl ON (a.attrelid = cl.oid AND cl.relkind = 'r')
					JOIN pg_catalog.pg_namespace n ON (n.oid = cl.relnamespace)
					JOIN pg_catalog.pg_constraint ct ON (a.attrelid = ct.conrelid AND
					ct.confrelid != 0 AND ct.conkey[1] = a.attnum)
					JOIN pg_catalog.pg_class clf ON (ct.confrelid = clf.oid AND clf.relkind = 'r')
					JOIN pg_catalog.pg_namespace nf ON (nf.oid = clf.relnamespace)
					JOIN pg_catalog.pg_attribute af ON (af.attrelid = ct.confrelid AND
					af.attnum = ct.confkey[1]) order by cl.relname ";
			  
		  $relaciones =  Yii::app()->db->createCommand($res5)->queryAll();
		  /*
			[tabla] => plan
			[conname] => Refdat_mes26
			[pg_get_constraintdef] => FOREIGN KEY (id_mes) REFERENCES dat_mes(id_mes)	  
		  */
			foreach($relaciones as $relation)
			{
				$str .= "\n\n--\n";
				$str .= "-- Creating relacionships for '".$relation['tabla']."'";
				$str .= "\n--\n\n"; 
				$str .= "ALTER TABLE ONLY ".$relation['tabla'] . " ADD CONSTRAINT " . $relation['conname'] . " " . $relation['pg_get_constraintdef'] . ";"; 
			} 
			fwrite($back,$str);
			//$this->fileExport($archivo);
			//return $archivo; 
			include("archivo.php");
			$file = new Archivo();
			$file->Salvar($archivo); 
		}
}
?>
