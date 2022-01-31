Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
Ext.onReady(function()
{
var ctEl;
var panel;
var sm_riesgo;
var sm_mitigacion;
var rec_riesgo;
var rec_mitigacion;
var winAdicionar; 
var winModificar;
var recordSeleccionado_riesgo;
var recordSeleccionado_mitigacion;
var registrado = true;

function TipoUsuario()
  {
	  Ext.Ajax.request({
		url : '?r=site/EsUsuario',  
		callback: function(a,b,c)
		{
			if(b)
			{
				if(c.responseText == 'false')
				{
					 btnadicionar.disable();
					 registrado = false;
					} 
			}
			
		}//fin del callback				
	})//fin del Ajax.request  
	  
  }
  
TipoUsuario();
var btnadicionar= new Ext.Button({
       disabled:true,
	   id:'btnadicionar', 
	   //iconCls:'btn', 
	   text:'Adicionar',  
	   handler:function(){winFpGestionar('Add');} 
	}); 
	
var btnmodificar= new Ext.Button({
   disabled:true,
	id:'btnmodificar', 
	//iconCls:'btn', 
	text:'Modificar',  
	handler:function(){winFpGestionar('Mod');} 	   
});

var btneliminar= new Ext.Button({
   disabled:true,
   id:'btneliminar', 
   //iconCls:'btn', 
   text:'Eliminar',  
   handler:function(){eliminar();} 
});

var btnBuscar = new Ext.Button({
	disabled:false,
	id:'btnConsultar',
	text:'Buscar',
	width:30,
	handler:function(){ 
				CargarDatosAsociadas(); 
				}	 	   
});

var store_Indicadores = new Ext.data.JsonStore({  
		 url: '?r=Accion/Indicadores',  
		 idProperty: 'id_indicador', 
		 fields: ['id_indicador','nombre_indicador','id_cargo_responsable','nombre_cargo','cierre_anno_anterior','proyectado']
}); 
	store_Indicadores.load();
	
 var combo_indicador_buscar = new Ext.form.ComboBox({
	id:'combo_indicador_buscar', 
	name:'combo_indicador_buscar',
	displayField: 'nombre_indicador',
	bodyStyle:'margin-left:7px;',
	valueField:'id_indicador',	
	width: 780,
	minHeight:200,
	allowBlank:false,
	forceSelect:true,  
	//fieldLabel:'Indicador', 
	store:store_Indicadores,    
	mode: 'local',
	emptyText:'           						     -- Escriba aqui para buscar un indicador --',
	loadingText:'buscando...', 
	triggerAction: 'all',
	//hideTrigger:true,
	enableKeyEvents:true,
	editable:true,
	typeAhead: true,  
	listWidth:870,
	 listeners:{
		'select':function(){
			btnadicionar.disable();
			store_riesgo.removeAll();
			store_mitigacion.removeAll();
			
		},
		'expand':function(){
			btnadicionar.disable();
			store_riesgo.removeAll();
			store_mitigacion.removeAll();
		} 
	} 
	}); 
var store_ejecutante =new Ext.data.JsonStore({
url: '?r=Accion/Ejecutante', 
idProperty: 'id_cargo',
fields: ['id_cargo','nombre_cargo']
});
store_ejecutante.load();
	// store, combo para almacenar
var combo_ejecutantes = new Ext.form.ComboBox({
	id:'combo_ejecutantes',
	name:'combo_ejecutantes',
    allowBlank:false,
	fieldLabel:'Ejecutante',	
    forceSelect:true,  
    store:store_ejecutante,
	displayField: 'nombre_cargo',
	valueField: 'id_cargo',
	typeAhead: true,
	mode: 'local',
    emptyText:'   -- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:345,		
	width: 350 
	});
var store_responsables =new Ext.data.JsonStore({
url: '?r=Indicador/Responsable', 
idProperty: 'id_cargo',
fields: ['id_cargo','nombre_cargo']
});
	store_responsables.load();
	
var combo_responsables = new Ext.form.ComboBox({
	id:'combo_responsables', 
    allowBlank:false,
	fieldLabel:'Responsable',	
    forceSelect:true,  
    store:store_responsables,
	displayField: 'nombre_cargo',
	valueField: 'id_cargo',
	//typeAhead: true,
	mode: 'local',
    emptyText:'   -- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:345,		
	width: 350 
	});
//================================= grid Principal Riesgo
var recordSeleccionado_riesgo=0;	 
  
  sm_riesgo = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClick
    }    
  });  
  function On_RowClick(sm_riesgo, indiceFila, record){
    rec_riesgo = record;
    recordSeleccionado_riesgo=rec_riesgo;
    return recordSeleccionado_riesgo;
  };//fin de la función On_RowClick	 
   
