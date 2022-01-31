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

INSERT INTO 'accion' VALUES ('48','Controlar que se de una respuesta oportuna y satisfactoria a quejas realizadas por los clientes','6','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('49','Controlar que la emisión de las facturas sea con el 100% de la calidad establecida','6','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('50','Entrega oportuna de la documentación para la firma de contratos con el 100% delos clientes','6','18','2012-03-01','10');
INSERT INTO 'accion' VALUES ('51','Capacitación para la realización de la demanda del año 2013 con todos los organismos','6','3','2012-09-29','10');
INSERT INTO 'accion' VALUES ('52','Control del cumplimiento de las normas de consumo por clientes y actividad','7','18','2012-12-31','10');
INSERT INTO 'accion' VALUES ('32','Controlar el mantenimiento y construcción de obras hidrométricas para la medición del agua entregada','6','19','2012-12-29','10');
INSERT INTO 'accion' VALUES ('19','Instalación del sistema de alerta temprana de la cuenca Mayarí','1','20','2012-09-30','10');
INSERT INTO 'accion' VALUES ('22','Realización de visitas técnicas a los puntos involucrados en el sistema de alerta temprana','1','3','2012-03-28','20');
INSERT INTO 'accion' VALUES ('24','Contratación del servicio con CEDAI Guantánamo','4','2','2012-05-31','10');
INSERT INTO 'accion' VALUES ('33','Dar seguimiento al cronograma de implementación e instalación','4','19','2012-12-31','10');
INSERT INTO 'accion' VALUES ('34','Ejecutar vaciado del embalse hasta el volumen previsto por Prevención Hidrológica','4','3','2012-10-31','10');
INSERT INTO 'accion' VALUES ('53','Revisión y análisis con los clientes de las demandas realizadas','7','19','2012-12-31','10');
INSERT INTO 'accion' VALUES ('36','Ejecuci'on del consumo material y servicios recibidos de acuerdo a lo planificado','5','5','2012-12-31','10');
INSERT INTO 'accion' VALUES ('37','Cumplimiento del plan de producci'on mercantil','5','19','2012-12-31','10');
INSERT INTO 'accion' VALUES ('38','Cumplimiento del plan de producci'on mercantil','5','19','2012-12-31','10');
INSERT INTO 'accion' VALUES ('39','Cumplimiento del valor agregado','5','19','2012-12-31','10');
INSERT INTO 'accion' VALUES ('40','Cumplimiento del promedio de trabajadores','5','11','2012-12-31','10');
INSERT INTO 'accion' VALUES ('54','Realizar visitas periódicas a las entidades incumplidoras','7','18','2012-12-31','10');
INSERT INTO 'accion' VALUES ('43','Establecer sistemas de pago a las áreas productivas en función de sus resultados','4','11','2012-12-31','10');
INSERT INTO 'accion' VALUES ('42','Alcanzar niveles de productividad superior al salario devengado','4','11','2012-12-30','10');
INSERT INTO 'accion' VALUES ('41','Mantener el promedio de trabajadores planificado','4','11','2012-12-30','10');
INSERT INTO 'accion' VALUES ('29','Mantener un eficiente cumplimiento de las partidas de gastos planificada','1','19','2012-12-27','10');
INSERT INTO 'accion' VALUES ('44','Eliminar las cuentas por cobrar en ambas monedas con edades superiores a los 30 días','1','5','2012-12-31','10');
INSERT INTO 'accion' VALUES ('45','Cumplimiento del Plan Uso del Agua','1','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('46','Controlar y verificar la entrega del 100% del agua planificada','6','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('47','Informar sobre la calidad del agua entegada según el uso final','6','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('55','Revisión y análisis de los balances hídricos de los embalses','7','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('56','Disminución de las pérdidas por conducción','7','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('57','Verificación periódica de la información de lluvia emitido por los responsables de las UEB','8','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('58','Control aleatorio a la información de sondeos según cuencas de interés','8','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('59','Revisión y verificación de la información de aquellas cuencas de interés regional y nacional','8','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('60','Revisión periódica de los volúmenes de la presa Moa','9','19','2012-12-31','20');
INSERT INTO 'accion' VALUES ('61','Controlar el nivel de información a los jefes de presa sobre los niveles establecidos','9','3','2012-12-31','20');
INSERT INTO 'accion' VALUES ('62','Realización de seminarios con clientes para la correcta elaboración de la demanda','9','3','2012-08-31','10');
INSERT INTO 'accion' VALUES ('63','Revisión y conciliación con los clientes de las demandas entregadas','9','19','2012-09-30','10');
INSERT INTO 'accion' VALUES ('64','Entrega de toda la documentación necesaria a los clientes con el objetivo de cumplir con las asignaciones','9','18','2012-12-31','10');
INSERT INTO 'accion' VALUES ('65','Asesoría directa a clientes que realizan la demanda de agua por primera vez','9','19','2012-09-30','10');
INSERT INTO 'accion' VALUES ('66','Realizar levantamiento para establecer las obras a construir nuevas y las a reparar','9','3','2012-05-31','10');
INSERT INTO 'accion' VALUES ('67','Adquisición de los recursos necesarios','9','3','2012-05-31','10');
INSERT INTO 'accion' VALUES ('68','Realizar los mantenimientos planificados','9','19','2012-12-30','10');
INSERT INTO 'accion' VALUES ('69','Revisión periódica de las entregas a los usuarios','9','19','2012-12-30','10');
INSERT INTO 'accion' VALUES ('70','Revisión periódica del estado técnico y de funcionamiento de los puntos de medición','9','19','2012-12-30','10');
INSERT INTO 'accion' VALUES ('71','Realización de visitas periódicas con el objetivo de revizar parámetros','9','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('72','Realización de mantenimientos a aquellas afectaciones detectadas','9','3','2012-12-31','10');
INSERT INTO 'accion' VALUES ('73','Realización de recorridos periódicos a los canbales pertenecientes a la entidad','9','3','2012-12-30','10');
INSERT INTO 'accion' VALUES ('74','Realizar mantenimientos periódicos a canales que lo necesiten','9','3','2012-12-30','10');
INSERT INTO 'accion' VALUES ('75','Mantener la condición de excelente a los tramos de canales que están declarados','9','3','2012-12-30','10');
INSERT INTO 'accion' VALUES ('76','Realización de inspecciones periódicas  con el objetivo de detectar insuficiencias','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('77','Realización según cronograma de los mantenimientos previstos a las redes','9','3','2012-04-30','10');
INSERT INTO 'accion' VALUES ('78','Entrega de los recursos necesarios a las estaciones y control final de estos','9','20','2012-04-30','10');
INSERT INTO 'accion' VALUES ('80','Revisión de la documentación establecida para la condición de excelente','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('81','Realización de mantenimientos periódicos establecidos','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('82','Visitas técnicas periódicas a las estaciones de bombeo','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('83','Ejecutar todos los mantenimientos planificados según cronograma','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('84','Elevar la preparación del personal técnico de la brigada','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('85','Perfeccionar el trabajo y mantenimiento técnico del equipamiento','9','3','2012-03-31','10');
INSERT INTO 'accion' VALUES ('86','Realizar de forma mensual el día de la técnica','9','17','2012-12-31','10');
INSERT INTO 'accion' VALUES ('87','Realizar diagnóstico técnico a los equipos inactivos que se encuentren en taller','9','17','2012-12-31','10');
INSERT INTO 'accion' VALUES ('89','Realizalos expedientes de bajas técnicas a los equipos que se encuentren paralizados sin posibilidad de ponerlos en explotación','9','17','2012-07-31','10');
INSERT INTO 'accion' VALUES ('88','Realizar la programación de las compras de las piezas y agregados para los equipos automotores teniendo en cuenta el defectado realizado los días de la técnica','9','22','2012-12-30','10');
INSERT INTO 'accion' VALUES ('23','Revisión y concialiación de la demanda','1','18','2012-12-29','40');
INSERT INTO 'accion' VALUES ('25','Rvisión de las conciliaciones decenal, mensual y trimestral con la EAA','1','19','2012-12-29','40');
INSERT INTO 'accion' VALUES ('27','Revisión de los regímenes de explotación en los puntos de abasto','1','18','2012-12-30','40');
INSERT INTO 'accion' VALUES ('30','Asesoría técnica para la realización de la demanda','6','19','2012-09-28','10');
INSERT INTO 'accion' VALUES ('90','Cumplir con el ingreso planificado','1','18','2012-12-31','20');
INSERT INTO 'accion' VALUES ('18','Visitas a las empresas incumplidoras y análisis de los bajos cumplimientos en los consumos de agua','6','18','2012-12-29','10');


--
-- Creating index for 'accion'
--

ALTER TABLE ONLY  accion  ADD CONSTRAINT  "PK5_1"  PRIMARY KEY  (id_accion);
--
-- Estrutura de la tabla area--

DROP TABLE 'area' CASCADE;
CREATE TABLE 'area' (
id_area int4 NOT NULL DEFAULT nextval('area_id_area_seq'::regclass),
nombre_area varchar(250) NOT NULL
);

--
-- Creating data for 'area'
--

INSERT INTO 'area' VALUES ('6','Logística');
INSERT INTO 'area' VALUES ('3','Dirección Técnica');
INSERT INTO 'area' VALUES ('4','Contabilidad y Finanzas');
INSERT INTO 'area' VALUES ('1','Dirección General');
INSERT INTO 'area' VALUES ('5','Capital Humano');


--
-- Creating index for 'area'
--

ALTER TABLE ONLY  area  ADD CONSTRAINT  "PK1_1"  PRIMARY KEY  (id_area);
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
INSERT INTO 'cargo' VALUES ('15','Director de Logística');
INSERT INTO 'cargo' VALUES ('16','Especialista B en Ahorro y Uso Racional de Energía');
INSERT INTO 'cargo' VALUES ('17','Especialista A de Transporte Automotor');
INSERT INTO 'cargo' VALUES ('18','Especialista Comercial UEB');
INSERT INTO 'cargo' VALUES ('19','Especialista Técnica UEB');
INSERT INTO 'cargo' VALUES ('3','Especialista Dirección Técnica');
INSERT INTO 'cargo' VALUES ('20','Director UEB ');
INSERT INTO 'cargo' VALUES ('22','Comprador');


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
-- Estrutura de la tabla dat_mes_accion--

DROP TABLE 'dat_mes_accion' CASCADE;
CREATE TABLE 'dat_mes_accion' (
id_mes int4 NOT NULL,
valor_accion_mes varchar(200) NOT NULL,
id_accion int4 NOT NULL
);

--
-- Creating data for 'dat_mes_accion'
--



--
-- Creating index for 'dat_mes_accion'
--

ALTER TABLE ONLY  dat_mes_accion  ADD CONSTRAINT  "PK15"  PRIMARY KEY  (id_mes, id_accion);
--
-- Estrutura de la tabla documentos--

DROP TABLE 'documentos' CASCADE;
CREATE TABLE 'documentos' (
id_documento int4 NOT NULL DEFAULT nextval('documentos_id_documento_seq'::regclass),
url_documento varchar(200) NOT NULL,
nombre_documento varchar(250),
descripcion_documento varchar(250)
);

--
-- Creating data for 'documentos'
--



--
-- Creating index for 'documentos'
--

ALTER TABLE ONLY  documentos  ADD CONSTRAINT  "PK44"  PRIMARY KEY  (id_documento);
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

INSERT INTO 'indicador' VALUES ('14','Cartera de clientes','200','100','Cartera de clientes','6','11','2','gestion','3');
INSERT INTO 'indicador' VALUES ('13','Clientes satisfechos','200','135','Clientes satisfechos','6','11','2','gestion','3');
INSERT INTO 'indicador' VALUES ('12','Ingresos en CUC','7600','7605.7','Ingresos en CUC','1','11','2','gestion','3');
INSERT INTO 'indicador' VALUES ('27','Disponibilidad técnica','47','47','Disponibilidad técnica','9','7','2','gestion','17');
INSERT INTO 'indicador' VALUES ('26','Relación de mantenimiento','47','47','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('11','Ciclo de cobros','0.50','30','Ciclo de cobros','1','9','5','gestion','12');
INSERT INTO 'indicador' VALUES ('25','Estaciones de bombeo certificadas','6','6','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('24','Redes certificadas','4','4','Canales certificados','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('10','Relación gasto/ingreso','0.50','0.50','Relación gasto/ingreso','1','7','5','gestion','12');
INSERT INTO 'indicador' VALUES ('23','Canales Certificados','39','39','Canales certificados','9','17','2','gestion','3');
INSERT INTO 'indicador' VALUES ('22','Presas certificadas','20','20','Presas certificadas','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('9','Salario Medio / Productividad','0.9','0.92','asdasd','4','13','2','gestion','3');
INSERT INTO 'indicador' VALUES ('20','Obras hidrométicas','5','4','Obras hidrometricas','9','7','2','gestion','3');
INSERT INTO 'indicador' VALUES ('8','Productividad (P)  ','12','12','a','5','13','2','gestion','19');
INSERT INTO 'indicador' VALUES ('19','Balance de Agua','508410','508.410','Balance de agua','8','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('18','Limitación de los embalses','25','25','Limitación de los embalses','9','1','2','gestion','3');
INSERT INTO 'indicador' VALUES ('7','Valor Agregado (VA) ','1','1','A','5','8','5','gestion','19');
INSERT INTO 'indicador' VALUES ('17','Estado de cuencas subterráneas','50','47','Estado de cuencas subterráneas','8','11','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('16','Llenado de los embalses','95','100','Rendimiento del agua','7','11','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('6','Prevención Hidrológica (PH)','50','50','AA','4','1','2','Informativo','19');
INSERT INTO 'indicador' VALUES ('15','Rendimiento del agua','95','100','Rendimiento del agua','7','11','2','gestion','3');
INSERT INTO 'indicador' VALUES ('4','Alerta Temprana (SAT) ','0','1','Cumplir con sus obligaciones','1','11','1','gestion','2');
INSERT INTO 'indicador' VALUES ('3','Garantía de Agua para Cultivos Estratégicos (GCE) ','222','3333','Disminución del presupuesto de alimentación','6','11','2','Informativo','3');
INSERT INTO 'indicador' VALUES ('5','Automatización de Aliviaderos (AA) ','12312','233','a','4','11','2','gestion','3');
INSERT INTO 'indicador' VALUES ('2','Garantía Abasto a la Población (GAP) ','234','234','-','1','1','2','Informativo','19');
INSERT INTO 'indicador' VALUES ('21','Pérdidas en canales','56778','56778','perdidas en canales','9','1','2','gestion','3');


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

INSERT INTO 'indicador_accion' VALUES ('18','61','45');
INSERT INTO 'indicador_accion' VALUES ('19','62','46');
INSERT INTO 'indicador_accion' VALUES ('19','63','47');
INSERT INTO 'indicador_accion' VALUES ('19','64','48');
INSERT INTO 'indicador_accion' VALUES ('19','65','49');
INSERT INTO 'indicador_accion' VALUES ('20','66','50');
INSERT INTO 'indicador_accion' VALUES ('3','32','16');
INSERT INTO 'indicador_accion' VALUES ('4','19','3');
INSERT INTO 'indicador_accion' VALUES ('4','22','6');
INSERT INTO 'indicador_accion' VALUES ('5','24','8');
INSERT INTO 'indicador_accion' VALUES ('5','33','17');
INSERT INTO 'indicador_accion' VALUES ('6','34','18');
INSERT INTO 'indicador_accion' VALUES ('20','67','51');
INSERT INTO 'indicador_accion' VALUES ('7','36','20');
INSERT INTO 'indicador_accion' VALUES ('7','37','21');
INSERT INTO 'indicador_accion' VALUES ('8','38','22');
INSERT INTO 'indicador_accion' VALUES ('8','39','23');
INSERT INTO 'indicador_accion' VALUES ('8','40','24');
INSERT INTO 'indicador_accion' VALUES ('21','68','52');
INSERT INTO 'indicador_accion' VALUES ('9','43','27');
INSERT INTO 'indicador_accion' VALUES ('9','42','26');
INSERT INTO 'indicador_accion' VALUES ('9','41','25');
INSERT INTO 'indicador_accion' VALUES ('21','69','53');
INSERT INTO 'indicador_accion' VALUES ('10','29','13');
INSERT INTO 'indicador_accion' VALUES ('11','44','28');
INSERT INTO 'indicador_accion' VALUES ('12','45','29');
INSERT INTO 'indicador_accion' VALUES ('13','46','30');
INSERT INTO 'indicador_accion' VALUES ('13','47','31');
INSERT INTO 'indicador_accion' VALUES ('13','48','32');
INSERT INTO 'indicador_accion' VALUES ('13','49','33');
INSERT INTO 'indicador_accion' VALUES ('14','50','34');
INSERT INTO 'indicador_accion' VALUES ('14','51','35');
INSERT INTO 'indicador_accion' VALUES ('15','52','36');
INSERT INTO 'indicador_accion' VALUES ('15','53','37');
INSERT INTO 'indicador_accion' VALUES ('15','54','38');
INSERT INTO 'indicador_accion' VALUES ('16','55','39');
INSERT INTO 'indicador_accion' VALUES ('16','56','40');
INSERT INTO 'indicador_accion' VALUES ('17','57','41');
INSERT INTO 'indicador_accion' VALUES ('17','58','42');
INSERT INTO 'indicador_accion' VALUES ('17','59','43');
INSERT INTO 'indicador_accion' VALUES ('18','60','44');
INSERT INTO 'indicador_accion' VALUES ('21','70','54');
INSERT INTO 'indicador_accion' VALUES ('22','71','55');
INSERT INTO 'indicador_accion' VALUES ('22','72','56');
INSERT INTO 'indicador_accion' VALUES ('23','73','57');
INSERT INTO 'indicador_accion' VALUES ('23','74','58');
INSERT INTO 'indicador_accion' VALUES ('23','75','59');
INSERT INTO 'indicador_accion' VALUES ('24','76','60');
INSERT INTO 'indicador_accion' VALUES ('24','77','61');
INSERT INTO 'indicador_accion' VALUES ('24','78','62');
INSERT INTO 'indicador_accion' VALUES ('25','80','64');
INSERT INTO 'indicador_accion' VALUES ('25','81','65');
INSERT INTO 'indicador_accion' VALUES ('25','82','66');
INSERT INTO 'indicador_accion' VALUES ('26','83','67');
INSERT INTO 'indicador_accion' VALUES ('26','84','68');
INSERT INTO 'indicador_accion' VALUES ('26','85','69');
INSERT INTO 'indicador_accion' VALUES ('27','86','70');
INSERT INTO 'indicador_accion' VALUES ('27','87','71');
INSERT INTO 'indicador_accion' VALUES ('27','89','73');
INSERT INTO 'indicador_accion' VALUES ('27','88','72');
INSERT INTO 'indicador_accion' VALUES ('10','90','74');
INSERT INTO 'indicador_accion' VALUES ('2','23','7');
INSERT INTO 'indicador_accion' VALUES ('2','25','9');
INSERT INTO 'indicador_accion' VALUES ('2','27','11');
INSERT INTO 'indicador_accion' VALUES ('3','18','2');
INSERT INTO 'indicador_accion' VALUES ('3','30','14');


--
-- Creating index for 'indicador_accion'
--

ALTER TABLE ONLY  indicador_accion  ADD CONSTRAINT  "PK18"  PRIMARY KEY  (id_indicador, id_accion);
--
-- Estrutura de la tabla mitigacion--

DROP TABLE 'mitigacion' CASCADE;
CREATE TABLE 'mitigacion' (
id_mitigacion int4 NOT NULL DEFAULT nextval('mitigacion_id_mitigacion_seq'::regclass),
nombre_mitigacion varchar(200) NOT NULL,
fecha_cumplimiento_mitigacion date NOT NULL,
id_riesgo int4 NOT NULL,
estado varchar(100),
id_cargo_responsable int4 NOT NULL,
id_cargo_ejecutante int4 NOT NULL
);

--
-- Creating data for 'mitigacion'
--

INSERT INTO 'mitigacion' VALUES ('1','Probandp','2012-01-26','1','Incumplido','1','3');


--
-- Creating index for 'mitigacion'
--

ALTER TABLE ONLY  mitigacion  ADD CONSTRAINT  "PK23"  PRIMARY KEY  (id_mitigacion);
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
INSERT INTO 'objetivo_de_trabajo' VALUES ('7','5','Elevar el rendimiento productivo, regido por las normas de consumo.','2');
INSERT INTO 'objetivo_de_trabajo' VALUES ('8','6','Perfeccionar el proceso de balance de agua, que asegure la operación eficiente de la infraestructura, priorizando el control de los volúmenes entregados.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('9','7','Asegurar el mantenimiento sistemático a la infraestructura, que permita el estado técnico requerido y garantizar sus capacidades potenciales.  ','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('10','8','Perfeccionar el proceso de balance de agua, que asegure la operación eficiente de la infraestructura, priorizando el control de los volúmenes entregados.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('11','9','Priorizar el manejo de cuencas en tiempo real, en condiciones normales y excepcionales.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('12','10','Desarrollar la mecanización ajustada a las necesidades del servicio de provisión de agua, haciendo un uso eficiente de los recursos energéticos.','5');
INSERT INTO 'objetivo_de_trabajo' VALUES ('13','11','Alcanzar condiciones de trabajo que aseguren el compromiso de todos los trabajadores en el logro de la visión.','4');
INSERT INTO 'objetivo_de_trabajo' VALUES ('14','12','Desarrollar la informatización, la innovación y la gestión del conocimiento en función de alcanzar las competencias requeridas por la organización.','4');
INSERT INTO 'objetivo_de_trabajo' VALUES ('1','1','Asegurar de forma priorizada el agua demandada para el abasto humano y para la producción de alimentos de forma sostenible.','4');


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

INSERT INTO 'objetivo_estrategico' VALUES ('5','Asegurar la excelencia tecnológica y uso racional de la infraestructura hidráulica','2011-12-31','3');
INSERT INTO 'objetivo_estrategico' VALUES ('1','Alcanzar la condición de organización de alto reconocimiento social con resultado autofinanciado y solvencia económica','2012-12-31','1');
INSERT INTO 'objetivo_estrategico' VALUES ('4','Lograr las competencias y el compromiso de los trabajadores con la visión corporativa de la organización','2012-12-31','5');
INSERT INTO 'objetivo_estrategico' VALUES ('2','Asegurar el servicio de provisión de agua en el lugar, con la cantidad, calidad y oportunidad convenida.','2012-12-31','4');


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

INSERT INTO 'perspectiva' VALUES ('4','Clientes');
INSERT INTO 'perspectiva' VALUES ('5','Responsabilidad social');
INSERT INTO 'perspectiva' VALUES ('3','Procesos internos');
INSERT INTO 'perspectiva' VALUES ('1','Aprendizaje y crecimiento');


--
-- Creating index for 'perspectiva'
--

ALTER TABLE ONLY  perspectiva  ADD CONSTRAINT  "PK1"  PRIMARY KEY  (id_perspectiva);
--
-- Estrutura de la tabla plan--

DROP TABLE 'plan' CASCADE;
CREATE TABLE 'plan' (
id_plan int4 NOT NULL DEFAULT nextval('plan_id_plan_seq'::regclass),
id_indicador int4 NOT NULL,
id_mes int4 NOT NULL,
valor_plan_mes numeric
);

--
-- Creating data for 'plan'
--

INSERT INTO 'plan' VALUES ('35','4','9','100.00');
INSERT INTO 'plan' VALUES ('36','4','10','100.00');
INSERT INTO 'plan' VALUES ('37','4','11','100.00');
INSERT INTO 'plan' VALUES ('38','4','12','100.00');
INSERT INTO 'plan' VALUES ('48','5','10','100.00');
INSERT INTO 'plan' VALUES ('49','5','11','100.00');
INSERT INTO 'plan' VALUES ('50','5','12','100.00');
INSERT INTO 'plan' VALUES ('55','6','5','1.00');
INSERT INTO 'plan' VALUES ('56','6','6','1.00');
INSERT INTO 'plan' VALUES ('57','6','7','1.00');
INSERT INTO 'plan' VALUES ('58','6','8','1.00');
INSERT INTO 'plan' VALUES ('59','6','9','1.00');
INSERT INTO 'plan' VALUES ('60','6','10','1.00');
INSERT INTO 'plan' VALUES ('171','13','1','12.00');
INSERT INTO 'plan' VALUES ('172','13','2','12.00');
INSERT INTO 'plan' VALUES ('173','13','3','13.00');
INSERT INTO 'plan' VALUES ('174','13','4','12.00');
INSERT INTO 'plan' VALUES ('175','13','5','13.00');
INSERT INTO 'plan' VALUES ('176','13','6','12.00');
INSERT INTO 'plan' VALUES ('177','13','7','12.00');
INSERT INTO 'plan' VALUES ('178','13','8','13.00');
INSERT INTO 'plan' VALUES ('179','13','9','12.00');
INSERT INTO 'plan' VALUES ('180','13','10','12.00');
INSERT INTO 'plan' VALUES ('181','13','11','12.00');
INSERT INTO 'plan' VALUES ('182','13','12','0.00');
INSERT INTO 'plan' VALUES ('15','3','1','2.00');
INSERT INTO 'plan' VALUES ('16','3','2','2.00');
INSERT INTO 'plan' VALUES ('17','3','3','2.00');
INSERT INTO 'plan' VALUES ('18','3','4','1.00');
INSERT INTO 'plan' VALUES ('19','3','5','1.00');
INSERT INTO 'plan' VALUES ('20','3','6','1.00');
INSERT INTO 'plan' VALUES ('21','3','7','1.00');
INSERT INTO 'plan' VALUES ('22','3','8','1.00');
INSERT INTO 'plan' VALUES ('23','3','9','1.00');
INSERT INTO 'plan' VALUES ('24','3','10','2.00');
INSERT INTO 'plan' VALUES ('25','3','11','2.00');
INSERT INTO 'plan' VALUES ('26','3','12','2.00');
INSERT INTO 'plan' VALUES ('27','4','1','0.00');
INSERT INTO 'plan' VALUES ('28','4','2','0.00');
INSERT INTO 'plan' VALUES ('29','4','3','0.00');
INSERT INTO 'plan' VALUES ('30','4','4','0.00');
INSERT INTO 'plan' VALUES ('31','4','5','0.00');
INSERT INTO 'plan' VALUES ('32','4','6','0.00');
INSERT INTO 'plan' VALUES ('33','4','7','0.00');
INSERT INTO 'plan' VALUES ('34','4','8','0.00');
INSERT INTO 'plan' VALUES ('39','5','1','0.00');
INSERT INTO 'plan' VALUES ('40','5','2','0.00');
INSERT INTO 'plan' VALUES ('41','5','3','0.00');
INSERT INTO 'plan' VALUES ('42','5','4','0.00');
INSERT INTO 'plan' VALUES ('43','5','5','0.00');
INSERT INTO 'plan' VALUES ('44','5','6','0.00');
INSERT INTO 'plan' VALUES ('45','5','7','0.00');
INSERT INTO 'plan' VALUES ('46','5','8','0.00');
INSERT INTO 'plan' VALUES ('47','5','9','100.00');
INSERT INTO 'plan' VALUES ('51','6','1','0.00');
INSERT INTO 'plan' VALUES ('52','6','2','0.00');
INSERT INTO 'plan' VALUES ('53','6','3','0.00');
INSERT INTO 'plan' VALUES ('54','6','4','0.00');
INSERT INTO 'plan' VALUES ('61','6','11','0.00');
INSERT INTO 'plan' VALUES ('62','6','12','0.00');
INSERT INTO 'plan' VALUES ('63','7','1','826.10');
INSERT INTO 'plan' VALUES ('64','7','2','1296.80');
INSERT INTO 'plan' VALUES ('65','7','3','1954.30');
INSERT INTO 'plan' VALUES ('66','7','4','2465.50');
INSERT INTO 'plan' VALUES ('67','7','5','2997.10');
INSERT INTO 'plan' VALUES ('68','7','6','3882.50');
INSERT INTO 'plan' VALUES ('69','7','7','4141.00');
INSERT INTO 'plan' VALUES ('70','7','8','4900.10');
INSERT INTO 'plan' VALUES ('71','7','9','5726.70');
INSERT INTO 'plan' VALUES ('72','7','10','6619.00');
INSERT INTO 'plan' VALUES ('73','7','11','7486.30');
INSERT INTO 'plan' VALUES ('74','7','12','8412.30');
INSERT INTO 'plan' VALUES ('111','8','1','3227.00');
INSERT INTO 'plan' VALUES ('183','14','1','100.00');
INSERT INTO 'plan' VALUES ('3','2','1','5.22');
INSERT INTO 'plan' VALUES ('4','2','2','5.22');
INSERT INTO 'plan' VALUES ('5','2','3','5.22');
INSERT INTO 'plan' VALUES ('6','2','4','5.22');
INSERT INTO 'plan' VALUES ('7','2','5','5.22');
INSERT INTO 'plan' VALUES ('8','2','6','5.22');
INSERT INTO 'plan' VALUES ('9','2','7','5.22');
INSERT INTO 'plan' VALUES ('122','8','12','29311.00');
INSERT INTO 'plan' VALUES ('121','8','11','27223.00');
INSERT INTO 'plan' VALUES ('120','8','10','24245.00');
INSERT INTO 'plan' VALUES ('119','8','9','21054.00');
INSERT INTO 'plan' VALUES ('118','8','8','18149.00');
INSERT INTO 'plan' VALUES ('117','8','7','15394.00');
INSERT INTO 'plan' VALUES ('116','8','6','12994.00');
INSERT INTO 'plan' VALUES ('115','8','5','11267.00');
INSERT INTO 'plan' VALUES ('114','8','4','9339.00');
INSERT INTO 'plan' VALUES ('113','8','3','7488.00');
INSERT INTO 'plan' VALUES ('112','8','2','5046.00');
INSERT INTO 'plan' VALUES ('123','9','1','0.13');
INSERT INTO 'plan' VALUES ('124','9','2','0.09');
INSERT INTO 'plan' VALUES ('125','9','3','0.06');
INSERT INTO 'plan' VALUES ('126','9','4','0.05');
INSERT INTO 'plan' VALUES ('127','9','5','0.04');
INSERT INTO 'plan' VALUES ('128','9','6','0.04');
INSERT INTO 'plan' VALUES ('129','9','7','0.03');
INSERT INTO 'plan' VALUES ('130','9','8','0.03');
INSERT INTO 'plan' VALUES ('131','9','9','0.02');
INSERT INTO 'plan' VALUES ('132','9','10','0.02');
INSERT INTO 'plan' VALUES ('133','9','11','0.02');
INSERT INTO 'plan' VALUES ('134','9','12','0.02');
INSERT INTO 'plan' VALUES ('135','11','1','42.00');
INSERT INTO 'plan' VALUES ('136','11','2','42.00');
INSERT INTO 'plan' VALUES ('137','11','3','42.00');
INSERT INTO 'plan' VALUES ('138','11','4','42.00');
INSERT INTO 'plan' VALUES ('139','11','5','42.00');
INSERT INTO 'plan' VALUES ('140','11','6','42.00');
INSERT INTO 'plan' VALUES ('141','11','7','41.00');
INSERT INTO 'plan' VALUES ('142','11','8','37.00');
INSERT INTO 'plan' VALUES ('143','11','9','34.00');
INSERT INTO 'plan' VALUES ('144','11','10','32.00');
INSERT INTO 'plan' VALUES ('145','11','11','29.00');
INSERT INTO 'plan' VALUES ('146','11','12','42.00');
INSERT INTO 'plan' VALUES ('147','10','1','0.33');
INSERT INTO 'plan' VALUES ('148','10','2','0.51');
INSERT INTO 'plan' VALUES ('149','10','3','0.53');
INSERT INTO 'plan' VALUES ('150','10','4','0.57');
INSERT INTO 'plan' VALUES ('151','10','5','0.60');
INSERT INTO 'plan' VALUES ('152','10','6','0.62');
INSERT INTO 'plan' VALUES ('153','10','7','0.61');
INSERT INTO 'plan' VALUES ('154','10','8','0.59');
INSERT INTO 'plan' VALUES ('155','10','9','0.56');
INSERT INTO 'plan' VALUES ('156','10','10','0.54');
INSERT INTO 'plan' VALUES ('157','10','11','0.52');
INSERT INTO 'plan' VALUES ('158','10','12','0.51');
INSERT INTO 'plan' VALUES ('10','2','8','5.22');
INSERT INTO 'plan' VALUES ('11','2','9','5.22');
INSERT INTO 'plan' VALUES ('12','2','10','5.22');
INSERT INTO 'plan' VALUES ('13','2','11','5.22');
INSERT INTO 'plan' VALUES ('14','2','12','5.22');
INSERT INTO 'plan' VALUES ('159','12','1','630.20');
INSERT INTO 'plan' VALUES ('160','12','2','1221.60');
INSERT INTO 'plan' VALUES ('161','12','3','1853.70');
INSERT INTO 'plan' VALUES ('162','12','4','2472.40');
INSERT INTO 'plan' VALUES ('163','12','5','3111.10');
INSERT INTO 'plan' VALUES ('164','12','6','3729.50');
INSERT INTO 'plan' VALUES ('165','12','7','4363.80');
INSERT INTO 'plan' VALUES ('166','12','8','4998.00');
INSERT INTO 'plan' VALUES ('167','12','9','5612.30');
INSERT INTO 'plan' VALUES ('168','12','10','6284.10');
INSERT INTO 'plan' VALUES ('169','12','11','6934.00');
INSERT INTO 'plan' VALUES ('170','12','12','7605.70');
INSERT INTO 'plan' VALUES ('184','14','2','100.00');
INSERT INTO 'plan' VALUES ('185','14','3','100.00');
INSERT INTO 'plan' VALUES ('186','14','4','100.00');
INSERT INTO 'plan' VALUES ('187','14','5','100.00');
INSERT INTO 'plan' VALUES ('188','14','6','100.00');
INSERT INTO 'plan' VALUES ('189','14','7','100.00');
INSERT INTO 'plan' VALUES ('190','14','8','100.00');
INSERT INTO 'plan' VALUES ('191','14','9','100.00');
INSERT INTO 'plan' VALUES ('192','14','10','100.00');
INSERT INTO 'plan' VALUES ('193','14','11','100.00');
INSERT INTO 'plan' VALUES ('194','14','12','100.00');
INSERT INTO 'plan' VALUES ('195','15','1','0.00');
INSERT INTO 'plan' VALUES ('196','15','2','0.00');
INSERT INTO 'plan' VALUES ('197','15','3','100.00');
INSERT INTO 'plan' VALUES ('198','15','4','100.00');
INSERT INTO 'plan' VALUES ('199','15','5','100.00');
INSERT INTO 'plan' VALUES ('200','15','6','100.00');
INSERT INTO 'plan' VALUES ('201','15','7','100.00');
INSERT INTO 'plan' VALUES ('202','15','8','100.00');
INSERT INTO 'plan' VALUES ('203','15','9','100.00');
INSERT INTO 'plan' VALUES ('204','15','10','100.00');
INSERT INTO 'plan' VALUES ('205','15','11','100.00');
INSERT INTO 'plan' VALUES ('206','15','12','100.00');
INSERT INTO 'plan' VALUES ('207','16','1','83.51');
INSERT INTO 'plan' VALUES ('208','16','2','80.45');
INSERT INTO 'plan' VALUES ('209','16','3','77.39');
INSERT INTO 'plan' VALUES ('210','16','4','71.27');
INSERT INTO 'plan' VALUES ('211','16','5','70.53');
INSERT INTO 'plan' VALUES ('212','16','6','69.79');
INSERT INTO 'plan' VALUES ('213','16','7','68.31');
INSERT INTO 'plan' VALUES ('214','16','8','67.26');
INSERT INTO 'plan' VALUES ('215','16','9','66.21');
INSERT INTO 'plan' VALUES ('216','16','10','64.11');
INSERT INTO 'plan' VALUES ('217','16','11','65.79');
INSERT INTO 'plan' VALUES ('218','16','12','67.47');
INSERT INTO 'plan' VALUES ('219','17','1','47.00');
INSERT INTO 'plan' VALUES ('220','17','2','47.00');
INSERT INTO 'plan' VALUES ('221','17','3','47.00');
INSERT INTO 'plan' VALUES ('222','17','4','47.00');
INSERT INTO 'plan' VALUES ('223','17','5','47.00');
INSERT INTO 'plan' VALUES ('224','17','6','47.00');
INSERT INTO 'plan' VALUES ('225','17','7','47.00');
INSERT INTO 'plan' VALUES ('226','17','8','47.00');
INSERT INTO 'plan' VALUES ('227','17','9','47.00');
INSERT INTO 'plan' VALUES ('228','17','10','47.00');
INSERT INTO 'plan' VALUES ('229','17','11','47.00');
INSERT INTO 'plan' VALUES ('230','17','12','47.00');
INSERT INTO 'plan' VALUES ('231','18','1','0.00');
INSERT INTO 'plan' VALUES ('232','18','2','0.00');
INSERT INTO 'plan' VALUES ('233','18','3','0.00');
INSERT INTO 'plan' VALUES ('234','18','4','0.00');
INSERT INTO 'plan' VALUES ('235','18','5','25.00');
INSERT INTO 'plan' VALUES ('236','18','6','25.00');
INSERT INTO 'plan' VALUES ('237','18','7','25.00');
INSERT INTO 'plan' VALUES ('238','18','8','25.00');
INSERT INTO 'plan' VALUES ('239','18','9','25.00');
INSERT INTO 'plan' VALUES ('240','18','10','25.00');
INSERT INTO 'plan' VALUES ('241','18','11','0.00');
INSERT INTO 'plan' VALUES ('242','18','12','0.00');
INSERT INTO 'plan' VALUES ('243','19','1','46.82');
INSERT INTO 'plan' VALUES ('244','19','2','93.63');
INSERT INTO 'plan' VALUES ('245','19','3','140.45');
INSERT INTO 'plan' VALUES ('246','19','4','178.28');
INSERT INTO 'plan' VALUES ('247','19','5','216.12');
INSERT INTO 'plan' VALUES ('248','19','6','253.96');
INSERT INTO 'plan' VALUES ('249','19','7','294.13');
INSERT INTO 'plan' VALUES ('250','19','8','334.29');
INSERT INTO 'plan' VALUES ('251','19','9','374.46');
INSERT INTO 'plan' VALUES ('252','19','10','419.11');
INSERT INTO 'plan' VALUES ('253','19','11','463.76');
INSERT INTO 'plan' VALUES ('254','19','12','508.41');
INSERT INTO 'plan' VALUES ('255','20','1','1.00');
INSERT INTO 'plan' VALUES ('256','20','2','1.00');
INSERT INTO 'plan' VALUES ('257','20','3','1.00');
INSERT INTO 'plan' VALUES ('258','20','4','2.00');
INSERT INTO 'plan' VALUES ('259','20','5','2.00');
INSERT INTO 'plan' VALUES ('260','20','6','2.00');
INSERT INTO 'plan' VALUES ('261','20','7','2.00');
INSERT INTO 'plan' VALUES ('262','20','8','3.00');
INSERT INTO 'plan' VALUES ('263','20','9','3.00');
INSERT INTO 'plan' VALUES ('264','20','10','3.00');
INSERT INTO 'plan' VALUES ('265','20','11','4.00');
INSERT INTO 'plan' VALUES ('266','20','12','4.00');
INSERT INTO 'plan' VALUES ('267','21','1','4.95');
INSERT INTO 'plan' VALUES ('268','21','2','9.90');
INSERT INTO 'plan' VALUES ('269','21','3','14.85');
INSERT INTO 'plan' VALUES ('270','21','4','19.77');
INSERT INTO 'plan' VALUES ('271','21','5','24.66');
INSERT INTO 'plan' VALUES ('272','21','6','29.60');
INSERT INTO 'plan' VALUES ('273','21','7','34.23');
INSERT INTO 'plan' VALUES ('274','21','8','38.86');
INSERT INTO 'plan' VALUES ('275','21','9','43.49');
INSERT INTO 'plan' VALUES ('276','21','10','47.92');
INSERT INTO 'plan' VALUES ('277','21','11','52.35');
INSERT INTO 'plan' VALUES ('278','21','12','56.78');
INSERT INTO 'plan' VALUES ('279','22','1','20.00');
INSERT INTO 'plan' VALUES ('280','22','2','20.00');
INSERT INTO 'plan' VALUES ('281','22','3','20.00');
INSERT INTO 'plan' VALUES ('282','22','4','20.00');
INSERT INTO 'plan' VALUES ('283','22','5','20.00');
INSERT INTO 'plan' VALUES ('284','22','6','20.00');
INSERT INTO 'plan' VALUES ('285','22','7','20.00');
INSERT INTO 'plan' VALUES ('286','22','8','20.00');
INSERT INTO 'plan' VALUES ('287','22','9','20.00');
INSERT INTO 'plan' VALUES ('288','22','10','20.00');
INSERT INTO 'plan' VALUES ('289','22','11','20.00');
INSERT INTO 'plan' VALUES ('290','22','12','20.00');
INSERT INTO 'plan' VALUES ('291','23','1','39.00');
INSERT INTO 'plan' VALUES ('292','23','2','39.00');
INSERT INTO 'plan' VALUES ('293','23','3','39.00');
INSERT INTO 'plan' VALUES ('294','23','4','39.00');
INSERT INTO 'plan' VALUES ('295','23','5','39.00');
INSERT INTO 'plan' VALUES ('296','23','6','39.00');
INSERT INTO 'plan' VALUES ('297','23','7','39.00');
INSERT INTO 'plan' VALUES ('298','23','8','39.00');
INSERT INTO 'plan' VALUES ('299','23','9','39.00');
INSERT INTO 'plan' VALUES ('300','23','10','39.00');
INSERT INTO 'plan' VALUES ('301','23','11','39.00');
INSERT INTO 'plan' VALUES ('302','23','12','39.00');
INSERT INTO 'plan' VALUES ('303','24','1','4.00');
INSERT INTO 'plan' VALUES ('304','24','2','4.00');
INSERT INTO 'plan' VALUES ('305','24','3','4.00');
INSERT INTO 'plan' VALUES ('306','24','4','4.00');
INSERT INTO 'plan' VALUES ('307','24','5','4.00');
INSERT INTO 'plan' VALUES ('308','24','6','4.00');
INSERT INTO 'plan' VALUES ('309','24','7','4.00');
INSERT INTO 'plan' VALUES ('310','24','8','4.00');
INSERT INTO 'plan' VALUES ('311','24','9','4.00');
INSERT INTO 'plan' VALUES ('312','24','10','4.00');
INSERT INTO 'plan' VALUES ('313','24','11','4.00');
INSERT INTO 'plan' VALUES ('314','24','12','4.00');
INSERT INTO 'plan' VALUES ('315','25','1','6.00');
INSERT INTO 'plan' VALUES ('316','25','2','6.00');
INSERT INTO 'plan' VALUES ('317','25','3','6.00');
INSERT INTO 'plan' VALUES ('318','25','4','6.00');
INSERT INTO 'plan' VALUES ('319','25','5','6.00');
INSERT INTO 'plan' VALUES ('320','25','6','6.00');
INSERT INTO 'plan' VALUES ('321','25','7','6.00');
INSERT INTO 'plan' VALUES ('322','25','8','6.00');
INSERT INTO 'plan' VALUES ('323','25','9','6.00');
INSERT INTO 'plan' VALUES ('324','25','10','6.00');
INSERT INTO 'plan' VALUES ('325','25','11','6.00');
INSERT INTO 'plan' VALUES ('326','25','12','6.00');
INSERT INTO 'plan' VALUES ('327','26','1','71.00');
INSERT INTO 'plan' VALUES ('328','26','2','100.00');
INSERT INTO 'plan' VALUES ('329','26','3','100.00');
INSERT INTO 'plan' VALUES ('330','26','4','100.00');
INSERT INTO 'plan' VALUES ('331','26','5','59.00');
INSERT INTO 'plan' VALUES ('332','26','6','100.00');
INSERT INTO 'plan' VALUES ('333','26','7','23.00');
INSERT INTO 'plan' VALUES ('334','26','8','29.00');
INSERT INTO 'plan' VALUES ('335','26','9','21.00');
INSERT INTO 'plan' VALUES ('336','26','10','21.00');
INSERT INTO 'plan' VALUES ('337','26','11','100.00');
INSERT INTO 'plan' VALUES ('338','26','12','100.00');
INSERT INTO 'plan' VALUES ('339','27','1','75.00');
INSERT INTO 'plan' VALUES ('340','27','2','75.00');
INSERT INTO 'plan' VALUES ('341','27','3','75.00');
INSERT INTO 'plan' VALUES ('342','27','4','75.00');
INSERT INTO 'plan' VALUES ('343','27','5','75.00');
INSERT INTO 'plan' VALUES ('344','27','6','75.00');
INSERT INTO 'plan' VALUES ('345','27','7','75.00');
INSERT INTO 'plan' VALUES ('346','27','8','75.00');
INSERT INTO 'plan' VALUES ('347','27','9','75.00');
INSERT INTO 'plan' VALUES ('348','27','10','75.00');
INSERT INTO 'plan' VALUES ('349','27','11','75.00');
INSERT INTO 'plan' VALUES ('350','27','12','75.00');


--
-- Creating index for 'plan'
--

ALTER TABLE ONLY  plan  ADD CONSTRAINT  "PK24"  PRIMARY KEY  (id_plan, id_indicador);
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
INSERT INTO 'provincia' VALUES ('15','14','Santiago de Cuba');
INSERT INTO 'provincia' VALUES ('16','15','Guantanámo');


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

INSERT INTO 'provincia_indicador' VALUES ('6','3');


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
-- Estrutura de la tabla real--

DROP TABLE 'real' CASCADE;
CREATE TABLE 'real' (
id_real int4 NOT NULL DEFAULT nextval('real_id_real_seq'::regclass),
id_plan int4 NOT NULL,
id_indicador int4 NOT NULL,
valor_real numeric,
observacion varchar(250),
solucion varchar(250)
);

--
-- Creating data for 'real'
--

INSERT INTO 'real' VALUES ('7','16','3','0.00',NULL,NULL);
INSERT INTO 'real' VALUES ('14','63','7','827.20',NULL,NULL);
INSERT INTO 'real' VALUES ('15','111','8','3231.00',NULL,NULL);
INSERT INTO 'real' VALUES ('16','123','9','0.13',NULL,NULL);
INSERT INTO 'real' VALUES ('10','15','3','0.00',NULL,NULL);
INSERT INTO 'real' VALUES ('13','27','4','0.00',NULL,NULL);
INSERT INTO 'real' VALUES ('11','39','5','0.00',NULL,NULL);
INSERT INTO 'real' VALUES ('17','147','10','0.32',NULL,NULL);
INSERT INTO 'real' VALUES ('18','135','11','35.00',NULL,NULL);
INSERT INTO 'real' VALUES ('19','159','12','615.10','Se incumple por paralización de la producción del Cliente Che Guevara debido a ejecución de mantenimientos y averias de la planta de amoniaco',NULL);
INSERT INTO 'real' VALUES ('8','27','4','23.00',NULL,NULL);
INSERT INTO 'real' VALUES ('12','51','6','0.00',NULL,NULL);
INSERT INTO 'real' VALUES ('20','3','2','5.22',NULL,NULL);
INSERT INTO 'real' VALUES ('9','3','2','5.22',NULL,NULL);
INSERT INTO 'real' VALUES ('21','4','2','0.00',NULL,NULL);


--
-- Creating index for 'real'
--

ALTER TABLE ONLY  "real"  ADD CONSTRAINT  "PK25"  PRIMARY KEY  (id_real);
--
-- Estrutura de la tabla riesgo--

DROP TABLE 'riesgo' CASCADE;
CREATE TABLE 'riesgo' (
id_riesgo int4 NOT NULL DEFAULT nextval('riesgo_id_riesgo_seq'::regclass),
nombre_riesgo varchar(250) NOT NULL,
clasificacion varchar(200) NOT NULL,
id_indicador int4 NOT NULL,
ponderacion int4,
prob_ocurrencia varchar(150),
comprobacion varchar(250)
);

--
-- Creating data for 'riesgo'
--

INSERT INTO 'riesgo' VALUES ('1','Garantía de Agua para Cultivos Estratégicos (GCE) ','Menor','3','12','Muy alta','Economia');
INSERT INTO 'riesgo' VALUES ('4','Estado de los embalses','Mayor','4','5','Muy alta','Hidraulica');
INSERT INTO 'riesgo' VALUES ('5','Especialistas','Menor','4','2','Baja','Dirección técnica');


--
-- Creating index for 'riesgo'
--

ALTER TABLE ONLY  riesgo  ADD CONSTRAINT  "PK22"  PRIMARY KEY  (id_riesgo);
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

INSERT INTO 'ueb' VALUES ('3','3',' Nipe Mayarí');
INSERT INTO 'ueb' VALUES ('3','2','Norte Holguín');


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

INSERT INTO 'ueb_indicador' VALUES ('2','4');
INSERT INTO 'ueb_indicador' VALUES ('2','5');
INSERT INTO 'ueb_indicador' VALUES ('2','6');
INSERT INTO 'ueb_indicador' VALUES ('2','7');
INSERT INTO 'ueb_indicador' VALUES ('2','9');


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

INSERT INTO 'unidad_medida' VALUES ('7','U');
INSERT INTO 'unidad_medida' VALUES ('8','MP');
INSERT INTO 'unidad_medida' VALUES ('10','MCUC');
INSERT INTO 'unidad_medida' VALUES ('11','%');
INSERT INTO 'unidad_medida' VALUES ('14','Mwh');
INSERT INTO 'unidad_medida' VALUES ('16','ML/Mkm');
INSERT INTO 'unidad_medida' VALUES ('17','km');
INSERT INTO 'unidad_medida' VALUES ('1','hm³');
INSERT INTO 'unidad_medida' VALUES ('4','m³');
INSERT INTO 'unidad_medida' VALUES ('9','Días');
INSERT INTO 'unidad_medida' VALUES ('13','Pesos');
INSERT INTO 'unidad_medida' VALUES ('15','ML/Mm²');
INSERT INTO 'unidad_medida' VALUES ('12','Equipo/Km²');


--
-- Creating index for 'unidad_medida'
--

ALTER TABLE ONLY  unidad_medida  ADD CONSTRAINT  "PK5"  PRIMARY KEY  (id_unidad_medida);
--
-- Estrutura de la tabla usuario--

DROP TABLE 'usuario' CASCADE;
CREATE TABLE 'usuario' (
id_usuario int4 NOT NULL DEFAULT nextval('usuario_id_usuario_seq'::regclass),
contrasena varchar(100),
nombre_usuario varchar(200),
role varchar(100),
descripcion_usuario varchar(250),
estructura varchar(200)
);

--
-- Creating data for 'usuario'
--

INSERT INTO 'usuario' VALUES ('52','freddy','Freddy','administrador','Administrador Nacional','Nacional');
INSERT INTO 'usuario' VALUES ('53','Aid@2012','Aida','administrador','Administrador Nacional','Nacional');
INSERT INTO 'usuario' VALUES ('79','asdasd','Prov','responsable','Responsable Provincial','Provincial');
INSERT INTO 'usuario' VALUES ('80','asdasd','Ueb','responsable','Responsable Ueb','Ueb');
INSERT INTO 'usuario' VALUES ('81','guillermo','guillermo','administrador','Administrador Nacional','Nacional');


--
-- Creating index for 'usuario'
--

ALTER TABLE ONLY  usuario  ADD CONSTRAINT  "PK28"  PRIMARY KEY  (id_usuario);
--
-- Estrutura de la tabla usuario_indicador--

DROP TABLE 'usuario_indicador' CASCADE;
CREATE TABLE 'usuario_indicador' (
id_usuario int4 NOT NULL,
id_indicador int4 NOT NULL
);

--
-- Creating data for 'usuario_indicador'
--



--
-- Creating index for 'usuario_indicador'
--

ALTER TABLE ONLY  usuario_indicador  ADD CONSTRAINT  "PK29"  PRIMARY KEY  (id_usuario, id_indicador);
--
-- Estrutura de la tabla usuario_provincia--

DROP TABLE 'usuario_provincia' CASCADE;
CREATE TABLE 'usuario_provincia' (
id_usuario int2 NOT NULL,
id_provincia int4 NOT NULL
);

--
-- Creating data for 'usuario_provincia'
--

INSERT INTO 'usuario_provincia' VALUES ('79','3');


--
-- Creating index for 'usuario_provincia'
--

ALTER TABLE ONLY  usuario_provincia  ADD CONSTRAINT  "PK40"  PRIMARY KEY  (id_usuario, id_provincia);
--
-- Estrutura de la tabla usuario_ueb--

DROP TABLE 'usuario_ueb' CASCADE;
CREATE TABLE 'usuario_ueb' (
id_usuario int2 NOT NULL,
id_ueb int4 NOT NULL
);

--
-- Creating data for 'usuario_ueb'
--

INSERT INTO 'usuario_ueb' VALUES ('80','2');


--
-- Creating index for 'usuario_ueb'
--

ALTER TABLE ONLY  usuario_ueb  ADD CONSTRAINT  "PK41"  PRIMARY KEY  (id_usuario, id_ueb);


--
-- Creating relacionships for 'accion'
--

ALTER TABLE ONLY accion ADD CONSTRAINT Refcargo30 FOREIGN KEY (id_cargo_ejecutante) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'accion'
--

ALTER TABLE ONLY accion ADD CONSTRAINT Refobjetivo_de_trabajo16 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

--
-- Creating relacionships for 'dat_mes_accion'
--

ALTER TABLE ONLY dat_mes_accion ADD CONSTRAINT Refdat_mes14 FOREIGN KEY (id_mes) REFERENCES dat_mes(id_mes);

--
-- Creating relacionships for 'dat_mes_accion'
--

ALTER TABLE ONLY dat_mes_accion ADD CONSTRAINT Refaccion15 FOREIGN KEY (id_accion) REFERENCES accion(id_accion);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refunidad_medida4 FOREIGN KEY (id_unidad_medida) REFERENCES unidad_medida(id_unidad_medida);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refcargo31 FOREIGN KEY (id_cargo_responsable) REFERENCES cargo(id_cargo);

--
-- Creating relacionships for 'indicador'
--

ALTER TABLE ONLY indicador ADD CONSTRAINT Refobjetivo_de_trabajo3 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

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

ALTER TABLE ONLY mitigacion ADD CONSTRAINT Refriesgo25 FOREIGN KEY (id_riesgo) REFERENCES riesgo(id_riesgo);

--
-- Creating relacionships for 'mitigacion'
--

ALTER TABLE ONLY mitigacion ADD CONSTRAINT Refcargo33 FOREIGN KEY (id_cargo_responsable) REFERENCES cargo(id_cargo);

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

ALTER TABLE ONLY objetivo_de_trabajo_area ADD CONSTRAINT Refarea13 FOREIGN KEY (id_area) REFERENCES area(id_area);

--
-- Creating relacionships for 'objetivo_de_trabajo_area'
--

ALTER TABLE ONLY objetivo_de_trabajo_area ADD CONSTRAINT Refobjetivo_de_trabajo12 FOREIGN KEY (id_objetivo_trabajo) REFERENCES objetivo_de_trabajo(id_objetivo_trabajo);

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

ALTER TABLE ONLY provincia_indicador ADD CONSTRAINT Refprovincia60 FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia);

--
-- Creating relacionships for 'provincia_indicador'
--

ALTER TABLE ONLY provincia_indicador ADD CONSTRAINT Refindicador59 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

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

ALTER TABLE ONLY ueb_indicador ADD CONSTRAINT Refindicador50 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'ueb_indicador'
--

ALTER TABLE ONLY ueb_indicador ADD CONSTRAINT Refueb49 FOREIGN KEY (id_ueb) REFERENCES ueb(id_ueb);

--
-- Creating relacionships for 'usuario_indicador'
--

ALTER TABLE ONLY usuario_indicador ADD CONSTRAINT Refusuario38 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

--
-- Creating relacionships for 'usuario_indicador'
--

ALTER TABLE ONLY usuario_indicador ADD CONSTRAINT Refindicador39 FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador);

--
-- Creating relacionships for 'usuario_provincia'
--

ALTER TABLE ONLY usuario_provincia ADD CONSTRAINT Refprovincia68 FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia);

--
-- Creating relacionships for 'usuario_provincia'
--

ALTER TABLE ONLY usuario_provincia ADD CONSTRAINT Refusuario67 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

--
-- Creating relacionships for 'usuario_ueb'
--

ALTER TABLE ONLY usuario_ueb ADD CONSTRAINT Refueb70 FOREIGN KEY (id_ueb) REFERENCES ueb(id_ueb);

--
-- Creating relacionships for 'usuario_ueb'
--

ALTER TABLE ONLY usuario_ueb ADD CONSTRAINT Refusuario69 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);