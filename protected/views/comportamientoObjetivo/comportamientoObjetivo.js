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
     url : '?r=ComportamientoObjetivo/Todos',	   
     params:{  
			id_objetivo_trabajo: Ext.getCmp('grid').getSelectionModel().getSelected().get('id_objetivo_trabajo'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{	
				if(c.responseText == 'false')
				{
					Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'No se encontraron indicadores asociados al objetivo',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });
					store_graf.removeAll();
				
				}
				else 
				{
					var dd = c.responseText;
					var Data = Ext.decode(dd);	//extraigo la información 
					store_graf.loadData(Data); 
				}
			} 
		}//fin del callback		
    })//fin del Ajax.request
} 
   
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record )
	{ 
		CargarValoresAsociados(); 	
	}, this);
  
  
 
 var store = new Ext.data.GroupingStore({
	 url: '?r=ComportamientoObjetivo/TodosIndicadores',  
	//baseParams:{ start:0,limit:16},
	sortInfo:{field:'nombre_perspectiva', direction: "Asc"},	
	groupField:'nombre_perspectiva',	
	reader:new Ext.data.JsonReader({
		root: 'datos', 
		//totalProperty : 'total'
		},
		[{name: 'id_objetivo_trabajo'},
		 {name: 'nombre_objetivo_trabajo'},
		 {name: 'nombre_perspectiva'},
		 {name: 'id_perspectiva'}, 
		  ]		  
	)
}); 
    store.load();
	
 
//declaración del columnModel del grid
  
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid', 
		iconCls:'icon-grid',
		 columns:[
			{id:'nombre_objetivo_trabajo',header:'Agrupados por perspectivas', width:30,dataIndex: 'nombre_objetivo_trabajo'}, 
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
        }),
      
       stripeRows: true,        
        height: 450,
        width: 250, 
    }); 

Ext.chart.Chart.CHART_URL = '../CuadroM/js/ext-3.1/resources/charts.swf';
 
var panel_grid =  new Ext.Panel({ 
		title:'Objetivos',
		split: true,
		width: 250,
		collapsible: true,
		region:'west',
		margins:'3 0 3 3',
		cmargins:'3 3 3 3',    
		items:[grid] 
}); 
 
 var store_graf =new Ext.data.JsonStore({ 
   // root: 'data', 
	//idProperty: 'id_objetivo_trabajo',
    fields:[ 
	'categoria',
	'cantidad',
	'id_objetivo_trabajo' 
	] 
  }); 
/*
*	elementos asociados a los datos extraidos de los graficos
*/

function CargarAreasAsociados(id_objetivo_trabajo)
{  
	Ext.Ajax.request({
     url : '?r=ComportamientoObjetivo/TodasAreas',	   
     params:{  
			id_objetivo_trabajo: id_objetivo_trabajo 
			 
			},	
		callback: function(a,b,c)
		{ 			
			if(b)
			{ 
				store_area.removeAll();
				
				if(c.responseText == "false")
				{
					Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'No se encontraron areas asociados al objetivo que rige este indicador ',
							   buttons: Ext.Msg.OK,
							   //fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.ERROR  
						  });
					store_area.removeAll();
				}
				else
				{
					var dd = c.responseText; 
					var Data = Ext.decode(dd);	//extraigo la información  					
					store_area.loadData(Data); 
					winP.show(); 	
				}
			} 
			
		}//fin del callback		
    })//fin del Ajax.request
} 

var store_area =new Ext.data.JsonStore({ 
    root: 'datos', 
	idProperty: 'id_area',
    fields:['id_area','nombre_area','id_objetivo_trabajo','nombre_objetivo_trabajo'] 
  });   
    //store.load();
//------------------------------------------- grid	
sm = new Ext.grid.RowSelectionModel({
    singleSelect:true 
  });
  
var cm = new Ext.grid.ColumnModel([  
// 	{id:'id_objetivo_trabajo',header:'ID OT', width:7,dataIndex: 'id_objetivo_trabajo'},
	{id:'nombre_area',header: 'Áreas',  width:50,  dataIndex: 'nombre_area'}
				]); 
  
  var grid_areas = new Ext.grid.GridPanel({
       store: store_area,       
        id:'grid_areas',  
        frame:true,
		 cm: cm,
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 280,
        width: 220   
    });
//----------------------------------------------------	
var winP = new Ext.Window({
	title:'Áreas en las que influye el objetivo',
	layout:'fit',
	width:310,
	height:240,
	closeAction:'hide',
	items:[grid_areas],
	plain: true, 
	buttons: [{
		text: 'Cerrar',
		handler: function(){
			winP.hide();
		}
	}]
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
			title: 'Cumplimiento de los indicadores por objetivo',
			bodyStyle: 'padding:5px 5px 0',
			items:[{
					xtype:'piechart',
					id:'piechart',
					store: store_graf ,
					dataField:'cantidad',
					categoryField:'categoria',
					seriesStyles: { colors: ['#b4131e', '#efff86','#50d150']},			 
					 listeners:{
							itemclick: function(o){
								var rec = store_graf.getAt(o.index);
								
				CargarAreasAsociados(rec.get('id_objetivo_trabajo'),rec.get('categoria'));
								 				
							}
						}, 
					 
						//extra styles get applied to the chart defaults
						extraStyle :
						{	// animationEnabled: true,		 

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
					     tipRenderer : function(chart, record){ 
						return 'Cantidad ' + record.data.cantidad;
						}  
				}],
				
		});
           
	 	var panel = new Ext.Panel({
		width: 904,
		height: 480,
		layout:'border',	
		renderTo: 'comportamientoObjetivo',	 
		bodyStyle:'padding:5px 5px 0',
		items:[panel_grid,panel_graf],
		});
		 
	 
	
	//panel_graf.show();
});
