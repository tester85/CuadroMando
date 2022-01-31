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
 
		if(!recordSeleccionado.get('valor_real'))
		{
			btnadicionar.enable();
			btnmodificar.disable();
		}
		else { 
			btnadicionar.disable();
			btnmodificar.enable();
			} 
}, this);
	
var btnadicionar= new Ext.Button({
       disabled:true,
	   id:'btnadicionar', 
	   //iconCls:'btn', 
	   text:'Adicionar', 
	   width: 30,
	handler:function(){
	var date = new Date(); 
	if(recordSeleccionado.get('id_mes') > date.getMonth()+1)
	{
		 Ext.Msg.show({
			   title:'Informaci&oacute;n de error',
			   msg: 'Este mes no se encuentra disponible para la asignacion de un real',
			   buttons: Ext.Msg.OK, 
			   animEl: 'elId',
			   icon: Ext.MessageBox.ERROR });
	}
	else winFpGestionar('Add');
	
	} 
	});
var btnmodificar= new Ext.Button({
	   disabled:true,
   id:'btnmodificar', 
   //iconCls:'btn', 
   text:'Modificar', 
   width: 30, 
handler:function(){
	var date = new Date();  
	 	winFpGestionar('Mod');} 	   
}); 
var btnBuscar = new Ext.Button({
	disabled:false,
	id:'btnConsultar',
	text:'Buscar',
	width:30,
	handler:function(){ 
				CargarDatosAsociadas(); 
				//CargarObjetivosAsociadas(); 
   }	 	   
});
   
function CargarDatosAsociadas()
{  
	Ext.Ajax.request({
    url: '?r=Real/Todos', 
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
			btnmodificar.disable();
			store.removeAll();
		},
		'expand':function(){
			btnadicionar.disable();
			btnmodificar.disable();
			store.removeAll();
		} 
	}
	});  
             
//declaración del store del grid  
	
   var store =new Ext.data.JsonStore({
 //   url: '?r=Area/Areas', 
    root: 'datos',
//	baseParams:{start:0, limit:15},
	idProperty: 'id_plan',
    fields:['cierre_anno_anterior',
	'nombre_indicador',
	'id_indicador',
	'id_mes',
	'nombre_mes',
	'valor_plan_mes',
	'id_plan',
	'valor_real',
	'id_real',
	'solucion',
	'observacion',
	'nombre',
	] 
  });   
   // store.load();
