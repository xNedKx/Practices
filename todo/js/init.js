requirejs.config({
    baseurl: "js/",
    paths: {
        react: "//cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min",
        reactDOM: "//cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min",
        babel: "//cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min"
    },
    shim: {
        react: {
            exports: "React"
        },
        ihae: {
            exports: "inputHeightAutoExpand"
        },
    },
    jsx: { fileExtension: ".js" }
});

requirejs(["jsx!todo"]);