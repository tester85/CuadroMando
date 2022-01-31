 
Ext.QuickTips.init();
Ext.onReady(function()
{

var ctEl;
var panel;
var sm; 
var rec; 
var winMod;
var aux;
var recArea;
var recordAreaS; 
var winAddAsociar; 
var winModValues; 
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
				CargarAccionesAsociadas(); 
				CargarObjetivosAsociadas(); 
   }
	 	   
});

function CargarAccionesAsociadas()
{   
	Ext.Ajax.request({
    url: '?r=Accion/Todos', 
     params:{ 
			id_indicador:Ext.getCmp('combo_indicador_buscar').getValue()
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText; 
				var Data = Ext.decode(dd);	//extraigo la información 
				store.loadData(Data); 
				if(registrado)
				{
				btnadicionar.enable();
				}
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
function CargarObjetivosAsociadas()
{    
	Ext.Ajax.request({
    url: '?r=Accion/IndicadorObjetivo', 
     params:{ 
			id_indicador:Ext.getCmp('combo_indicador_buscar').getValue()
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText; 
				var Data = Ext.decode(dd);	//extraigo la información 
				store_Objetivo_trabajo.loadData(Data); 
			}
			 
		}//fin del callback		
    })//fin del Ajax.request
}
    
           
// Grid Pagina principal-------------------------------------------------------
//variable que captura el record seleccionado    

  var recordSeleccionado=0;	 
  
  sm = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClick
    }    
  });  
  function On_RowClick(sm, indiceFila, record){
    rec = record;
    recordSeleccionado=rec;
    return recordSeleccionado;
  };//fin de la función On_RowClick	 
   
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record ){
	if(registrado)
	{
		btneliminar.enable();
		btnmodificar.enable();  
	}
	 
}, this);
 var store_Indicadores =new Ext.data.JsonStore({
    url: '?r=Indicador/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_indicador',
    fields: ['id_indicador',
	'nombre_indicador',
	'id_cargo_responsable',
	'nombre_cargo',
	'cierre_anno_anterior',
	'clasificacion_gi',
	'proyectado',
	'descripcion',
	'id_unidad_medida',
	'nombre_unidad_medida', 
	'nombre_objetivo_trabajo',
	'numero_objetivo_trabajo',  
	'id_objetivo_trabajo',
	'id_cargo_encargado'
	]
  });      
/*  var store_Indicadores = new Ext.data.JsonStore({  
		 url: '?r=Indicador/Todos',  
		 idProperty: 'id_indicador', 
		 fields: ['id_indicador','nombre_indicador',
		 'id_cargo_responsable','nombre_cargo','cierre_anno_anterior','proyectado']
}); */
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
		},
		'expand':function(){
			btnadicionar.disable();
		} 
	}
	});
	
 // store grid
   var store =new Ext.data.JsonStore({ 
    root: 'datos', 
	idProperty: 'id_accion',
    fields: ['id_indicador','nombre_indicador','cierre_anno_anterior','proyectado','descripcion','nombre_objetivo_trabajo','numero_objetivo_trabajo','id_objetivo_trabajo','id_accion','id_cargo_ejecutante','nombre_cargo','nombre_accion','fecha_cump_accion','avance','id_indicador_accion']
  });  
	   
 //declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[ 
            {id:'nombre_accion',header:'Acción', width:30,dataIndex: 'nombre_accion'}, 
			{id:'nombre_cargo',header: 'Ejecutante',  width:25,  dataIndex: 'nombre_cargo'}, 
			{id:'nombre_indicador',header:'Indicador', width:20,dataIndex: 'nombre_indicador'},
			{id:'avance',header:'% Avance', width:10,dataIndex: 'avance',
			renderer: function(v, params, record){
				var val = record.data.avance;
				 return val + '%'; },
			}, 
			{ id: 'fecha_cump_accion',header: 'Fecha', width: 15, dataIndex:'fecha_cump_accion',xtype: 'datecolumn', format: 'd-m-Y'} 
			]
   }); 
   
   var grid = new Ext.grid.GridPanel({
		store: store,
		tbar:[btnadicionar,btnmodificar,btneliminar],
		id:'grid',
		title: 'Gestionar acci&oacute;n para el indicador', 
		frame:true,
		autoExpandColumn:'nombre_objetivo_trabajo',
		cm: cm,
		sm:sm, 
		viewConfig: {
		forceFit: true
		},
		stripeRows: true,        
		height: 370,
		width: 880   
    });
 //=========================================================================
 //  
 //=========================================================================
  
  
 var store_Objetivo_trabajo = new Ext.data.JsonStore({  
		// url: '?r=Accion/IndicadorObjetivo', 
	//	 storeId: 'store_Objetivo_trabajo',
		 root: 'datos',	
		 idProperty: 'id_indicador', 
		 fields: ['id_indicador','nombre_indicador','numero_objetivo_trabajo','nombre_objetivo_trabajo','id_objetivo_trabajo']
});     
	//store_Objetivo_trabajo.load();
	

