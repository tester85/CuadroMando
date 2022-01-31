<?php

/**
 * This is the model class for table "perspectiva".
 *
 * The followings are the available columns in table 'perspectiva':
 * @property integer $id_perspectiva
 * @property string $nombre_perspectiva
 *
 * The followings are the available model relations:
 * @property ObjetivoEstrategico[] $objetivoEstrategicos
 */
class Perspectiva extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Perspectiva the static model class
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
		return 'perspectiva';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_perspectiva', 'required'),
			array('nombre_perspectiva', 'length', 'max'=>200),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_perspectiva, nombre_perspectiva', 'safe', 'on'=>'search'),
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
			'objetivoEstrategicos' => array(self::HAS_MANY, 'ObjetivoEstrategico', 'id_perspectiva'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_perspectiva' => 'Id Perspectiva',
			'nombre_perspectiva' => 'Nombre Perspectiva',
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

		$criteria->compare('id_perspectiva',$this->id_perspectiva);
		$criteria->compare('nombre_perspectiva',$this->nombre_perspectiva,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}