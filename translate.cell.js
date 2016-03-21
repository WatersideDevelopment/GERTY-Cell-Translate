'use strict';

var gTranslateModule = require('google-translate');
var q = require('bluebird');

/**
 * Constructor function. It accepts a Bot and settings object which should contain the following keys:
 *
 * @param {object} settings
 * @constructor
 *
 * @author D. Rimron-Soutter <darran@xalior.com>
 */
var TranslateCell = function Constructor(GertyBot) {
    this.GertyBot = GertyBot;
    this.name = 'TranslateCell';
    this.namespace = 'uk.co.waterside-development.gerty.cells.translate';
    this.settings = this.GertyBot.settings.cellConfig['uk.co.waterside-development.gerty.cells.translate'];
    this.translator = gTranslateModule(this.settings.APIKEY);
};

/**
 * Translates messages between languages.
 * @param {object} message
 * @returns {string}
 * @private
 */
TranslateCell.prototype.dispatch = function (message) {
    var incoming_command = message.text.match(this.GertyBot.command_detector);
    var Cell = this;
    switch(incoming_command[0]) {
        case '!translate':
            var text = message.text.replace('!translate ','');
            this.translate(text)
                .then(function(translation) {
                    Cell.GertyBot.reply(message, translation);
                });
            break;
        case '!-translate':
            var text = message.text.replace('!-translate ','');

            this.translate(text, this.settings.default_destination_lang, this.settings.default_source_lang)
                .then(function(translation) {
                    Cell.GertyBot.reply(message, translation);
                });
            break;

    }
};

TranslateCell.prototype.register = function () {
    this.GertyBot._register('translate', this);
    this.GertyBot._register('-translate', this);
};

TranslateCell.prototype.translate = function(text, source_lang, destination_lang) {
    var deferred = q.defer();

    if(typeof source_lang == 'undefined') {
        source_lang = this.settings.default_source_lang
    }

    if(typeof destination_lang == 'undefined') {
        destination_lang = this.settings.default_destination_lang
    }

    this.translator.translate(text, source_lang, destination_lang, function(err, translation) {
        deferred.resolve({
            text: translation.translatedText
        });
    });

    return deferred.promise;

};

module.exports = TranslateCell;