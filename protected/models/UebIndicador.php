<?php

/**
 * This is the model class for table "ueb_indicador".
 *
 * The followings are the available columns in table 'ueb_indicador':
 * @property integer $id_ueb
 * @property integer $id_indicador
 *
 * The followings are the available model relations:
 */
class UebIndicador extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return UebIndicador the static model class
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
		return 'ueb_indicador';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_ueb, id_indicador', 'required'),
			array('id_ueb, id_indicador', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_ueb, id_indicador', 'safe', 'on'=>'search'),
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
			'id_ueb' => 'Id Ueb',
			'id_indicador' => 'Id Indicador',
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

		$criteria->compare('id_ueb',$this->id_ueb);
		$criteria->compare('id_indicador',$this->id_indicador);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}