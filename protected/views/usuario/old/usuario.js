
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
Ext.onReady(function()
{ 
var ctEl;
var panel;
var sm;
var rec;
var plan;
var winAddAsociar;
var winMod;
var aux;

var btnadicionar= new Ext.Button({
       disabled:false,
	   id:'btnadicionar', 
	   //iconCls:'btn', 
	   text:'Adicionar', 
	   width: 30,
	handler:function(){winFpGestionar('Add');} 
	});
	
var btnmodificar= new Ext.Button({
	   disabled:true,
   id:'btnmodificar', 
   //iconCls:'btn', 
   text:'Modificar', 
   width: 30,
handler:function(){winFpGestionar('Mod');} 	   
});
 
var btneliminar= new Ext.Button({
	   disabled:true,
   id:'btneliminar', 
   //iconCls:'btn', 
   text:'Eliminar', 
   width: 30,
handler:function(){Eliminar();} 	   
});
 

//variable que captura el record seleccionado    
  var recordSeleccionado=0;	

  sm = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClick
    }    
  });
 // Evento Selection Model grid rowselect 
  function On_RowClick(sm, indiceFila, record){
    rec = record;
    recordSeleccionado=rec;
    return recordSeleccionado;
  };//fin de la función On_RowClick	
 
     
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record ){ 
	btnmodificar.enable(); 
	btneliminar.enable();  
}, this); 
             
//declaración del store del grid  
 
 
 	
   var store =new Ext.data.JsonStore({  
    url: '?r=Usuario/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'id_usuario',   
    fields:['id_usuario','nombre_usuario','role','contrasena','descripcion_usuario','id_provincia','id_ueb','nombre_ueb','nombre_provincia','no_provincia','estructura'] 
  });  
    store.load(); 
