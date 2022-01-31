Ext.QuickTips.init();
Ext.onReady(function()
{
 
var btnadicionar= new Ext.Button({
       disabled:false,
	   id:'btnadicionar', 
	   //iconCls:'btn', 
	    text:'Adicionar',
	    width: 100,	   
	    handler: function(){
            var v = upload.getValue();
            alert(v);
        }
	    
	}); 
	var upload = new Ext.ux.form.FileUploadField({
					id: 'file',
					name: 'file',
					width:780,
                    emptyText: 'Selecccione...',
                    fieldLabel: 'Archivo',                    
                    buttonText: '',
                    buttonCfg: {
					iconCls: 'upload-icon'
						},
				});
	 
  var fp_importarBD = new Ext.FormPanel({
        labelWidth: 30,
        frame:true,     
        bodyStyle:'padding:5px 5px 0',
        fileUpload: true,
        defaults: {width: 500, allowBlank: false},
        items:[upload]
    });
	
		var panel = new Ext.FormPanel({
			width: 893,
			frame:true,
			applyTo: 'upload',			
		//	title: 'Gestionar acci&oacute;n',
			layout:'column',
			hideBorders:true, 			
			border:false,			
			items: [ 
					{   
						columnWidth:.7,
						layout: 'form',
						labelWidth: 1,			               
						items: [fp_importarBD]
					}, 
			 ],
			buttons: [{
            text: 'Save',
            handler: function(){
                if(panel.getForm().isValid()){
	                panel.getForm().submit({
	                    url: 'file-upload.php',
	                    waitMsg: 'Uploading your photo...',
	                    success: function(panel, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            handler: function(){
                fp.getForm().reset();
            }
        }]					 
			 /*	 bbar:new Ext.PagingToolbar({
					  pageSize: 15,
				 	  store: store,
					  displayInfo: true,
					  displayMsg: 'Mostrar {0} - {1} de {2}',
					  emptyMsg: "No hay elementos que mostrar",
					  width: 895, 
					  }) */
		});
	
});