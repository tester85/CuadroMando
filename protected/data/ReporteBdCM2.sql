--
-- Estrutura de la tabla accion--

DROP TABLE 'accion' CASCADE;
CREATE TABLE 'accion' (
id_accion int4 NOT NULL DEFAULT nextval('accion_id_accion_seq'::regclass),
nombre_accion varchar(250) NOT NULL,
id_objetivo_trabajo int4 NOT NULL,
id_cargo_ejecutante int4 NOT NULL,
fecha_cump_accion date NOT NULL,
avance int4
);

--
-- Creating data for 'accion'
--



--
-- Creating index for 'accion'
--

ALTER TABLE ONLY  accion  ADD CONSTRAINT  "PK5_1"  PRIMARY KEY  (id_accion);
--
-- Estrutura de la tabla cargo--

DROP TABLE 'cargo' CASCADE;
CREATE TABLE 'cargo' (
id_cargo int4 NOT NULL DEFAULT nextval('cargo_id_cargo_seq'::regclass),
nombre_cargo varchar(250) NOT NULL
);

--
-- Creating data for 'cargo'
--

INSERT INTO 'cargo' VALUES ('1','Director General');
INSERT INTO 'cargo' VALUES ('4','Director Adjunto');
INSERT INTO 'cargo' VALUES ('6','Especialista B para la Defensa y Defensa Civil');
INSERT INTO 'cargo' VALUES ('7','Especialista B en Ciencias Informáticas');
INSERT INTO 'cargo' VALUES ('8','Especialista B en Seguridad y Protección');
INSERT INTO 'cargo' VALUES ('9','Especialista B en Gestión de la Calidad');
INSERT INTO 'cargo' VALUES ('10','Especialista B en Gestión Económica');
INSERT INTO 'cargo' VALUES ('2','Director Técnico');
INSERT INTO 'cargo' VALUES ('11','Especialista B en Gestión de los Recursos Humanos');
INSERT INTO 'cargo' VALUES ('5','Director de Contabilidad y Finanzas');
INSERT INTO 'cargo' VALUES ('12','Contador B. Especialista Principal');
INSERT INTO 'cargo' VALUES ('13','Contador B');
INSERT INTO 'cargo' VALUES ('3','Especialista B en Desarrollo y Manejo de los Recursos Hídricos');
INSERT INTO 'cargo' VALUES ('14','Especialista B en Desarrollo y Manejo de los Recursos Hídricos. Especialista Principal');
INSERT INTO 'cargo' VALUES ('15','Director de Logística');
INSERT INTO 'cargo' VALUES ('16','Especialista B en Ahorro y Uso Racional de Energía');
INSERT INTO 'cargo' VALUES ('17','Especialista A de Transporte Automotor');
INSERT INTO 'cargo' VALUES ('18','Especialista Comercial UEB');
INSERT INTO 'cargo' VALUES ('19','Especialista Técnica UEB');
INSERT INTO 'cargo' VALUES ('22','Comprador');
INSERT INTO 'cargo' VALUES ('20','Director UEB');


--
-- Creating index for 'cargo'
--

ALTER TABLE ONLY  cargo  ADD CONSTRAINT  "PK26"  PRIMARY KEY  (id_cargo);
--
-- Estrutura de la tabla dat_mes--

DROP TABLE 'dat_mes' CASCADE;
CREATE TABLE 'dat_mes' (
id_mes int4 NOT NULL DEFAULT nextval('dat_mes_id_mes_seq'::regclass),
nombre_mes varchar(50) NOT NULL
);

--
-- Creating data for 'dat_mes'
--

INSERT INTO 'dat_mes' VALUES ('1','Enero');
INSERT INTO 'dat_mes' VALUES ('2','Febrero');
INSERT INTO 'dat_mes' VALUES ('3','Marzo');
INSERT INTO 'dat_mes' VALUES ('4','Abril');
INSERT INTO 'dat_mes' VALUES ('5','Mayo');
INSERT INTO 'dat_mes' VALUES ('6','Junio');
INSERT INTO 'dat_mes' VALUES ('7','Julio');
INSERT INTO 'dat_mes' VALUES ('8','Agosto');
INSERT INTO 'dat_mes' VALUES ('9','Septiembre');
INSERT INTO 'dat_mes' VALUES ('10','Octubre');
INSERT INTO 'dat_mes' VALUES ('11','Noviembre');
INSERT INTO 'dat_mes' VALUES ('12','Diciembre');