//**********************************  
//declaración del columnModel del grid

	var cm = new Ext.grid.ColumnModel([ 
	{id:'nombre_usuario',header: 'Usuario',  width:30,sortable: true,  dataIndex: 'nombre_usuario'}, 
	{id:'descripcion_usuario',header: 'Rol',  width:20,sortable: true,  dataIndex: 'descripcion_usuario'},
	{id:'estructura',header: 'Zona',  width:20,sortable: true,  dataIndex: 'estructura'},
	  ]); 
  
	
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid', 
		tbar:[btnadicionar,btnmodificar,btneliminar],
		//title:'Usuarios', 
        loadMask:{store:store},
        frame:true,
		 cm: cm,
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 400,
        width: 880,   
       // width:440,
		bbar:new Ext.PagingToolbar({
					  pageSize: 20,
					  store: store,					 
					  displayInfo: true,
					  displayMsg: 'Mostrar {0} - {1} de {2}',
					  emptyMsg: "No hay elementos que mostrar",
					  width:400
					  })
    });

	Ext.apply(Ext.form.VTypes,{
		//aqui vamos a definer las validaciones necesarias
		pass:function(val,field)
			{			
				var match = false;
				var pass1 = Ext.getCmp('contrasena').getValue();
				var pass2 = Ext.getCmp('contrasena_2').getValue();
				if(pass2 === pass1)
				{
					match = true;
					}
			//	else match = false;
				return match;				 
		},
		passText:'Las contrase&ntilde;as no coinciden',
		});
		
		/*	Ext.apply(Ext.form.VTypes,{
		//aqui vamos a definer las validaciones necesarias
		fortaleza:function(val,field)
			{			
				var match = false;
				  var exp_R = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'/;
				var pass = Ext.getCmp('contrasena').getValue(); 
				if(exp_R.test(pass))
				{
					alert("a-a-");
					match = true;
				}
			//	else match = false;
				return match;				 
		},
		fortalezaText:'La contrase&ntilde;a es muy debil',
		});*/
  storeProvincia =new Ext.data.JsonStore({
    url: '?r=Ueb/Provincias', 
    root: 'datos', 
    fields:['id_provincia','nombre_provincia'] 
  });   
  storeProvincia.load();
 
 var combo_provincia = new Ext.form.ComboBox({ 
   id:'combo_provincia',
	//name:'combo_provincia',
	displayField:'nombre_provincia',
	valueField:'id_provincia',
	hidden:true,
	width:150,
	forceSelect:true, 		
	mode:'local',
	emptyText:'   -- Seleccionar --', 
	loadingText:'buscando...',					
	store:storeProvincia,					
	triggerAction: 'all',
	editable:false
	}); 
  /*
	recarga el store del combo_ueb con un arreglo de Ueb's de la provincia seleccionada
  */
  function BuscarUeb()
  { 
  
  Ext.Ajax.request({
   url : '?r=Usuario/BuscarUebProvincia', 
     params:{ 
			id_provincia:Ext.getCmp('combo_provincia_ueb').getValue(),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				if(c.responseText != '')
				{ 
				var dd = c.responseText; 
				var Data = Ext.decode(dd);	//extraigo la información 
				storeUeb.loadData(Data);
				Ext.getCmp('combo_ueb').enable();				
				} 
				else 				
				{
				Ext.Msg.show({
				title:'Informaci&oacute;n de error',
				msg: 'La provincia no tiene Uebs asociadas',  
				buttons: Ext.Msg.OK,
				animEl: 'elId',
				icon: Ext.MessageBox.ERROR  
					}); 
				Ext.getCmp('combo_ueb').reset();
				Ext.getCmp('combo_ueb').disable();								
				}
			}
			
		}//fin del callback		
    })//fin del Ajax.request  
  }
  storeUeb =new Ext.data.JsonStore({ 
    root: 'datos', 
	idProperty: 'id_ueb',
    fields:['id_ueb','nombre_ueb','id_provincia'] 
  }); 
  var combo_provincia_ueb = new Ext.form.ComboBox({ 
   id:'combo_provincia_ueb',
	//name:'combo_provincia_ueb',
	displayField:'nombre_provincia',
	valueField:'id_provincia',
	hidden:true,
	width:150,
	forceSelect:true, 		
	mode:'local',
	emptyText:'   -- Provincia --', 
	loadingText:'buscando...',					
	store:storeProvincia,					
	triggerAction: 'all',
	editable:false,
	listeners:{
				'select':function(){
					BuscarUeb(); 
				} 
			} 
	});
	
	
   var combo_ueb = new Ext.form.ComboBox({ 
    id:'combo_ueb',
	//name:'combo_ueb',
	hidden:true,
	displayField:'nombre_ueb',
	valueField:'id_ueb',
	width:150,
	disabled:true,
	forceSelect:true,  					
	mode:'local',
	emptyText:'   -- Ueb --', 
	loadingText:'buscando...',					
	store:storeUeb,					
	triggerAction: 'all',
	editable:false
	});
  
 var store_indicadores =new Ext.data.JsonStore({
    url: '?r=Usuario/Indicadores',  
    root: 'datos', 
	idProperty: 'id_indicador',   
    fields:['id_indicador',	'nombre_indicador',	'id_cargo_responsable',	'nombre_cargo',
	'cierre_anno_anterior',	'clasificacion_gi',	'proyectado','descripcion','id_unidad_medida', 	'nombre_unidad_medida', 'nombre_objetivo_trabajo', 
	'numero_objetivo_trabajo', 'id_objetivo_trabajo','id_cargo_encargado'] 
  });   
    store_indicadores.load();
	
var sm_indicador = new Ext.grid.CheckboxSelectionModel({
        singleSelect: false,
        sortable: false,
        checkOnly: true
    });	
