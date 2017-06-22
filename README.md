# ModuleCreater
Create a series of files depend on the config file description.

# Install
cd file directory and execute cmd 'node link'.

# Usage
``` node
$ mcreater init             // create config file 'mcreater.config.json'
$ mcreater create <name> [path map] // create file at path, relative path, see config file settings
```

## Config example
```
{
    "default": {
        "map": "./",
        "hierarchy": [
            "${name}.js",
            "${name}.css"
        ]
    },
    "page": {
        "map": "./Pages",
        "hierarchy": {
            "${name}subpath": [
                "${name}.js",
                "${name}.css"
            ]
        }
    },
    "component": {
        "map": "./Components",
        "hierarchy": [
            "${name}.js",
            "${name}.css"
        ]
    }
}
```
## Hierarchy setting example
```
"hierarchy": [
    "${name}.js",
    "${name}.css"
]
```
```
"hierarchy": {
    "${name}": "index.js"
}
```
```
"hierarchy": {
    "${name}": [
        "index.js",
        "index.css"
    ]
}
```
```
"hierarchy": {
    "${name}": {
        "${name}SubDir": [
            "index.js",
            "index.css"
        ]
    }
}
```
Even more
```
"hierarchy": [
    [
        {
            "${name}A": [
                "index.js",
                "style.js"
            ]
        },
        {
            "${name}B": [
                "index.js",
                "style.js"
            ]
        }
    ]
]
```
```
"hierarchy": {
    "${name}": [
        {
            "${name}A": [
                "index.js",
                "style.js"
            ]
        },
        {
            "${name}B": [
                "index.js",
                "style.js"
            ]
        }
    ]
}
```
