
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
var panel_graf;

 var btnScript= new Ext.Button({ 
	   id:'btnScript', 
	   //iconCls:'btn', 
	   text:'Generar',
		height: 20,	   
	   handler:function(){ 
		  ExportarDatos();
		   } 
	}); 
	var btnExportAll = new Ext.Button({
       disabled:false,
	   id:'btnExportAll', 
	   //iconCls:'btn', 
	   text:'Exportar BD',
		height: 20,	   
	   handler:function(){ 
		  ExportarTodo();
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
	//Ext.getCmp('panel_graf').setTitle('');
		//CargarTablas(); 
		store_atributos_sql.removeAll();
		sm_atributos.clearSelections();		
		//sm_tablas.clearSelections();
		//btnScript.enable(); 
}, this);
 
  var sm_tablas;
  var rec_tabla;
  var record_tabla_seleccionado;
  
  sm_tablas = new Ext.grid.RowSelectionModel({
    singleSelect:true,
	listeners : {
      rowselect : On_RowClick_tablas
    } 	
  });  
  sm_atributos = new Ext.grid.RowSelectionModel({
    singleSelect:true  
  });
  
function On_RowClick_tablas(sm_tablas, indiceFila, record){
    rec_tabla = record;
    recordSeleccionado=rec_tabla;
    return record_tabla_seleccionado;
  };//fin de la función On_RowClick	
  
sm_tablas.on('rowselect', function (smodel, rowIndex, keepExisting, record ){ 	
	CargarAtributos();	
}, this);	
 

CargarTablas();
function CargarTablas()
{  
	Ext.Ajax.request({
     url : '?r=site/DatosNacionales', 
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_tablas_sql.loadData(Data); 
			} 
		}//fin del callback		
    })//fin del Ajax.request
} 
 function CargarAtributos()
{  
	Ext.Ajax.request({
     url : '?r=site/BuscarAtributos',	   
     params:{  
			nombre_tabla: Ext.getCmp('grid_tablas').getSelectionModel().getSelected().get('nombre_tabla'),
			},	
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
				var Data = Ext.decode(dd);	//extraigo la información 
				store_atributos_sql.loadData(Data); 
			} 
		}//fin del callback		
    })//fin del Ajax.request
}   
	var store_tablas_sql =new Ext.data.JsonStore({ 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'nombre_tabla',   
    fields:['nombre_tabla'] 
	});   
	
	var store_atributos_sql =new Ext.data.JsonStore({ 
    root: 'datos',
	baseParams:{start:0, limit:20},
	idProperty: 'nombre',   
    fields:['nombre'] 
	});   
 
	
 
//**********************************  
 /*
   var myData = [
        ['Nacional'],
        ['Provincial y Ueb']];
		
	var store_grid = new Ext.data.ArrayStore({
        fields: [
           {name: 'exportar'} 
        ]
    });	
	store_grid.loadData(myData);
	
  var grid = new Ext.grid.GridPanel({
       store: store_grid,       
        id:'grid', 
        frame:true,
		columns: [
            {id: 'exportar', header: 'Modalidad', width: 200, sortable: false, dataIndex: 'exportar'}],
		 sm:sm,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 445,
        width: 250   
    }); 
 
 
var panel_grid =  new Ext.Panel({ 
		title:'Elementos a exportar',
		split: true,
		width: 250,
		collapsible: true,
		region:'west',
		margins:'3 0 3 3',
		cmargins:'3 3 3 3',    
		items:[]  
});  */

  var grid_tablas = new Ext.grid.GridPanel({
       store: store_tablas_sql,       
        id:'grid_tablas', 
        frame:true,
		columns: [
            {id: 'nombre_tabla', header: 'Tablas a exportar', width: 200, sortable: false, dataIndex: 'nombre_tabla'}],
		 sm:sm_tablas,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 410,
        width: 420   
    }); 
	
	
	var grid_attrib = new Ext.grid.GridPanel({
       store: store_atributos_sql,       
        id:'grid_attrib', 
        frame:true,
		columns: [
            {id: 'nombre', header: 'Atributos', width: 200, sortable: false, dataIndex: 'nombre'}],
		 sm:sm_atributos,
        viewConfig: {
        forceFit: true
       },
       stripeRows: true,        
        height: 410,
        width: 420   
    });
var  panel_graf = new Ext.Panel({
		 width: 650,
		 region: 'center',
		 bbar:[btnScript,btnExportAll],
		 name:'panel_graf',
		 id:'panel_graf', 
		  //height: 480,
			 frame:true, 
			title: 'Comportamiento',
			bodyStyle:'padding:5px 5px 0',
			items:[{             
					layout:'column',
					items:[{   
							columnWidth:.5,
							layout: 'form',
							labelWidth: 70,			               
							items: [  
								grid_tablas 
								]            
						}, 
						{	 
							columnWidth:.5,
							layout: 'form',  
							items:[  
								 grid_attrib 
								 ] 
						}]					
					}],
		
		});
		
           
	 	var panel = new Ext.Panel({
		width: 904,
		height: 480,
		layout:'border',	
		renderTo: 'exportar',			
		//title: 'Perspectivas',
		bodyStyle:'padding:5px 5px 0',
		items:[panel_graf],
		});
		 
function ExportarDatos()
{  
	Ext.Ajax.request({
     url : '?r=site/Generar',	   
    /* params:{  
			tablas: store_tablas_sql.getRange(),
			},	*/
		callback: function(a,b,c)
		{ 
			if(b){
					var dd = c.responseText;
					if(dd)
						{				                 
							Ext.Msg.show({
							title:'Informaci&oacute;n',
							msg: 'Se gener&oacute; correctamente el archivo',
							buttons: Ext.Msg.OK,
							//fn: processResult,
							animEl: 'elId',
							icon: Ext.MessageBox.INFO  
							  }); 	
						} 	
					else Ext.Msg.show({
							title:'Informaci&oacute;n de error',
							msg: 'No Se pudo generar el archivo',
							buttons: Ext.Msg.OK,
							//fn: processResult,
							animEl: 'elId',
							icon: Ext.MessageBox.ERROR  
							  });
					}							  
		}//fin del callback		
    })//fin del Ajax.request
} 

function ExportarTodo()
{  
	Ext.Ajax.request({
		url : '?r=site/ExportarBD', 
		callback: function(a,b,c)
		{ 
			if(b)
			{
				var dd = c.responseText;
					//extraigo la información 
				if(dd)
					{				                 
						Ext.Msg.show({
						title:'Informaci&oacute;n',
						msg: 'Se gener&oacute; correctamente el archivo',
						buttons: Ext.Msg.OK,
						//fn: processResult,
						animEl: 'elId',
						icon: Ext.MessageBox.INFO  
						  }); 	
					} 	
			else Ext.Msg.show({
						title:'Informaci&oacute;n de error',
						msg: 'No Se pudo generar el archivo',
						buttons: Ext.Msg.OK,
						//fn: processResult,
						animEl: 'elId',
						icon: Ext.MessageBox.ERROR  
						  }); 			
			}
		}//fin del callback		
    })//fin del Ajax.request
} 
	
	//panel_graf.show();
});
