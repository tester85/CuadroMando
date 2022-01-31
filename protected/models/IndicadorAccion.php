<?php

/**
 * This is the model class for table "indicador_accion".
 *
 * The followings are the available columns in table 'indicador_accion':
 * @property integer $id_indicador
 * @property integer $id_accion
 * @property integer $id_indicador_accion
 *
 * The followings are the available model relations:
 */
class IndicadorAccion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return IndicadorAccion the static model class
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
		return 'indicador_accion';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_indicador, id_accion', 'required'),
			array('id_indicador, id_accion', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_indicador, id_accion, id_indicador_accion', 'safe', 'on'=>'search'),
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
			'id_accion' => 'Id Accion',
			'id_indicador_accion' => 'Id Indicador Accion',
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
		$criteria->compare('id_accion',$this->id_accion);
		$criteria->compare('id_indicador_accion',$this->id_indicador_accion);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}