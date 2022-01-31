<?php

/**
 * This is the model class for table "real".
 *
 * The followings are the available columns in table 'real':
 * @property integer $id_real
 * @property integer $id_plan
 * @property integer $id_indicador
 * @property string $valor_real
 * @property string $observacion
 * @property string $solucion
 *
 * The followings are the available model relations:
 * @property Plan $idPlan0
 * @property Plan $idIndicador0
 */
class Real extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Real the static model class
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
		return 'real';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_plan, id_indicador', 'required'),
			array('id_plan, id_indicador', 'numerical', 'integerOnly'=>true),
			array('valor_real', 'length', 'max'=>50),
			array('observacion, solucion', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_real, id_plan, id_indicador, valor_real, observacion, solucion', 'safe', 'on'=>'search'),
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
			'idPlan0' => array(self::BELONGS_TO, 'Plan', 'id_plan'),
			'idIndicador0' => array(self::BELONGS_TO, 'Plan', 'id_indicador'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_real' => 'Id Real',
			'id_plan' => 'Id Plan',
			'id_indicador' => 'Id Indicador',
			'valor_real' => 'Valor Real',
			'observacion' => 'Observacion',
			'solucion' => 'Solucion',
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

		$criteria->compare('id_real',$this->id_real);
		$criteria->compare('id_plan',$this->id_plan);
		$criteria->compare('id_indicador',$this->id_indicador);
		$criteria->compare('valor_real',$this->valor_real,true);
		$criteria->compare('observacion',$this->observacion,true);
		$criteria->compare('solucion',$this->solucion,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}