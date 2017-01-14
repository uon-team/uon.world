/**
 * @file System
 * @see uon.world.System
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon = require('uon.core');
const BitField = uon.BitField;

class System {


    /**
     *
     * @param {...} components
     */
    constructor(components) {

        // the system id, will be set by a World when attached
        this._id = null;

        // the world this system is attached to
        this._world = null;

        // a flat list of entities
        this._entities = [];


        if (uon.isArray(components)) {
            this._components = components;
        } else {
            this._components = uon.array.from(arguments);
        }
        
        this._removeCount = 0;
    }

    get world() {
        return this._world;
    }

    /**
     * Add an entity to this
     * @param entity
     */
    add(entity) {

        // cannot add an entity twice
        if (this._entities.indexOf(entity) > -1) {
            return;
        }

        this._entities.push(entity);
    }

    /**
     * Removes an entity from this system
     * @param entity
     */
    remove(entity) {


        // get entity index
        var index = this._entities.indexOf(entity);

        // entity cannot be found
        if (index === -1) {
            return;
        }

        // set our entity to null
        this._entities[index] = null;

        // increment the remove counter
        this._removeCount++;

        // upon reaching 10 removes, do a clean up and reset the remove counter
        if (this._removeCount > 10) {
            this.cleanup();
            this._removeCount = 0;
        }
    }

    /**
     * Whether or not this system handle a component type
     * @param {Entity} entity
     */
    hasInterest(entity) {

        for (var i = 0, l = this._components.length; i < l; ++i) {

            if (!entity.has(this._components[i])) {
                return false;
            }
        }

        return true;
        
    }

    /**
     * Performs a cleanup of null entities
     */
    cleanup() {

        // remove all null entities
        this._entities = this._entities.filter((v) => {
            return v !== null;
        });

    }




};

module.exports = System;