// Kudos: https://it.knightnet.org.uk/kb/node-js/get-properties/
function getObjProp(obj, prop) {
    if (! prop) { return undefined }
    if (typeof obj !== 'object') throw 'getProp: obj is not an object'
    if (typeof prop !== 'string') throw 'getProp: prop is not a string'

    // Replace [] notation with dot notation
    prop = prop.replace(/\[["'`](.*)["'`]\]/g,".$1")

    return prop.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj || self)
}

module.exports = getObjProp;