var indicador_grid = new Ext.grid.GridPanel({
		store: store_indicadores,       
		id:'indicador_grid', 
		hidden:true,
		title:'Indicadores',
		columns:[ sm_indicador,
		{id:'nombre_indicador',header: 'Indicador',  width:30,sortable: true,  dataIndex: 'nombre_indicador'},
		{id:'id_indicador',header: 'Indicador', hidden:true, width:30,sortable: true,  dataIndex: 'id_indicador'},
				],
		loadMask:{store:store},
		frame:true, 
		sm:sm_indicador,
		viewConfig: {
		forceFit: true
		},
		stripeRows: true,        
		height: 200,
		width: 490  
    });
	
	var fpAdicionarUsuario = new Ext.FormPanel({
	frame:true,
	autoHeight: true, 
	bodyStyle:'padding:5px 5px 0', msgTarget: 'side', 
	items: [  
			{             
				layout:'column',
				items:[{   
						columnWidth:.5,
						layout: 'form',
						labelWidth: 70,			               
						items: [  
							{ 
						xtype:'textfield',
						fieldLabel:'Usuario',
						name: 'nombre_usuario',
						id:'nombre_usuario',                         					
						allowBlank:false,
						maxLenght: 10,
						width:150,
						vtype:'alpha'
						},					
						{ 
						xtype:'textfield',
						fieldLabel:'Contrase&ntilde;a',
						name: 'contrasena',
						inputType:'password',
						id:'contrasena',  
						minLength: 6,  
						maxLenght: 18,                     					
						allowBlank:false, 
						width:150,
						//vtype:'fortaleza'
						},
						{ 
							xtype:'textfield',
							fieldLabel:'Repetir contrase&ntilde;a',
							name: 'contrasena_2',
							id:'contrasena_2',
							inputType:'password',
							minLength: 6,  
							maxLenght: 18,                           					
							allowBlank:false, 
							width:150,
							vtype: 'pass', 
							},
							{ 
							xtype:'combo',
							fieldLabel:'Rol',
							name: 'rol',
							id:'rol',                         					
							displayField:'role',
							valueField:'funcion',
							width: 150,
							minHeight:150, 
							allowBlank:false, 
							fieldLabel:'Permisos', 
								store:new Ext.data.ArrayStore
								({
									id: 'store_usuario',
									fields: ['Id', 'role','funcion'],
									data: [[1,'Responsable de área','responsable'],[2,'Administrador','administrador']]//,[3,'Funcionario']]
								}),		    
							mode: 'local',
							emptyText:'  -- Seleccionar --', 
							triggerAction: 'all',    	
							editable:false,
							listeners:{
									'select':function(){
										if(Ext.getCmp('rol').getValue() == 'responsable')
										{
											indicador_grid.setVisible(true);
										//	Ext.getCmp('Provincial').setValue(true);
										//	Ext.getCmp('combo_provincia').setVisible(true);
										}
										else if(Ext.getCmp('rol').getValue() != 'responsable') 
										{
											indicador_grid.getSelectionModel().clearSelections();
											indicador_grid.setVisible(false);
										}
									} 
								} 			
							},  
						]            
					}, 
					{	 
					columnWidth:.5,
					layout: 'form',  
					items:[{
					xtype: 'fieldset',
					title: 'Ubicaci&oacute;n',
					width:240,
					collapsed: false,
					labelWidth: 60,		
					collapsible: true, 
					items: [{
						xtype: 'radiogroup',
						fieldLabel: 'Seleccione',							
						columns: 1, 
						name:'clasificacion',
						id:'clasificacion',
						autoHeight: true,   
							items: [
								{inputValue: 'Nacional',id:'Nacional',boxLabel: 'Nacional', name: 'clasificacion'},
								{inputValue: 'Provincial',id:'Provincial',boxLabel: 'Provincial', name: 'clasificacion'},
								combo_provincia,
								{inputValue: 'Ueb',id:'Ueb',boxLabel: 'Base', name: 'clasificacion'},
								combo_provincia_ueb,
								combo_ueb,
									],
						listeners:{
			'change':function(){ 
					if(Ext.getCmp('clasificacion').isDirty())
					{
						if(Ext.getCmp('clasificacion').getValue().inputValue == 'Ueb')
						{
								Ext.getCmp('combo_provincia_ueb').setVisible(true);
								Ext.getCmp('combo_ueb').setVisible(true);
								Ext.getCmp('combo_provincia_ueb').setVisible(true);
								Ext.getCmp('combo_provincia').setVisible(false);
								Ext.getCmp('combo_provincia').reset();
						}
						else if(Ext.getCmp('clasificacion').getValue().inputValue == 'Provincial')
						{
								Ext.getCmp('combo_provincia_ueb').setVisible(false);
								Ext.getCmp('combo_ueb').setVisible(false);
								Ext.getCmp('combo_provincia').setVisible(true); 
								Ext.getCmp('combo_provincia_ueb').reset();
								Ext.getCmp('combo_ueb').reset();
								Ext.getCmp('combo_ueb').disable();
						} 
						else if(Ext.getCmp('clasificacion').getValue().inputValue == 'Nacional')
						{
								Ext.getCmp('combo_provincia').setVisible(false);
								Ext.getCmp('combo_ueb').setVisible(false);
								Ext.getCmp('combo_provincia_ueb').setVisible(false);
								Ext.getCmp('combo_provincia').reset();
								Ext.getCmp('combo_provincia_ueb').reset();
								Ext.getCmp('combo_ueb').reset();
								Ext.getCmp('combo_ueb').disable();
								Ext.getCmp('rol').setValue('administrador');
								indicador_grid.getSelectionModel().clearSelections();
								indicador_grid.setVisible(false); 
						}
					}// fin condicion if
				} // fin evento change
						}, // fin listeners
						}] // fin items columna
					}] // fin items 
					}] 					
			},// fin seccion ubicacion
			{
				layout:'column', 
				items:[ {
					columnWidth:1,
					layout:'form',
					labelWidth: 70,
					items:[  
						indicador_grid
						]
					}]				
			},
			 
		]
	});
 
