define(['angular'], function (Angular) {

    // Create new empty app/module named 'lafete'
    var EventManager = Angular.module('eventManager', []);

    // export module to use it in other classes
    return EventManager;
});