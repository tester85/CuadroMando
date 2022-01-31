<?php

/**
 * This is the model class for table "mitigacion".
 *
 * The followings are the available columns in table 'mitigacion':
 * @property integer $id_mitigacion
 * @property string $nombre_mitigacion
 * @property string $fecha_cumplimiento_mitigacion
 * @property integer $id_riesgo
 * @property string $estado
 * @property integer $id_cargo_responsable
 * @property integer $id_cargo_ejecutante
 *
 * The followings are the available model relations:
 * @property Riesgo $idRiesgo0
 * @property Cargo $idCargoResponsable0
 * @property Cargo $idCargoEjecutante0
 */
class Mitigacion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Mitigacion the static model class
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
		return 'mitigacion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_mitigacion, fecha_cumplimiento_mitigacion, id_riesgo, id_cargo_responsable, id_cargo_ejecutante', 'required'),
			array('id_riesgo, id_cargo_responsable, id_cargo_ejecutante', 'numerical', 'integerOnly'=>true),
			array('nombre_mitigacion', 'length', 'max'=>200),
			array('estado', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_mitigacion, nombre_mitigacion, fecha_cumplimiento_mitigacion, id_riesgo, estado, id_cargo_responsable, id_cargo_ejecutante', 'safe', 'on'=>'search'),
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
			'idRiesgo0' => array(self::BELONGS_TO, 'Riesgo', 'id_riesgo'),
			'idCargoResponsable0' => array(self::BELONGS_TO, 'Cargo', 'id_cargo_responsable'),
			'idCargoEjecutante0' => array(self::BELONGS_TO, 'Cargo', 'id_cargo_ejecutante'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_mitigacion' => 'Id Mitigacion',
			'nombre_mitigacion' => 'Nombre Mitigacion',
			'fecha_cumplimiento_mitigacion' => 'Fecha Cumplimiento Mitigacion',
			'id_riesgo' => 'Id Riesgo',
			'estado' => 'Estado',
			'id_cargo_responsable' => 'Id Cargo Responsable',
			'id_cargo_ejecutante' => 'Id Cargo Ejecutante',
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

		$criteria->compare('id_mitigacion',$this->id_mitigacion);
		$criteria->compare('nombre_mitigacion',$this->nombre_mitigacion,true);
		$criteria->compare('fecha_cumplimiento_mitigacion',$this->fecha_cumplimiento_mitigacion,true);
		$criteria->compare('id_riesgo',$this->id_riesgo);
		$criteria->compare('estado',$this->estado,true);
		$criteria->compare('id_cargo_responsable',$this->id_cargo_responsable);
		$criteria->compare('id_cargo_ejecutante',$this->id_cargo_ejecutante);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}