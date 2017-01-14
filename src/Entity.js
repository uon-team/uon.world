/**
 * @file Entity
 * @see uon.world.Entity
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon = require('uon.core');
const BitField = uon.BitField;
const Component = require('./Component');

class Entity extends uon.EventSource {


    constructor() {

        // the entity id, will be set by a World when attached
        this._id = null;

        // the world that this entity is attached to
        this._world = null;

        // a map of components by type
        this._components = new Map();

    }

    /**
     * Attach a component to this entity
     * @param {Component} component
     */
    add(component) {

        // check type
        if (!(component instanceof Component)) {
            throw 'component must be derived from uon.world.Component';
        }

        var key = component.constructor;

        // warning, component of this type already set
        if (this._components.has(key)) {
            console.warn('Component of type ' + key.name + ' already defined withing this entity, will be replaced');
        }

        // save the component to the map
        this._components.set(key, component);

        // emit event
        this.emit('componentAdded', this, key);
    }

    /**
     * Detach a component from this
     * @param component
     */
    remove(componentType) {


        // remove the component from the map
        this._components.delete(componentType);

        // emit event
        this.emit('componentRemoved', this, componentType);

    }

    /**
     * Returns a component by type
     * @param type
     */
    get(type) {
        return this._components.get(type);
    }

    /**
     * Test if this entity has a component of a certain type
     * @param type
     */
    has(type) {
        return this._components.has(type);
    }

  



};

module.exports = Entity;