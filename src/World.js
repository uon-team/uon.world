/**
 * @file World
 * @see uon.world.World
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon = require('uon.core');
const BitField = uon.BitField;

class World extends uon.EventSource {


    constructor(name) {

        // the entities added after the last update
        this._added = [];

        // the entities removed after the last update
        this._removed = [];

        // the list of active entities
        this._active = [];

        // the list of systems
        this._systems = [];

        // id counter
        this._nextId = 0;


    }

    update() {

        for (i = 0, l = this._removed.length; i < l; ++i) {
            var index = this._active.indexOf(this._removed[i]);
            this._active[index] = null;

            this.removeFromSystems(this._removed[i]);
        }


        for (i = 0, l = this._added.length; i < l; ++i) {

            this._active.push(this._added[i]);
            this.addToSystems(this._added[i]);
        }

        this._added.length = 0;
        this._removed.length = 0;


    }


    addEntity(entity) {


        if (entity._world === null) {
            entity._id = this.createId();
            entity._world = this;
        }

        this._added.push(entity);

    }

    removeEntity(entity) {

        if (entity._world !== this) {
            return;
        }

        this._removed.push(entity);
    }

    addSystem(system) {

        if (this._systems.indexOf(system)) {
            console.warn('Cannot add the same system twice');
            return;
        }

        system._world = this;
        this._systems.push(system);
    }

    removeSystem(system) {
       
        if (uon.array.erase(this._systems, system)) {
            system._world = null;
        }
    }

    addToSystems(entity) {

        let system = null;
        for (var i = 0, l = this._systems.length; i < l; ++i) {
            system = this._systems[i];
            if (system.hasInterest(entity)) {
                system.add(entity);
            }
        }
    }

    removeFromSystems(entity) {

        for (var i = 0, l = this._systems.length; i < l; ++i) {
            this._systems[i].remove(entity);
        }
    }


    cleanup() {

        this._active = this._active.filter((v) => {
            return v !== null;
        });

    }

    createId() {
        return this._nextId++;
    }

    onEntityComponentAdded(entity, type) {

    }

    onEntityComponentRemoved(entity, type) {

    }


};

module.exports = World;