<?php

/**
 * This is the model class for table "plan".
 *
 * The followings are the available columns in table 'plan':
 * @property integer $id_plan
 * @property integer $id_indicador
 * @property integer $id_mes
 * @property string $valor_plan_mes
 *
 * The followings are the available model relations:
 * @property Real[] $reals
 * @property DatMes $idMes0
 * @property Indicador $idIndicador0
 */
class Plan extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Plan the static model class
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
		return 'plan';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_mes', 'required'),
			array('id_mes', 'numerical', 'integerOnly'=>true),
			array('valor_plan_mes', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_plan, id_indicador, id_mes, valor_plan_mes', 'safe', 'on'=>'search'),
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
			'reals' => array(self::HAS_MANY, 'Real', 'id_indicador'),
			'idMes0' => array(self::BELONGS_TO, 'DatMes', 'id_mes'),
			'idIndicador0' => array(self::BELONGS_TO, 'Indicador', 'id_indicador'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_plan' => 'Id Plan',
			'id_indicador' => 'Id Indicador',
			'id_mes' => 'Id Mes',
			'valor_plan_mes' => 'Valor Plan Mes',
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

		$criteria->compare('id_plan',$this->id_plan);
		$criteria->compare('id_indicador',$this->id_indicador);
		$criteria->compare('id_mes',$this->id_mes);
		$criteria->compare('valor_plan_mes',$this->valor_plan_mes,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}