sm_riesgo.on('rowselect', function (smodel, rowIndex, keepExisting, record ){
	if(registrado)
	{
	btnadicionar.enable(); 	
	}
	CargarAccionesAsociadas();  
}, this);

 
function CargarDatosAsociadas()
{  
	Ext.Ajax.request({
    url: '?r=Mitigacion/Todos', 
     params:{ 
			id_indicador:Ext.getCmp('combo_indicador_buscar').getValue()
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText; 
				var Data = Ext.decode(dd);	//extraigo la información 
				store_riesgo.loadData(Data); 
				store_mitigacion.removeAll();
			}
			else 				
			{
				Ext.Msg.show({
				title:'Informaci&oacute;n de error',
				msg: 'El indicador no existe, rectifique sus datos',
				buttons: Ext.Msg.OK,
				animEl: 'elId',
				icon: Ext.MessageBox.ERROR  
					}); 
			}
		}//fin del callback		
    })//fin del Ajax.request
}

 // store grid riesgo
   var store_riesgo =new Ext.data.JsonStore({
  //  url: '?r=Riesgo/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_riesgo',
    fields: ['id_riesgo','nombre_indicador','responsable','cierre_anno_anterior','proyectado','descripcion','nombre_riesgo','clasificacion','ponderacion','prob_ocurrencia','comprobacion','id_indicador']
  });
   
 
	   
 //declaración del columnModel del grid
 var cm_riesgo = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[ 
            {id:'nombre_riesgo',header:'Riesgo', width:20,dataIndex: 'nombre_riesgo'},  
			]
   }); 
   
   var grid_riesgo = new Ext.grid.GridPanel({
		store: store_riesgo,
		title: 'Riesgos por indicador', 
		tbar:['','&nbsp;'],		
		id:'grid_riesgo',
		//margins:'2 2 2 -4',
		iconCls:'icon-grid', 
		frame:true,
		//autoExpandColumn:'nombre_riesgo',
		cm: cm_riesgo,
		sm:sm_riesgo, 
		viewConfig: {
		forceFit: true
		},
		stripeRows: true,        
		height: 400,
		// width: 880   
		width:227 
    });

//================================= 
//================================= grid Principal Mitigacion
 var recordSeleccionado_mitigacion=0;	 
  
  sm_mitigacion = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClick
    }    
  });  
  function On_RowClick(sm_mitigacion, indiceFila, record){
    rec_mitigacion = record;
    recordSeleccionado_mitigacion=rec_mitigacion;
    return recordSeleccionado_mitigacion;
  };//fin de la función On_RowClick	 
   
sm_mitigacion.on('rowselect', function (smodel, rowIndex, keepExisting, record ){
	if(registrado)
	{
	btneliminar.enable();
	btnmodificar.enable();
	}
	 
}, this);

function CargarAccionesAsociadas()
{
	Ext.Ajax.request(
			{ 
			url : '?r=Mitigacion/AccionesMitigar',
			params:{        		
				id_riesgo:Ext.getCmp('grid_riesgo').getSelectionModel().getSelected().get('id_riesgo')
			},
			callback:function(a,b,c)
				{
				   if(b)
					{
					   var dd=c.responseText; 										   
					   var jsonData = Ext.decode(dd); 
					   store_mitigacion.loadData(jsonData); 					   
					}
				}   
    })//fin del Ajax.request
}

// store grid mitigacion
   var store_mitigacion =new Ext.data.JsonStore({
 //   url: '?r=Riesgo/Todos', 
    root: 'datos', 
	idProperty: 'id_mitigacion',
    fields: ['id_mitigacion','id_cargo_responsable','nombre_mitigacion','fecha_cumplimiento_mitigacion','id_cargo_ejecutante','nombre_riesgo','clasificacion','id_riesgo','id_indicador','nombre_cargo','estado']
  }); 
   
	   
 //declaración del columnModel del grid
 var cm_mitigacion = new Ext.grid.ColumnModel([ 
            {id:'nombre_mitigacion',header:'Acción', width:20,dataIndex: 'nombre_mitigacion'},  
			{id:'nombre_cargo',header: 'Ejecutante',  width:30,  dataIndex: 'nombre_cargo'},
			{id:'estado',header: 'Estado',  width:10,  dataIndex: 'estado'},
			{id:'fecha_cumplimiento_mitigacion',header: 'Fecha de cumplimiento',  width:15,  dataIndex: 'fecha_cumplimiento_mitigacion',xtype: 'datecolumn', format: 'd-m-Y'}
   ]); 
   
   var grid_mitigacion = new Ext.grid.GridPanel({
		store: store_mitigacion,
		title:'Acciones para mitigar el riesgo',
		id:'grid_mitigacion',
		tbar:[btnadicionar,btnmodificar,btneliminar],
		//margins:'2 2 2 -4',
		iconCls:'icon-grid', 
		frame:true,
		autoExpandColumn:'nombre_riesgo',
		cm: cm_mitigacion,
		sm:sm_mitigacion, 
		viewConfig: {
		forceFit: true
		},
		stripeRows: true,        
		height: 400,
		// width: 880   
		width:650
    });
