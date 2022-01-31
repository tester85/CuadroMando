Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
Ext.onReady(function()
{

var ctEl;
var panel;
var sm;
var rec;
var winAddAsociar;
var winMod;
var aux;
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
	   handler:function(){//eliminar();
	   eliminar();
	   } 
	});
   
          
   

//variable que captura el record seleccionado    
  var recordSeleccionado=0;	
  //selection model permite escuchar los eventos sobre una fila del grid
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
	if(registrado)
	{
		btneliminar.enable();
		btnmodificar.enable();  
	}
}, this);
  
             
//declaración del store del grid  
	
   var store =new Ext.data.JsonStore({
    url: '?r=ObjetivoEstrategico/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_objetivo_estrategico',
    fields:['id_objetivo_estrategico','id_perspectiva','nombre_perspectiva','nombre_objetivo_est'] 
  });   
    store.load(); 
	
	storePerspectiva =new Ext.data.JsonStore({
    url: '?r=Perspectiva/TodasPersp', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_perspectiva',
    fields:['id_perspectiva','nombre_perspectiva'] 
  });   
  storePerspectiva.load();
//**********************************  
//declaración del columnModel del grid
 
 var cm = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[  
			{id:'nombre_objetivo_est',width: 80,header: 'Objetivo estratégico', dataIndex: 'nombre_objetivo_est'},
			//{ id: 'fecha_cumplimiento',header: 'Fecha de Cumplimiento', width: 15, dataIndex:'fecha_cumplimiento'},//,xtype: 'datecolumn', format: 'd-m-Y'}, 
            {id:'nombre_perspectiva',width: 40,header: 'Perspectiva', dataIndex: 'nombre_perspectiva'},
   ]}); 
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid',
        //margins:'2 2 2 -4',
		iconCls:'icon-grid',
        loadMask:{store:store},
        frame:true,
		 cm: cm,
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 370,
        width: 880   
    }); 
		
