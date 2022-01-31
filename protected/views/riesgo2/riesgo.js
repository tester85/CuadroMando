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
    url: '?r=Riesgo/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_riesgo',
    fields: ['id_riesgo','nombre_indicador','responsable','cierre_anno_anterior','proyectado','descripcion','nombre_riesgo','clasificacion','ponderacion','prob_ocurrencia','comprobacion','id_indicador']
  });
  
		 
       store.load();  
	   
 //declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel([ 
            {id:'nombre_riesgo',header:'Riesgo', width:30,dataIndex: 'nombre_riesgo'}, 
			{id:'nombre_indicador',header:'Indicador', width:30,dataIndex: 'nombre_indicador'},
			{id:'clasificacion',header: 'Impacto',  width:10,  dataIndex: 'clasificacion'},
			{id:'prob_ocurrencia',header: 'Probabilidad de ocurrencia',  width:20,  dataIndex: 'prob_ocurrencia'}
   ]); 
   
   var grid = new Ext.grid.GridPanel({
         store: store,				 
        id:'grid',
        //margins:'2 2 2 -4',
		iconCls:'icon-grid', 
        frame:true,
		//autoExpandColumn:'nombre_riesgo',
		 cm: cm,
		 sm:sm, 
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 370,
        width: 880   
    });
 
  
//¿============================================================================= Fin Main Grid  

    
 var store_Indicadores = new Ext.data.JsonStore({  
		 url: '?r=Accion/Indicadores',  
		 idProperty: 'id_indicador', 
		 fields: ['id_indicador','nombre_indicador','responsable','cierre_anno_anterior','proyectado']
}); 
store_Indicadores.load();

var combo_indicadores =  new Ext.form.ComboBox({
	id:'combo_indicadores', 
	name:'combo_indicadores',
	displayField: 'nombre_indicador',
	valueField:'id_indicador',
	width: 350,
	minHeight:200,
	allowBlank:false,
	forceSelection: true,  
	fieldLabel:'Indicador', 
	store:store_Indicadores,    
	mode: 'local',
	emptyText:'       -- Seleccionar --',
	loadingText:'buscando...', 
	triggerAction: 'all',    	
	editable:false,
	typeAhead: true,  
	labelWidth: 60,	
	listWidth:320, 
	});

// Grid Pagina obj-------------------------------------------------------
 
// FormPanel Adicionar
	  
var fpAdicionar = new Ext.FormPanel({
      //labelAlign: 'top',
	    id:'fpAdicionar', 
        frame:true,
		autoHeight:true,
        bodyStyle:'padding:5px 5px 0',        	
        items: [{   
                layout:'form',
				labelWidth: 80,
                items:[ 
				combo_indicadores, 
					{
					columnWidth:.80,
					labelWidth: 20,	
					layout:'form',
					xtype:'textarea', 
					grow:true,
					growMax:150,
	                fieldLabel:'Riesgo',
	                name:'nombre',
	                id:'nombre',    
	                allowBlank:false,
	                width:350 
	                },
					{
					columnWidth:.80,
					labelWidth: 20,	
					layout:'form',
					xtype:'textfield', 
	                fieldLabel:'Ponderaci&oacute;n',
	                name:'ponderacion',
	                id:'ponderacion',    
	                allowBlank:false,
	                width:150 
	                },
					{
					xtype:'combo',
					id:'combo_clasificacion', 
					name:'combo_clasificacion',
					displayField:'clasificacion',
					valueField:'clasificacion',
					width: 350,
					minHeight:200,
					typeAhead: true,
					labelWidth: 60,	
					listWidth:340, 
					allowBlank:false,
					forceSelection: true,  
					fieldLabel:'Impacto', 
						store:new Ext.data.ArrayStore
						({
							id: 'store_clasificacion',
							fields: ['myId', 'clasificacion'],
							data: [[1,'Leve'],[2,'Menor'],[3,'Tolerable'],[4,'Moderado'],[5,'Mayor'],[6,'Inaceptable']]
						}),		    
					mode: 'local',
					emptyText:'       -- Seleccionar --', 
					triggerAction: 'all',    	
					editable:false, 
					},
					{
					xtype:'combo',
					id:'combo_prob_ocurrencia', 
					name:'combo_prob_ocurrencia',
					displayField:'clasificacion',
					valueField:'clasificacion',
					width: 350,
					minHeight:200,
					typeAhead: true,
					labelWidth: 60,	
					listWidth:340, 
					allowBlank:false,
					forceSelection: true,  
					fieldLabel:'Probabilidad de ocurrencia', 
					store:new Ext.data.ArrayStore
						({
							id: 'store_clasificacion',
							fields: ['myId', 'clasificacion'],
							data: [[1,'Baja'],[2,'Medio baja'],[3,'Media'],[4,'Alta'],[5,'Muy alta']]
						}),		    
					mode: 'local',
					emptyText:'       -- Seleccionar --', 
					triggerAction: 'all',    	
					editable:false, 
				},
				{
					columnWidth:.80,
					labelWidth: 20,	
					layout:'form',
					xtype:'textarea', 
					grow:true,
					growMax:150,
	                fieldLabel:'A comprobar en',
	                name:'comprobacion',
	                id:'comprobacion',    
	                allowBlank:false,
	                width:350 
	                },
				]
			}],   
	});
	
