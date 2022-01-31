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
	btnmodificar.enable();
}, this);
  
             
//declaración del store del grid  
var tienePlan;

function CargarValoresAsociados()
{  
	Ext.Ajax.request({
     url : '?r=Plan/PlanIndicador',	   
     params:{  
			id_indicador: Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_plan_mes.loadData(Data);
				if(store_plan_mes.getTotalCount() ==0)
				{
					btnadicionar.enable();
				} 
				else btnadicionar.disable();				
			} 
		}//fin del callback		
    })//fin del Ajax.request
}

 var store_plan_mes =new Ext.data.JsonStore({ 
    root: 'datos',
	baseParams:{start:0, limit:15},
	idProperty: 'id_plan',
    fields: ['nombre_mes','valor_plan_mes','id_indicador','id_plan']
  });  
  var textField = new Ext.form.TextField();
  
 var cm_plan_mes = new Ext.grid.ColumnModel([    
	{id:'nombre_mes',header: 'Mes',  width:10,  dataIndex: 'nombre_mes'},
	{id:'valor_plan_mes',header: 'Valor',  width:10,  dataIndex: 'valor_plan_mes',editor:textField},
	  ]); 
  
  var grid_plan_mes = new Ext.grid.EditorGridPanel({
       store: store_plan_mes,       
        id:'grid_plan_mes',
		name:'grid_plan_mes',
		title:'Plan asociado',
		tbar:[btnadicionar,btnmodificar],
        loadMask:{store:store_plan_mes},
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
    url: '?r=Plan/TodosIndicadores', 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'id_indicador',   
    fields:['cierre_anno_anterior','proyectado','id_indicador','nombre_indicador','descripcion','id_cargo','nombre_cargo'] 
  });   
    store.load(); 
//**********************************  
//declaración del columnModel del grid

	var cm = new Ext.grid.ColumnModel([ 
	new Ext.grid.RowNumberer(),	
	{id:'nombre_indicador',header: 'Indicador',  width:10,sortable: true,  dataIndex: 'nombre_indicador'},
	  ]); 
  
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
		labelAlign:'top',
        bodyStyle:'padding:5px 5px 0',        	
        items: [ {             
		layout:'column',
			items:[	{   
				columnWidth:.5,
				layout: 'form',
				labelWidth: 70,			               
				items: [ 
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Enero',
						name:'enero',
						id:'enero',
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ ,
						allowBlank:false, 
						width:100   
						},
						{ 
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Febrero',
						name:'febrero',
						id:'febrero',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},{ 
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Marzo',
						name:'marzo',
						id:'marzo',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},{ 
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Abril',
						name:'abril',
						id:'abril',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},{ 
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Mayo',
						name:'mayo',
						id:'mayo',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},{ 
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Junio',
						name:'junio',
						id:'junio',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						}, 
					]            
			},
			{	 
				columnWidth:.5,
				layout: 'form',
				//labelWidth: 80,						
				items:[
						{
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Julio',
						name:'julio',
						id:'julio',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},
						 {
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Agosto',
						name:'agosto',
						id:'agosto',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},
						 {
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Septiembre',
						name:'septiembre',
						id:'septiembre',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false,
						width:100
						},
					    {
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Octubre',
						name:'octubre',
						id:'octubre',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},
						 {
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Noviembre',
						name:'noviembre',
						id:'noviembre',  
						maxLength: 20,						
						maskRe:/^[0-9.]?$/ , 
						allowBlank:false, 
						width:100
						},
						 {
						labelWidth: 30,					
						layout:'form',
						xtype:'textfield',
						fieldLabel:'Diciembre',
						name:'diciembre',
						id:'diciembre',  
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
	   autoHeight:true,
        frame:true,		
        bodyStyle:'padding:5px 5px 0',        	
        items: [{             
            layout:'column', 
            items:[{   
				columnWidth:2,
		        layout: 'form',
				labelWidth: 30,			               
				items: [{ 
					xtype:'textfield',
	                fieldLabel:'Valor',
	                name: 'valor_plan',
	                id:'valor_plan', 
					maskRe:/^[0-9.]?$/ , 					
	                allowBlank:false,	 
	                width:200
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
              title:'Adicionar plan',width:300,autoHeight:true,
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
					if(
						!Ext.getCmp('enero').getValue()||  
						!Ext.getCmp('febrero').getValue()||  
						!Ext.getCmp('marzo').getValue()||  
						!Ext.getCmp('abril').getValue()||  
						!Ext.getCmp('mayo').getValue()||  
						!Ext.getCmp('junio').getValue()||  
						!Ext.getCmp('julio').getValue()||  
						!Ext.getCmp('agosto').getValue()||  
						!Ext.getCmp('septiembre').getValue()||  
						!Ext.getCmp('octubre').getValue()||  
						!Ext.getCmp('noviembre').getValue()||  
						!Ext.getCmp('diciembre').getValue()  )
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
            title:'Modificar plan',width:300,autoHeight:true,
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
						if(!Ext.getCmp('valor_plan').getValue())
						   Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'Campos vac&iacute;os o con valores incorrectos',
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
        fpModificar.getForm().reset();	 
        Ext.getCmp('valor_plan').setValue(Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('valor_plan_mes'));  
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
		 url : '?r=Plan/Create',	   
			 params:{ 
				enero:Ext.getCmp('enero').getValue(),  
				febrero:Ext.getCmp('febrero').getValue(),  
				marzo:Ext.getCmp('marzo').getValue(),  
				abril:Ext.getCmp('abril').getValue(),  
				mayo:Ext.getCmp('mayo').getValue(),  
				junio:Ext.getCmp('junio').getValue(),  
				julio:Ext.getCmp('julio').getValue(),  
				agosto:Ext.getCmp('agosto').getValue(),  
				septiembre:Ext.getCmp('septiembre').getValue(),  
				octubre:Ext.getCmp('octubre').getValue(),  
				noviembre:Ext.getCmp('noviembre').getValue(),  
				diciembre:Ext.getCmp('diciembre').getValue(), 
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
					   msg: 'El indicador ya posee un plan',
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
							   msg: 'Se agreg&oacute; correctamente el plan',
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
		url:'?r=Plan/Update',
		method:'POST', 		
		params:
		{   
			id_plan:Ext.getCmp('grid_plan_mes').getSelectionModel().getSelected().get('id_plan'),
			valor_plan:Ext.getCmp('valor_plan').getValue(), 
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
			   msg: 'Se modific&oacute; correctamente el valor.',
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
	 
//******************************
 
		var panel = new Ext.FormPanel({
			width: 904,
			height:460,
			frame:true,	
			applyTo: 'plan',
			border:true,
			title: 'Gestionar plan',
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