var fpAdicionar = new Ext.FormPanel({
       //labelAlign: 'top',
        frame:true,		
		autoHeight:true,
        bodyStyle:'padding:5px 5px 0',        	
        items: [{             
            layout:'column', 
            items:[{   
			columnWidth:1,
		        layout: 'form',
			labelWidth: 78,			               
			items: [
					{ 
					xtype:'textarea',
	                fieldLabel:'Objetivo',
	                name: 'nombre_add',
	                id:'nombre_add',                         
					grow:true,
					growMax:150, 
	                allowBlank:false,	//marca el camp si se deja en blanco
	                width:310
					},
					{
					xtype:'combo',
					id:'combo_add',
					name:'combo_add',
					displayField:'nombre_perspectiva',
					valueField:'id_perspectiva',
					width:310,
					forceSelect:true,
					fieldLabel:'Perspectiva',		
					typeAhead: true,
					mode:'local',
					emptyText:'   -- Seleccionar --',
					listWidth:300,
					loadingText:'buscando...',
					minChars : 1,
					store:storePerspectiva,					
					triggerAction: 'all',
					editable:false
				} 
				]            
			}]					
        } ]
	});
	  
	var fpModificar = new Ext.FormPanel({ 
	   autoHeight:true,
        frame:true,		
        bodyStyle:'padding:5px 5px 0',        	
        items: [{             
            layout:'column', 
            items:[{   
				columnWidth:2,
		        layout: 'form',
				labelWidth: 78,			               
				items: [
				{ 
					xtype:'textarea',
	                fieldLabel:'Objetivo',
	                name: 'nombre_mod',
	                id:'nombre_mod',                         
					grow:true,
					growMax:150, 
	                allowBlank:false,	//marca el camp si se deja en blanco
	                width:310
				},
				{
					xtype:'combo',
					id:'combo_mod',
					name:'combo_mod',
					displayField:'nombre_perspectiva',
					valueField:'id_perspectiva',
					width:200,
					forceSelect:true,
					fieldLabel:'Perspectiva',		
					typeAhead: true,
					mode:'local',
					emptyText: '-- Seleccionar --',
					listWidth:300,
					loadingText:'buscando...',
					minChars : 1,
					store:storePerspectiva,					
					triggerAction: 'all',
					editable:false
				} 
				]            
				}] 
         				
			   },{
			xtype:'label', html:'<br>'
				}]
	   });		
	  
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
              title:'Adicionar objetivo estrat&eacute;gico',width:460,autoHeight:true,
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
					!Ext.getCmp('nombre_add').getValue() ||
					!Ext.getCmp('combo_add').getValue()  
					)
					  Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Campos vacios o con valores incorrectos',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR
					  });
					else {
					adicionar();
					fpAdicionar.getForm().reset();
						}
                   }
              },
				{                   
                   text:'Aceptar',
                   handler:function() { 
					if(!Ext.getCmp('nombre_add').getValue() ||
					!Ext.getCmp('combo_add').getValue()  
					)
					  Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Campos vacios o con valores incorrectos',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR
					  });
					else {				   
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
	  btneliminar.disable();
	  btnmodificar.disable();
		sm.clearSelections();
      };//fin del case
      break; 
       case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
            title:'Modificar objetivo estrat&eacute;gico',width:460,autoHeight:true,
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
				  if(!Ext.getCmp('nombre_mod').getValue() ||
					!Ext.getCmp('combo_mod').getValue()  
					)
					  Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Campos vacios o con valores incorrectos',
						   buttons: Ext.Msg.OK,
						   //fn: processResult,
						   animEl: 'elId',
						   icon: Ext.MessageBox.ERROR
					  });
					else {	
                    modificarA();
					winMod.hide();
					}
				}
           }]
        });
       }//fin del if
        fpModificar.getForm().reset();
        Ext.getCmp('nombre_mod').setValue(recordSeleccionado.get('nombre_objetivo_est')); 
		Ext.getCmp('combo_mod').setValue(recordSeleccionado.get('id_perspectiva'));    
		 
        winMod.add(fpModificar);
        winMod.doLayout();
        winMod.show(); 
		btneliminar.disable();
		btnmodificar.disable();
        sm.clearSelections();
      }//fin del case
      break; 
    }//fin del switch
  };

  
  function adicionar(){
 
    Ext.Ajax.request({
     url : '?r=ObjetivoEstrategico/Create',	   
		 params:{ 
			nombre_objetivo_estrategico:Ext.getCmp('nombre_add').getValue(),  
			id_perspectiva:Ext.getCmp('combo_add').getValue()    
				},	
	callback: function(a,b,c)
		{
			if(b)
			{
				var dd = c.responseText;
				var jsonData = Ext.decode(dd);//extraigo la información
				if(jsonData==true)
				{
				        //Ext.Msg.alert('Confirmaci&oacute;n','Se agreg&oacute; correctamente la clave');             
					Ext.Msg.show({
							   title:'Informaci&oacute;n',
							   msg: 'Objetivo estrat&eacute;gico adicionado correctamente.',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
					 Ext.getCmp('grid').getStore().load(); 					
				}
			else   Ext.Msg.show({
		   title:'Informaci&oacute;n de error',
		   msg: 'La perspectiva ya existe',
		   buttons: Ext.Msg.OK,
		   //fn: processResult,
		   animEl: 'elId',
		   icon: Ext.MessageBox.ERROR
           
	  });	
			}
//--------------------			
		}//fin del callback
    })//fin del Ajax.request
 	
	
  }
  
function modificarA(){ 
	 	 
		Ext.Ajax.request({
		url:'?r=ObjetivoEstrategico/Update',
		method:'POST', 		
		params:
		{   
			id_objetivo_estrategico:recordSeleccionado.get('id_objetivo_estrategico'),
			nombre_objetivo_estrategico:Ext.getCmp('nombre_mod').getValue(),  
			id_perspectiva:Ext.getCmp('combo_mod').getValue() 
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
					   msg: 'Objetivo estrat&eacute;gico modificado correctamente.',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.INFO  
								});
					 Ext.getCmp('grid').getStore().load(); 					
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
      			url : '?r=ObjetivoEstrategico/Delete',
		 params:{ 
        		id_objetivo_estrategico:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_objetivo_estrategico'),            
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
							   msg: 'Objetivo estrat&eacute;gico eliminado correctamente',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							 Ext.getCmp('grid').getStore().load(); 
						} 
					 }
						else Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'El objetivo estrat&eacute;gico no ha sido eliminado, verifique que no tenga datos asociados',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });					 
			       } 
    })	 //fin del Ajax.request
  } 
//******************************
		var panel = new Ext.FormPanel({
		  width: 904,
			frame:true,	
			applyTo: 'objetivoEstrategico',			
			title: 'Gestionar objetivo estrat&eacute;gico ',
			bodyStyle:'padding:5px 5px 0',			
			items: [{   
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
					  })
		});
	
  

});
