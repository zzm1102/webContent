/*
 * File: app/view/EditHeatViewWindow.js
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

Ext.define('GURUAdmin.view.EditHeatViewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.editheatviewwindow',

    requires: [
        'GURUAdmin.view.EditHeatViewWindowViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'editheatviewwindow'
    },
    height: 550,
    itemId: 'EditHeatViewWindow',
    width: 450,
    title: '编辑热读榜记录',
    modal: true,

    items: [
        {
            xtype: 'form',
            height: 450,
            id: 'editHeatViewWinForm',
            itemId: 'editHeatViewWinForm',
            width: 440,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    id: 'gridAuthor',
                    width: 420,
                    fieldLabel: '作者',
                    labelWidth: 60,
                    readOnly: true,
                    editable: false
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    id: 'gridCreateDate',
                    fieldLabel: '创建日期',
                    labelWidth: 60,
                    readOnly: true,
                    editable: false
                },
                {
                    xtype: 'textfield',
                    hidden: true,
                    id: 'gridHeatPostId',
                    width: 420,
                    fieldLabel: '帖子id',
                    labelWidth: 60
                },
                {
                    xtype: 'radiogroup',
                    id: 'gridHeatType',
                    fieldLabel: '类型',
                    labelWidth: 60,
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'gridHeatType',
                            boxLabel: '24小时热读',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'gridHeatType',
                            boxLabel: '周热读',
                            inputValue: '2'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    id: 'gridHeatShowFlag',
                    fieldLabel: '是否显示',
                    labelWidth: 60,
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'gridHeatShowFlag',
                            boxLabel: '显示',
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'gridHeatShowFlag',
                            boxLabel: '不显示',
                            inputValue: '2'
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    id: 'gridHeatSortCode',
                    width: 420,
                    fieldLabel: '排序码',
                    labelWidth: 60
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    height: 285,
                    id: 'gridHeatRemark',
                    fieldLabel: '标记内容',
                    labelWidth: 60
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    hidden: true,
                    id: 'gridHeatId',
                    fieldLabel: '主键'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'editHeatViewBt',
                    text: '提交'
                }
            ]
        }
    ]

});