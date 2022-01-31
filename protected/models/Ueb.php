<?php

/**
 * This is the model class for table "ueb".
 *
 * The followings are the available columns in table 'ueb':
 * @property integer $id_provincia
 * @property integer $id_ueb
 * @property string $nombre_ueb
 *
 * The followings are the available model relations:
 * @property Provincia $idProvincia0
 * @property Indicador[] $indicadors
 */
class Ueb extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Ueb the static model class
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
		return 'ueb';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_provincia, nombre_ueb', 'required'),
			array('id_provincia', 'numerical', 'integerOnly'=>true),
			array('nombre_ueb', 'length', 'max'=>150),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_provincia, id_ueb, nombre_ueb', 'safe', 'on'=>'search'),
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
			'idProvincia0' => array(self::BELONGS_TO, 'Provincia', 'id_provincia'),
			'indicadors' => array(self::MANY_MANY, 'Indicador', 'ueb_indicador(id_ueb, id_indicador)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_provincia' => 'Id Provincia',
			'id_ueb' => 'Id Ueb',
			'nombre_ueb' => 'Nombre Ueb',
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

		$criteria->compare('id_provincia',$this->id_provincia);
		$criteria->compare('id_ueb',$this->id_ueb);
		$criteria->compare('nombre_ueb',$this->nombre_ueb,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}