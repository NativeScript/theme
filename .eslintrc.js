module.exports = {
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double",
            { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "yoda": [
            "error",
            "never",
            { "exceptRange": true }
        ],
        "key-spacing": [
            "error",
            { "afterColon": true }
        ],
        "semi-spacing": [
            "error",
            {"before": false, "after": true}
        ],
        "space-infix-ops": ["error", {"int32Hint": false}],
        "space-before-blocks": "error",
        "operator-linebreak": "error",
        "keyword-spacing": "error",
        "no-trailing-spaces": "error",
        "brace-style": "error",
        "camelcase": "error",
        "eqeqeq": "error",
        "no-with": "error",
        "array-callback-return": "error",
        "curly": "error",
        "no-eval": "error",
        "no-console": "off"
    }
};