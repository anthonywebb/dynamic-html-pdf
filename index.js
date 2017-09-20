/**
 * dynamic-handlebar-pdf
 *
 *
 * Copyright (c) 2017 Navjot Dhanawat
 * Licensed under the MIT license.
 */

/**
 * Dynamic handlebars pdf is used to create pdf from handlebar templates.
 * @param  {document, options}
 * @return {callback}
 */

var Handlebars = require('handlebars'),
    pdf = require('html-pdf');

module.exports = {};
module.exports.create = (document, options) => {
    // Compile handlebar template
    return new Promise((resolve, reject) => {

        if (!document || !document.template || !document.context) {
            reject(new Error("Some, or all, options are missing."));
        }

        var html = Handlebars.compile(document.template)(document.context);

        // Create PDF from html template generated by handlebars
        pdf.create(html, options)
            .toBuffer((err, buff) => {
                if (!err)
                    resolve(buff);
                else
                    reject(err);
            });
    });
};