// ========================================== Forms y functions
  
var fpAdicionar = new Ext.FormPanel({
      //labelAlign: 'top',
        frame:true,
		id:'fpAdicionar',
		autoHeight:true,
        bodyStyle:'padding:5px 5px 0',        	
        items: [{   
                layout:'form',
				labelWidth: 80,
                items:[ 
					{
					columnWidth:.80,
					labelWidth: 30,	
					layout:'form',
					xtype:'textarea', 
					grow:true,
					growMax:150,
	                fieldLabel:'Acción',
	                name:'nombre_accion',
	                id:'nombre_accion',    
	                allowBlank:false,
	                width:350 
	                },
					{
					xtype: 'datefield',
					fieldLabel: 'Fecha de cumplimiento',
					name: 'fecha_cump',
					id: 'fecha_cump',  
					format:'d-m-Y',
					labelWidth:55,
					allowBlank:false,
					editable:false, 
					minValue:new Date(),
					emptyText:'Fecha', 
					width:180,
					}, 
					{
					xtype:'combo',
					id:'combo_estado', 
					name:'combo_estado',
					displayField:'estado',
					valueField:'estado',
					width: 350,
					minHeight:200,
					typeAhead: true,
					labelWidth: 60,	
					listWidth:340, 
					allowBlank:true, 
					fieldLabel:'Estado', 
						store:new Ext.data.ArrayStore
						({
							id: 'store_clasificacion',
							fields: ['myId', 'estado'],
							data: [[1,'Cumplido'],[2,'En fecha'],[3,'Incumplido']]
						}),		    
					mode: 'local',
					emptyText:'   -- Seleccionar --', 
					triggerAction: 'all',    	
					editable:false, 
					},
				    combo_responsables,
					combo_ejecutantes,
				]
			}],   
	});
	
