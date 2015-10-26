/*
 * File: app/model/MediaArticleModel.js
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

Ext.define('GURUAdmin.model.MediaArticleModel', {
    extend: 'Ext.data.Model',
    alias: 'model.MediaArticleModel',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'articleId'
        },
        {
            name: 'articleTitle'
        },
        {
            name: 'content'
        },
        {
            name: 'mediaName'
        },
        {
            name: 'mediaOpenId'
        },
        {
            name: 'articleUrl'
        },
        {
            name: 'showFlag'
        },
        {
            name: 'timestamp'
        }
    ]
});