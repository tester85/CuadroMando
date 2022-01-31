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
	CargarValoresAsociados();  
	
}, this);

var planSeleccionado=0;	

  sm_plan_mes = new Ext.grid.RowSelectionModel({
    singleSelect:true,
    listeners : {
      rowselect : On_RowClick
    }    
  });
 // Evento Selection Model grid rowselect 
  function On_RowClick(sm_plan_mes, indiceFila, record){
    plan = record;
    planSeleccionado=rec;
    return planSeleccionado;
  };//fin de la función On_RowClick	
 
     
sm_plan_mes.on('rowselect', function (smodel, rowIndex, keepExisting, record ){	 
	if(registrado)		 // si no esta registrado no habilito el permiso de modificar
	{ 
	btnmodificar.enable();  
	}
}, this);
  
             
//declaración del store del grid  
var tienePlan;

function CargarValoresAsociados()
{  
	Ext.Ajax.request({
     url : '?r=rango/RangoIndicador',	   
     params:{  
			id_indicador: Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_rango.loadData(Data);  
				 if(store_rango.getTotalCount() ==0)
				{	
					if(registrado)		 // es true por default si devuelve false habilito
						{  					//
							btnadicionar.enable();
						} 
				} 
				else btnadicionar.disable();
			} 
		}//fin del callback		
    })//fin del Ajax.request
}

 var store_rango =new Ext.data.JsonStore({ 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_plan',
    fields: ['categoria','valor_minimo','valor_maximo','comp_valor_min','comp_valor_max','id_rango','id_indicador']
  });  
  var textField = new Ext.form.TextField();
  
 var cm_plan_mes = new Ext.grid.ColumnModel([    
	{id:'categoria',header: 'Color',  width:10,  dataIndex: 'categoria'},
	{id:'comp_valor_min',header: '',  width:3,  dataIndex: 'comp_valor_min'},
	{id:'valor_minimo',header: 'Valor m&iacute;nimo',  width:10,  dataIndex: 'valor_minimo'},
	{id:'comp_valor_max',header: '',  width:3,  dataIndex: 'comp_valor_max'},
	{id:'valor_maximo',header: 'Valor m&aacute;ximo',  width:10,  dataIndex: 'valor_maximo'},
	  ]); 
  
  var grid_plan_mes = new Ext.grid.EditorGridPanel({
       store: store_rango,       
        id:'grid_plan_mes',
		name:'grid_plan_mes',
		title:'Rangos de cumplimiento',
		tbar:[btnadicionar,btnmodificar],
        loadMask:{store:store_rango},
        frame:true,
		 cm: cm_plan_mes,
		 sm:sm_plan_mes,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 400,
       // width: 880   
        width:440 
		
    });
 
		
   var store =new Ext.data.JsonStore({
    url: '?r=rango/TodosIndicadores', 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'id_indicador',   
    fields:['cierre_anno_anterior','proyectado','id_indicador','nombre_indicador','descripcion','id_cargo','nombre_cargo'] 
  });   
    store.load(); 
//**********************************  
//declaración del columnModel del grid

	var cm = new Ext.grid.ColumnModel({
	defaults:{ 
			sortable: false
			},
	columns:[ 
	//new Ext.grid.RowNumberer(),	
	{id:'nombre_indicador',header: 'Indicador',  width:10,sortable: true,  dataIndex: 'nombre_indicador'},
	  ]}); 
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid', 
		tbar:['','&nbsp;'],
		title:'Indicadores', 
        loadMask:{store:store},
        frame:true,
		 cm: cm,
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 400,
       // width: 880   
        width:440,
		bbar:new Ext.PagingToolbar({
					  pageSize: 20,
					  store: store,					 
					  displayInfo: true,
					  displayMsg: 'Mostrar {0} - {1} de {2}',
					  emptyMsg: "No hay elementos que mostrar",
					  width:400
					  })
    });
	
