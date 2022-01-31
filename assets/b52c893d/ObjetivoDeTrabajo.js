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
	   handler:function(){winFpGestionar('Add');} 
	}); 
	
var btneliminarA= new Ext.Button({
       disabled:false,
	   id:'btnaelimAs', 
	   //iconCls:'btn', 
	   text:'Eliminar',  
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
	
var btnAsociarArea= new Ext.Button({
   disabled:true,
   id:'btnAsociarArea', 
   //iconCls:'btn', 
   text:'Asociar &aacute;rea',  
   handler:function(){ 
	winFpGestionar('Asociar');
   } 
}); 
var btnAddAsociar= new Ext.Button({ 
    id:'btnAddAsociar', 
	text:'Adicionar',
	handler:function() { 
	winFpGestionar('AddAsoc'); }
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
		btnAsociarArea.enable(); 
	} 
	
}, this);

smGrid_AsocArea = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClickArea
    }    
  });

  function On_RowClickArea(smGrid_AsocArea, indiceFila, record){
    recArea = record;
    recordAreaS=recArea;
    return recordAreaS;
  }; 
  
 	smGrid_AsocArea.on('rowselect', function (smodel, rowIndex, keepExisting, record){
	/*btneliminar.enable();
		btnmodificar.enable(); */
	}, this); 

 // store grid
   var store =new Ext.data.JsonStore({
    url: '?r=ObjetivoDeTrabajo/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_objetivo_trabajo',
    fields: ['id_objetivo_trabajo','nombre_objetivo_trabajo','numero_objetivo_trabajo','id_objetivo_estrategico','nombre_objetivo_est','fecha_cumplimiento','estado','nombre_perspectiva']
  });   
       store.load();  
 //declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[  
			{id:'nombre_objetivo_trabajo',header: 'Objetivo de trabajo',  width:80,  dataIndex: 'nombre_objetivo_trabajo'},
			{id:'nombre_perspectiva',header:'Perspectiva', width:20,dataIndex: 'nombre_perspectiva'},
   ]}); 
   
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

 
 
var storeAreaAsoc =new Ext.data.JsonStore({ 
	root: 'datos', 
	idProperty: 'id_area',
	fields: ['id_area','nombre_area','numero_objetivo_trabajo','nombre_objetivo_trabajo','id_objetivo_trabajo']
}); 

function CargarAreasAsociadas()
{
	Ext.Ajax.request(
			{ 
			url : '?r=ObjetivoDeTrabajo/AreasAsoc',
			params:{        		
				id_objetivo_trabajo:recordSeleccionado.get('id_objetivo_trabajo'),
			},
			callback:function(a,b,c)
				{
				   if(b)
					{
					   var dd=c.responseText; 										   
					   var jsonData = Ext.decode(dd); 
					   storeAreaAsoc.loadData(jsonData); 
					}
				}   
    })//fin del Ajax.request
}
 var cmAA = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[ 
			{id:'nombre_area',header: '&Aacute;reas en que influye',  width:60,  dataIndex: 'nombre_area'},
            {id:'numero_objetivo_trabajo',header:'Numero de Obj.', width:20,dataIndex: 'numero_objetivo_trabajo'} 
   ]});   
 
var gridAreas = new Ext.grid.GridPanel({
        store: storeAreaAsoc,  
        id:'gridAreaAsoc', 
		iconCls:'icon-grid', 
        frame:true,
		cm: cmAA,
		sm:smGrid_AsocArea, 
        viewConfig: {
        forceFit: true
         },
        stripeRows: true,        
        height: 250,
        width: 450    
    }); 
// Combo box area asociada	---------------------------------------	combo1
  
  var store1 = new Ext.data.JsonStore({  
		 url: '?r=Area/Areas', 
		 storeId: 'store1', 		 
		 root: 'datos', 
		 idProperty: 'id_area', 
		 fields: ['id_area','nombre_area']
});     
	//store1.load(); 
	
var combo1 = new Ext.form.ComboBox({
	id:'combo1', 
    allowBlank:false,
	fieldLabel:'&Aacute;rea',	
    forceSelect:true,  
    store:store1, //store, //asignandole el store  
	displayField: 'nombre_area',
	valueField: 'id_area',
	typeAhead: true,
	mode: 'remote',
    emptyText:'   -- Seleccionar --',
	selectOnFocus: true,
    triggerAction: 'all',    	
    editable:false ,
	labelWidth: 60,	
	listWidth:135,		
	width: 135 
	});
	
	 var store_areas = new Ext.data.JsonStore({  
		 url: '?r=Area/Areas', 
		 storeId: 'store_areas', 		 
		 root: 'datos', 
		 idProperty: 'id_area', 
		 fields: ['id_area','nombre_area']
});     
	store_areas.load();
	
