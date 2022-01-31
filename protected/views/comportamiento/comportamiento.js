Ext.chart.Chart.CHART_URL = '../../resources/charts.swf';

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
var panel_graf;

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
  
function CargarValoresAsociados()
{  
	Ext.Ajax.request({
     url : '?r=Comportamiento/Todos',	   
     params:{  
			id_indicador: Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_graf.loadData(Data); 
			} 
		}//fin del callback		
    })//fin del Ajax.request
} 
   
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record ){
	if(Ext.getCmp('grid').getSelectionModel().getSelected().get('nombre_indicador') == "Salario Medio / Productividad")
	{
		Ext.getCmp('panel_graf').setTitle('Comportamiento del indicador '+ Ext.getCmp('grid').getSelectionModel().getSelected().get('nombre_indicador') + " (Escala 10x1)")
	}
	else Ext.getCmp('panel_graf').setTitle('Comportamiento del indicador '+ Ext.getCmp('grid').getSelectionModel().getSelected().get('nombre_indicador'));
	
	CargarValoresAsociados(); 	
}, this);
  
  
 
  var store = new Ext.data.GroupingStore({
	 url: '?r=Comportamiento/TodosIndicadores',  
	//baseParams:{ start:0,limit:16},
	sortInfo:{field:'nombre_perspectiva', direction: "Asc"},	
	groupField:'nombre_perspectiva',	
	reader:new Ext.data.JsonReader({
		root: 'datos', 
		//totalProperty : 'total'
		},
		[{name: 'cierre_anno_anterior'},
		 {name: 'proyectado'},
		 {name: 'id_indicador'},
		 {name: 'nombre_indicador'},
		 {name: 'id_cargo'},
		 {name: 'nombre_cargo'},
		 {name: 'categoria'},
		 {name: 'nombre_perspectiva'},
		 {name: 'id_perspectiva'},
		 {name: 'porciento', type: 'float'} 
		  ]		  
	)
}); 
    store.load();
	
	
	 
 var store_graf =new Ext.data.JsonStore({
   // url: '?r=Comportamiento/Todos', 
    root: 'datos',
//	baseParams:{start:0, limit:15},
	idProperty: 'id_plan',
    fields:[
	 'cierre_anno_anterior',
	'nombre_indicador',
	'id_indicador',
	'id_mes',
	'nombre_mes',
	{name:'valor_plan_mes', type:'float'},
	{name:'valor_real', type:'float'}, 
	'id_plan', 
	'id_real',
	'solucion',
	'observacion',
	'nombre',
	
	] 
  });   
   // store_graf.load();
//**********************************  
//declaración del columnModel del grid
  
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid',
		//tbar:[btnadicionar,btnmodificar,btneliminar],
        //margins:'2 2 2 -4',
		iconCls:'icon-grid',
		 columns:[
			{id:'nombre_indicador',header:'Agrupados por perspectivas', width:30,dataIndex: 'nombre_indicador'}, 
			{id:'nombre_perspectiva', header:'', width:30,dataIndex: 'nombre_perspectiva'}, 
		 ],
        loadMask:{store:store},
        frame:true, 
		 sm:sm,
		 view: new Ext.grid.GroupingView({
		  forceFit:true,
		  hideGroupedColumn:true,
		  showGroupName:false,
		//  groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Indicadores" : "Categoria"]})',
		  hideGroupedColumn:true,
		  enableGroupingMenu:true,
		  frame: true,
		  startCollapsed:true,
		  forceFit: true,
			showPreview: true, // custom property
			 enableRowBody: true, // required to create a second, full-width row to show expanded Record data
			getRowClass: function(record, rowIndex, rp, ds){ // rp = rowParams
				if(this.showPreview){
					if(record.data.categoria == "Rojo")
					{ 
			//rp.body = 'Porciento:'+record.data.porciento+' Categoria: '+record.data.categoria+'</p>';
						return 'red-row';
					}
					else if(record.data.categoria == "Verde")
					{
			//rp.body = 'Porciento:'+record.data.porciento+' Categoria: '+record.data.categoria+'</p>';
						return 'green-row';
					}
					else if(record.data.categoria == "Amarillo")
					{ 
			//rp.body = 'Porciento:'+record.data.porciento+' Categoria: '+record.data.categoria+'</p>';
						return 'yellow-row';
					}
					else 
					{
		//	rp.body = 'Porciento:'+record.data.porciento+' Categoria: '+record.data.categoria+'</p>';
						return 'red-row';
					}
				}
				//return 'green-row';
					}
        }),
      
       stripeRows: true,        
        height: 450,
        width: 250,
		/*bbar:new Ext.PagingToolbar({
		  pageSize: 16,
		  store: store,
		  displayInfo: true,
		  displayMsg: 'Mostrar {0} - {1} de {2}',
		  emptyMsg: "No hay elementos que mostrar" 
		  }) */
    }); 

Ext.chart.Chart.CHART_URL = '../CuadroM/js/ext-3.1/resources/charts.swf';
 
var panel_grid =  new Ext.Panel({ 
		title:'Indicadores',
		split: true,
		width: 250,
		collapsible: true,
		region:'west',
		margins:'3 0 3 3',
		cmargins:'3 3 3 3',    
		items:[grid] 
}); 
 
 
var  panel_graf = new Ext.Panel({
		  width: 650,
		 region: 'center',
		 name:'panel_graf',
		 id:'panel_graf',
         margins:'3 3 3 0', 
		 cmargins:'3 3 3 3',
		  height: 480,
			//frame:true, 
			title: 'Comportamiento',
			bodyStyle:'padding:5px 5px 0',
			items:[{
					xtype:'columnchart',
					id:'columnchart',
					store: store_graf ,         
					xField: 'nombre_mes',
					 
				  //  yField: 'valor_real',
					series:[                 
					{yField:'valor_plan_mes',displayName:'Plan'},
					{yField:'valor_real',displayName:'Real',style:{name:'color'}}
					],  
					listeners:{
							itemclick: function(o){
								var rec = store_graf.getAt(o.index);
							 	//alert(rec.get('observacion')); 
							
							   var winP = new Ext.Window({
								title:'Datos del indicador',
								layout:'fit',
								width:410,
								height:240,
								closeAction:'hide',
								items:[
									{xtype:'label',
									 //text: 'Observaciones',
									// html: '<br><br>'
									},
									{
										xtype:'textarea',
										width:400,
										height:200,
										value:rec.get('observacion'),
										readOnly:true
									} 
								],
								plain: true, 
								buttons: [{
									text: 'Cerrar',
									handler: function(){
										winP.hide();
									}
								}]
							});
						 
					winP.show(); 	 				
							}
						},
					 
						//extra styles get applied to the chart defaults
						extraStyle :
						{	
							animationEnabled: true,		 
							legend:
							{   
								display: 'bottom',					
								padding: 5,
								font:
								{   //color:0x59BBE8,
									family: 'Tahoma',
									size: 13
								}
							},
							//background:{ color:0x59BBE8 }
						},
					    /* tipRenderer : function(chart, record){ 
						return 'Tiene un plan de ' + record.data.valor_plan_mes + '  y un real de ' + record.data.valor_real ;
						}  */
				}],
				
		});
           
	 	var panel = new Ext.Panel({
		width: 904,
		height: 480,
		layout:'border',	
		renderTo: 'comportamiento',			
		//title: 'Perspectivas',
		bodyStyle:'padding:5px 5px 0',
		items:[panel_grid,panel_graf],
		});
		 
	 
	
	//panel_graf.show();
});
