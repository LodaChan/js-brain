const WEBGL = {

    isWebGLAvailable: function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));

        } catch (e) {
            return false;
        }

    },

    isWebGL2Available: function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
        } catch (e) {
            return false;
        }

    }
}

export { WEBGL };