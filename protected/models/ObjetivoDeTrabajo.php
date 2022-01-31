<?php

/**
 * This is the model class for table "objetivo_de_trabajo".
 *
 * The followings are the available columns in table 'objetivo_de_trabajo':
 * @property integer $id_objetivo_trabajo
 * @property integer $numero_objetivo_trabajo
 * @property string $nombre_objetivo_trabajo
 * @property integer $id_objetivo_estrategico
 *
 * The followings are the available model relations:
 * @property Indicador[] $indicadors
 * @property Accion[] $accions
 * @property ObjetivoEstrategico $idObjetivoEstrategico0
 * @property Area[] $areas
 */
class ObjetivoDeTrabajo extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return ObjetivoDeTrabajo the static model class
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
		return 'objetivo_de_trabajo';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('numero_objetivo_trabajo, nombre_objetivo_trabajo, id_objetivo_estrategico', 'required'),
			array('numero_objetivo_trabajo, id_objetivo_estrategico', 'numerical', 'integerOnly'=>true),
			array('nombre_objetivo_trabajo', 'length', 'max'=>200),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_objetivo_trabajo, numero_objetivo_trabajo, nombre_objetivo_trabajo, id_objetivo_estrategico', 'safe', 'on'=>'search'),
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
			'indicadors' => array(self::HAS_MANY, 'Indicador', 'id_objetivo_trabajo'),
			'accions' => array(self::HAS_MANY, 'Accion', 'id_objetivo_trabajo'),
			'idObjetivoEstrategico0' => array(self::BELONGS_TO, 'ObjetivoEstrategico', 'id_objetivo_estrategico'),
			'areas' => array(self::MANY_MANY, 'Area', 'objetivo_de_trabajo_area(id_objetivo_trabajo, id_area)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_objetivo_trabajo' => 'Id Objetivo Trabajo',
			'numero_objetivo_trabajo' => 'Numero Objetivo Trabajo',
			'nombre_objetivo_trabajo' => 'Nombre Objetivo Trabajo',
			'id_objetivo_estrategico' => 'Id Objetivo Estrategico',
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

		$criteria->compare('id_objetivo_trabajo',$this->id_objetivo_trabajo);
		$criteria->compare('numero_objetivo_trabajo',$this->numero_objetivo_trabajo);
		$criteria->compare('nombre_objetivo_trabajo',$this->nombre_objetivo_trabajo,true);
		$criteria->compare('id_objetivo_estrategico',$this->id_objetivo_estrategico);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}