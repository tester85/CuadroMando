<?php

/**
 * This is the model class for table "indicador".
 *
 * The followings are the available columns in table 'indicador':
 * @property integer $id_indicador
 * @property string $nombre_indicador
 * @property string $cierre_anno_anterior
 * @property string $proyectado
 * @property string $descripcion
 * @property integer $id_objetivo_trabajo
 * @property integer $id_unidad_medida
 * @property integer $id_cargo_responsable
 * @property string $clasificacion_gi
 * @property integer $id_cargo_encargado
 *
 * The followings are the available model relations:
 * @property RangoCumplimiento[] $rangoCumplimientos
 * @property Riesgo[] $riesgos
 * @property Accion[] $accions
 * @property Plan[] $plans
 * @property ObjetivoDeTrabajo $idObjetivoTrabajo0
 * @property UnidadMedida $idUnidadMedida0
 * @property Cargo $idCargoResponsable0
 */
class Indicador extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Indicador the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'indicador';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_indicador, cierre_anno_anterior, proyectado, id_objetivo_trabajo, id_unidad_medida, id_cargo_responsable', 'required'),
			array('id_objetivo_trabajo, id_unidad_medida, id_cargo_responsable, id_cargo_encargado', 'numerical', 'integerOnly'=>true),
			array('nombre_indicador, descripcion', 'length', 'max'=>200),
			array('clasificacion_gi', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_indicador, nombre_indicador, cierre_anno_anterior, proyectado, descripcion, id_objetivo_trabajo, id_unidad_medida, id_cargo_responsable, clasificacion_gi, id_cargo_encargado', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'rangoCumplimientos' => array(self::HAS_MANY, 'RangoCumplimiento', 'id_indicador'),
			'riesgos' => array(self::HAS_MANY, 'Riesgo', 'id_indicador'),
			'accions' => array(self::MANY_MANY, 'Accion', 'indicador_accion(id_indicador, id_accion)'),
			'plans' => array(self::HAS_MANY, 'Plan', 'id_indicador'),
			'idObjetivoTrabajo0' => array(self::BELONGS_TO, 'ObjetivoDeTrabajo', 'id_objetivo_trabajo'),
			'idUnidadMedida0' => array(self::BELONGS_TO, 'UnidadMedida', 'id_unidad_medida'),
			'idCargoResponsable0' => array(self::BELONGS_TO, 'Cargo', 'id_cargo_responsable'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_indicador' => 'Id Indicador',
			'nombre_indicador' => 'Nombre Indicador',
			'cierre_anno_anterior' => 'Cierre Anno Anterior',
			'proyectado' => 'Proyectado',
			'descripcion' => 'Descripcion',
			'id_objetivo_trabajo' => 'Id Objetivo Trabajo',
			'id_unidad_medida' => 'Id Unidad Medida',
			'id_cargo_responsable' => 'Id Cargo Responsable',
			'clasificacion_gi' => 'Clasificacion Gi',
			'id_cargo_encargado' => 'Id Cargo Encargado',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id_indicador',$this->id_indicador);
		$criteria->compare('nombre_indicador',$this->nombre_indicador,true);
		$criteria->compare('cierre_anno_anterior',$this->cierre_anno_anterior,true);
		$criteria->compare('proyectado',$this->proyectado,true);
		$criteria->compare('descripcion',$this->descripcion,true);
		$criteria->compare('id_objetivo_trabajo',$this->id_objetivo_trabajo);
		$criteria->compare('id_unidad_medida',$this->id_unidad_medida);
		$criteria->compare('id_cargo_responsable',$this->id_cargo_responsable);
		$criteria->compare('clasificacion_gi',$this->clasificacion_gi,true);
		$criteria->compare('id_cargo_encargado',$this->id_cargo_encargado);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}