/*
 * File: app/view/CommentDetailsWindow.js
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

Ext.define('GURUAdmin.view.CommentDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.CommentDetailsWindow',

    requires: [
        'GURUAdmin.view.CommentDetailsWindowViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'commentdetailswindow'
    },
    autoScroll: true,
    height: 550,
    itemId: 'CommentDetailsWindow',
    width: 550,
    title: '评论详细信息',
    modal: true,

    items: [
        {
            xtype: 'form',
            height: 481,
            itemId: 'CommentDetailsWinForm',
            width: 530,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    id: 'FormCommenter',
                    fieldLabel: '评论人',
                    labelWidth: 60,
                    editable: false
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    id: 'FormCommentCreateDate',
                    fieldLabel: '评论时间',
                    labelWidth: 60,
                    readOnly: true,
                    editable: false
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    height: 387,
                    id: 'FormContent',
                    fieldLabel: '评论内容',
                    labelWidth: 60
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    hidden: true,
                    id: 'FormCommentId',
                    fieldLabel: '评论id'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'CommentUpdateBt',
                    style: 'background:#22aee6;border:none;',
                    text: '提交更新'
                }
            ]
        }
    ]

});