// Grid Pagina obj-------------------------------------------------------
 
// FormPanel Adicionar 

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
	listWidth:350,		
	width: 350 
	});
 
/*var date = new Date(); 
date.format(date.patterns.ISO8601Short);
alert(date);*/
	
var fpAdicionar = new Ext.FormPanel({
	frame:true,
	autoHeight: true, 
	bodyStyle:'padding:5px 5px 0', 
	msgTarget: 'side', 
	labelWidth: 70,
	items: [
			{
            layout:'column', 
            items:[ {
                columnWidth:1,
                layout:'form',
				labelWidth: 70,
                items:[ 
				       {
						xtype:'combo',
						id:'combo_ObjetivoT', 
						name:'combo_ObjetivoT',
						displayField: 'nombre_objetivo_trabajo',
						valueField:'id_objetivo_trabajo',
						width: 350,
						minHeight:200,
						allowBlank:false,
						forceSelect:true,  
						fieldLabel:'Objetivo de trabajo', 
						store:store_Objetivo_trabajo,    
						mode: 'local',
						emptyText:'   -- Seleccionar --',
						loadingText:'buscando...', 
						triggerAction: 'all',    	
						editable:false,
						typeAhead: true,  
						labelWidth: 60,	
						listWidth:350
						},
						 {
							xtype:'combo',
							id:'combo_indicadores', 
							name:'combo_indicadores',
							displayField: 'nombre_indicador',
							valueField:'id_indicador',
							width: 350,
							minHeight:200,
							allowBlank:false,
							forceSelect:true,  
							fieldLabel:'Indicador', 
							store:store_Objetivo_trabajo,    
							mode: 'local',
							emptyText:'   -- Seleccionar --',
							loadingText:'buscando...', 
							triggerAction: 'all',    	
							editable:false,
							typeAhead: true,  
							labelWidth: 60,	
							listWidth:350
						},
				
				       {   
						labelWidth: 30,	
						layout:'form',
						xtype:'textarea', 
						grow:true,
						growMax:150,
						fieldLabel:'Acción',
						name:'nombre',
						id:'nombre',    
						allowBlank:false,
						width:350  
						},
						{
							xtype:'label',
							html: '<br>'
						}	
					]
				}]				
			},
		{             
		layout:'column',
		items:[{   
				columnWidth:.5,
				layout: 'form',
				labelWidth: 70,			               
				items: [ 
						{
						xtype: 'combo',
						editable: false,
						width: 112,
						id:'combo_avance',
						fieldLabel:'% Avance',
						typeAhead: true,
						triggerAction: 'all',
						lazyRender: true,
						mode: 'local',
						store: new Ext.data.ArrayStore
						({
							fields: ['myId', 'displayText'],
							data:
							[
								[0, '0 %'],[10, '10 %'],[20, '20 %'],[30, '30 %'],[40, '40 %'],[50, '50 %'],
								[60, '60 %'],[70, '70 %'],[80, '80 %'],[90, '90 %'],[100, '100 %']
							]
						}),
						valueField: 'myId',
						displayField: 'displayText', 
						} 
					]            
			},
			{	 
				columnWidth:.5,
				layout: 'form',
				labelWidth: 80,						
				items:[
					{
						xtype: 'datefield',
						fieldLabel: 'Fecha de cumplimiento',
						name: 'fecha_cump',
						id: 'fecha_cump',  
						format:'d-m-Y', 
						width:117,
						allowBlank:false,
						editable:false,
						minValue:new Date(),
						emptyText:'Fecha' 
						},
						{
							xtype:'label',
							html: '<br>'
						}						
					] 
			}
			 ]					
		},combo_ejecutantes ]
	});	  
  
  
