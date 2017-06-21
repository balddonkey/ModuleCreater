# ModuleCreater
Create a series of files depend on the config file description.

# Install
cd file directory and execute cmd 'node link'.

# Usage
``` node
$ mcreater init             // create config file
$ mcreater create file path // create file at path, relative path, see config file settings
```

## Config example
```
[
    "${name}.js",
    "${name}.css"
]
```
```
{
    "${name}": "index.js"
}
```
```
{
    "${name}": [
        "index.js",
        "index.css"
    ]
}
```
```
{
    "${name}": {
        "${name}SubDir": [
            "index.js",
            "index.css"
        ]
    }
}
```
