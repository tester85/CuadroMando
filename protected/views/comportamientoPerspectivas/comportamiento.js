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
  
     
sm.on('rowselect', function (smodel, rowIndex, keepExisting, record ){

	Ext.getCmp('panel_graf').setTitle('Comportamiento de las perspectivas según sus indicadores'); 
}, 
this); 
	
	var store =new Ext.data.JsonStore({
    url: '?r=ComportamientoPerspectivas/Comportamiento', 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'id_perspectiva',   
    fields:[
	'id_objetivo_trabajo',
	'total_plan_mes','nombre_perspectiva',
	'id_indicador','id_perspectiva',
	'id_objetivo_estrategico',
	{name:'total_plan_mes', type:'float'},
	{name:'total_real_plan', type:'float'},  
	{name:'porciento_cumplimiento', type:'float'},
	'total_obj',
	'total_ind'
	] 
  });   
    store.load(); 
  
    
//**********************************  
//declaración del columnModel del grid
  
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid', 
		iconCls:'icon-grid',
        loadMask:{store:store},
        frame:true,
		 columns:[
			{id:'nombre_perspectiva',header:'Perspectiva', width:50,dataIndex: 'nombre_perspectiva'},
			{id:'total_obj',header:'Cant. Obj', width:20,dataIndex: 'total_obj'},
			{id:'total_ind',header:'Cant. Ind.', width:20,dataIndex: 'total_ind'},
		 ],
		 sm:sm,
        viewConfig: {
			forceFit: true,
			showPreview: true, // custom property
			enableRowBody: true, // required to create a second, full-width row to show expanded Record data
			getRowClass: function(record, rowIndex, rp, ds){ // rp = rowParams
				if(this.showPreview){
					if(record.data.porciento_cumplimiento < 90)
					{
					/*	rp.body = '<p> Porciento de cumplimiento : '+record.data.porciento_cumplimiento+'</p>';
						color = 0xF5C0C0;*/
						return 'red-row';
					}
					else if((record.data.porciento_cumplimiento > 94) && (record.data.porciento_cumplimiento <= 100 ))
					{
						/*rp.body = '<p> Porciento de cumplimiento : '+record.data.porciento_cumplimiento+'</p>';*/
						return 'green-row';
					}
					else if((record.data.porciento_cumplimiento <= 94) && (record.data.porciento_cumplimiento >= 90 ))
					{
						/*rp.body = '<p> Porciento de cumplimiento : '+record.data.porciento_cumplimiento+'</p>'; */
						return 'yellow-row';
					}
					else 
					{
						/*rp.body = '<p> Porciento de cumplimiento : '+record.data.porciento_cumplimiento+'</p>'; */
						return 'red-row';
					}
				}
				//return 'green-row';
					}
		},
      // stripeRows: true,        
        height: 470,
        width: 300   
    }); 

Ext.chart.Chart.CHART_URL = '../CuadroM/js/ext-3.1/resources/charts.swf';
 
var panel_grid =  new Ext.Panel({ 
		title:'Perspectivas',
		split: true,
		width: 300,
		collapsible: true,
		region:'west',
		margins:'3 0 3 3',
		cmargins:'3 3 3 3',    
		items:[grid]  
});      
 		
var  panel_graf = new Ext.Panel({
		 width: 600,
		region: 'center',
		name:'panel_graf',
		id:'panel_graf',
        margins:'3 3 3 0', 
		 cmargins:'3 3 3 3',
		  height: 480,
			//frame:true, 
			title: 'Comportamiento',
			bodyStyle:'padding:5px 5px 0',
			items:[ 
			{
					xtype:'columnchart',
					store:store,
					xField: 'nombre_perspectiva',  
					  series:[                 
					//{yField:'total_real_plan',displayName:'Real'},     
					//{yField:'total_plan_mes',displayName:'Plan'},
					{
					yField:'porciento_cumplimiento',
					// amarillo  0xfff000
					//style: {color: color},
					displayName:'Porciento', } 
				 ],  
				 listeners: {
							itemclick: function(o){
								var rec = store.getAt(o.index);
							//	alert(rec.get('nombre_perspectiva'));
							
							// revisar lo del cargo del encargado
							
							  var winP = new Ext.Window({
								//applyTo:'comportamiento',
								layout:'fit',
								width:500,
								height:300,
								closeAction:'hide',
								items:[],
								plain: true, 
								buttons: [{
									text: 'Close',
									handler: function(){
										winP.hide();
									}
								}]
							});
						 
					winP.show(); 					
							}
						},
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
						return 'Porciento: ' + record.data.porciento_cumplimiento;
						}
			}  ],
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
