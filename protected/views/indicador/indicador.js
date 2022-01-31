
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';

Ext.onReady(function()
{

var ctEl;
var panel;
var sm;
var rec;
var winAddAsociar;
var winAddAsocArea;
var winAsocArea;
var winMod;
var aux;
var recArea;
var recordAreaS; 
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
       disabled:false,
	   id:'btnadicionar', 
	   //iconCls:'btn', 
	   text:'Adicionar',  
	   handler:function(){ 
		   winFpGestionar('Add');
		   } 
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
   handler:function(){ 
		 eliminar();
   } 
}); 
 
 
           
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

 

 // store grid
   var store =new Ext.data.JsonStore({
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
       store.load();   
       
  
       
 //declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[ 
            {id:'nombre_indicador',header:'Indicador',sortable:true, width:30,dataIndex: 'nombre_indicador'}, 
			{id:'nombre_cargo',header: 'Responsable',  width:20,sortable:true,  dataIndex: 'nombre_cargo'},
			{id:'nombre_unidad_medida',header: 'Unid. de Medida', sortable:true,  width:15,  dataIndex: 'nombre_unidad_medida'},
			{id:'cierre_anno_anterior',header:'Cierre',sortable:true, width:15,dataIndex: 'cierre_anno_anterior'},
			{id:'proyectado',header: 'Proyectado',  width:15, sortable:true,  dataIndex: 'proyectado'},
			{id:'clasificacion_gi',header: 'Clasificacion', sortable:true,  width:14,  dataIndex: 'clasificacion_gi'},
			{id:'numero_objetivo_trabajo',header: 'No.Objetivo', sortable:true,  width:10,  dataIndex: 'numero_objetivo_trabajo'},
			]
   }); 
   
   var grid = new Ext.grid.GridPanel({
        store: store,				 
        id:'grid',
        //margins:'2 2 2 -4',
		iconCls:'icon-grid', 
        frame:true,
		autoExpandColumn:'nombre_obj',
		cm: cm,
		sm:sm, 
        viewConfig: {
        forceFit: true
        },
        stripeRows: true,        
        height: 370,
        width: 880   
    });

 
  
// Combo box unidad de medida	---------------------------------------	combo1
  
	
 var store_Unidad_Medida =new Ext.data.JsonStore({
    url: '?r=Indicador/UnidadMedida',    
	idProperty: 'id_unidad_medida',
    fields: ['id_unidad_medida','nombre_unidad_medida']
	});
	store_Unidad_Medida.load();
	
var combo_unidad_medida = new Ext.form.ComboBox({
	id:'combo_unidad_medida', 
    allowBlank:false,
	fieldLabel:'Unidad de medida',	
    forceSelect:true,  
    store:store_Unidad_Medida,
	displayField: 'nombre_unidad_medida',
	valueField: 'id_unidad_medida',
	//typeAhead: true,
	mode: 'local',
    emptyText:'-- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:135,		
	width: 135 
	});
	
 var store_objetivos_trabajos =new Ext.data.JsonStore({
    url: '?r=Indicador/ObjetivosTrabajo', 
	idProperty: 'id_objetivo_trabajo',
    fields: ['numero_objetivo_trabajo','nombre_objetivo_trabajo','id_objetivo_trabajo',
		'id_objetivo_estrategico']
	});
	store_objetivos_trabajos.load();
	
var combo_objetivo_trabajo = new Ext.form.ComboBox({
	id:'combo_objetivo_trabajo', 
    allowBlank:false,
	fieldLabel:'Objetivo de trabajo',	
    forceSelect:true,  
    store:store_objetivos_trabajos,
	displayField: 'nombre_objetivo_trabajo',
	valueField: 'id_objetivo_trabajo',
	typeAhead: true,
	mode: 'local',
    emptyText:'-- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:400,		
	width: 410 
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
    emptyText:'-- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:400,		
	width: 410 
	});
var combo_encargado = new Ext.form.ComboBox({
	id:'combo_encargado', 
    allowBlank:false,
	fieldLabel:'Encargado',	
    forceSelect:true,  
    store:store_responsables,
	displayField: 'nombre_cargo',
	valueField: 'id_cargo',
	//typeAhead: true,
	mode: 'local',
    emptyText:'-- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:400,		
	width: 410 
	});