//**********************************  
//declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel([  
	{id:'nombre_mes',header:'Mes', width:15,dataIndex: 'nombre_mes'}, 
	{id:'valor_plan_mes',header: 'Plan', width:20,  dataIndex: 'valor_plan_mes'},
	{id:'valor_real',header: 'Real',  width:20,  dataIndex: 'valor_real'},
	{id:'porciento',header: 'Porciento %',  width:20,  dataIndex: 'porciento', 
		renderer: function(v, params, record){
				if(record.data.valor_plan_mes != 0)  
				var val = Math.round((record.data.valor_real/record.data.valor_plan_mes)*100);
				else  val=0; 
				
				if(val >= 0 && val <= 40)
				   { 	
						return '<span style="color:red;">' + val + '%</span>';
					}
				else if(val > 40 && val <= 80)
					{
						if(record.data.valor_plan_mes = 0) val=0;
						return '<span style="color:orange;">' + val + '%</span>';
					}
				else if(val > 80)
					{
						if(record.data.valor_plan_mes = 0) val=0;
						return '<span style="color:green;">' + val + '%</span>';
					} 
                },
	}, 
	{id:'observacion',header: 'Observaci&oacute;n',  width:30,  dataIndex: 'observacion'},
	{id:'solucion',header: 'Soluci&oacute;n',  width:30,  dataIndex: 'solucion'}
				]); 
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid',
		tbar:[btnadicionar,btnmodificar],
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
        height: 358,
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
			labelWidth: 67,			               
			items: [ 			
				{ 
					xtype:'textfield',
	                fieldLabel:'Valor real',
	                name: 'valor_mes',
	                id:'valor_mes',  
	                allowBlank:false,	//marca el camp si se deja en blanco
	                width:310
					},{ 
					xtype:'textarea',
	                fieldLabel:'Observaci&oacute;n',
	                name: 'observacion',
	                id:'observacion',                         
					grow:true,
					growMax:150, 
	              //  allowBlank:false,	//marca el camp si se deja en blanco
	                width:360
					},{ 
					xtype:'textarea',
	                fieldLabel:'Soluci&oacute;n',
	                name: 'solucion',
	                id:'solucion',                         
					grow:true,
					growMax:150, 
	               // allowBlank:false,	//marca el camp si se deja en blanco
	                width:360
					}]	
			}]            
        },  
         ]
	});
	/*
	var fpModificar = new Ext.FormPanel({ 
	   autoHeight:true,
        frame:true,		
        bodyStyle:'padding:5px 5px 0',        	
        items: [{             
            layout:'column', 
            items:[{   
				columnWidth:2,
		        layout: 'form',
				labelWidth: 67,			               
				items: [{ 
					xtype:'textarea',
	                fieldLabel:'&Aacute;rea',
	                name: 'nombre_mod',
	                id:'nombre_mod',
					grow:true,
					growMax:150,	   
	                allowBlank:false,	//marca el camp si se deja en blanco
	                width:310
						}]            
				}] 
         				
			   },{
			xtype:'label', html:'<br>'
				}]
	   });		
	  */
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
              title:'Adicionar real',width:540,autoHeight:true,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
				  btnadicionar.disable();
                  winAddAsociar.hide();
				  sm.clearSelections();
                  }
                }, 
				{                   
                   text:'Aceptar',
                   handler:function() {
				 if(!Ext.getCmp('valor_mes').getValue() )
					  Ext.Msg.show({
						   title:'Informaci&oacute;n de error',
						   msg: 'Campos vac&iacute;os o con valores incorrectos',
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
		  
		fpAdicionar.getForm().reset();  
		winAddAsociar.add(fpAdicionar);
		winAddAsociar.setTitle('Adicionar real del mes de '+ recordSeleccionado.get('nombre_mes'));
		winAddAsociar.doLayout(); 
		winAddAsociar.show(); 
		btnmodificar.disable();
		sm.clearSelections(); 
	};//fin del case
      break; 
       case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
            title:'Modificar real',width:540,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable(); 
				  btnadicionar.disable();
				  sm.clearSelections();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
				  if(!Ext.getCmp('valor_mes').getValue())
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
					winMod.hide();
					}
				}
           }]
        });
       }//fin del if 
	   
	   
	    fpAdicionar.getForm().reset(); 
        winMod.add(fpAdicionar);
        winMod.doLayout();  
		winMod.setTitle('Modificar real del mes de '+ recordSeleccionado.get('nombre_mes'));
		Ext.getCmp('valor_mes').setValue(recordSeleccionado.get('valor_real')), 
		Ext.getCmp('observacion').setValue(recordSeleccionado.get('observacion')), 
		Ext.getCmp('solucion').setValue(recordSeleccionado.get('solucion')), 
        winMod.show();  
		btnmodificar.disable();
        sm.clearSelections();
      }//fin del case
      break; 
    }//fin del switch
  };

  
  function adicionar(){
 
    Ext.Ajax.request({
     url : '?r=Real/Create',	   
		 params:{ 
			valor_mes:Ext.getCmp('valor_mes').getValue(), 
			observacion:Ext.getCmp('observacion').getValue(), 
			solucion:Ext.getCmp('solucion').getValue(),  
			id_plan:recordSeleccionado.get('id_plan'),  
			id_indicador:recordSeleccionado.get('id_indicador'),  
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
				   msg: 'Este mes ya posee un real asociado',
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
							   msg: 'Se asoci&oacute; correctamente el valor real del mes',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.INFO  
						  });
					CargarDatosAsociadas(); 
					sm.clearSelections();					
				}
			else   Ext.Msg.show({
		   title:'Informaci&oacute;n de error',
		    msg: 'Este mes ya posee un real asociado',
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
		url:'?r=Real/Update',
		method:'POST', 		
		params:
		{   
			id_real:recordSeleccionado.get('id_real'),
			valor_mes:Ext.getCmp('valor_mes').getValue(), 
			observacion:Ext.getCmp('observacion').getValue(), 
			solucion:Ext.getCmp('solucion').getValue(), 
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
			   msg: 'Se modific&oacute; correctamente el real.',
			   buttons: Ext.Msg.OK,
			   //fn: processResult,
			   animEl: 'elId',
			   icon: Ext.MessageBox.INFO  
		  });
					CargarDatosAsociadas();
					sm.clearSelections();					
				}
			}
			
		}//fin del callback				
	})//fin del Ajax.request
	  
	} 
 
		var panel = new Ext.FormPanel({
		  width: 904,
			frame:true,	
			applyTo: 'real',			
			title: 'Gestionar real',
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
						columnWidth:1,
						layout: 'form',
						//labelWidth: 1,			               
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
