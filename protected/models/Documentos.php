<?php

/**
 * This is the model class for table "documentos".
 *
 * The followings are the available columns in table 'documentos':
 * @property integer $id_documento
 * @property string $url_documento
 * @property string $nombre_documento
 * @property string $descripcion_documento
 *
 * The followings are the available model relations:
 */
class Documentos extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Documentos the static model class
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
		return 'documentos';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('url_documento', 'required'),
			array('url_documento', 'length', 'max'=>200),
			array('nombre_documento, descripcion_documento', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_documento, url_documento, nombre_documento, descripcion_documento', 'safe', 'on'=>'search'),
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
			'id_documento' => 'Id Documento',
			'url_documento' => 'Url Documento',
			'nombre_documento' => 'Nombre Documento',
			'descripcion_documento' => 'Descripcion Documento',
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

		$criteria->compare('id_documento',$this->id_documento);
		$criteria->compare('url_documento',$this->url_documento,true);
		$criteria->compare('nombre_documento',$this->nombre_documento,true);
		$criteria->compare('descripcion_documento',$this->descripcion_documento,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}