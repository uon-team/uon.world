/**
 * @file PerpectiveCamera
 * @see uon.world.PerpectiveCamera
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon_math = require('uon.math');
const Vector3 = uon_math.Vector3;
const Camera = require('./Camera');


class PerpectiveCamera extends Camera {

    /**
     * Creates a new perspective camera
     * @param {Number} fov
     * @param {Number} aspect
     * @param {Number} near
     * @param {Number} far
     */
    constructor(fov, aspect, near, far) {
        super();

        this._fov = fov !== undefined ? fov : 50;
        this._aspect = aspect !== undefined ? aspect : 1;
        this._near = near !== undefined ? near : 1e-6;
        this._far = far !== undefined ? far : 1e27;
        this._zoom = 1;

    }

    get fov() {
        return this._fov;
    }

    set fov(val) {
        this._fov = val;
        this._projDirty = true;
    }

    get aspect() {
        return this._aspect;
    }

    set aspect(val) {
        this._aspect = val;
        this._projDirty = true;
    }

    get zoom() {
        return this._zoom;
    }

    set zoom(val) {e
        this._zoom = val;
        this._projDirty = true;
    }

    get near() {
        return this._near;
    }

    set near(val) {
        this._near = val;
        this._projDirty = true;
    }

    get far() {
        return this._near;
    }

    set far(val) {
        this._far = val;
        this._projDirty = true;
    }


    /**
     * Update the projection matrix
     */
    updateProjection() {

        var fov = uon_math.toDegrees(2 * Math.atan(Math.tan(uon_math.toRadians(this._fov) * 0.5) / this._zoom));

        this._projection.makePerspective(fov, this._aspect, this._near, this._far);
    }

};


module.exports = PerspectiveCamera;