function adicionar(){
   
	if(
	!Ext.getCmp('nombre_accion').getValue() ||
	!Ext.getCmp('fecha_cump').getValue() || 
	!Ext.getCmp('combo_responsables').getValue() || 
	!Ext.getCmp('combo_ejecutantes').getValue()  
	)
		{  
		   Ext.Msg.show({
			   title:'Informaci&oacute;n de error',
			   msg: 'Campos vacios o con valores incorrectos',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR  
		  });
		}
	  else		 
		Ext.Ajax.request({
		url : '?r=Mitigacion/Create', 
			params: {  		
					nombre_accion:Ext.getCmp('nombre_accion').getValue(), 
					fecha_cump:Ext.getCmp('fecha_cump').getValue(), 
					responsables:Ext.getCmp('combo_responsables').getValue(),
					ejecutantes:Ext.getCmp('combo_ejecutantes').getValue(),
					estado:Ext.getCmp('combo_estado').getValue(),
					id_riesgo:Ext.getCmp('grid_riesgo').getSelectionModel().getSelected().get('id_riesgo')
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
			   msg: 'Se agreg&oacute; correctamente la acci&oacute;n',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  });
				 CargarAccionesAsociadas(); 	
				sm_mitigacion.clearSelections(); 	
					
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	
  
  function modificar(){  
	if(
	!Ext.getCmp('nombre_accion').getValue() ||
	!Ext.getCmp('fecha_cump').getValue() || 
	!Ext.getCmp('combo_responsables').getValue() || 
	!Ext.getCmp('combo_ejecutantes').getValue() 
	)
		{  
		   Ext.Msg.show({
			   title:'Informaci&oacute;n de error',
			   msg: 'Campos vacios o con valores incorrectos',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR  
		  });
		}
	  else		 
		Ext.Ajax.request({
		url : '?r=Mitigacion/Update', 
			params: { 	
					nombre_accion:Ext.getCmp('nombre_accion').getValue(), 
					fecha_cump:Ext.getCmp('fecha_cump').getValue(), 
					responsables:Ext.getCmp('combo_responsables').getValue(),
					ejecutantes:Ext.getCmp('combo_ejecutantes').getValue(),
					estado:Ext.getCmp('combo_estado').getValue(),
					id_riesgo: Ext.getCmp('grid_riesgo').getSelectionModel().getSelected().get('id_riesgo'),
					id_mitigacion:Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('id_mitigacion')					
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
			   msg: 'Se modific&oacute; correctamente la acci&oacute;n',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  });
				 CargarAccionesAsociadas(); 	
				sm_mitigacion.clearSelections(); 	
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	
  
  function eliminar(){
        Ext.MessageBox.confirm('Informaci&oacute;n de confirmaci&oacute;n', '&#191;Seguro que deseas eliminar?', function (btn){      
			if (btn == "yes"){  
			    eliminarAjax();
				Ext.getCmp("btneliminar").disable();
				Ext.getCmp('btnmodificar').disable(); 
			}//fin del if
		});
	}; 
 

/** 
* eliminarAjax 
* Envía parámetros y recibe respuesta del servidor
*/ 
  function eliminarAjax()
	{
   		 Ext.Ajax.request(
			{ 
			url : '?r=Mitigacion/Delete',
			params:{        		
				id_mitigacion:Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('id_mitigacion'),
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
							   msg: 'Se elimin&oacute; correctamente la acci&oacute;n.',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
						    CargarAccionesAsociadas(); 	
							sm_mitigacion.clearSelections(); 
						}
					 } //fin del if        
			       }//fin de la función callback 
    })//fin del Ajax.request
  }//fin de la función eliminarAjax
  
// ========================================= Visualizador de paneles


function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAdicionar){
            winAdicionar = new Ext.Window({modal: true,
			 closable:false,
			autoHeight:true,
			layout:'fit',
              title:'Adicionar acciones para plan de mitigaci&oacute;n',width:490,autoHeight:true,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAdicionar.hide();
				  sm_mitigacion.clearSelections();
                  }
                },{                   
                   text:'Aplicar',
                    handler:function() {
				    adicionar(); 
                   } 
              },
				{                   
                   text:'Aceptar',
                   handler:function() {                      
                    adicionar();
					winAdicionar.hide();
                   } 
              }]
            });
          }//fin del if
		  Ext.getCmp('fpAdicionar').getForm().reset(); 
		  winAdicionar.add(fpAdicionar);
		  winAdicionar.doLayout();
		  winAdicionar.show();
		//  btnAsociarArea.disable(); 		  
		  btneliminar.disable();
		  btnmodificar.disable();
			//sm.clearSelections();--------------------------------
      };//fin del case
      break; 
        case 'Mod': {
        if(!winModificar){
          winModificar = new Ext.Window({modal: true,
		  closable:false,
		  autoHeight:true,
		  layout:'fit',
          title:'Modificar acciones para plan de mitigaci&oacute;n',width:490,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){ 
					winModificar.hide();
					sm_mitigacion.clearSelections();
					btnmodificar.disable();
					btneliminar.disable();
					Ext.getCmp('nombre_accion').setValue(); 
					Ext.getCmp('fecha_cump').setValue(); 
					Ext.getCmp('combo_responsables').setValue();
					Ext.getCmp('combo_ejecutantes').setValue();
					Ext.getCmp('combo_estado').setValue();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
                    modificar(); 
					winModificar.hide();
				}
           }]
        });
       }//fin del if 
		fpAdicionar.getForm().reset(); 
        winModificar.add(fpAdicionar); 
        winModificar.doLayout();
		Ext.getCmp('nombre_accion').setValue(Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('nombre_mitigacion')	); 
		Ext.getCmp('fecha_cump').setValue(Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('fecha_cumplimiento_mitigacion')	); 
		Ext.getCmp('combo_responsables').setValue(Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('id_cargo_responsable')	);
		Ext.getCmp('combo_ejecutantes').setValue(Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('id_cargo_ejecutante'));
		Ext.getCmp('combo_estado').setValue(Ext.getCmp('grid_mitigacion').getSelectionModel().getSelected().get('estado'));
		 	
        winModificar.show(); 
		btneliminar.disable();
		btnmodificar.disable(); 
      }//fin del case
      break; 
    }//fin del switch
  };  
  
  
//================================= 
		var panel = new Ext.FormPanel({
			width: 904,
			height:470,
			frame:true,	
			applyTo: 'mitigacion',
			border:true,
			title: 'Gestionar plan de mitigaci&oacute;n',
			bodyStyle:'padding:5px 5px 0',			
			 items:[{   
				layout:'column',
				items:[{   
						columnWidth:.9,
						layout: 'form',
						labelWidth: 1,			               
						items: [combo_indicador_buscar]
					},
					{
						columnWidth:.1,
						layout: 'form',
						labelWidth: 1,			               
						items:[btnBuscar]				
					},
					{                 
						columnWidth:.26,
						layout: 'column',		               
						items:[ 
							grid_riesgo
							]
						},
						{                 
						columnWidth:.74,
						layout: 'column',		               
						items:[ 
							grid_mitigacion
							]
						}]       
			}], 
		});
	
  

});
