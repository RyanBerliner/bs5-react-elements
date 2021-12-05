const packageJson = require('./package.json');

module.exports = function(eleventyConfig) { 
  eleventyConfig.addFilter("exampleusage", function(value) {
    return `exampleusage/${value.toLowerCase()}.njk`;
  });

  eleventyConfig.addFilter("propdescription", function(value) {
    return value.split('@since ')[0];
  });

  eleventyConfig.addFilter("propsince", function(value) {
    return value.split('@since ')[1];
  });

  // usage: {{ 'minor' | packageversion }}
  // output: 2.1
  eleventyConfig.addFilter("packageversion", function(value) {
    const type = ['major', 'minor', 'patch'];
    return packageJson.version.split('.').slice(0, type.indexOf(value) + 1).join('.');
  })

  eleventyConfig.addPassthroughCopy({'dist': 'assets/dist'});

  return {
    pathPrefix: "/bs5-react-elements/",
    passthroughFileCopy: true,
  };
}