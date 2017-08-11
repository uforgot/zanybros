/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/
let Routie = function(w, isModule) {

    let routes = [];
    let map = {};
    let reference = "routie";
    let oldReference = w[reference];

    let Route = function(path, name) {
        this.name = name;
        this.path = path;
        this.keys = [];
        this.fns = [];
        this.params = {};
        this.regex = pathToRegexp(this.path, this.keys, false, false);

    };

    Route.prototype.addHandler = function(fn) {
        this.fns.push(fn);
    };

    Route.prototype.removeHandler = function(fn) {
        for (let i = 0, c = this.fns.length; i < c; i++) {
            let f = this.fns[i];
            if (fn === f) {
                this.fns.splice(i, 1);
                return;
            }
        }
    };

    Route.prototype.run = function(params) {
        for (let i = 0, c = this.fns.length; i < c; i++) {
            this.fns[i].apply(this, params);
        }
    };

    Route.prototype.match = function(path, params){
        let m = this.regex.exec(path);

        if (!m) return false;


        for (let i = 1, len = m.length; i < len; ++i) {
            let key = this.keys[i - 1];

            let val = ('string' === typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

            if (key) {
                this.params[key.name] = val;
            }
            params.push(val);
        }

        return true;
    };

    Route.prototype.toURL = function(params) {
        let path = this.path;
        let param;
        for (param in params) {
            path = path.replace('/:'+param, '/'+params[param]);
        }
        path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
        if (path.indexOf(':') !== -1) {
            throw new Error('missing parameters for url: '+path);
        }
        return path;
    };

    let pathToRegexp = function(path, keys, sensitive, strict) {
        if (path instanceof RegExp) return path;
        if (path instanceof Array) path = '(' + path.join('|') + ')';
        path = path
            .concat(strict ? '' : '/?')
            .replace(/\/\(/g, '(?:/')
            .replace(/\+/g, '__plus__')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
                keys.push({ name: key, optional: !! optional });
                slash = slash || '';
                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/__plus__/g, '(.+)')
            .replace(/\*/g, '(.*)');
        return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    };

    let addHandler = function(path, fn) {
        let s = path.split(' ');
        let name = (s.length === 2) ? s[0] : null;
        path = (s.length === 2) ? s[1] : s[0];

        if (!map[path]) {
            map[path] = new Route(path, name);
            routes.push(map[path]);
        }
        map[path].addHandler(fn);
    };

    let routie = function(path, fn) {
        if (typeof fn === 'function') {
            addHandler(path, fn);
            routie.reload();
        } else if (typeof path === 'object') {
            for (let p in path) {
                addHandler(p, path[p]);
            }
            routie.reload();
        } else if (typeof fn === 'undefined') {
            routie.navigate(path);
        }
    };

    routie.lookup = function(name, obj) {
        for (let i = 0, c = routes.length; i < c; i++) {
            let route = routes[i];
            if (route.name === name) {
                return route.toURL(obj);
            }
        }
    };

    routie.remove = function(path, fn) {
        let route = map[path];
        if (!route)
            return;
        route.removeHandler(fn);
    };

    routie.removeAll = function() {
        map = {};
        routes = [];
    };

    routie.navigate = function(path, options) {
        options = options || {};
        let silent = options.silent || false;

        if (silent) {
            removeListener();
        }
        setTimeout(function() {
            window.location.hash = path;

            if (silent) {
                setTimeout(function() {
                    addListener();
                }, 1);
            }

        }, 1);
    };

    routie.noConflict = function() {
        w[reference] = oldReference;
        return routie;
    };

    let getHash = function() {
        return window.location.hash.substring(1);
    };

    let checkRoute = function(hash, route) {
        let params = [];
        if (route.match(hash, params)) {
            route.run(params);
            return true;
        }
        return false;
    };

    let hashChanged = routie.reload = function() {
        let hash = getHash();
        for (let i = 0, c = routes.length; i < c; i++) {
            let route = routes[i];
            if (checkRoute(hash, route)) {
                return;
            }
        }
    };

    let addListener = function() {
        if (w.addEventListener) {
            w.addEventListener('hashchange', hashChanged, false);
        } else {
            w.attachEvent('onhashchange', hashChanged);
        }
    };

    let removeListener = function() {
        if (w.removeEventListener) {
            w.removeEventListener('hashchange', hashChanged);
        } else {
            w.detachEvent('onhashchange', hashChanged);
        }
    };
    addListener();

    if (isModule){
        return routie;
    } else {
        w[reference] = routie;
    }

};

export default Routie(window, true);