//--------------------------------------------------------------------	
   
	

 
// FormPanel Adicionar
var fpAdicionar = new Ext.FormPanel({
	frame:true,
	autoHeight: true, 
	bodyStyle:'padding:5px 5px 0', msgTarget: 'side', 
	items: [
				{
            layout:'column', 
            items:[ {
                columnWidth:1,
                layout:'form',
				labelWidth: 70,
                items:[ 
				    combo_objetivo_trabajo,
				    {  
						labelWidth: 100,					
						layout:'form',
						xtype:'textarea',
						fieldLabel:'Indicador',
						grow:true,
						growMax:100, 
						name: 'nombre_add',
						id:'nombre_add',                         
						//maskRe:/^[a-z]?$/ ,				  
						allowBlank:false, 
						width:410 							
					},
					combo_responsables,
					combo_encargado,
					{  
						labelWidth: 100,					
						layout:'form',
						xtype:'textarea',
						fieldLabel:'Descripción',
						grow:true,
						growMax:100, 
						name: 'descripcion',
						id:'descripcion',                         
						//maskRe:/^[a-z]?$/ ,				  
						allowBlank:false, 
						width:410 							
					},
					{
						xtype:'label',
						html:'<br>',
					},
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
						labelWidth: 70,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Cierre año anterior',
						name: 'cierre_anno_add',
						id:'cierre_anno_add',                         
						//maskRe:/^[a-z]?$/ ,				  
						allowBlank:false, 
						width:135 
					},
					{ 
						labelWidth: 70,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Proyectado',
						name: 'proyectado_add',
						id:'proyectado_add',                         
						//maskRe:/^[a-z]?$/ ,				  
						allowBlank:false, 
						width:135 
					},
									
					combo_unidad_medida, 
					]            
			}, 
			{	 
				columnWidth:.5,
				layout: 'form',  
				items:[  
					/*{
						xtype: 'fieldset',
						title: 'Clasificaci&oacute;n 1',
						collapsed: true,
						collapsible: true,
						name:'clasificacion',
						id:'clasificacion',
						autoHeight: true,
						defaultType: 'checkbox', // each item will be a checkbox
						items: [ 
						{ 
							fieldLabel: 'Seleccione',
							boxLabel: 'Inducci&oacute;n',
							name: 'clasificacion_induccion_add',
							inputValue: 'I'
						}, {
							fieldLabel: '',
							labelSeparator: '',
							boxLabel: 'Resultados',
							name: 'clasificacion_resultados_add',
							inputValue: 'R'
						}, {
							checked: true,
							fieldLabel: '',
							labelSeparator: '',
							boxLabel: 'Cr&iacute;ticos',
							name: 'clasificacion_criticos_add',
							inputValue: 'C'
						}]
					}, */ 
					{
						xtype: 'fieldset',
						title: 'Clasificaci&oacute;n',
						width:232,
						collapsed: false,
						labelWidth: 70,		
						collapsible: true, 
						items: [{
							xtype: 'radiogroup',
							fieldLabel: 'Seleccione',							
							columns: 1, 
							name:'clasificacion_2',
							id:'clasificacion_2',
							autoHeight: true,   
								items: [
									{inputValue: 'Informativo',boxLabel: 'Informativo', name: 'clasificacion_2',checked: true},
									{inputValue: 'gestion',boxLabel: 'Gesti&oacute;n', name: 'clasificacion_2'}
										]
									}						
						
								]
					}						
					] 
			}]					
		},
			{
				xtype:'label', html:'<br>'
			} 
		]
	}); 
	 
//  function adicionar

  function adicionar(){  
		 
		Ext.Ajax.request({
		url : '?r=Indicador/Create', 
			params: { 	
					nombre_indicador:Ext.getCmp('nombre_add').getValue(),  
					responsable:Ext.getCmp('combo_responsables').getValue(), 
					descripcion:Ext.getCmp('descripcion').getValue(), 
					cierre_anno:Ext.getCmp('cierre_anno_add').getValue(), 
					proyectado:Ext.getCmp('proyectado_add').getValue(),
					unidad_medida:Ext.getCmp('combo_unidad_medida').getValue(),
					objetivo_trabajo:Ext.getCmp('combo_objetivo_trabajo').getValue(),
					clasificacion_gi:Ext.getCmp('clasificacion_2').getValue().inputValue,
					encargado:Ext.getCmp('combo_encargado').getValue()
						
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
			   msg: 'Se agreg&oacute; correctamente el indicador',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  });
				store.reload(); 					
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	
	 
//============================================================================	
//  function modificarA
 
function modificarA(){  
		Ext.Ajax.request({
		url:'?r=Indicador/Update', 
		params:
		{   
			id_indicador:recordSeleccionado.get('id_indicador'),
			nombre_indicador:Ext.getCmp('nombre_add').getValue(),  
			responsable:Ext.getCmp('combo_responsables').getValue(), 
			descripcion:Ext.getCmp('descripcion').getValue(), 
			cierre_anno:Ext.getCmp('cierre_anno_add').getValue(), 
			proyectado:Ext.getCmp('proyectado_add').getValue(),
			unidad_medida:Ext.getCmp('combo_unidad_medida').getValue(),
			objetivo_trabajo:Ext.getCmp('combo_objetivo_trabajo').getValue(),
			encargado:Ext.getCmp('combo_encargado').getValue(),
			clasificacion_gi:Ext.getCmp('clasificacion_2').getValue().inputValue
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
			   msg: 'Se modific&oacute; correctamente el indicador.',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
		  });  
				 store.reload(); 					
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
			url : '?r=Indicador/Delete',
			params:{        		
				id_indicador:recordSeleccionado.get('id_indicador'),
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
							   msg: 'Se elimin&oacute; correctamente el indicador.',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							 store.reload(); 
						}
					 } //fin del if        
			       }//fin de la función callback 
    })//fin del Ajax.request
  }//fin de la función eliminarAjax