var fpAdicionar = new Ext.FormPanel({
       //labelAlign: 'top',
        frame:true,		
		autoHeight:true,
		//labelAlign:'top',
        bodyStyle:'padding:5px 5px 0',        	
        items: [ 
		{             
		layout:'column',
			items:[	
			{   
				columnWidth:.10,
				layout: 'form',
				labelWidth: 40,			               
				items: [ 
						{						
						layout:'form',
						xtype:'label',						 						
						id:'rojo',
						text: 'Rojo'  
						} 
					]            
			},
			{   
				columnWidth:.13,
				layout: 'form',
				labelWidth: 10,			               
				items: [ 
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'combo', 
						width:40,
						name:'op_minimo_rojo',
						id:'op_minimo_rojo', 
						
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false 
						} 
					]            
			},
			{	 
				columnWidth:.29,
				layout: 'form',
				labelWidth: 10,						
				items:[
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_minimo_rojo',
						id:'valor_minimo_rojo',
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ ,
						allowBlank:false, 
						width:100   
						} 		
					] 
			},
			{	 
				columnWidth:.05,
				layout: 'form', 
				items:[
						{  
						xtype:'label',
						text:'y',
						name:'julio', 
						}, 				
					] 
			},
			{	 
				columnWidth:.13,
				labelWidth: 5,	
				layout: 'form', 	
				items:[
						{ 
						layout:'form',
						xtype:'combo', 
						width:40, 
						name:'op_maximo_rojo',
						id:'op_maximo_rojo',  
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false
						}, 				
					] 
			},
			{	 
				columnWidth:.30,
				layout: 'form', 
				labelWidth: 10,					
				items:[
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_maximo_rojo',
						id:'valor_maximo_rojo',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						}, 				
					] 
			}
			 ]					
		},  
        {             
		layout:'column',
			items:[	
			{   
				columnWidth:.10,
				layout: 'form',
				labelWidth: 45,			               
				items: [ 
						{						
						layout:'form',
						xtype:'label', 
						text: 'Amarillo'  
						} 
					]            
			},
			{   
				columnWidth:.13,
				layout: 'form',
				labelWidth: 10,			               
				items: [ 
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'combo', 
						width:40,
						name:'op_minimo_amarillo',
						id:'op_minimo_amarillo', 
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false					
						} 
					]            
			},
			{	 
				columnWidth:.29,
				layout: 'form',
				labelWidth: 10,						
				items:[
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_minimo_amarillo',
						id:'valor_minimo_amarillo',
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ ,
						allowBlank:false, 
						width:100   
						} 		
					] 
			},
			{	 
				columnWidth:.05,
				layout: 'form', 
				items:[
						{  
						xtype:'label',
						text:'y',
						name:'julio', 
						}, 				
					] 
			},
			{	 
				columnWidth:.13,
				labelWidth: 5,	
				layout: 'form', 	
				items:[
						{ 
						layout:'form',
						xtype:'combo', 
						width:40, 
						name:'op_maximo_amarillo',
						id:'op_maximo_amarillo',  
						maxLength: 20,						
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false
						}, 				
					] 
			},
			{	 
				columnWidth:.30,
				layout: 'form', 
				labelWidth: 10,					
				items:[
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_maximo_amarillo',
						id:'valor_maximo_amarillo',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						}, 				
					] 
			}
			 ]					
		},  
        {             
		layout:'column',
			items:[	
			{   
				columnWidth:.10,
				layout: 'form',
				labelWidth: 45,			               
				items: [ 
						{						
						layout:'form',
						xtype:'label', 
						text: 'Verde'  
						} 
					]            
			},
			{   
				columnWidth:.13,
				layout: 'form',
				labelWidth: 10,			               
				items: [ 
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'combo', 
						width:40,
						name:'op_minimo_verde',
						id:'op_minimo_verde', 
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false						
						} 
					]            
			},
			{	 
				columnWidth:.29,
				layout: 'form',
				labelWidth: 10,						
				items:[
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_minimo_verde',
						id:'valor_minimo_verde',
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ ,
						allowBlank:false, 
						width:100   
						} 		
					] 
			},
			{	 
				columnWidth:.05,
				layout: 'form', 
				items:[
						{  
						xtype:'label',
						text:'y',
						name:'julio', 
						}, 				
					] 
			},
			{	 
				columnWidth:.13,
				labelWidth: 5,	
				layout: 'form', 	
				items:[
						{ 
						layout:'form',
						xtype:'combo', 
						width:40, 
						name:'op_maximo_verde',
						id:'op_maximo_verde',  
						maxLength: 20,						
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false
						}, 				
					] 
			},
			{	 
				columnWidth:.30,
				layout: 'form', 
				labelWidth: 10,					
				items:[
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_maximo_verde',
						id:'valor_maximo_verde',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						}, 				
					] 
			}
			 ]					
		},  
           
         ]
	});

