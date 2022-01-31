<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{ 
		$query =  "SELECT * FROM usuario WHERE nombre_usuario='".$this->username."' 
					 AND salt = '".md5($this->password)."'";
					
	 //	 echo $this->username."--";print_r($this->password);echo"-->".md5($this->password);
	//	echo"<br>";print_r(md5($this->password));echo"<br>"; 
		
		$users = Yii::app()->db->createCommand($query)->queryAll(); 
		 
		if(count($users)===1)
		{
		//--------------------------------------------------------------
		// variables session para los permisos por usuarios
		//----------------------------------------------------------
			Yii::app()->session['id_usuario'] = $users[0]['id_usuario'];
			Yii::app()->session['role'] = $users[0]['role'];   //administrador -- responsable  
		//---------------------------------------------------------------	
			$users[$this->username] = md5($this->password);			
		}
		 
		
		if(!isset($users[$this->username])) 
			 $this->errorCode=self::ERROR_USERNAME_INVALID;
		else if($users[$this->username]!== md5($this->password))			  
			$this->errorCode=self::ERROR_PASSWORD_INVALID; 
		else
			$this->errorCode=self::ERROR_NONE;
		return !$this->errorCode;
	}
}