--
-- Creating index for 'dat_mes'
--

ALTER TABLE ONLY  dat_mes  ADD CONSTRAINT  "PK4_1"  PRIMARY KEY  (id_mes);
--
-- Estrutura de la tabla indicador--

DROP TABLE 'indicador' CASCADE;
CREATE TABLE 'indicador' (
id_indicador int4 NOT NULL DEFAULT nextval('indicador_id_indicador_seq'::regclass),
nombre_indicador varchar(200) NOT NULL,
cierre_anno_anterior numeric NOT NULL,
proyectado numeric NOT NULL,
descripcion varchar(200),
id_objetivo_trabajo int4 NOT NULL,
id_unidad_medida int4 NOT NULL,
id_cargo_responsable int4 NOT NULL,
clasificacion_gi varchar(250),
id_cargo_encargado int4
);

--
-- Creating data for 'indicador'
--

INSERT INTO 'indicador' VALUES ('5','Automatización de Aliviaderos (AA) ','12312','233','a','4','11','1','gestion',NULL);
INSERT INTO 'indicador' VALUES ('6','Prevención Hidrológica (PH)','50','50','AA','4','1','2','Informativo',NULL);
INSERT INTO 'indicador' VALUES ('7','Valor Agregado (VA) ','1','1','A','5','8','1','gestion',NULL);
INSERT INTO 'indicador' VALUES ('8','Productividad (P)  ','12','12','a','5','8','2','gestion',NULL);
INSERT INTO 'indicador' VALUES ('3','Garantía de Agua para Cultivos Estratégicos (GCE) ','222','3333','Disminución del presupuesto de alimentación','6','11','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('9','Salario Medio / Productividad','2312','123123','asdasd','4','17','2','gestion','3');
INSERT INTO 'indicador' VALUES ('2','Garantía Abasto a la Población (GAP) ','23423','234','-','1','1','2','Informativo','14');
INSERT INTO 'indicador' VALUES ('10','Relación gasto/ingreso','0.50','0.50','Relación gasto/ingreso','1','11','5','gestion','12');
INSERT INTO 'indicador' VALUES ('11','Ciclo de cobros','0.50','30','Ciclo de cobros','1','9','5','gestion','12');
INSERT INTO 'indicador' VALUES ('12','Ingresos en CUC','7600','7605.7','Ingresos en CUC','1','8','2','gestion','14');
INSERT INTO 'indicador' VALUES ('4','Alerta Temprana (SAT) ','0','1','Cumplir con sus obligaciones','1','7','1','gestion','2');
INSERT INTO 'indicador' VALUES ('13','Clientes satisfechos','200','135','Clientes satisfechos','6','7','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('14','Cartera de clientes','200','100','Cartera de clientes','6','7','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('16','Llenado de los embalses','95','100','Rendimiento del agua','7','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('17','Estado de cuencas subterráneas','50','47','Estado de cuencas subterráneas','8','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('15','Rendimiento del agua','95','100','Rendimiento del agua','7','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('18','Limitación de los embalses','25','25','Limitación de los embalses
','9','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('19','Balance de Agua','508410','508.410','Balance de agua','8','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('20','Obras hidrométricas','5','4','Obras hidrometricas','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('21','Pérdidas en canales','56778','56778','pérdidas en canales','9','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('22','Presas certificadas','20','20','Presas certificadas','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('23','Canales Certificados','39','39','Canales certificados','9','17','2','gestion','3');
INSERT INTO 'indicador' VALUES ('24','Redes certificadas','4','4','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('25','Estaciones de bombeo certificadas','6','6','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('26','Relación de mantenimiento','47','47','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('27','Disponibilidad técnica','47','47','Disponibilidad técnica','9','7','2','gestion','17');


--
-- Creating index for 'indicador'
--

ALTER TABLE ONLY  indicador  ADD CONSTRAINT  "PK4"  PRIMARY KEY  (id_indicador);
--
-- Estrutura de la tabla indicador_accion--

DROP TABLE 'indicador_accion' CASCADE;
CREATE TABLE 'indicador_accion' (
id_indicador int4 NOT NULL,
id_accion int4 NOT NULL,
id_indicador_accion int4 NOT NULL DEFAULT nextval('indicador_accion_id_indicador_accion_seq'::regclass)
);

--
-- Creating data for 'indicador_accion'
--



--
-- Creating index for 'indicador_accion'
--

ALTER TABLE ONLY  indicador_accion  ADD CONSTRAINT  "PK18"  PRIMARY KEY  (id_indicador, id_accion);
--
-- Estrutura de la tabla objetivo_de_trabajo--

DROP TABLE 'objetivo_de_trabajo' CASCADE;
CREATE TABLE 'objetivo_de_trabajo' (
id_objetivo_trabajo int4 NOT NULL DEFAULT nextval('objetivo_de_trabajo_id_objetivo_trabajo_seq'::regclass),
numero_objetivo_trabajo int4 NOT NULL,
nombre_objetivo_trabajo varchar(200) NOT NULL,
id_objetivo_estrategico int4 NOT NULL
);

--
-- Creating data for 'objetivo_de_trabajo'
--

INSERT INTO 'objetivo_de_trabajo' VALUES ('4','2','Asegurar la prevención contra inundaciones de los principales núcleos urbanos y objetivos económicos vulnerables.','1');
INSERT INTO 'objetivo_de_trabajo' VALUES ('5','3','Asegurar el autofinanciamiento en cualquier condición de disponibilidad de agua, así como, los indicadores vitales de economía.','1');
INSERT INTO 'objetivo_de_trabajo' VALUES ('6','4','Actualizar el censo de clientes y satisfacer sus necesidades de agua, priorizando el volumen, la calidad y la oportunidad convenidos.','2');
INSERT INTO 'objetivo_de_trabajo' VALUES ('8','6','Perfeccionar el proceso de balance de agua, que asegure la operación eficiente de la infraestructura, priorizando el control de los volúmenes entregados.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('9','7','Asegurar el mantenimiento sistemático a la infraestructura, que permita el estado técnico requerido y garantizar sus capacidades potenciales.  ','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('10','8','Perfeccionar el proceso de balance de agua, que asegure la operación eficiente de la infraestructura, priorizando el control de los volúmenes entregados.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('11','9','Priorizar el manejo de cuencas en tiempo real, en condiciones normales y excepcionales.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('12','10','Desarrollar la mecanización ajustada a las necesidades del servicio de provisión de agua, haciendo un uso eficiente de los recursos energéticos.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('13','11','Alcanzar condiciones de trabajo que aseguren el compromiso de todos los trabajadores en el logro de la visión.','4');
INSERT INTO 'objetivo_de_trabajo' VALUES ('14','12','Desarrollar la informatización, la innovación y la gestión del conocimiento en función de alcanzar las competencias requeridas por la organización.','4');
INSERT INTO 'objetivo_de_trabajo' VALUES ('1','1','Asegurar de forma priorizada el agua demandada para el abasto humano y para la producción de alimentos de forma sostenible.','4');
INSERT INTO 'objetivo_de_trabajo' VALUES ('15','13','prueba Perspectiva 2','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('7','5','Elevar el rendimiento productivo, regido por las normas de consumo.','2');


--
-- Creating index for 'objetivo_de_trabajo'
--

ALTER TABLE ONLY  objetivo_de_trabajo  ADD CONSTRAINT  "PK3"  PRIMARY KEY  (id_objetivo_trabajo);
--
-- Estrutura de la tabla objetivo_de_trabajo_area--

DROP TABLE 'objetivo_de_trabajo_area' CASCADE;
CREATE TABLE 'objetivo_de_trabajo_area' (
id_objetivo_trabajo int4 NOT NULL,
id_area int4 NOT NULL
);

--
-- Creating data for 'objetivo_de_trabajo_area'
--

INSERT INTO 'objetivo_de_trabajo_area' VALUES ('1','1');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('9','3');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('9','4');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('7','3');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('5','4');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('5','1');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('6','3');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('6','1');
INSERT INTO 'objetivo_de_trabajo_area' VALUES ('6','4');


--
-- Creating index for 'objetivo_de_trabajo_area'
--

ALTER TABLE ONLY  objetivo_de_trabajo_area  ADD CONSTRAINT  "PK16"  PRIMARY KEY  (id_objetivo_trabajo, id_area);
--
-- Estrutura de la tabla objetivo_estrategico--

DROP TABLE 'objetivo_estrategico' CASCADE;
CREATE TABLE 'objetivo_estrategico' (
id_objetivo_estrategico int4 NOT NULL DEFAULT nextval('objetivo_estrategico_id_objetivo_estrategico_seq'::regclass),
nombre_objetivo_est varchar(200) NOT NULL,
fecha_cumplimiento date,
id_perspectiva int4 NOT NULL
);

--
-- Creating data for 'objetivo_estrategico'
--

INSERT INTO 'objetivo_estrategico' VALUES ('4','Lograr las competencias y el compromiso de los trabajadores con la visión corporativa de la organización','2011-12-31','5');
INSERT INTO 'objetivo_estrategico' VALUES ('5','Asegurar la excelencia tecnológica y uso racional de la infraestructura hidráulica','2011-12-31','3');
INSERT INTO 'objetivo_estrategico' VALUES ('1','Alcanzar la condición de organización de alto reconocimiento social con resultado autofinanciado y solvencia económica','2011-12-03','1');
INSERT INTO 'objetivo_estrategico' VALUES ('2','Asegurar el servicio de provisión de agua en el lugar, con la cantidad, calidad y oportunidad convenida.','2012-03-12','4');


--
-- Creating index for 'objetivo_estrategico'
--

ALTER TABLE ONLY  objetivo_estrategico  ADD CONSTRAINT  "PK2"  PRIMARY KEY  (id_objetivo_estrategico);
--
-- Estrutura de la tabla perspectiva--

DROP TABLE 'perspectiva' CASCADE;
CREATE TABLE 'perspectiva' (
id_perspectiva int4 NOT NULL DEFAULT nextval('perspectiva_id_perspectiva_seq'::regclass),
nombre_perspectiva varchar(200) NOT NULL
);

--
-- Creating data for 'perspectiva'
--

INSERT INTO 'perspectiva' VALUES ('3','Procesos internos');
INSERT INTO 'perspectiva' VALUES ('4','Clientes');
INSERT INTO 'perspectiva' VALUES ('5','Responsabilidad social');
INSERT INTO 'perspectiva' VALUES ('1','Aprendizaje y crecimiento');


--
-- Creating index for 'perspectiva'
--

ALTER TABLE ONLY  perspectiva  ADD CONSTRAINT  "PK1"  PRIMARY KEY  (id_perspectiva);
--
-- Estrutura de la tabla provincia--

DROP TABLE 'provincia' CASCADE;
CREATE TABLE 'provincia' (
id_provincia int4 NOT NULL DEFAULT nextval('provincia_id_provincia_seq'::regclass),
no_provincia int2 NOT NULL,
nombre_provincia varchar(100) NOT NULL
);

--
-- Creating data for 'provincia'
--

INSERT INTO 'provincia' VALUES ('2','1','Pinar del Rio');
INSERT INTO 'provincia' VALUES ('4','2','Artemisa');
INSERT INTO 'provincia' VALUES ('5','3','Mayabeque');
INSERT INTO 'provincia' VALUES ('6','4','La Habana');
INSERT INTO 'provincia' VALUES ('7','5','Matanzas');
INSERT INTO 'provincia' VALUES ('8','6','Cienfuegos');
INSERT INTO 'provincia' VALUES ('9','7','Villa Clara');
INSERT INTO 'provincia' VALUES ('10','8','Santi Spiritus');
INSERT INTO 'provincia' VALUES ('11','9','Ciego de Avila');
INSERT INTO 'provincia' VALUES ('12','10','Camaguey');
INSERT INTO 'provincia' VALUES ('3','12','Holguín');
INSERT INTO 'provincia' VALUES ('13','11','Las Tunas');
INSERT INTO 'provincia' VALUES ('14','13','Granma');


--
-- Creating index for 'provincia'
--

ALTER TABLE ONLY  provincia  ADD CONSTRAINT  "PK32"  PRIMARY KEY  (id_provincia);
--
-- Estrutura de la tabla provincia_indicador--

DROP TABLE 'provincia_indicador' CASCADE;
CREATE TABLE 'provincia_indicador' (
id_indicador int4 NOT NULL,
id_provincia int4 NOT NULL
);

--
-- Creating data for 'provincia_indicador'
--



--
-- Creating index for 'provincia_indicador'
--

ALTER TABLE ONLY  provincia_indicador  ADD CONSTRAINT  "PK38"  PRIMARY KEY  (id_indicador, id_provincia);
--
-- Estrutura de la tabla rango_cumplimiento--

DROP TABLE 'rango_cumplimiento' CASCADE;
CREATE TABLE 'rango_cumplimiento' (
id_indicador int4 NOT NULL,
id_rango int4 NOT NULL DEFAULT nextval('rango_cumplimiento_id_rango_seq'::regclass),
categoria varchar(200),
valor_minimo numeric,
valor_maximo numeric,
comp_valor_min text,
comp_valor_max text
);

--
-- Creating data for 'rango_cumplimiento'
--

INSERT INTO 'rango_cumplimiento' VALUES ('2','1','Rojo','0','93','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('2','2','Amarillo','93','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('2','3','Verde','100','101','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('3','4','Rojo','0','93','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('3','5','Amarillo','93','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('3','6','Verde','100','101','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('4','7','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('4','8','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('4','9','Verde','100','200','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('5','10','Rojo','0','98','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('5','11','Amarillo','98','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('5','12','Verde','100','200','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('6','13','Rojo','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('6','15','Verde','0','98','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('6','14','Amarillo','98','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('7','16','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('7','17','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('7','18','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('8','19','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('8','20','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('8','21','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('9','22','Rojo','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('9','23','Amarillo','99','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('9','24','Verde','0','99','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('10','25','Rojo','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('10','26','Amarillo','99','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('10','27','Verde','0','99','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('11','28','Rojo','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('11','29','Amarillo','99','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('11','30','Verde','0','99','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('12','31','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('12','32','Amarillo','94','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('12','33','Verde','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('13','34','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('13','35','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('13','36','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('14','37','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('14','38','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('14','39','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('15','40','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('15','41','Amarillo','94','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('15','42','Verde','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('16','43','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('16','44','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('16','45','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('17','46','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('17','47','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('17','48','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('18','49','Rojo','100','1000','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('18','50','Amarillo','94','100','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('18','51','Verde','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('19','52','Rojo','0','80','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('19','53','Amarillo','80','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('19','54','Verde','94','100','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('20','55','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('20','56','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('20','57','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('21','58','Rojo','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('21','59','Amarillo','94','100','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('21','60','Verde','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('22','61','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('22','62','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('22','63','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('24','64','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('24','65','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('25','67','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('25','68','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('25','69','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('26','70','Rojo','0','94','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('26','71','Amarillo','94','100','<','<');
INSERT INTO 'rango_cumplimiento' VALUES ('26','72','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('27','73','Rojo','0','70','>','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('27','74','Amarillo','70','75','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('27','75','Verde','75','1000','>=','<=');
INSERT INTO 'rango_cumplimiento' VALUES ('23','76','Rojo','0','94','>','<');
INSERT INTO 'rango_cumplimiento' VALUES ('23','77','Amarillo','94','100','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('23','78','Verde','100','1000','>=','<');
INSERT INTO 'rango_cumplimiento' VALUES ('24','66','Verde','100','1000','>=','<');


--
-- Creating index for 'rango_cumplimiento'
--

ALTER TABLE ONLY  rango_cumplimiento  ADD CONSTRAINT  "PK27"  PRIMARY KEY  (id_rango);
--
-- Estrutura de la tabla ueb--

DROP TABLE 'ueb' CASCADE;
CREATE TABLE 'ueb' (
id_provincia int4 NOT NULL,
id_ueb int4 NOT NULL DEFAULT nextval('ueb_id_ueb_seq'::regclass),
nombre_ueb varchar(150) NOT NULL
);

--
-- Creating data for 'ueb'
--

INSERT INTO 'ueb' VALUES ('3','2','UEB Holguín');


--
-- Creating index for 'ueb'
--

ALTER TABLE ONLY  ueb  ADD CONSTRAINT  "PK31"  PRIMARY KEY  (id_ueb);
--
-- Estrutura de la tabla ueb_indicador--

DROP TABLE 'ueb_indicador' CASCADE;
CREATE TABLE 'ueb_indicador' (
id_ueb int4 NOT NULL,
id_indicador int4 NOT NULL
);

--
-- Creating data for 'ueb_indicador'
--



--
-- Creating index for 'ueb_indicador'
--

ALTER TABLE ONLY  ueb_indicador  ADD CONSTRAINT  "PK34"  PRIMARY KEY  (id_ueb, id_indicador);
--
-- Estrutura de la tabla unidad_medida--

DROP TABLE 'unidad_medida' CASCADE;
CREATE TABLE 'unidad_medida' (
id_unidad_medida int4 NOT NULL DEFAULT nextval('unidad_medida_id_unidad_medida_seq'::regclass),
nombre varchar(100) NOT NULL
);

--
-- Creating data for 'unidad_medida'
--

INSERT INTO 'unidad_medida' VALUES ('6','Adimensional');
INSERT INTO 'unidad_medida' VALUES ('7','U');
INSERT INTO 'unidad_medida' VALUES ('8','MP');
INSERT INTO 'unidad_medida' VALUES ('10','MCUC');
INSERT INTO 'unidad_medida' VALUES ('11','%');
INSERT INTO 'unidad_medida' VALUES ('13','$');
INSERT INTO 'unidad_medida' VALUES ('14','Mwh');
INSERT INTO 'unidad_medida' VALUES ('15','ML/Mm2');
INSERT INTO 'unidad_medida' VALUES ('12','Equip./ Km²');
INSERT INTO 'unidad_medida' VALUES ('16','ML/Mkm');
INSERT INTO 'unidad_medida' VALUES ('17','km');
INSERT INTO 'unidad_medida' VALUES ('1','hm³');
INSERT INTO 'unidad_medida' VALUES ('4','m³');
INSERT INTO 'unidad_medida' VALUES ('9','Días');


--
-- Creating index for 'unidad_medida'
--

ALTER TABLE ONLY  unidad_medida  ADD CONSTRAINT  "PK5"  PRIMARY KEY  (id_unidad_medida);


--
-- Creating relacionships for 'accion'
--

ALTER TABLE ONLY accion ADD CONSTRAINT Refobjetivo_de_trabajo16 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

--
-- Creating relacionships for 'accion'
--

ALTER TABLE ONLY accion ADD CONSTRAINT Refcargo30 FOREIGN KEY (id_cargo_ejecutante) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refobjetivo_de_trabajo3 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refcargo31 FOREIGN KEY (id_cargo_responsable) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refunidad_medida4 FOREIGN KEY (id_unidad_medida) REFERENCES unidad_medida(id_unidad_medida);

--
-- Creating relacionships for 'indicador_accion'
--

ALTER TABLE ONLY indicador_accion ADD CONSTRAINT Refaccion20 FOREIGN KEY (id_accion) REFERENCES accion(id_accion);

--
-- Creating relacionships for 'indicador_accion'
--

ALTER TABLE ONLY indicador_accion ADD CONSTRAINT Refindicador19 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'mitigacion'
--

ALTER TABLE ONLY mitigacion ADD CONSTRAINT Refcargo33 FOREIGN KEY (id_cargo_responsable) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'mitigacion'
--

ALTER TABLE ONLY mitigacion ADD CONSTRAINT Refriesgo25 FOREIGN KEY (id_riesgo) REFERENCES riesgo(id_riesgo);

--
-- Creating relacionships for 'mitigacion'
--

ALTER TABLE ONLY mitigacion ADD CONSTRAINT Refcargo34 FOREIGN KEY (id_cargo_ejecutante) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'objetivo_de_trabajo'
--

ALTER TABLE ONLY objetivo_de_trabajo ADD CONSTRAINT Refobjetivo_estrategico2 FOREIGN KEY (id_objetivo_estrategico) REFERENCES objetivo_estrategico(id_objetivo_estrategico);

--
-- Creating relacionships for 'objetivo_de_trabajo_area'
--

ALTER TABLE ONLY objetivo_de_trabajo_area ADD CONSTRAINT Refobjetivo_de_trabajo12 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

--
-- Creating relacionships for 'objetivo_de_trabajo_area'
--

ALTER TABLE ONLY objetivo_de_trabajo_area ADD CONSTRAINT Refarea13 FOREIGN KEY (id_area) REFERENCES area(id_area);

--
-- Creating relacionships for 'objetivo_estrategico'
--

ALTER TABLE ONLY objetivo_estrategico ADD CONSTRAINT Refperspectiva1 FOREIGN KEY (id_perspectiva) REFERENCES perspectiva(id_perspectiva);

--
-- Creating relacionships for 'plan'
--

ALTER TABLE ONLY plan ADD CONSTRAINT Refindicador27 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'plan'
--

ALTER TABLE ONLY plan ADD CONSTRAINT Refdat_mes26 FOREIGN KEY (id_mes) REFERENCES dat_mes(id_mes);

--
-- Creating relacionships for 'provincia_indicador'
--

ALTER TABLE ONLY provincia_indicador ADD CONSTRAINT Refindicador59 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'provincia_indicador'
--

ALTER TABLE ONLY provincia_indicador ADD CONSTRAINT Refprovincia60 FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia);

--
-- Creating relacionships for 'rango_cumplimiento'
--

ALTER TABLE ONLY rango_cumplimiento ADD CONSTRAINT Refindicador32 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'real'
--

ALTER TABLE ONLY real ADD CONSTRAINT Refplan29 FOREIGN KEY (id_plan, id_indicador) REFERENCES plan(id_plan, id_indicador);

--
-- Creating relacionships for 'riesgo'
--

ALTER TABLE ONLY riesgo ADD CONSTRAINT Refindicador24 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'ueb'
--

ALTER TABLE ONLY ueb ADD CONSTRAINT Refprovincia41 FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia);

--
-- Creating relacionships for 'ueb_indicador'
--

ALTER TABLE ONLY ueb_indicador ADD CONSTRAINT Refueb49 FOREIGN KEY (id_ueb) REFERENCES ueb(id_ueb);

--
-- Creating relacionships for 'ueb_indicador'
--

ALTER TABLE ONLY ueb_indicador ADD CONSTRAINT Refindicador50 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'usuario_indicador'
--

ALTER TABLE ONLY usuario_indicador ADD CONSTRAINT Refindicador39 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'usuario_indicador'
--

ALTER TABLE ONLY usuario_indicador ADD CONSTRAINT Refusuario38 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

--
-- Creating relacionships for 'usuario_provincia'
--

ALTER TABLE ONLY usuario_provincia ADD CONSTRAINT Refusuario67 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

--
-- Creating relacionships for 'usuario_provincia'
--

ALTER TABLE ONLY usuario_provincia ADD CONSTRAINT Refprovincia68 FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia);

--
-- Creating relacionships for 'usuario_ueb'
--

ALTER TABLE ONLY usuario_ueb ADD CONSTRAINT Refusuario69 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

--
-- Creating relacionships for 'usuario_ueb'
--

ALTER TABLE ONLY usuario_ueb ADD CONSTRAINT Refueb70 FOREIGN KEY (id_ueb) REFERENCES ueb(id_ueb);