var fpModificar = new Ext.FormPanel({
       //labelAlign: 'top',
        frame:true,		
		autoHeight:true,
		//labelAlign:'top',
        bodyStyle:'padding:5px 5px 0',        	
        items: [ 
		{             
		layout:'column',
			items:[	
			{   
				columnWidth:.10,
				layout: 'form',
				labelWidth: 40,			               
				items: [ 
						{						
						layout:'form',
						xtype:'label',						 						
						id:'Color',
						text: 'Rojo'  
						} 
					]            
			},
			{   
				columnWidth:.13,
				layout: 'form',
				labelWidth: 10,			               
				items: [ 
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'combo', 
						width:40,
						name:'op_minimo_color',
						id:'op_minimo_color', 
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false 
						} 
					]            
			},
			{	 
				columnWidth:.29,
				layout: 'form',
				labelWidth: 10,						
				items:[
						{
						labelWidth: 10,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_minimo_color',
						id:'valor_minimo_color',
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ ,
						allowBlank:false, 
						width:100   
						} 		
					] 
			},
			{	 
				columnWidth:.05,
				layout: 'form', 
				items:[
						{  
						xtype:'label',
						text:'y',
						name:'julio', 
						}, 				
					] 
			},
			{	 
				columnWidth:.13,
				labelWidth: 5,	
				layout: 'form', 	
				items:[
						{ 
						layout:'form',
						xtype:'combo', 
						width:40, 
						name:'op_maximo_color',
						id:'op_maximo_color',  
						mode:'local',
						emptyText: '-',
						listWidth:40,
						valueField: 'displayText',
						displayField: 'displayText',
						store: new Ext.data.ArrayStore({
							id: 'store_estado',
							fields: ['myId', 'displayText'],
							data: [[1, '>'], [2, '<'],[3, '='],[4, '>='],[5, '<=']]
						}),			
						triggerAction: 'all',
						editable:false
						}, 				
					] 
			},
			{	 
				columnWidth:.30,
				layout: 'form', 
				labelWidth: 10,					
				items:[
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'',
						name:'valor_maximo_color',
						id:'valor_maximo_color',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						}, 				
					] 
			}
			 ]					
		}]
	});
	
	 
	  
