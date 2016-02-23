'use strict';

/**
 * Constructor function. It accepts a Bot and settings object which should contain the following keys:
 *
 * @param {object} settings
 * @constructor
 *
 * @author D. Rimron-Soutter <darran@xalior.com>
 */
var TranslateCell = function Constructor(GertyBot, settings) {
    this.GertyBot = GertyBot
    this.settings = settings;
    this.name = 'TranslateCell';
};

/**
 * Translates messages between languages.
 * @param {object} message
 * @returns {string}
 * @private
 */
TranslateCell.prototype.dispatch = function (message) {
    var incoming_command = message.text.match(this.GertyBot.command_detector);
    switch(incoming_command[0]) {
        case '!translate':
            this.GertyBot.log.info('Cell.Translate._dispatch: !translate from @'
                + (this.GertyBot.getUserById(message.user).name));

    }
};

TranslateCell.prototype.register = function () {
    this.GertyBot._register('translate', this);
};

module.exports = TranslateCell;