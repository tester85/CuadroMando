<?php

/**
 * This is the model class for table "provincia_indicador".
 *
 * The followings are the available columns in table 'provincia_indicador':
 * @property integer $id_indicador
 * @property integer $id_provincia
 *
 * The followings are the available model relations:
 */
class ProvinciaIndicador extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return ProvinciaIndicador the static model class
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
		return 'provincia_indicador';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_indicador, id_provincia', 'required'),
			array('id_indicador, id_provincia', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_indicador, id_provincia', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_indicador' => 'Id Indicador',
			'id_provincia' => 'Id Provincia',
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
		$criteria->compare('id_provincia',$this->id_provincia);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}