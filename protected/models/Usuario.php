<?php

/**
 * This is the model class for table "usuario".
 *
 * The followings are the available columns in table 'usuario':
 * @property integer $id_usuario
 * @property string $descripcion_usuario
 * @property string $contrasena
 * @property string $nombre_usuario
 * @property string $role
 * @property string $salt
 *
 * The followings are the available model relations:
 * @property Indicador[] $indicadors
 */
class Usuario extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Usuario the static model class
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
		return 'usuario';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('descripcion_usuario, nombre_usuario', 'length', 'max'=>200),
			array('contrasena, role', 'length', 'max'=>100),
			array('salt', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id_usuario, descripcion_usuario, contrasena, nombre_usuario, role, salt', 'safe', 'on'=>'search'),
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
			'indicadors' => array(self::MANY_MANY, 'Indicador', 'usuario_indicador(id_usuario, id_indicador)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_usuario' => 'Id Usuario',
			'descripcion_usuario' => 'Descripcion Usuario',
			'contrasena' => 'Contrasena',
			'nombre_usuario' => 'Nombre Usuario',
			'role' => 'Role',
			'salt' => 'Salt',
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

		$criteria->compare('id_usuario',$this->id_usuario);
		$criteria->compare('descripcion_usuario',$this->descripcion_usuario,true);
		$criteria->compare('contrasena',$this->contrasena,true);
		$criteria->compare('nombre_usuario',$this->nombre_usuario,true);
		$criteria->compare('role',$this->role,true);
		$criteria->compare('salt',$this->salt,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
}