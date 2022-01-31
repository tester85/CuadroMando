<?php

/**
 * This is the model class for table "clasificacion".
 *
 * The followings are the available columns in table 'clasificacion':
 * @property integer $id_clasificacion
 * @property string $nombre_clasificacion
 *
 * The followings are the available model relations:
 * @property Indicador[] $indicadors
 */
class Clasificacion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Clasificacion the static model class
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
		return 'clasificacion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_clasificacion', 'length', 'max'=>200),
			array('nombre_clasificacion','unique'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_clasificacion, nombre_clasificacion', 'safe', 'on'=>'search'),
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
			'indicadors' => array(self::HAS_MANY, 'Indicador', 'id_clasificacion'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_clasificacion' => 'Id Clasificacion',
			'nombre_clasificacion' => 'Nombre Clasificacion',
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

		$criteria->compare('id_clasificacion',$this->id_clasificacion);
		$criteria->compare('nombre_clasificacion',$this->nombre_clasificacion,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}