//  function adicionar
 
  function adicionar(){  
		 
		Ext.Ajax.request({
		url : '?r=Riesgo/Create', 
			params: { 	
					nombre:Ext.getCmp('nombre').getValue(),  
					indicador:Ext.getCmp('combo_indicadores').getValue(),
					clasificacion:Ext.getCmp('combo_clasificacion').getValue(),
					ocurrencia:Ext.getCmp('combo_prob_ocurrencia').getValue(),
					comprobacion:Ext.getCmp('comprobacion').getValue(),
					ponderacion:Ext.getCmp('ponderacion').getValue()
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
			   msg: 'Se agreg&oacute; correctamente el riesgo',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  });
				store.reload(); 					
				}
			}
			else  Ext.Msg.show({
			   title:'Informaci&oacute;n de error',
			   msg: 'No se pudo adicionar el riesgo, verifique sus datos',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR  
				  });
			
		}//fin del callback				
	})//fin del Ajax.request 
	 
  }	
  function Modificar(){  
	 
		Ext.Ajax.request({
		url : '?r=Riesgo/Update', 
			params: { 	
					id_riesgo:recordSeleccionado.get('id_riesgo'),  
					nombre:Ext.getCmp('nombre').getValue(),  
					indicador:Ext.getCmp('combo_indicadores').getValue(),
					clasificacion:Ext.getCmp('combo_clasificacion').getValue(),
					ocurrencia:Ext.getCmp('combo_prob_ocurrencia').getValue(),
					comprobacion:Ext.getCmp('comprobacion').getValue(),
					ponderacion:Ext.getCmp('ponderacion').getValue()
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
			   msg: 'Se modific&oacute; correctamente el riesgo',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
				  });
				store.reload(); 					
				}
			}
			else  Ext.Msg.show({
			   title:'Informaci&oacute;n de error',
			   msg: 'No se pudo modificar el riesgo, verifique sus datos',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR  
				  });
			
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
			url : '?r=Riesgo/Delete',
			params:{        		
				id_riesgo:recordSeleccionado.get('id_riesgo'),
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
							   msg: 'Se elimin&oacute; correctamente el riesgo.',
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
 
// gestionar paneles
      
	
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',
			autoHeight:true,
			layout:'fit',
              title:'Adicionar riesgo',width:490,autoHeight:true,
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
							!Ext.getCmp('combo_indicadores').getValue() || 
							!Ext.getCmp('nombre').getValue() || 
							!Ext.getCmp('combo_clasificacion').getValue() || 
							!Ext.getCmp('combo_prob_ocurrencia').getValue() ||  
							!Ext.getCmp('ponderacion').getValue() ||  
							!Ext.getCmp('comprobacion').getValue()
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
							  else {
				    adicionar();
					 sm.clearSelections(); }
				 /*  Ext.getCmp('numero_add').reset();
				   Ext.getCmp('nombre_add').reset(); 
				   Ext.getCmp('combo_ObjetivoE_add').reset(); */
                   } 
              },
				{                   
                   text:'Aceptar',
                   handler:function() { 
							if(	
							!Ext.getCmp('combo_indicadores').getValue() || 
							!Ext.getCmp('nombre').getValue() || 
							!Ext.getCmp('combo_clasificacion').getValue() || 
							!Ext.getCmp('combo_prob_ocurrencia').getValue() ||  
							!Ext.getCmp('ponderacion').getValue() ||  
							!Ext.getCmp('comprobacion').getValue()
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
							  else {				   
                    adicionar();
					sm.clearSelections();
					winAddAsociar.hide(); }
                   } 
              }]
            });
          }//fin del if 
		winAddAsociar.add(fpAdicionar);
		winAddAsociar.doLayout();  
		Ext.getCmp('nombre').setValue();  
		Ext.getCmp('combo_indicadores').setValue();
		Ext.getCmp('combo_clasificacion').setValue();
		Ext.getCmp('combo_prob_ocurrencia').setValue();
		Ext.getCmp('comprobacion').setValue();
		Ext.getCmp('ponderacion').setValue(); 
		winAddAsociar.show(); 
		btneliminar.disable();
		btnmodificar.disable();
			//sm.clearSelections();--------------------------------
      };//fin del case
      break; 
        case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,
		  closeAction:'hide',
		  autoHeight:true,
		  layout:'fit',
          title:'Modificar riesgo',width:490,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  sm.clearSelections();
				  btnmodificar.disable();
				  btneliminar.disable();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
				  if(
					!Ext.getCmp('combo_indicadores').getValue() || 
					!Ext.getCmp('nombre').getValue() || 
					!Ext.getCmp('combo_clasificacion').getValue() || 
					!Ext.getCmp('combo_prob_ocurrencia').getValue() ||  
					!Ext.getCmp('ponderacion').getValue() ||  
					!Ext.getCmp('comprobacion').getValue()
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
					  else		{
                    Modificar(); 
					sm.clearSelections();
					winMod.hide(); }
				}
           }]
        });
       }//fin del if 
		fpAdicionar.getForm().reset(); 
        winMod.add(fpAdicionar); 
		 Ext.getCmp('nombre').setValue(recordSeleccionado.get('nombre_riesgo'));  
		 Ext.getCmp('combo_indicadores').setValue(recordSeleccionado.get('id_indicador'));
		 Ext.getCmp('combo_clasificacion').setValue(recordSeleccionado.get('clasificacion'));
		 Ext.getCmp('combo_prob_ocurrencia').setValue(recordSeleccionado.get('prob_ocurrencia'));
		 Ext.getCmp('comprobacion').setValue(recordSeleccionado.get('comprobacion'));
		 Ext.getCmp('ponderacion').setValue(recordSeleccionado.get('ponderacion')); 
        winMod.doLayout();
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
			applyTo: 'riesgo',			
			title: 'Gestionar riesgo',
			layout:'form',
			//bodyStyle:'padding:5px 5px 0',			
			items: [
			 {   
					tbar:[btnadicionar,btnmodificar,btneliminar]//,'->',btnAsociarArea]			
				    
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
