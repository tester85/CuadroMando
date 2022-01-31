<?php

/**
 * This is the model class for table "rango_cumplimiento".
 *
 * The followings are the available columns in table 'rango_cumplimiento':
 * @property integer $id_indicador
 * @property integer $id_rango
 * @property string $categoria
 * @property string $valor_minimo
 * @property string $valor_maximo
 * @property string $comp_valor_min
 * @property string $comp_valor_max
 *
 * The followings are the available model relations:
 * @property Indicador $idIndicador0
 */
class Rango extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Rango the static model class
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
		return 'rango_cumplimiento';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_indicador', 'required'),
			array('id_indicador', 'numerical', 'integerOnly'=>true),
			array('categoria', 'length', 'max'=>200),
			array('valor_minimo, valor_maximo', 'length', 'max'=>50),
			array('comp_valor_min, comp_valor_max', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_indicador, id_rango, categoria, valor_minimo, valor_maximo, comp_valor_min, comp_valor_max', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_indicador' => 'Id Indicador',
			'id_rango' => 'Id Rango',
			'categoria' => 'Categoria',
			'valor_minimo' => 'Valor Minimo',
			'valor_maximo' => 'Valor Maximo',
			'comp_valor_min' => 'Comp Valor Min',
			'comp_valor_max' => 'Comp Valor Max',
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
		$criteria->compare('id_rango',$this->id_rango);
		$criteria->compare('categoria',$this->categoria,true);
		$criteria->compare('valor_minimo',$this->valor_minimo,true);
		$criteria->compare('valor_maximo',$this->valor_maximo,true);
		$criteria->compare('comp_valor_min',$this->comp_valor_min,true);
		$criteria->compare('comp_valor_max',$this->comp_valor_max,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}