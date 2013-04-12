/**
 * myrouter.js v0.1
 * author: Yosiya Hinosawa
 */

window.Router = (function () {
    'use strict';

    var Router = function () {
        this.scenes = {};
    };

    var exports = function () {
        return new Router();
    };

    var routerPrototype = Router.prototype = exports.prototype = {};

    routerPrototype.constructor = exports;

    var getHashObj = function () {
        var obj = {};

        window.location.hash.replace(/^#/, '').split('&').forEach(function (s) {
            var t = s.split('=', 2);
            obj[t[0]] = t[1];
        });

        return obj;
    };

    routerPrototype.addRoute = function (name, scene) {
        this.scenes[name] = scene;
    };

    routerPrototype.setSceneNavigator = function (navigator) {
        this.navigator = navigator
    };

    routerPrototype.start = function () {
        if (this.listener != null) {
            throw Error('listener already exists. first stop router.');
        }

        var that = this;

        this.listener = function () {
            var obj = getHashObj();

            var sceneName = obj.scene;

            that.goToRoute(sceneName);
        };

        window.addEventListener('hashchange', this.listener, false);
    };

    routerPrototype.goToRoute = function (name) {
        var scene = this.getSceneByName(name);

        if (scene == null) {
            throw Error('there is no scene named: ' + name);
        }

        this.navigator.go(scene);        
    };

    routerPrototype.getSceneByName = function (name) {
        if (name == null) {
            return this.scenes.__default__;
        }

        return this.scenes[name];
    };

    routerPrototype.stop = function () {
        window.removeEventListener('hashchange', this.listener, false);
    };

    return exports;
}());