// ============================================= functions

function CrearUsuario(estructura)
{  
		var selectedKeys = [];
		sm_indicador.each(function(rec){
			selectedKeys.push(rec.get('id_indicador'));
		});  
		Ext.Ajax.request({
		url : '?r=Usuario/Create', 
			params: {  		
					nombre_usuario:Ext.getCmp('nombre_usuario').getValue(),					
					contrasena:Ext.getCmp('contrasena_2').getValue(), 
					role:Ext.getCmp('rol').getValue(), 
					indicadores:Ext.encode(selectedKeys), 
				 	Ueb:Ext.getCmp('combo_ueb').getValue(),
					provincia:Ext.getCmp('combo_provincia').getValue(),  
					ubicacion:estructura
				},
		callback: function(a,b,c)
		{
			if(b)
			{
				var dd = c.responseText;
				var jsonData = Ext.decode(dd);//extraigo la información
				if(jsonData==true)
				{				                 
				  Ext.Msg.show({
				   title:'Informaci&oacute;n',
				   msg: 'Se agreg&oacute; correctamente el ' + Ext.getCmp('rol').getValue(), // usuario',
				   buttons: Ext.Msg.OK,
				   //fn: processResult,
				   animEl: 'elId',
				   icon: Ext.MessageBox.INFO  
				  }); 
				Ext.getCmp('combo_provincia_ueb').setVisible(false);
				Ext.getCmp('combo_ueb').setVisible(false); 
				Ext.getCmp('combo_provincia').setVisible(false); 
				winAddAsociar.hide();
				 // store.reload();
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 

}
function ModificarUsuario(estructura)
{  
		var selectedKeys = [];
		sm_indicador.each(function(rec){
			selectedKeys.push(rec.get('id_indicador'));
		}); 
		
		Ext.Ajax.request({
		url : '?r=Usuario/Update', 
			params: {  		
					nombre_usuario:Ext.getCmp('nombre_usuario').getValue(),					
					contrasena:Ext.getCmp('contrasena_2').getValue(), 
					role:Ext.getCmp('rol').getValue(), 
					indicadores:Ext.encode(selectedKeys), 
				 	Ueb:Ext.getCmp('combo_ueb').getValue(),
					provincia:Ext.getCmp('combo_provincia').getValue(),  
					ubicacion:estructura,
					id_usuario:recordSeleccionado.get('id_usuario')
				},
		callback: function(a,b,c)
		{
			if(b)
			{
				var dd = c.responseText;
				var jsonData = Ext.decode(dd);//extraigo la información
				if(jsonData==true)
				{				                 
				  Ext.Msg.show({
				   title:'Informaci&oacute;n',
				   msg: 'Se modific&oacute; correctamente el ' + Ext.getCmp('rol').getValue(), // usuario',
				   buttons: Ext.Msg.OK,
				   //fn: processResult,
				   animEl: 'elId',
				   icon: Ext.MessageBox.INFO  
				  }); 
				Ext.getCmp('combo_provincia_ueb').setVisible(false);
				Ext.getCmp('combo_ueb').setVisible(false); 
				Ext.getCmp('combo_provincia').setVisible(false); 
				store.reload();
				winMod.hide();
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 

}
 

function Eliminar()
{
	Ext.MessageBox.confirm('Informaci&oacute;n de confirmaci&oacute;n', '&#191;Seguro que deseas eliminar?', function (btn){      
			if (btn == "yes")
			{ 
			     /*==============================================*/ 
				 Ext.Ajax.request(
					{ 
					url : '?r=Usuario/Delete',
					params:{        		
						id_usuario:recordSeleccionado.get('id_usuario'),
						no_provincia:recordSeleccionado.get('no_provincia'),
						provincia:recordSeleccionado.get('id_provincia'),
						Ueb:recordSeleccionado.get('id_ueb')
					},
					callback:function(a,b,c)
						{
						   if(b)
							{
							   var dd=c.responseText; 									   
							   var jsonData = Ext.decode(dd);
							   if(jsonData==true)
								{ 						
									 Ext.Msg.show({
									   title:'Informaci&oacute;n',
									   msg: 'Se elimin&oacute; correctamente el usuario',
									   buttons: Ext.Msg.OK, 
									   animEl: 'elId',
									   icon: Ext.MessageBox.INFO  
								  });
								store.reload();  
								
								}
							 } //fin del if        
						   }//fin de la función callback 
					}) 
			     /*==============================================*/ 
				Ext.getCmp("btneliminar").disable();
				Ext.getCmp('btnmodificar').disable(); 
			}//fin del if
		});
}	  

 var store_indicadores_mod =new Ext.data.JsonStore({  
	url: '?r=Usuario/IndicadoresAsociados', 
    root: 'datos', 
	idProperty: 'id_indicador',   
    fields:['id_indicador',	'nombre_indicador',	'id_cargo_responsable',	'nombre_cargo',
	'cierre_anno_anterior',	'clasificacion_gi',	'proyectado','descripcion','id_unidad_medida', 	'nombre_unidad_medida', 'nombre_objetivo_trabajo', 
	'numero_objetivo_trabajo', 'id_objetivo_trabajo','id_cargo_encargado']  
  });   

function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionarUsuario.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,
				closable:false,
				layout:'fit',
              title:'Adicionar usuario',width:550,autoHeight:true,
              buttons:
              [ {                  
				text:'Cancelar',
				handler:function(){
				winAddAsociar.hide();
				indicador_grid.getSelectionModel().clearSelections();
				indicador_grid.setVisible(false);
				Ext.getCmp('combo_provincia_ueb').setVisible(false);
				Ext.getCmp('combo_ueb').setVisible(false);
				Ext.getCmp('combo_ueb').disable();
				Ext.getCmp('combo_provincia').setVisible(false); 
				
                  }
                },{                   
                   text:'Aplicar',
                   handler:function() {
				    var selectedKeys = [];
					sm_indicador.each(function(rec){
						selectedKeys.push(rec.get('id_indicador'));
					});
			if(	!Ext.getCmp('nombre_usuario').getValue() ||	!Ext.getCmp('contrasena').getValue() || !Ext.getCmp('contrasena_2').getValue() || !Ext.getCmp('rol').getValue() || !Ext.getCmp('clasificacion').isDirty() )
				{   
				   Ext.Msg.show({
					   title:'Informaci&oacute;n de error',
					   msg: 'Campos vac&iacute;os o con valores incorrectos',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR  
				  }); 
				}
				else if(Ext.getCmp('contrasena').getValue() != Ext.getCmp('contrasena_2').getValue())
					{  
					   Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Las contrase&ntilde;as no coinciden, por favor ingrese los datos nuevamente',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  });
					  
					} 
				else if(Ext.getCmp('combo_provincia').isVisible())
					{
						if(!Ext.getCmp('combo_provincia').getValue())
						 Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una provincia',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  }); 
					}
				else if(Ext.getCmp('combo_ueb').isVisible())
					{
						if(!Ext.getCmp('combo_ueb').getValue())
						Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una Ueb',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  }); 
					}  
				else if(Ext.getCmp('rol').getValue() == 'responsable' && !selectedKeys[0]) 
					{
						 Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Debe seleccionar al menos un indicador relacionado al responsable de &aacuterea',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  }); 
					}
				  else	 
					adicionar(); 
				   //indicador_grid.getSelectionModel().clearSelections();
				}
              },
				{                   
                   text:'Aceptar',
                   handler:function() { 
				   
				   var selectedKeys = [];
						sm_indicador.each(function(rec){
							selectedKeys.push(rec.get('id_indicador'));
						});
						
						if(	!Ext.getCmp('nombre_usuario').getValue() ||	!Ext.getCmp('contrasena').getValue() || !Ext.getCmp('contrasena_2').getValue() || !Ext.getCmp('rol').getValue() || !Ext.getCmp('clasificacion').isDirty() 	)
				{   
				   Ext.Msg.show({
					   title:'Informaci&oacute;n de error',
					   msg: 'Campos vac&iacute;os o con valores incorrectos',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR  
				  }); 
				}
			 	else if(Ext.getCmp('contrasena').getValue() != Ext.getCmp('contrasena_2').getValue())
					{  
					   Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Las contrase&ntilde;as no coinciden, por favor ingrese los datos nuevamente',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  });
					  
					} 
				else if(Ext.getCmp('rol').getValue() == 'responsable' && !selectedKeys[0]) 
					{
						 Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Debe seleccionar al menos un indicador relacionado al responsable de &aacuterea',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  }); 
					} 
			 	else if(Ext.getCmp('combo_ueb').isVisible())
					{
						if(!Ext.getCmp('combo_ueb').getValue())
						Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una Ueb',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  }); 
						  else CrearUsuario(Ext.getCmp('clasificacion').getValue().inputValue);
					} 
				else if(Ext.getCmp('combo_provincia').isVisible())
					{
						if(!Ext.getCmp('combo_provincia').getValue())
						{
						 Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una provincia',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });  
						}
					  else CrearUsuario(Ext.getCmp('clasificacion').getValue().inputValue); 
					}					
				  else
				  {  
					CrearUsuario(Ext.getCmp('clasificacion').getValue().inputValue); 
					Ext.getCmp('combo_ueb').setVisible(false);
					Ext.getCmp('combo_ueb').disable();
					Ext.getCmp('combo_provincia').setVisible(false); 
										
					}
					store.reload();  
				}
		   }]
            });
          }//fin del if
          winAddAsociar.add(fpAdicionarUsuario);
          winAddAsociar.doLayout();
          winAddAsociar.show();	 
	  btnmodificar.disable();
	  btneliminar.disable(); 
	//	sm.clearSelections();
      };//fin del case
      break; 
       case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,closable:false,layout:'fit',
            title:'Modificar usuario',width:550,autoHeight:true,
			listeners:{
			show: function(){
				if(Ext.getCmp('grid').getSelectionModel().getSelected().get('role') == 'responsable')
				{
					indicador_grid.setVisible(true);
					store_indicadores_mod.load(
					{ 
						params:{        		
							id_usuario:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_usuario'),
							estructura:Ext.getCmp('grid').getSelectionModel().getSelected().get('estructura'),
						},
					callback: function(a,b,c){
						if(b)
						{
							//Cargando en el grid los items que ya tiene el store	
							items_marcar =  new Array();
							items_asociados = store_indicadores_mod.getRange(); 
							for (var k=0; k < items_asociados.length; k++)
							 {				 
								index_record = indicador_grid.getStore().find('id_indicador',items_asociados[k].get('id_indicador'));																
								items_marcar[k] = index_record;
							 }
							indicador_grid.getSelectionModel().selectRows(items_marcar);
						}	
					}});
				}
				Ext.getCmp('nombre_usuario').setValue(recordSeleccionado.get('nombre_usuario'));
				Ext.getCmp('contrasena').setValue(recordSeleccionado.get('contrasena'));
				Ext.getCmp('contrasena_2').setValue(recordSeleccionado.get('contrasena')); 
				Ext.getCmp('rol').setValue(recordSeleccionado.get('role'));
				
				if(Ext.getCmp('grid').getSelectionModel().getSelected().get('nombre_provincia'))
				{
				Ext.getCmp('Provincial').setValue(true);
				Ext.getCmp('combo_provincia').setValue(Ext.getCmp('grid').getSelectionModel().getSelected().get('id_provincia'));
				}
				else if(Ext.getCmp('grid').getSelectionModel().getSelected().get('id_ueb'))
				{
				Ext.getCmp('Ueb').setValue(true);
				Ext.getCmp('combo_provincia_ueb').setValue(Ext.getCmp('grid').getSelectionModel().getSelected().get('id_provincia'));				
				BuscarUeb(); 
				Ext.getCmp('combo_ueb').setValue(Ext.getCmp('grid').getSelectionModel().getSelected().get('id_ueb')); 
								
				}
				else 
					Ext.getCmp('Nacional').setValue(true);
				},
		hide: function(){
			indicador_grid.getSelectionModel().clearSelections();
			}
		},
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable(); 
				  btneliminar.disable(); 				  
				  sm.clearSelections();
				  indicador_grid.getSelectionModel().clearSelections();
				  indicador_grid.setVisible(false);
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){ 
				   var selectedKeys = [];
						sm_indicador.each(function(rec){
							selectedKeys.push(rec.get('id_indicador'));
						});
						
						if(	!Ext.getCmp('nombre_usuario').getValue() ||	!Ext.getCmp('contrasena').getValue() || !Ext.getCmp('contrasena_2').getValue() || !Ext.getCmp('rol').getValue() || !Ext.getCmp('clasificacion').isDirty() 	)
				{   
				   Ext.Msg.show({
					   title:'Informaci&oacute;n de error',
					   msg: 'Campos vac&iacute;os o con valores incorrectos',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR  
				  }); 
				}
			 	else if(Ext.getCmp('contrasena').getValue() != Ext.getCmp('contrasena_2').getValue())
					{  
					   Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Las contrase&ntilde;as no coinciden, por favor ingrese los datos nuevamente',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  });
					  
					} 
				else if(Ext.getCmp('rol').getValue() == 'responsable' && !selectedKeys[0]) 
					{
						 Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Debe seleccionar al menos un indicador relacionado al responsable de &aacuterea',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR  
					  }); 
					} 
			 	else if(Ext.getCmp('combo_ueb').isVisible())
					{
						if(!Ext.getCmp('combo_ueb').getValue())
						Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una Ueb',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  }); 
						  else ModificarUsuario(Ext.getCmp('clasificacion').getValue().inputValue);
					} 
				else if(Ext.getCmp('combo_provincia').isVisible())
					{
						if(!Ext.getCmp('combo_provincia').getValue())
						{
						 Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Debe seleccionar una provincia',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });  
						}
					  else ModificarUsuario(Ext.getCmp('clasificacion').getValue().inputValue); 
					}					
				  else
				  {  
					ModificarUsuario(Ext.getCmp('clasificacion').getValue().inputValue); 
					Ext.getCmp('combo_ueb').setVisible(false);
					Ext.getCmp('combo_ueb').disable();
					Ext.getCmp('combo_provincia').setVisible(false);  
					} 
				}
           }]
        });
       }//fin del if
        fpAdicionarUsuario.getForm().reset();	  
        winMod.add(fpAdicionarUsuario); 
        winMod.doLayout();
        winMod.show(); 
		btnmodificar.disable(); 
		btneliminar.disable(); 
      }//fin del case
      break; 
    }//fin del switch
  };

   
//******************************
 
		var panel = new Ext.FormPanel({
			width: 904,
			height:460,
			frame:true,	
			applyTo: 'usuario',
			border:true,
			title: 'Gestionar usuario',
			bodyStyle:'padding:5px 5px 0',			
			items: [grid]       					
		});
	
  

});