//  function adicionar accion
 
  function adicionar(){
  
	 	Ext.Ajax.request({
		url : '?r=Accion/Create', 
			params: { 
					objetivoT:Ext.getCmp('combo_ObjetivoT').getValue(),  
					indicador:Ext.getCmp('combo_indicadores').getValue(),
					nombre:Ext.getCmp('nombre').getValue(),
					avance:Ext.getCmp('combo_avance').getValue(), 
					fecha_cump:Ext.getCmp('fecha_cump').value,
					ejecutantes:Ext.getCmp('combo_ejecutantes').getValue(), 
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
				CargarObjetivosAsociadas(); 					
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	
	 
//  function modificar accion
 
function modificarA(){  
		Ext.Ajax.request({
		url:'?r=Accion/Update', 
		params:
		{   
			objetivoT:Ext.getCmp('combo_ObjetivoT').getValue(),  
			indicador:Ext.getCmp('combo_indicadores').getValue(),
			nombre:Ext.getCmp('nombre').getValue(),
			avance:Ext.getCmp('combo_avance').getValue(), 
			fecha_cump:Ext.getCmp('fecha_cump').getValue(),
			ejecutantes:Ext.getCmp('combo_ejecutantes').getValue(), 
			
			id_accion:recordSeleccionado.get('id_accion'),
			id_indicador_accion:recordSeleccionado.get('id_indicador_accion')
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
			   msg: 'Se modific&oacute; correctamente la acci&oacute;n.',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
		  });
				CargarAccionesAsociadas(); 
				CargarObjetivosAsociadas(); 				
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request
	  
	} 
//================================================================
 
 
//-----------------------------------------------------------------------------	   Eliminar
 
	function eliminar(){
        Ext.MessageBox.confirm('Informaci&oacute;n de confirmaci&oacute;n', '&#191;Seguro que deseas eliminar?', function (btn){      
			if (btn == "yes"){ 
			    //Ext.getBody().mask('Por favor espere. Eliminando ...');
                                eliminarAjax();
				Ext.getCmp("btneliminar").disable();
				Ext.getCmp('btnmodificar').disable();
				sm.clearSelections();	 
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
			url : '?r=Accion/Delete',
			params:{        		
				id_indicador_accion:recordSeleccionado.get('id_indicador_accion'),
				id_accion:recordSeleccionado.get('id_accion'),				
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
							   msg: 'Se elimin&oacute; correctamente acci&oacute;n.',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							 	CargarAccionesAsociadas(); 
								CargarObjetivosAsociadas(); 
						}
					 } //fin del if        
			       }//fin de la función callback 
    })//fin del Ajax.request
  }//fin de la función eliminarAjax
 
      
	
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',
			autoHeight:true,
			layout:'fit',
              title:'Adicionar acci&oacute;n',width:480,autoHeight:true,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsociar.hide();
                  }
                },{                   
                   text:'Aplicar',
                    handler:function() {
						if(
							!Ext.getCmp('combo_ObjetivoT').getValue() || 
							!Ext.getCmp('combo_indicadores').getValue() || 
							!Ext.getCmp('nombre').getValue() || 
							!Ext.getCmp('combo_avance').getValue() ||  
							!Ext.getCmp('fecha_cump').getValue() ||
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
							{
							adicionar();
							}
				 
                   } 
              },
				{                   
                   text:'Aceptar',
                   handler:function() {                      
                    if(
							!Ext.getCmp('combo_ObjetivoT').getValue() || 
							!Ext.getCmp('combo_indicadores').getValue() || 
							!Ext.getCmp('nombre').getValue() || 
							!Ext.getCmp('combo_avance').getValue() ||  
							!Ext.getCmp('fecha_cump').getValue() ||
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
							{
							adicionar();
							winAddAsociar.hide();
							} 
                   } 
              }]
            });
          }//fin del if
		  winAddAsociar.add(fpAdicionar); 
		//  fpAdicionar.getForm().reset();
	 	Ext.getCmp('combo_ObjetivoT').reset();  
		Ext.getCmp('combo_indicadores').reset();  
		Ext.getCmp('nombre').reset();
		Ext.getCmp('combo_avance').reset(); 
		Ext.getCmp('fecha_cump').reset();
		Ext.getCmp('combo_ejecutantes').reset(); 
			
		  winAddAsociar.doLayout();
		  fpAdicionar.getForm().reset(); 
		  winAddAsociar.show(); 
		  btneliminar.disable();
		  btnmodificar.disable(); 
      };//fin del case
      break; 
        case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,
		  closeAction:'hide',
		  autoHeight:true,
		  layout:'fit',
          title:'Modificar acci&oacute;n',width:500,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable();
				  btneliminar.disable();
				  sm.clearSelections();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
				  if(
					!Ext.getCmp('combo_ObjetivoT').getValue() || 
					!Ext.getCmp('combo_indicadores').getValue() || 
					!Ext.getCmp('nombre').getValue() || 
					!Ext.getCmp('combo_avance').getValue() ||  
					!Ext.getCmp('fecha_cump').getValue() ||
					!Ext.getCmp('combo_ejecutantes').getValue() 
					)
						   Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Campos vac&iacute;os o con valores incorrectos',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });
						  else	
						  {
						modificarA(); 
						winMod.hide();
						}
				}
           }]
        });
       }//fin del if 
		fpAdicionar.getForm().reset(); 
        winMod.add(fpAdicionar); 
        winMod.doLayout();
		Ext.getCmp('combo_ObjetivoT').setValue(recordSeleccionado.get('id_objetivo_trabajo'));  
		Ext.getCmp('combo_indicadores').setValue(recordSeleccionado.get('id_indicador'));
		Ext.getCmp('nombre').setValue(recordSeleccionado.get('nombre_accion'));
		Ext.getCmp('combo_avance').setValue(recordSeleccionado.get('avance')); 
		
		// creamos una variable para almacenar el valor de la fecha y convertirlo antes de mostrarlo		
		//-----------------------------------------------------------------------------------------
		var fecha = recordSeleccionado.get('fecha_cump_accion'); 
		var convert = new Date(fecha); 
		Ext.getCmp('fecha_cump').setValue(convert); 
		//------------------------------------------------------------------------------------------
		
		Ext.getCmp('combo_ejecutantes').setValue(recordSeleccionado.get('id_cargo_ejecutante')); 
        winMod.show(); 
		btneliminar.disable();
		btnmodificar.disable(); 
      }//fin del case
      break; 
		
    }//fin del switch
  };

 //============================================================================	
 
//************************************* Panel donde se carga la informacion del index 
		var panel = new Ext.FormPanel({
			width: 893,
			frame:true, 
			applyTo: 'accion',			
			title: 'Buscar indicadores',
			layout:'column',
			//hideBorders:true, 			
			//border:true,			
			items: [ 
					{   
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
						columnWidth:1,
						layout: 'form',
						//labelWidth: 1,			               
						items:[grid]				
					}], 
			 	 bbar:new Ext.PagingToolbar({
					  pageSize: 15,
				 	  store: store,
					  displayInfo: true,
					  displayMsg: 'Mostrar {0} - {1} de {2}',
					  emptyMsg: "No hay elementos que mostrar",
					  width: 895, 
					  }) 
		});
	
  

});
