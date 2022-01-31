<?php

/**
 * This is the model class for table "accion".
 *
 * The followings are the available columns in table 'accion':
 * @property integer $id_accion
 * @property string $nombre_accion
 * @property integer $id_objetivo_trabajo
 * @property integer $id_cargo_ejecutante
 * @property string $fecha_cump_accion
 * @property integer $avance
 *
 * The followings are the available model relations:
 * @property DatMes[] $datMes
 * @property Indicador[] $indicadors
 * @property ObjetivoDeTrabajo $idObjetivoTrabajo0
 * @property Cargo $idCargoEjecutante0
 */
class Accion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Accion the static model class
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
		return 'accion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_accion, id_objetivo_trabajo, id_cargo_ejecutante, fecha_cump_accion', 'required'),
			array('id_objetivo_trabajo, id_cargo_ejecutante, avance', 'numerical', 'integerOnly'=>true),
			array('nombre_accion', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_accion, nombre_accion, id_objetivo_trabajo, id_cargo_ejecutante, fecha_cump_accion, avance', 'safe', 'on'=>'search'),
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
			'datMes' => array(self::MANY_MANY, 'DatMes', 'dat_mes_accion(id_accion, id_mes)'),
			'indicadors' => array(self::MANY_MANY, 'Indicador', 'indicador_accion(id_accion, id_indicador)'),
			'idObjetivoTrabajo0' => array(self::BELONGS_TO, 'ObjetivoDeTrabajo', 'id_objetivo_trabajo'),
			'idCargoEjecutante0' => array(self::BELONGS_TO, 'Cargo', 'id_cargo_ejecutante'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_accion' => 'Id Accion',
			'nombre_accion' => 'Nombre Accion',
			'id_objetivo_trabajo' => 'Id Objetivo Trabajo',
			'id_cargo_ejecutante' => 'Id Cargo Ejecutante',
			'fecha_cump_accion' => 'Fecha Cump Accion',
			'avance' => 'Avance',
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

		$criteria->compare('id_accion',$this->id_accion);
		$criteria->compare('nombre_accion',$this->nombre_accion,true);
		$criteria->compare('id_objetivo_trabajo',$this->id_objetivo_trabajo);
		$criteria->compare('id_cargo_ejecutante',$this->id_cargo_ejecutante);
		$criteria->compare('fecha_cump_accion',$this->fecha_cump_accion,true);
		$criteria->compare('avance',$this->avance);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}