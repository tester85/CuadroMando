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
    url: '?r=UnidadMedida/UnidadesMedida', 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_unidad_medida',
    fields:['id_unidad_medida','nombre'] 
  });   
    store.load();
	
	
//**********************************  
//declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel({ 
		defaults: { 
				sortable: true
			},		
		columns:[
		//new Ext.grid.RowNumberer(),	
		{id:'nombre',header: 'Nombre',  width:50,  dataIndex: 'nombre'}
	
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
			labelWidth: 75,			               
			items: [{ 
			xtype:'textfield',
	                fieldLabel:'Unidad de Medida',
	                name: 'nombre_add',
	                id:'nombre_add', 
					width:100,
	                allowBlank:false,	//marca el camp si se deja en blanco 
				}]            
			}]					
        },  
         ]
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
				labelWidth: 75,			               
				items: [{ 
					xtype:'textfield',
					fieldLabel:'Unidad de Medida',
	                name: 'nombre_mod',
	                id:'nombre_mod', 
					width:100,
	                allowBlank:false,	//marca el camp si se deja en blanco 
						}]            
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
              title:'Adicionar unidad de medida',width:250,autoHeight:true,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsociar.hide();
                  }
                },{                   
                   text:'Aplicar',
                   handler:function() {
					if(!Ext.getCmp('nombre_add').getValue() )
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
				   Ext.getCmp('nombre_add').reset(); }
                   }
              },
				{                   
                   text:'Aceptar',
                   handler:function() {                      
				   if(!Ext.getCmp('nombre_add').getValue() )
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
            title:'Modificar unidad de medida',width:250,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable();
				  btneliminar.disable();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
				  if(!Ext.getCmp('nombre_mod').getValue())
				   Ext.Msg.show({
					   title:'Informaci&oacute;n de error',
					   msg: 'Campos vacíos o con valores incorrectos',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR  
				  });
				  else	{	 
                    modificarA();
					winMod.hide(); }
				}
           }]
        });
       }//fin del if
        fpModificar.getForm().reset();
        Ext.getCmp('nombre_mod').setValue(recordSeleccionado.get('nombre'));  
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
     url : '?r=UnidadMedida/Create',	   
		 params:{ 
			nombre:Ext.getCmp('nombre_add').getValue(),  
				},	
	callback: function(a,b,c)
		{
			if(b)
			{
				var dd = c.responseText;
				if(dd == "") 
				{
					Ext.Msg.show({
				   title:'Informaci&oacute;n de error',
				   msg: 'La unidad de medida ya existe',
				   buttons: Ext.Msg.OK,
				   //fn: processResult,
				   animEl: 'elId',
				   icon: Ext.MessageBox.ERROR 
								});	
				}
				var jsonData = Ext.decode(dd);//extraigo la información
				if(jsonData==true)
				{
				        //Ext.Msg.alert('Confirmaci&oacute;n','Se agreg&oacute; correctamente la clave');             
					Ext.Msg.show({
							   title:'Informaci&oacute;n',
							   msg: 'Se agreg&oacute; correctamente la unidad de medida.',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
					 Ext.getCmp('grid').getStore().load(); 					
				}
			  
			}
//--------------------			
		}//fin del callback
    })//fin del Ajax.request 
  }
  
function modificarA(){  
		Ext.Ajax.request({
		url:'?r=UnidadMedida/Update',
		method:'POST', 		
		params:
		{   
			id_unidad_medida:recordSeleccionado.get('id_unidad_medida'),
			nombre:Ext.getCmp('nombre_mod').getValue(), 
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
			   msg: 'Se modific&oacute; correctamente la unidad de medida.',
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
			    //Ext.getBody().mask('Por favor espere. Eliminando ...');
                                eliminarAjax();
				Ext.getCmp("btneliminar").disable();
				Ext.getCmp('btnmodificar').disable();
				sm.clearSelections();				
				
				//Ext.Msg.alert('Notificaci&oacute;n',"Se elimin&oacute; correctamente");
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
      			url : '?r=UnidadMedida/Delete',
		 params:{ 
        		id_unidad_medida:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_unidad_medida')          
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
							   msg: 'Unidad de medida eliminada correctamente',
							   buttons: Ext.Msg.OK, 
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
							 Ext.getCmp('grid').getStore().load(); 
						}
					 } //fin del if        
			       }//fin de la función callback 
    })//fin del Ajax.request
  }//fin de la función eliminarAjax
//******************************
		var panel = new Ext.FormPanel({
		  width: 904,
			frame:true,	
			applyTo: 'unidades',			
			title: 'Gestionar unidad de medida',
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
