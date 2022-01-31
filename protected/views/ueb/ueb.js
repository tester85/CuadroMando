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
	btneliminar.enable();
	btnmodificar.enable();
}, this); 
             
//declaración del store del grid  
	
   var store =new Ext.data.JsonStore({
    url: '?r=Ueb/Todos', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_ueb',
    fields:['id_ueb','id_provincia','nombre_ueb','nombre_provincia'] 
  });   
    store.load(); 
	
	storeProvincia =new Ext.data.JsonStore({
    url: '?r=Ueb/Provincias', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_provincia',
    fields:['id_provincia','nombre_provincia'] 
  });   
  storeProvincia.load();
//**********************************  
//declaración del columnModel del grid
 
 var cm = new Ext.grid.ColumnModel([  
			{id:'nombre_ueb',width: 20,header: 'UEB', dataIndex: 'nombre_ueb'},
			{ id: 'nombre_provincia',header: 'Provincia', width: 50, dataIndex:'nombre_provincia'}            
   ]); 
  
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
					xtype:'combo',
					id:'combo_provincia',
					name:'combo_provincia',
					displayField:'nombre_provincia',
					valueField:'id_provincia',
					width:300,
					forceSelect:true,
					fieldLabel:'Provincia',							
					mode:'local',
					emptyText:'   -- Seleccionar --',
					listWidth:300,
					loadingText:'buscando...',					
					store:storeProvincia,					
					triggerAction: 'all',
					editable:false
				    }, 
					{ 
					xtype:'textfield',
	                fieldLabel:'UEB',
	                name: 'nombre',
	                id:'nombre',  
	                allowBlank:false,	//marca el camp si se deja en blanco
	                width:300
					},
					
				]            
			}]					
        } ]
	});
	 
	  
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
              title:'Adicionar UEB',width:450,autoHeight:true,
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
					  !Ext.getCmp('nombre').getValue() ||
					  !Ext.getCmp('combo_provincia').getValue() 
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
						   /*
						   Ext.getCmp('nombre').reset(); 
						   Ext.getCmp('combo_provincia').reset(); */
						   }
                   }
              },
				{                   
                   text:'Aceptar',
                   handler:function() {   
					if(
					  !Ext.getCmp('nombre').getValue() ||
					  !Ext.getCmp('combo_provincia').getValue() 
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
					winAddAsociar.hide(); }
                   }
              }]
            });
          }//fin del if		
		winAddAsociar.add(fpAdicionar);
		Ext.getCmp('nombre').setValue(' '); 
		Ext.getCmp('combo_provincia').setValue(''); 
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
            title:'Modificar UEB',width:450,autoHeight:true,
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
					!Ext.getCmp('nombre').getValue() ||
					!Ext.getCmp('combo_provincia').getValue() )
						   Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Campos vacíos o con valores incorrectos.',
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
        winMod.add(fpAdicionar);
		Ext.getCmp('nombre').setValue(recordSeleccionado.get('nombre_ueb')); 
		Ext.getCmp('combo_provincia').setValue(recordSeleccionado.get('id_provincia'));
        winMod.doLayout();
        winMod.show(); 
		btneliminar.disable();
		btnmodificar.disable();
       
      }//fin del case
      break; 
    }//fin del switch
  };

  
  function adicionar(){
 
    Ext.Ajax.request({
     url : '?r=Ueb/Create',	   
		 params:{ 
					nombre:Ext.getCmp('nombre').getValue(),
					id_provincia:Ext.getCmp('combo_provincia').getValue(), 
			 
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
							   msg: 'Se agreg&oacute; correctamente la UEB',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
					 Ext.getCmp('grid').getStore().load(); 					
				}
			else   Ext.Msg.show({
		   title:'Informaci&oacute;n de error',
		   msg: 'La UEB ya existe',
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
		url:'?r=Ueb/Update',
		method:'POST', 		
		params:
		{   
			nombre:Ext.getCmp('nombre').getValue(),
			id_provincia:Ext.getCmp('combo_provincia').getValue(),  
			id_ueb:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_ueb'),  
			 
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
					   msg: 'UEB modificada correctamente',
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
      			url : '?r=Ueb/Delete',
		 params:{ 
        		id_ueb:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_ueb'), 
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
							   msg: 'UEB eliminada correctamente',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							 Ext.getCmp('grid').getStore().load(); 
						} 
					 }
						else Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'La UEB no ha sido eliminada',
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
			applyTo: 'ueb',			
			title: 'Gestionar UEB',
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
