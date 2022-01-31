<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/column1';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();
	
	/*protected function beforeAction(CAction $action)
	{
		if (Yii::app()->user->isGuest && $this->id !=='comportamientoPerspectivas')
		{
			//print_r($this->id);			
			Yii::app()->user->loginRequired();
			return false;
		} 
		return true;
	}*/

	protected function registerSencha()
	{  
		Yii::app()->clientScript->registerCssFile(Yii::app()->baseUrl.'/js/ext-3.1/resources/css/ext-all.css'); 
		
		Yii::app()->clientScript->registerCssFile(Yii::app()->baseUrl.'/js/ext-3.1/resources/css/fileuploadfield.css'); 
     //	Yii::app()->clientScript->registerCssFile(Yii::app()->baseUrl.'/js/ext-3.1/resources/css/xtheme-gray.css');
		 
		Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/ext-3.1/adapter/ext/ext-base.js');
		Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/ext-3.1/ext-all-debug.js');
		Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/ext-3.1/src/locale/ext-lang-es.js'); 
		Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/FileUploadField.js');
	}

	protected function importExtApp()
	{
		Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/ext-app/app.js');
		Yii::app()->clientScript->registerCssFile(Yii::app()->baseUrl.'/js/ext-app/css/main.css');
	}

	/*protected function jsVarExport(array $variables)
	{
		$code = '';
		foreach ($variables as $name => $value)
		{
			$encoded = CJavaScript::encode($value);
			$code .= "var $name = $encoded;\n";
		} 
		return $code;
	}

	protected function createAjaxResponse()
	{
		$response = new stdclass(); 
		$response->success = false;
		$response->data = null;
		$response->errors = array();
		$response->message = '';

		return $response;
	}*/
}