var sm_add_area_objetivo = new Ext.grid.CheckboxSelectionModel({
        singleSelect: false,
        sortable: false,
        checkOnly: true
    });	
var grid_add_area_objetivo = new Ext.grid.GridPanel({
		store: store_areas,       
		id:'grid_add_area_objetivo',
		colModel: new Ext.grid.ColumnModel({
			defaults: { 
				sortable: true
			},		
			columns:[ sm_add_area_objetivo,
			{id:'nombre_area',header: '&Aacute;reas en que influye',  width:60,  dataIndex: 'nombre_area'} 
					]}),
		loadMask:{store:store},
		frame:true, 
		sm:sm_add_area_objetivo,
		viewConfig: {
		forceFit: true
		},
		stripeRows: true,        
		height: 200,
		width: 270  
    });	
	
//--------------------------------------------------------------------	
	   
var fpAreaAsociada = new Ext.FormPanel({
      //labelAlign: 'top',
        frame:true, 
        bodyStyle:'padding:5px 5px 0',        	
        items: [{   
                layout:'form',				
                items:[gridAreas]
				}],  
	});	

		
var fpAddAreaAsociada = new Ext.FormPanel({
      //labelAlign: 'top',
        frame:true,  
		autoHeight:true,
        bodyStyle:'padding:5px 5px 0',        	
         items: [{   
                layout:'form',				
                 items:[grid_add_area_objetivo]//combo1]
				}],  
	});
	
function AddAsociacion(){ 
 
	var selectedKeys = [];
		sm_add_area_objetivo.each(function(rec){
			selectedKeys.push(rec.get('id_area'));
		}); 
	if(!selectedKeys[0]) 
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
		url : '?r=ObjetivoDeTrabajo/AddAreasAsoc', 
			params: { 	
					id_area:Ext.encode(selectedKeys),
					id_objetivo_trabajo:recordSeleccionado.get('id_objetivo_trabajo'),
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
			   msg: 'Asociaci&oacute;n completada ',
			   buttons: Ext.Msg.OK,
			    
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  }); 			
				}
			}
			else
			Ext.Msg.show({
			   title:'Informaci&oacute;n',
			   msg: 'Verifique su selecci&oacute;n',
			   buttons: Ext.Msg.OK, 
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR  
			});
			CargarAreasAsociadas();
			grid_add_area_objetivo.getSelectionModel().clearSelections();
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	

  
  
//¿============================================================================= Fin Main Grid  

	
 var store_Objetivo_Estrategico = new Ext.data.JsonStore({  
		 url: '?r=ObjetivoDeTrabajo/ObjetivosEstrategicos',  
		 root: 'datos', 
		 idProperty: 'id_objetivo_estrategico', 
		 fields: ['id_objetivo_estrategico','nombre_objetivo_est','fecha_cumplimiento','id_perspectiva']
});     
	store_Objetivo_Estrategico.load();  
	 
	
// Grid Pagina obj-------------------------------------------------------
 
// FormPanel Adicionar
	  
var fpAdicionar = new Ext.FormPanel({
      //labelAlign: 'top',
        frame:true,
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
					xtype:'textfield',
	                fieldLabel:'No',
	                name: 'numero_add',
	                id:'numero_add',                         
					//maskRe:/^[a-z]?$/ ,				  
	                allowBlank:false, 
	                width:100 
	                }, 
					{
					xtype:'combo',
					id:'combo_ObjetivoE_add', 
					name:'combo_ObjetivoE_add',
					displayField: 'nombre_objetivo_est',
					valueField:'id_objetivo_estrategico',
					width: 365,
					minHeight:200,
					allowBlank:false,
					forceSelect:true,  
					fieldLabel:'Objetivo estrat&eacute;gico', 
					store:store_Objetivo_Estrategico,    
					mode: 'local',
					emptyText:'   -- Seleccionar --',
					loadingText:'buscando...', 
					triggerAction: 'all',    	
					editable:false,
					typeAhead: true,  
					labelWidth: 60,	
					listWidth:360 
				},
					{
					columnWidth:.80,
					labelWidth: 30,	
					layout:'form',
					xtype:'textarea', 
					grow:true,
					growMax:250,
	                fieldLabel:'Objetivo de trabajo',
	                name:'nombre_add',
	                id:'nombre_add',    
	                allowBlank:false,
	                width:365 
	                },
					 ]
			}],   
	});
	
