module.exports = {
    "extends": "google",
    "parser": "babel-eslint",
    "plugins": [
        "flowtype"
    ],
    "rules": {
        "require-jsdoc": "off",
        "indent": ["error", 4],
        "new-cap": "off",
        "no-invalid-this": "off",
        "max-len": ["error", {"code": 120}]
    }
};
