/**
 * @file Camera
 * @see uon.world.Camera
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const uon_math = require('uon.math');
const Vector3 = uon_math.Vector3;
const Quaternion = uon_math.Quaternion;
const Matrix4 = uon_math.Matrix4;
const Frustum = uon_math.Frustum;


const TEMP_QUAT = new Quaternion();
const TEMP_VEC3 = new Vector3();
const TEMP_MATRIX4 = new Matrix4();
const TEMP_MATRIX4_2 = new Matrix4();


/**
 * Base class for cameras
 */
class Camera {

    constructor() {

        this._translation = new Vector3();
        this._orientation = new Quaternion();
        this._up = Vector3.UnitY.clone();

        this._world = new Matrix4();
        this._view = new Matrix4();
        this._projection = new Matrix4();
        this._viewproj = new Matrix4();
        this._frustum = new Frustum();

        // dirty flags
        this._worldDirty = true;
        this._viewDirty = true;
        this._projDirty = true;
    }

    /**
     * Getter for the translation vector
     */
    get translation() {
        return this._translation;
    }

    /**
     * Setter for the translation vector
     * @param {Vector3} vec3
     */
    set translation(vec3) {

        this._translation.copy(vec3);
        this._worldDirty = true;
        this._viewDirty = true;
    }

    /**
     * Getter for the orientation quaternion
     */
    get orientation() {
        return this._orientation;
    }

    /**
     * Setter for the orientation quaternion
     * @param {Quaternion} quat
     */
    set orientation(quat) {
        this._orientation.copy(quat);
        this._worldDirty = true;
        this._viewDirty = true;
    }

    /**
     * Translate the camera along an axis
     * @param {Vector3} axis
     * @param {Number} distance
     */
    translate(axis, distance) {

        TEMP_VEC3.copy(axis).applyQuaternion(this._orientation);
        this._translation.add(TEMP_VEC3.multiplyScalar(distance));

        this._worldDirty = true;
        this._viewDirty = true;
    }

    /**
     * Rotate the camera with axis and angle
     * @param {Vector3} axis
     * @param {Number} angle
     */
    rotate(axis, angle) {

        TEMP_QUAT.fromAxisAngle(axis, angle);
        this._orientation.multiply(TEMP_QUAT);

        this._worldDirty = true;
        this._viewDirty = true;
    }

    /**
     * Orients the camera to be facing a world position
     * @param {Vector3} point
     */
    lookAt(point) {

        var m = TEMP_MATRIX4.identity();
        m.lookAt(this._translation, point, this._up);

        this._orientation.setFromRotationMatrix(m);
    }

    /**
     * Must implement in sub class
     */
    updateProjection() {
        throw 'Not Implemented';
    }


};

module.exports = Camera;