function winFpGestionar(opcion){
    switch(opcion){
      case 'Add': {
          fpAdicionar.getForm().reset();           		  
          if(!winAddAsociar){
            winAddAsociar = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
              title:'Adicionar rango de cumplimiento',width:500,autoHeight:true,
              buttons:
              [ {                  
                  text:'Cancelar',
                  handler:function(){
                  winAddAsociar.hide();
                  }
                }, 
				{                   
                   text:'Aceptar',
                   handler:function() {   
					if(!Ext.getCmp('valor_minimo_rojo').getValue() ||   !Ext.getCmp('op_minimo_rojo').getValue()||  !Ext.getCmp('op_maximo_rojo').getValue()||  !Ext.getCmp('valor_maximo_rojo').getValue()||  !Ext.getCmp('op_minimo_amarillo').getValue()||  	!Ext.getCmp('valor_minimo_amarillo').getValue()||  !Ext.getCmp('op_maximo_amarillo').getValue()||  !Ext.getCmp('valor_maximo_amarillo').getValue()||  !Ext.getCmp('op_minimo_verde').getValue()|| !Ext.getCmp('valor_minimo_verde').getValue()|| !Ext.getCmp('op_maximo_verde').getValue()||  !Ext.getCmp('valor_maximo_verde').getValue())
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
	  btnmodificar.disable();
	//	sm.clearSelections();
      };//fin del case
      break; 
       case 'Mod': {
        if(!winMod){
          winMod = new Ext.Window({modal: true,closeAction:'hide',layout:'fit',
            title:'Modificar rango de cumplimiento',width:500,autoHeight:true,
            buttons:
            [{                
                text:'Cancelar',
                handler:function(){
                  winMod.hide();
				  btnmodificar.disable(); 
				  sm_plan_mes.clearSelections();
                }
              },{                  
                  text:'Aceptar',
                  handler:function(){
				  if(
					!Ext.getCmp('op_minimo_color').getValue() ||
					!Ext.getCmp('valor_minimo_color').getValue() ||
					!Ext.getCmp('op_maximo_color').getValue() ||
					!Ext.getCmp('valor_maximo_color').getValue() 	
					)
						   Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Campos vac&iacute;os o con valores incorrectos',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });
						  else	{
                    modificar();
					winMod.hide();
							}
				}
           }]
        });
       }//fin del if
        fpModificar.getForm().reset();	 
        Ext.getCmp('Color').setText(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('categoria'));  
        Ext.getCmp('op_minimo_color').setValue(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('comp_valor_min'));  
        Ext.getCmp('valor_minimo_color').setValue(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('valor_minimo'));  
        Ext.getCmp('op_maximo_color').setValue(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('comp_valor_max'));
        Ext.getCmp('valor_maximo_color').setValue(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('valor_maximo'));  
        winMod.add(fpModificar);
        winMod.doLayout();
        winMod.show(); 
		btnmodificar.disable();
      //  sm.clearSelections();
      //  sm_plan_mes.clearSelections();
      }//fin del case
      break; 
    }//fin del switch
  };

  
  function adicionar(){
     
		Ext.Ajax.request({
		 url : '?r=Rango/Create',	   
			 params:{ 	
				comp_valor_min_rojo:Ext.getCmp('op_minimo_rojo').getValue(),  
				valor_minimo_rojo:Ext.getCmp('valor_minimo_rojo').getValue(),  
				comp_valor_max_rojo:Ext.getCmp('op_maximo_rojo').getValue(),  
				valor_maximo_rojo:Ext.getCmp('valor_maximo_rojo').getValue(),
				categoria_rojo:'Rojo',
				
				comp_valor_min_amarillo:Ext.getCmp('op_minimo_amarillo').getValue(),  
				valor_minimo_amarillo:Ext.getCmp('valor_minimo_amarillo').getValue(),  
				comp_valor_max_amarillo:Ext.getCmp('op_maximo_amarillo').getValue(),  
				valor_maximo_amarillo:Ext.getCmp('valor_maximo_amarillo').getValue(),
				categoria_amarillo:'Amarillo',				
				
				comp_valor_min_verde:Ext.getCmp('op_minimo_verde').getValue(),  
				valor_minimo_verde:Ext.getCmp('valor_minimo_verde').getValue(),  
				comp_valor_max_verde:Ext.getCmp('op_maximo_verde').getValue(),  
				valor_maximo_verde:Ext.getCmp('valor_maximo_verde').getValue(),  
				categoria_verde:'Verde',
				 
				id_indicador:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador')
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
					   msg: 'El indicador ya posee un rango establecido',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR 
									});	
					} 
					var jsonData = Ext.decode(dd);//extraigo la información
					if(jsonData==true)
						{           
						Ext.Msg.show({
							   title:'Informaci&oacute;n',
							   msg: 'Se agreg&oacute; correctamente el rango de cumplimiento',
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
  
function modificar(){  
	 	Ext.Ajax.request({
		url:'?r=Rango/Update',
		method:'POST', 		
		params:
		{   
		comp_valor_min:Ext.getCmp('op_minimo_color').getValue(),
		valor_min:Ext.getCmp('valor_minimo_color').getValue(),
		comp_valor_max:Ext.getCmp('op_maximo_color').getValue(),
		valor_max:Ext.getCmp('valor_maximo_color').getValue(),
		id_rango:Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('id_rango'),
		categoria:Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('categoria'),
		id_indicador:Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador'),
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
					   msg: 'Se modific&oacute; correctamente el rango de cumplimiento.',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.INFO  
						});
					 Ext.getCmp('grid').getStore().load(); 					
				}
				else Ext.Msg.show({
					   title:'Informaci&oacute;n de error',
					   msg: 'No se pudo modificar el rango.',
					   buttons: Ext.Msg.OK,
					   //fn: processResult,
					   animEl: 'elId',
					   icon: Ext.MessageBox.ERROR  
						});
			}
			
		}//fin del callback				
	})//fin del Ajax.request 
	  
	}  
	 
//******************************
 
		var panel = new Ext.FormPanel({
			width: 904,
			height:460,
			frame:true,	
			applyTo: 'rango',
			border:true,
			title: 'Gestionar rango de cumplimiento',
			bodyStyle:'padding:5px 5px 0',			
			items: [ {   
				layout:'column',
				items:[{                 
						columnWidth:.5,
						layout: 'column',		               
						items:[ 
							grid
							]
						},
						{                 
						columnWidth:.5,
						layout: 'column',		               
						items:[ 
							grid_plan_mes
							]
						}]       
					}],
		});
	
  

});