//  function adicionar
 
  function adicionar(){  
	 
		Ext.Ajax.request({
		url : '?r=ObjetivoDeTrabajo/Create', 
			params: { 	
					nombre_objetivo:Ext.getCmp('nombre_add').getValue(),  
					numero_objetivo:Ext.getCmp('numero_add').getValue(),
					id_objetivo_estrategico:Ext.getCmp('combo_ObjetivoE_add').getValue()
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
			   msg: 'Se agreg&oacute; correctamente el objetivo',
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
// FormPanel Modificar
	
	var fpModificar = new Ext.FormPanel({
        //labelAlign: 'top',
        frame:true,	
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
					xtype:'textfield',
	                fieldLabel:'No',
	                name: 'numero_mod',
	                id:'numero_mod',                         
					//maskRe:/^[a-z]?$/ ,				  
	                allowBlank:false,//marca el camp si se deja en blanco
	                width:100 
	                },
					{
					xtype:'combo',
					id:'combo_ObjetivoE_mod', 
					name:'combo_ObjetivoE_mod',
					displayField: 'nombre_objetivo_est',
					valueField:'id_objetivo_estrategico',
					width: 365,
					allowBlank:false,
					forceSelect:true,  
					fieldLabel:'Objetivo estrat&eacute;gico', 
					store:store_Objetivo_Estrategico,    
					mode: 'remote',
					emptyText:'           -- Seleccionar --',
					loadingText:'buscando...', 
					triggerAction: 'all',    	
					editable:false,
					typeAhead: true,  
					labelWidth: 60,	
					listWidth:360 
				} ,
					{
					columnWidth:.80,
					labelWidth: 30,	
					layout:'form',
					xtype:'textarea', 
					grow:true,
					growMax:250,
	                fieldLabel:'Objetivo de trabajo',
	                name: 'nombre_mod',
	                id:'nombre_mod',                         
					//maskRe:/^[a-z]?$/ ,				  
	                allowBlank:false,//marca el camp si se deja en blanco
	                width:365 
	                } 
					]
				},
				 
				]
	   });	
//============================================================================	
//  function modificarA
 
