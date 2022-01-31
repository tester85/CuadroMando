<?php

/**
 * This is the model class for table "objetivo_estrategico".
 *
 * The followings are the available columns in table 'objetivo_estrategico':
 * @property integer $id_objetivo_estrategico
 * @property string $nombre_objetivo_est 
 * @property integer $id_perspectiva
 *
 * The followings are the available model relations:
 * @property Perspectiva $idPerspectiva0
 * @property ObjetivoDeTrabajo[] $objetivoDeTrabajos
 */
class ObjetivoEstrategico extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return ObjetivoEstrategico the static model class
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
		return 'objetivo_estrategico';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_objetivo_est, id_perspectiva', 'required'),
			array('id_perspectiva', 'numerical', 'integerOnly'=>true),
			array('nombre_objetivo_est', 'length', 'max'=>200), 
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_objetivo_estrategico, nombre_objetivo_est, id_perspectiva', 'safe', 'on'=>'search'),
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
			'idPerspectiva0' => array(self::BELONGS_TO, 'Perspectiva', 'id_perspectiva'),
			'objetivoDeTrabajos' => array(self::HAS_MANY, 'ObjetivoDeTrabajo', 'id_objetivo_estrategico'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_objetivo_estrategico' => 'Id Objetivo Estrategico',
			'nombre_objetivo_est' => 'Nombre Objetivo Est', 
			'id_perspectiva' => 'Id Perspectiva',
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

		$criteria->compare('id_objetivo_estrategico',$this->id_objetivo_estrategico);
		$criteria->compare('nombre_objetivo_est',$this->nombre_objetivo_est,true);
		$criteria->compare('fecha_cumplimiento',$this->fecha_cumplimiento,true);
		$criteria->compare('id_perspectiva',$this->id_perspectiva);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}