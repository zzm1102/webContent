/*
 * File: app/controller/ArticleController.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('GURUAdmin.controller.ArticleController', {
    extend: 'Ext.app.Controller',

    models: [
        'ArticleModel'
    ],
    stores: [
        'ArticleStore'
    ],

    refs: {
        articleListGrid: '#ArticleListGrid',
        articleQueryColumnComBox: '#articleQueryColumnComBox',
        articleQueryTitle: '#articleQueryTitle',
        articleQueryAuthor: '#articleQueryAuthor',
        articleQueryDisplay: '#articleQueryDisplay',
        articleQueryShowFlag: '#articleQueryShowFlag',
        articleQueryPublishTime: '#articleQueryPublishTime',
        articleQueryBt: '#articleQueryBt',
        editArticleBt: '#editArticleBt',
        articleEditWindow: '#ArticleEditWindow',
        articleEditWinSubmitBt: '#articleEditWinSubmitBt',
        articleEditWinForm: '#articleEditWinForm',
        articleEditWinSubmitBt: '#articleEditWinSubmitBt',
        picUploadBt: '#picUploadBt',
        picUploadForm: '#picUploadForm',
        uploadImage: '#uploadImage',
        delArticleBt: '#delArticleBt',
        articleQueryReset: '#articleQueryReset',
        articleQueryReset: '#articleQueryReset',
        articleDetail: '#articleDetail',
        articleAddWinForm: '#articleAddWinForm',
        addAricleButton: '#addAricleButton',
        addArticleWindow: '#AddArticleWindow',
        upgradeToAticleBt: '#upgradeToAticleBt',
        channelPostInfoBt: '#channelPostInfoBt',
        articleAddWinPostId: '#articleAddWinPostId',
        channelPiostInfoForm: '#channelPiostInfoForm',
        picUploadButton: '#PicUploadButton',
        articlePicUploadForm: '#ArticlePicUploadForm',
        articleAddWinUploadForm: '#articleAddWinUploadForm',
        articleAddWinImage: '#articleAddWinImage',
        aticlePIc: '#AticlePIc',
        articleQueryPanel: '#articleQueryPanel',
        pushArticle: '#pushArticle',
        pushWinForm: '#pushWinForm',
        pushSendBt: '#pushSendBt',
        converseToArticle: '#converseToArticle',
        postsGrid: '#PostsGrid',
        articleAddWindowColumn: '#articleAddWindowColumn',
        articleEditWindowColumn: '#articleEditWindowColumn'
    },

    control: {
        "#articleQueryBt": {
            click: 'onArticleQueryBtClick'
        },
        "#editArticleBt": {
            click: 'onEditArticleBtClick'
        },
        "#articleEditWinSubmitBt": {
            click: 'onArticleEditWinSubmitBtClick'
        },
        "#picUploadBt": {
            click: 'onPicUploadBtC'
        },
        "#delArticleBt": {
            click: 'onDelArticleBtClick'
        },
        "#articleQueryReset": {
            click: 'onArticleQueryResetClick'
        },
        "#articleDetail": {
            click: 'onArticleDetailClick'
        },
        "#addAricleButton": {
            click: 'onAddAricleButtonClick'
        },
        "#upgradeToAticleBt": {
            click: 'onUpgradeToAticleBtClick'
        },
        "#channelPostInfoBt": {
            click: 'onChannelPostInfoBtClick'
        },
        "#PicUploadButton": {
            click: 'onPicUploadButtonClick'
        },
        "#ArticleListGrid": {
            hide: 'onArticleListGridHide'
        },
        "#pushArticle": {
            click: 'onPushArticleClick'
        },
        "#pushSendBt": {
            click: 'onPushSendBtClick'
        },
        "#converseToArticle": {
            click: 'onConverseToArticleClick'
        }
    },

    /* 查询按钮事件 */
    onArticleQueryBtClick: function(button, e, eOpts) {
        //查询条件
        var columnCode = this.getArticleQueryColumnComBox().value;
        var articleTitle = this.getArticleQueryTitle().value;
        var author = this.getArticleQueryAuthor().value;
        var display = this.getArticleQueryDisplay().value;
        if(display === false){
            display = 'n';
        }else{
            display =  'y';
        }
        var showFlag = this.getArticleQueryShowFlag().value;
        var publishTime = this.getArticleQueryPublishTime().value;
        var articleListGrid = this.getArticleListGrid();
        var articleStore = articleListGrid.getStore();

        //条件查询，支持翻页
        articleStore.on('beforeload', function(store, options) {
            var queryParams = {
                columnCode : columnCode,
                articleTitle: articleTitle,
                author:author,
                display:display,
                showFlag:showFlag,
                publishTime:publishTime
            };
            Ext.apply(store.proxy.extraParams, queryParams);
        });
        articleStore.load({});
    },

    /* 文章列表界面编辑按钮 */
    onEditArticleBtClick: function(button, e, eOpts) {
        var me = this;
        var articleListGrid = this.getArticleListGrid();
        var selectionModel = articleListGrid.getSelectionModel();
        var record = selectionModel.getSelection();
        if (record === null || record === undefined || record.length === 0) {
            Ext.MessageBox.alert('未选中', "请选中一行");
            return ;
        }else{
            var data = record[0].data;
            Ext.Ajax.request({
                url:'../api/article/'+ data.articleId +'/column',
                method:'GET',
                success:function(response){
                    var result = Ext.util.JSON.decode(response.responseText);

                    var columnCodes = result.result.columnCode.split(",");
                    var win = me.showArticleAddWindow(false,columnCodes,'edit');
                    win.show();
                    win.center();
                    var form = me.getArticleEditWinForm().getForm();
                    var data = record[0].data;
                    form.findField('articleWinId').setValue(data.articleId);
                    form.findField('articleWinTitle').setValue(data.articleTitle);
                    form.findField('articleWinAuthor').setValue(data.author);
                    form.findField('articleWinSummary').setValue(data.articleSummary);
                    form.findField('imageUrl').setValue(data.picturePath);
                    form.findField('articleWinShowFlag').setValue(data.showFlag);
                    form.findField('display').setValue({display:data.display});
                    form.findField('articleWinPostId').setValue(data.postId);
                    var date = new Date(data.publishTime*1000);
                    form.findField('aticleWinDate').setValue(date);
                    var uploadImage = me.getUploadImage();
                    uploadImage.setSrc(data.picturePath);
                }
            });





            //form.findField('articleWinClolumn').setValue(data.columnCode);



        }
    },

    /* 文章编辑界面提交事件 */
    onArticleEditWinSubmitBtClick: function(button, e, eOpts) {
        var me = this;
        var articleEditWindow = this.getArticleEditWindow();
        var articleListGrid = this.getArticleListGrid();
        var form = this.getArticleEditWinForm().getForm();

        var columnCodes = me.getArticleEditWindowColumn().getValue();
        var columnsStr ='';
        for (var i in columnCodes) {
            columnsStr = columnsStr + columnCodes[i] + ',';
        };
        var columnStrFinal = columnsStr.slice(0,columnsStr.length-1);

        var articleTitle = form.findField('articleWinTitle').getValue();
        var articleSummary = form.findField('articleWinSummary').getValue();

        var validationFlag = me.articleValidate(articleTitle,articleSummary);
        if(validationFlag === false){
            return ;
        }

        var params = {
            "columnCode":columnStrFinal,
            "articleId":parseInt(form.findField('articleWinId').getValue()),
            "articleTitle":articleTitle,
            "author":form.findField('articleWinAuthor').getValue(),
            "articleSummary":articleSummary,
            "showFlag":form.findField('articleWinShowFlag').getValue(),
            "display":form.findField('display').getValue().display,
            "publishTime":form.findField('aticleWinDate').getValue().getTime()/1000,
            "picturePath":form.findField('imageUrl').getValue(),
            "postId":parseInt(form.findField('articleWinPostId').getValue())
        };

        Ext.Ajax.request({
            url: '../api/article/update',
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            params: Ext.encode(params),
            success: function(response){
                var result=Ext.util.JSON.decode(response.responseText);
                if(result.statusCode==200){
                    Ext.Msg.alert('成功', '修改文章成功');
                    articleListGrid.getStore().reload();
                    articleEditWindow.close();
                }else{
                    Ext.Msg.alert('失败', '修改文章失败,原因是:'+result.message);
                }
            }
        });
    },

    /* 图像上传按钮事件 */
    onPicUploadBtC: function(button, e, eOpts) {
        var me = this;
        var editForm = this.getArticleEditWinForm().getForm();
        var picForm = this.getPicUploadForm();
        picForm.submit({
            url: '../api/file/cms/image',
            method:'POST',
            waitMsg: 'Uploading your file...',
            //返回的结果没有success:true,所以为失败
            failure: function(form, action) {
                var result = Ext.util.JSON.decode(action.response.responseText);
                if(result.statusCode == 200){
                    Ext.Msg.alert('成功', '你的文件已经成功上传');
                    editForm.findField('imageUrl').setValue(result.result);
                    var uploadImage = me.getUploadImage();
                    uploadImage.setSrc(result.result);
                }else{
                    Ext.Msg.alert('失败', '你的文件已经上传失败，失败的原因是:'+result.message);
                }

            }
        });
        //this.uploadArticlePic();
    },

    /* 文章列表删除事件 */
    onDelArticleBtClick: function(button, e, eOpts) {

        var articleListGrid = this.getArticleListGrid();
        var selectionModel = articleListGrid.getSelectionModel();
        var record = selectionModel.getSelection();
        if (record === null || record === undefined || record.length === 0) {
            Ext.MessageBox.alert('未选中', "请选中一行");
            return ;
        }
        Ext.MessageBox.confirm('选择框','请确定是否删除?',function(btn){
            if(btn == 'no'){
                return;
            }else{
                var data = record[0].data;
                var articleId=data.articleId;
                Ext.Ajax.request({
                    url: '../api/article/'+articleId+'/delete',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    method : 'POST',
                    success: function(response){
                        result=Ext.util.JSON.decode(response.responseText);
                        if(result.statusCode == 200){
                            Ext.Msg.alert('成功', '成功删除文章.');
                            articleListGrid.getStore().reload();
                        }

                    }
                });
            }
        });
    },

    /* 查询条件重置 */
    onArticleQueryResetClick: function(button, e, eOpts) {
        this.getArticleQueryColumnComBox().setValue("");
        this.getArticleQueryTitle().setValue("");
        this.getArticleQueryAuthor().setValue("");
        this.getArticleQueryDisplay().setValue("1");
        this.getArticleQueryShowFlag().setValue("");
        this.getArticleQueryPublishTime().setValue("");
    },

    /* 查看文章详细按钮事件 */
    onArticleDetailClick: function(button, e, eOpts) {
        var articleListGrid = this.getArticleListGrid();
        var selectionModel = articleListGrid.getSelectionModel();
        var record = selectionModel.getSelection();
        if (record === null || record === undefined || record.length === 0) {
            Ext.MessageBox.alert('未选中', "请选中一行");
            return ;
        }
        window.open("../index.html#/articleDetail/"+record[0].data.postId);
    },

    /* 文章新增页面提交按钮事件 */
    onAddAricleButtonClick: function(button, e, eOpts) {
        var me = this;
        var form = this.getArticleAddWinForm().getForm();

        var articleTitle = form.findField("ArticleTitile").getValue();
        var articleSummary = form.findField("ArticleSummary").getValue();
        var validationFlag = me.articleValidate(articleTitle,articleSummary);

        if(validationFlag === false){
            return ;
        }

        Ext.Ajax.request({
            url: '../api/article/add',
            method : 'POST',
            params:{
                "articleTitle": articleTitle,
                "columnCode":me.getArticleAddWindowColumn().getValue(),
                "articleSummary": articleSummary,
                "author": form.findField("ArticleAuthor").getValue(),
                "display": form.findField("Display").getValue().Display,
                "showFlag": form.findField("ArticleShowflag").getValue(),
                "postId": form.findField("ArticlePostId").getValue(),
                "userId":form.findField("articleAuthorUserId").getValue(),
                "picPath":form.findField("articleAddWinImage").getValue()
            },
            success: function(response){
                result=Ext.util.JSON.decode(response.responseText);
                if(result.statusCode == 200){
                    Ext.MessageBox.alert('升级操作', '升级成功');
                }
            }
        });

    },

    /* 文章列表页面指定帖子生成文章按钮事件 */
    onUpgradeToAticleBtClick: function(button, e, eOpts) {
        this.showArticleAddWindow(true,[],'add');
    },

    /* 文章新增页面导入帖子信息按钮事件 */
    onChannelPostInfoBtClick: function(button, e, eOpts) {
        var me = this;
        var postId = this.getArticleAddWinPostId().getValue();
        Ext.Ajax.request({
            url: '../api/post/'+postId,
            method : 'GET',
            success: function(response){
                result=Ext.util.JSON.decode(response.responseText);
                if(result.statusCode != 200){
                    Ext.MessageBox.alert('导入失败，原因是:',result.message);
                }else{
                    obj = result.result;
                    var form = me.getArticleAddWinForm().getForm();
                    form.findField("ArticleTitile").setValue(obj.title);
                    form.findField("ArticleAuthor").setValue(obj.nickname);
                    form.findField("ArticlePostId").setValue(obj.postId);
                    form.findField("articleAuthorUserId").setValue(obj.userId);
                }
            }
        });


    },

    /* 文章新增页面(通过点击帖子页面到达)的图片上传按钮事件 */
    onPicUploadButtonClick: function(button, e, eOpts) {
        var me = this;
        var addForm = this.getArticlePicUploadForm().getForm();
        var addWinForm = this.getArticleAddWinForm().getForm();
        addForm.submit({
            url: '../api/file/cms/image',
            method:'POST',
            waitMsg: '文件上传中',
            //返回的结果没有success:true,所以为失败
            failure: function(form, action) {
                var result = Ext.util.JSON.decode(action.response.responseText);
                if(result.statusCode == 200){
                    Ext.Msg.alert('成功', '你的文件已经成功上传');
                    addWinForm.findField('articleAddWinImage').setValue(result.result);
                    var uploadImage = me.getAticlePIc();
                    //  alert("uploadImage:" + uploadImage);
                    uploadImage.setSrc(result.result);
                }else{
                    Ext.Msg.alert('失败', '你的文件已经上传失败，失败的原因是:'+result.message);
                }

            }
        });
    },

    /* 隐藏时促发事件 */
    onArticleListGridHide: function(component, eOpts) {
        this.getArticleQueryPanel().reset();
        this.getArticleListGrid().getStore().clearExtraParams();
    },

    /* 文章加推送 打开推送编辑窗口 */
    onPushArticleClick: function(button, e, eOpts) {
        var me = this;
        var selectionModel = me.getArticleListGrid().getSelectionModel();
        var record = selectionModel.getSelection();
        if (record == null || record == undefined || record.length == 0) {
            Ext.MessageBox.alert('未选中', "请选中一行");
        } else {
            var win = Ext.create("GURUAdmin.view.PushWindow");
            var form = win.getComponent("pushWinForm").getForm();
            var obj = record[0].data;
            var pushContent = obj.articleTitle==null || obj.articleTitle=="" ? articleTitle:obj.articleSummary.substring(0, 30);
            form.findField("pushContent").setValue(pushContent);
            form.findField("pushPostId").setValue(obj.postId);
            form.findField("pushAuthor").setValue(obj.author);

            win.show();
        }
    },

    /* 推送窗口点击发送 */
    onPushSendBtClick: function(button, e, eOpts) {
        var me = this;
        var form = this.getPushWinForm().getForm();
        Ext.Ajax.request({
            url: "../api/article/jpush",
            params:{
                "postId":  form.findField("pushPostId").value,
                "nick":form.findField("pushAuthor").value,
                "pushContent": form.findField("pushContent").value
            },
            method: 'GET',
            success: function (resp) {
                var obj = Ext.util.JSON.decode(resp.responseText);
                if(obj.statusCode==200){
                    Ext.MessageBox.alert('文章加推送', "文章推送成功");

                }else{
                    Ext.MessageBox.alert('文章加推送', "文章推送失败");
                }
            }
        });
    },

    /* 帖子列表界面升级文章按钮事件 */
    onConverseToArticleClick: function(button, e, eOpts) {
        var me = this;
        var selectionModel = me.getPostsGrid().getSelectionModel();
        var record = selectionModel.getSelection();
        if (record == null || record == undefined || record.length == 0) {
        	Ext.MessageBox.alert('未选中', "请选中一行");
        } else {
        	var win = me.showArticleAddWindow(false,[],'add');
        	var form = win.getComponent("articleAddWinForm").getForm();
        	var obj = record[0].data;
        	form.findField("ArticleTitile").setValue(obj.title);
        	form.findField("ArticleAuthor").setValue(obj.nick);
        	form.findField("ArticlePostId").setValue(obj.postId);
        	form.findField("articleAuthorUserId").setValue(obj.userId);
        }
    },

    /* 上传文章图片 */
    uploadArticlePic: function() {
        var me = this;
        var editForm = this.getArticleEditWinForm().getForm();
        var picForm = this.getPicUploadForm();
        picForm.submit({
            url: '../api/file/cms/image',
            method:'POST',
            waitMsg: 'Uploading your file...',
            //返回的结果没有success:true,所以为失败
            failure: function(form, action) {
                var result = Ext.util.JSON.decode(action.response.responseText);
                if(result.statusCode == 200){
                    Ext.Msg.alert('成功', '你的文件已经成功上传');
                    editForm.findField('imageUrl').setValue(result.result);
                    var uploadImage = me.getUploadImage();
                    uploadImage.setSrc(result.result);
                }else{
                    Ext.Msg.alert('失败', '你的文件已经上传失败，失败的原因是:'+result.message);
                }

            }
        });
    },

    /* 弹出文章新增窗口 ， showPostForm为true时，显示"导入帖子ID"栏;showColumnCode是要设置成被选中状态的栏目;type为类型,为'add'的时候为新增，'edit'的时候为编辑 */
    showArticleAddWindow: function(showPostForm, showColumnCode, type) {
        var me = this;
        if(type == 'add'){
            var win = Ext.create("GURUAdmin.view.ArticleAddWindow");
            var columnField = me.getArticleAddWindowColumn();
        }

        if(type == 'edit'){
            var win = Ext.create("GURUAdmin.view.ArticleDetailWindow");
            var columnField = me.getArticleEditWindowColumn();
        }

        var columnStore = Ext.getStore("ColumnStore");

        columnStore.load({
            scope: this,
            callback: function(records, operation, success) {
                var checkboxArray = [];
                for (var i = 0; i < columnStore.getCount(); i++) {
                    var record = columnStore.getAt(i);
                    var checkbox = new Ext.form.field.Checkbox({
                        boxLabel:record.get('columnName'),
                        name:'column',
                        inputValue:record.get('columnCode'),
                    });

                    //设置是否未为勾选
                    for(var j=0;j<showColumnCode.length;j++){
                        if(showColumnCode[j] == record.get('columnCode')){
                            checkbox.setValue(true);
                        }
                    }

                    columnField.items.add(checkbox);
                    columnField.doLayout();
                }


                //是否显示填写postId的formPanel
                if(showPostForm){
                    var channelPostInfoForm = this.getChannelPiostInfoForm();
                    channelPostInfoForm.show();
                }

                win.show();
            }
        });

        return win;

    },

    /* 文章的校检包括:文章标题不能为空且不能多余25,文章摘要不能为空且不能超过45 */
    articleValidate: function(articleTitle, articleSummary) {
        //文章标题校检
        if(articleTitle === null || articleTitle === undefined || articleTitle.length === 0 ||articleTitle.length>25){
            Ext.MessageBox.alert('校检失败', '文章标题不符合要求');
            return false;
        }

        //文章摘要校检
        if(articleSummary === null || articleSummary === undefined || articleSummary.length === 0 || articleSummary.length>45){
            Ext.MessageBox.alert('校检失败', '文章摘要不符合要求');
            return false;
        }

        return true;
    }

});
