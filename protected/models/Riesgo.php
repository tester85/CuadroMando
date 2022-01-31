<?php

/**
 * This is the model class for table "riesgo".
 *
 * The followings are the available columns in table 'riesgo':
 * @property integer $id_riesgo
 * @property string $nombre_riesgo
 * @property string $clasificacion
 * @property integer $id_indicador
 * @property integer $ponderacion
 * @property string $prob_ocurrencia
 * @property string $comprobacion
 *
 * The followings are the available model relations:
 * @property Indicador $idIndicador0
 * @property Mitigacion[] $mitigacions
 */
class Riesgo extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Riesgo the static model class
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
		return 'riesgo';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nombre_riesgo, clasificacion, id_indicador', 'required'),
			array('id_indicador, ponderacion', 'numerical', 'integerOnly'=>true),
			array('nombre_riesgo, comprobacion', 'length', 'max'=>250),
			array('clasificacion', 'length', 'max'=>200),
			array('prob_ocurrencia', 'length', 'max'=>150),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_riesgo, nombre_riesgo, clasificacion, id_indicador, ponderacion, prob_ocurrencia, comprobacion', 'safe', 'on'=>'search'),
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
			'idIndicador0' => array(self::BELONGS_TO, 'Indicador', 'id_indicador'),
			'mitigacions' => array(self::HAS_MANY, 'Mitigacion', 'id_riesgo'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_riesgo' => 'Id Riesgo',
			'nombre_riesgo' => 'Nombre Riesgo',
			'clasificacion' => 'Clasificacion',
			'id_indicador' => 'Id Indicador',
			'ponderacion' => 'Ponderacion',
			'prob_ocurrencia' => 'Prob Ocurrencia',
			'comprobacion' => 'Comprobacion',
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

		$criteria->compare('id_riesgo',$this->id_riesgo);
		$criteria->compare('nombre_riesgo',$this->nombre_riesgo,true);
		$criteria->compare('clasificacion',$this->clasificacion,true);
		$criteria->compare('id_indicador',$this->id_indicador);
		$criteria->compare('ponderacion',$this->ponderacion);
		$criteria->compare('prob_ocurrencia',$this->prob_ocurrencia,true);
		$criteria->compare('comprobacion',$this->comprobacion,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}