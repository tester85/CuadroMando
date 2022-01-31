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
     url : '?r=ComportamientoAcciones/TodasAcciones',	   
     params:{  
			id_indicador: Ext.getCmp('grid').getSelectionModel().getSelected().get('id_indicador'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				if(c.responseText == 'false')
				{
					Ext.Msg.show({
							   title:'Informaci&oacute;n de error',
							   msg: 'No se encontraron acciones asociados al indicador',
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
   
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record ){ 
	CargarValoresAsociados(); 	
}, this);
  
  
 
  var store = new Ext.data.GroupingStore({
	 url: '?r=Comportamiento/TodosIndicadores',  
	sortInfo:{field:'nombre_perspectiva', direction: "Asc"},	
	groupField:'nombre_perspectiva',	
	reader:new Ext.data.JsonReader({
		root: 'datos', 
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
	
 
//**********************************  
//declaración del columnModel del grid
  
  
  var grid = new Ext.grid.GridPanel({
		store: store,       
		id:'grid',
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
									}),
		
		stripeRows: true,        
		height: 450,
		width: 250 
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
 
  var store_graf =new Ext.data.JsonStore({
	root:'data',
    fields:[
	'cantidad',
	'categoria',
	'id_indicador', 
	] 
  });   
/*--------------------------------------------------------------*/  

function CargarDatosAsociados(id_indicador,categoria)
{  
	
	Ext.Ajax.request({
     url : '?r=ComportamientoAcciones/InformacionAcciones',	   
     params:{  
			id_indicador: id_indicador,
			categoria: categoria
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				store_acciones.removeAll();
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_acciones.loadData(Data); 
			} 
		}//fin del callback		
    })//fin del Ajax.request
} 

var store_acciones =new Ext.data.JsonStore({ 
    root: 'datos', 
	idProperty: 'id_accion',
    fields:['nombre_accion','avance','fecha_cump_accion','nombre_cargo'] 
  });   
    //store.load();
//------------------------------------------- grid	
sm = new Ext.grid.RowSelectionModel({
    singleSelect:true 
  });
  
var cm = new Ext.grid.ColumnModel([  
  	{id:'nombre_accion',header:'Accion', width:60,dataIndex: 'nombre_accion'},
	{id:'avance',header:'% Progresado', width:15,dataIndex: 'avance'},
  	{id:'nombre_cargo',header:'Ejecutante', width:28,dataIndex: 'nombre_cargo'},
	{id:'fecha_cump_accion',header: 'Fecha de cumplimiento',  width:17,  dataIndex: 'fecha_cump_accion'}
				]); 
  
  var grid_acciones = new Ext.grid.GridPanel({
       store: store_acciones,       
        id:'grid_acciones',  
        frame:true,
		 cm: cm,
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 630,
        width: 270   
    });
//----------------------------------------------------	
var winP = new Ext.Window({
	title:'Acciones',
	layout:'fit',
	width:650,
	height:300,
	closeAction:'hide',
	items:[grid_acciones],
	plain: true, 
	buttons: [{
		text: 'Cerrar',
		handler: function(){
			winP.hide();
		}
	}]
	}); 
/*--------------------------------------------------------------*/
var  panel_graf = new Ext.Panel({
		  width: 650,
		 region: 'center',
		 name:'panel_graf',
		 id:'panel_graf',
         margins:'3 3 3 0', 
		 cmargins:'3 3 3 3',
		  height: 480,
			//frame:true, 
			title: 'Comportamiento de las acciones asociadas a los indicadores',
			bodyStyle:'padding:5px 5px 0',
			items:[{
					xtype:'piechart',
					id:'piechart',
					store: store_graf ,
					dataField:'cantidad',
					categoryField:'categoria',
					
					// define los colores para el grafico de pastel - rojo , verde, amarillo
					
					seriesStyles: { colors: ['#b4131e','#50d150','#efff86']},
					 listeners:{
							itemclick: function(o){
								var rec = store_graf.getAt(o.index); 
								
	//  Aqui capturo la categoria y se la paso por post con el ajax request al metodo PHP
	//  para definir la consulta en el controller permitiendo cargar bien los datos
						
						CargarDatosAsociados(rec.get('id_indicador'),rec.get('categoria'));
						winP.show(); 	 
							    	 				
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
						return 'Acciones  ' + record.data.cantidad;
						}  
				}],
				
		});
           
	 	var panel = new Ext.Panel({
		width: 904,
		height: 480,
		layout: 'border',	
		renderTo: 'comportamientoAcciones',			
		//title: 'Perspectivas',
		bodyStyle:'padding:5px 5px 0',
		items:[panel_grid,panel_graf],
		});
		 
	 
	
	//panel_graf.show();
});
