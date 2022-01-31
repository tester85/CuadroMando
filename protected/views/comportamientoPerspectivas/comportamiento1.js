Ext.QuickTips.init();
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
	btnadicionar.enable();
	btneliminar.enable();
	btnmodificar.enable();
}, this);
  
             
//declaración del store del grid  
	
   var store =new Ext.data.JsonStore({
    url: '?r=Comportamiento/Comportamiento', 
    root: 'datos', 
	idProperty: 'id_perspectiva',
    fields:[ 
	'nombre_perspectiva',
	'total_plan_mes',
	'total_real_plan',
	'cant_indicador', 
	'total_obj' 
	] 
  });   
    store.load();
//**********************************  
//declaración del columnModel del grid
 var cm = new Ext.grid.ColumnModel([  
	{id:'nombre_perspectiva',header:'Perspectiva', width:30,dataIndex: 'nombre_perspectiva'},
	{id:'total_obj',header:'Cant. Objetivos', width:15,dataIndex: 'total_obj'},
	{id:'cant_indicador',header: 'Cant. Indicadores', width:20,  dataIndex: 'cant_indicador'}, 
	{id:'total_plan_mes',header: 'Total plan', width:20,  dataIndex: 'total_plan_mes'}, 
	{id:'total_real_plan',header: 'Total real', width:20,  dataIndex: 'total_real_plan'}, 
	{id:'porciento',header: 'Porciento %',  width:20,  dataIndex: 'porciento', 
		renderer: function(v, params, record){
				var val = Math.round((record.data.total_real_plan/record.data.total_plan_mes)*100);
				if(val >= 0 && val <= 40)
				   {
						return '<span style="color:red;">' + val + '%</span>';
					}
				else if(val > 40 && val <= 80)
					{
						return '<span style="color:orange;">' + val + '%</span>';
					}
				else if(val > 80)
					{
						return '<span style="color:green;">' + val + '%</span>';
					} 
                },
	} 
				]); 
  
  var grid = new Ext.grid.GridPanel({
       store: store,       
        id:'grid',
		//tbar:[btnadicionar,btnmodificar,btneliminar],
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
        height: 400,
        width: 880   
    });
	   
 var h = 12312;
		var panel = new Ext.FormPanel({
		  width: 904,
			frame:true,	
			applyTo: 'comportamiento',			
			title: 'Perspectivas',
			bodyStyle:'padding:5px 5px 0;',// background-color:white;',	
			//html:'<table><tr><td>'+h+'</td></tr></table>',
			 items:[{   
				layout:'column',
				items:[  
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
