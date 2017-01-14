/**
 * @file Component
 * @see uon.world.Component
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon = require('uon.core');
const BitField = uon.BitField;

class Component {


    constructor() {

        // the component id, will be set by a World when attached
        this._id = null;
    }

};

module.exports = Component;