function modificarA(){  
 	 
		Ext.Ajax.request({
		url:'?r=ObjetivoDeTrabajo/Update', 
		params:
		{   
			nombre_objetivo:Ext.getCmp('nombre_mod').getValue(),  
			numero_objetivo:Ext.getCmp('numero_mod').getValue(),
			id_objetivo_estrategico:Ext.getCmp('combo_ObjetivoE_mod').getValue(),
			id_objetivo_trabajo:recordSeleccionado.get('id_objetivo_trabajo')
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
			   msg: 'Se modific&oacute; correctamente el objetivo.',
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
				Ext.getCmp('btnAsociarArea').disable();				
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
			url : '?r=ObjetivoDeTrabajo/Delete',
			params:{        		
				id_objetivo_trabajo:recordSeleccionado.get('id_objetivo_trabajo'),
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
							   msg: 'Se elimin&oacute; correctamente el objetivo.',
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
function eliminarAsociacion(){
        Ext.MessageBox.confirm('Informaci&oacute;n de confirmaci&oacute;n', '&#191;Seguro que deseas eliminar?', function (btn){      
			if (btn == "yes"){ 
			      eliminarA();
				Ext.getCmp("btneliminar").disable();
				Ext.getCmp('btnmodificar').disable(); 
				Ext.getCmp('btnAsociarArea').disable();
			}//fin del if
		});
	}; 
 

/** 
* eliminarAjax 
* Envía parámetros y recibe respuesta del servidor
*/ 
  function eliminarA()
	{ 
   		 Ext.Ajax.request(
			{ 
			url : '?r=ObjetivoDeTrabajo/ElimAsociacion',
			params:{        		
				id_area:recordAreaS.get('id_area'),
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
							   msg: 'Se elimin&oacute; correctamente el &aacute;rea asociada.',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							CargarAreasAsociadas();
						}
					 } //fin del if        
			       }//fin de la función callback 
    })//fin del Ajax.request
  }//fin de la función eliminarAjax
//============================================================================	
// gestionar paneles
      
	
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',
			autoHeight:true,
			layout:'fit',
              title:'Adicionar objetivo',width:490,height:220,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsociar.hide();
                  }
                },{                   
                   text:'Aplicar',
                    handler:function() {
					if(!Ext.getCmp('nombre_add').getValue() || !Ext.getCmp('numero_add').getValue() || !Ext.getCmp('combo_ObjetivoE_add').getValue())
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
					  else		{
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
					if(!Ext.getCmp('nombre_add').getValue() || !Ext.getCmp('numero_add').getValue() || !Ext.getCmp('combo_ObjetivoE_add').getValue())
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
					  else		{
                    adicionar();
					winAddAsociar.hide();
							}
                   } 
              }]
            });
          }//fin del if
		  winAddAsociar.add(fpAdicionar);
		  winAddAsociar.doLayout();
		  winAddAsociar.show();
		  btnAsociarArea.disable(); 		  
		  btneliminar.disable();
		  btnmodificar.disable();
			//sm.clearSelections();--------------------------------
      };//fin del case
      break; 
        case 'Mod': {
		fpModificar.getForm().reset();
        if(!winMod){
          winMod = new Ext.Window({modal: true,
		  closeAction:'hide',
		  autoHeight:true,
		  layout:'fit',
          title:'Modificar objetivo',width:490,height:220,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable();
				  btneliminar.disable();
				  btnAsociarArea.disable();
				  
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
					if(!Ext.getCmp('nombre_mod').getValue() || !Ext.getCmp('numero_mod').getValue() || !Ext.getCmp('combo_ObjetivoE_mod').getValue())
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
				  else	{	
                    modificarA(); 
					winMod.hide();
					}
				}
           }]
        });
       }//fin del if 
		fpModificar.getForm().reset(); 
        winMod.add(fpModificar);
		 Ext.getCmp('nombre_mod').setValue(recordSeleccionado.get('nombre_objetivo_trabajo')),  
		 Ext.getCmp('numero_mod').setValue(recordSeleccionado.get('numero_objetivo_trabajo')),
		 Ext.getCmp('combo_ObjetivoE_mod').setValue(recordSeleccionado.get('id_objetivo_estrategico')),		 
        winMod.doLayout();
        winMod.show(); 
        sm.clearSelections();
		btneliminar.disable();
		btnmodificar.disable(); 
		btnAsociarArea.disable(); 
		
      }//fin del case
      break;
	case 'Asociar': { 	  
          if(!winAsocArea){
            winAsocArea = new Ext.Window({
			  modal: true,
			  closeAction:'hide',
			  layout:'fit',
              title:'&Aacute;reas en que influye',
			  width:500,
			  height:350,			  
              buttons: 
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAsocArea.hide();
				  sm.clearSelections();
				}},
				{                   
                   text:'Eliminar',
                    handler:function() {
				   eliminarAsociacion();
				   CargarAreasAsociadas();	
				   }   
                },
				btnAddAsociar  
				 ]
            });
          }//fin del if
          winAsocArea.add(fpAreaAsociada);
          winAsocArea.doLayout();
		  CargarAreasAsociadas();
          winAsocArea.show();	
			btneliminar.disable();
			btnmodificar.disable(); 
			btnAsociarArea.disable(); 
		  
			//sm.clearSelections();--------------------------------
		};//fin del case
		break;
	case 'AddAsoc': { 	  
          if(!winAddAsocArea){  
            winAddAsocArea = new Ext.Window({
			modal: true,
			closeAction:'hide',
			layout:'fit',
			title:'Adicionar &aacute;reas en que influye el objetivo',
			width:300,
			autoHeight:true,
			listeners:{
			show: function(){  
			//Cargando en el grid los items que ya tiene el store	
				items_marcar =  new Array();
				items_asociados = storeAreaAsoc.getRange(); 
				for (var k=0; k < items_asociados.length; k++)
				 {				 
					index_record = grid_add_area_objetivo.getStore().find('id_area', items_asociados[k].get('id_area'));  
					items_marcar[k] = index_record;
				 }
				grid_add_area_objetivo.getSelectionModel().selectRows(items_marcar); 
			},  
		hide: function(){
			grid_add_area_objetivo.getSelectionModel().clearSelections();
			}
		},			  
              buttons: 
              [
				{                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsocArea.hide();
				  smGrid_AsocArea.clearSelections();
                  } 
				},
				{                   
                   text:'Aceptar',
                   handler:function() { 
					AddAsociacion();
					winAddAsocArea.hide();
					CargarAreasAsociadas();
					smGrid_AsocArea.clearSelections();
                   }
				},
				]
            });
          }//fin del if
          winAddAsocArea.add(grid_add_area_objetivo); 
          winAddAsocArea.doLayout(); 
          winAddAsocArea.show();	
		  btnAsociarArea.disable();
		  btneliminar.disable();
		  btnmodificar.disable();
		  
			//sm.clearSelections();--------------------------------
		};//fin del case
		break; 
		
    }//fin del switch
  };

 //============================================================================	


//************************************* Panel donde se carga la informacion del index 
		var panel = new Ext.FormPanel({
			width: 893,
			frame:true, 
			applyTo: 'objetivo',			
			title: 'Gestionar objetivo',
			layout:'form',
			//bodyStyle:'padding:5px 5px 0',			
			items: [
			 {   
					tbar:[btnadicionar,btnmodificar,btneliminar,'->',btnAsociarArea]			
				    
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