//******************************
 
	
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset(); 
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',			
			layout:'fit',
              title:'Adicionar indicador',width:540,autoHeight: true, 
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsociar.hide();
				  sm.clearSelections();
                  }
                },{                   
                   text:'Aplicar',
                    handler:function() {
					if(
						!Ext.getCmp('nombre_add').getValue() ||  
						!Ext.getCmp('combo_responsables').getValue() || 
						!Ext.getCmp('descripcion').getValue() ||
						!Ext.getCmp('cierre_anno_add').getValue() ||
						!Ext.getCmp('proyectado_add').getValue() ||
						!Ext.getCmp('combo_unidad_medida').getValue() ||
						!Ext.getCmp('combo_objetivo_trabajo').getValue()||   
						!Ext.getCmp('combo_encargado').getValue()  
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
						   Ext.getCmp('numero_add').reset();
						   Ext.getCmp('nombre_add').reset(); 
						   Ext.getCmp('combo_ObjetivoE_add').reset(); 
						   }
                   } 
              },
				{                   
                   text:'Aceptar',
                   handler:function() {  
						if(
						!Ext.getCmp('nombre_add').getValue() ||  
						!Ext.getCmp('combo_responsables').getValue() || 
						!Ext.getCmp('descripcion').getValue() ||
						!Ext.getCmp('cierre_anno_add').getValue() ||
						!Ext.getCmp('proyectado_add').getValue() ||
						!Ext.getCmp('combo_unidad_medida').getValue() ||
						!Ext.getCmp('combo_objetivo_trabajo').getValue()||   
						!Ext.getCmp('combo_encargado').getValue()  
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
		  fpAdicionar.getForm().reset();
		  winAddAsociar.add(fpAdicionar);
		  winAddAsociar.doLayout();
		  winAddAsociar.show();		  
		  btneliminar.disable();
		  btnmodificar.disable();
			//sm.clearSelections();--------------------------------
      };//fin del case
      break; 
        case 'Mod': {
		fpAdicionar.getForm().reset(); 
        if(!winMod){
          winMod = new Ext.Window({modal: true,
		  closeAction:'hide',
		  autoHeight:true,
		  layout:'fit',
          title:'Modificar indicador',width:540,autoHeight: true, 
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
				  sm.clearSelections();
                  winMod.hide();
				  btnmodificar.disable();
				  btneliminar.disable();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
					if(
					!Ext.getCmp('nombre_add').getValue() ||  
					!Ext.getCmp('combo_responsables').getValue() || 
					!Ext.getCmp('descripcion').getValue() ||
					!Ext.getCmp('cierre_anno_add').getValue() ||
					!Ext.getCmp('proyectado_add').getValue() ||
					!Ext.getCmp('combo_unidad_medida').getValue() ||
					!Ext.getCmp('combo_objetivo_trabajo').getValue() ||
					!Ext.getCmp('combo_encargado').getValue()  	
					)
						   Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Campos vacios o con valores incorrectos',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });
						  else	{
								modificarA(); 
								winMod.hide();
								}
				}
           }]
        });
       }//fin del if 
		
        winMod.add(fpAdicionar);//fpModificar);	 
        winMod.doLayout();
		Ext.getCmp('nombre_add').setValue(recordSeleccionado.get('nombre_indicador')); 
		Ext.getCmp('combo_responsables').setValue(recordSeleccionado.get('id_cargo_responsable')); 
		Ext.getCmp('combo_encargado').setValue(recordSeleccionado.get('id_cargo_encargado')); 
		Ext.getCmp('descripcion').setValue(recordSeleccionado.get('descripcion')); 
		Ext.getCmp('cierre_anno_add').setValue(recordSeleccionado.get('cierre_anno_anterior')); 
		Ext.getCmp('proyectado_add').setValue(recordSeleccionado.get('proyectado'));
		Ext.getCmp('combo_unidad_medida').setValue(recordSeleccionado.get('id_unidad_medida'));
		Ext.getCmp('combo_objetivo_trabajo').setValue(recordSeleccionado.get('id_objetivo_trabajo'));
		Ext.getCmp('clasificacion_2').setValue(recordSeleccionado.get('clasificacion_gi'));
		
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
			applyTo: 'indicador',			
			title: 'Gestionar indicador',
			layout:'form',
			//bodyStyle:'padding:5px 5px 0',			
			items: [
			 {   
					tbar:[btnadicionar,btnmodificar,btneliminar]			
				    
			},{   
				layout:'column',
				items:[{                 
					columnWidth:1,
					layout: 'form',		               
					items:[grid]
				}]       
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
