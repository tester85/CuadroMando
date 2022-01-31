<?php

/**
 * This is the model class for table "objetivo_de_trabajo_area".
 *
 * The followings are the available columns in table 'objetivo_de_trabajo_area':
 * @property integer $id_objetivo_trabajo
 * @property integer $id_area
 *
 * The followings are the available model relations:
 */
class ObjetivoDeTrabajoArea extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return ObjetivoDeTrabajoArea the static model class
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
		return 'objetivo_de_trabajo_area';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_objetivo_trabajo, id_area', 'required'),
			array('id_objetivo_trabajo, id_area', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_objetivo_trabajo, id_area', 'safe', 'on'=>'search'),
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
			'id_objetivo_trabajo' => 'Id Objetivo Trabajo',
			'id_area' => 'Id Area',
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
		$criteria->compare('id_area',$this->id_area);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}