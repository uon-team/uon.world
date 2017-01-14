/**
 * @file uon.world
 * @see uon.world

 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


const world = {

    World: require('./src/World'),
    Entity: require('./src/Entity'),
    System: require('./src/System'),
    Component: require('./src/Component'),
    Camera: require('./src/Camera'),
    PerspectiveCamera: require('./src/PerspectiveCamera')
};

module.exports = world;