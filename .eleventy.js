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

  eleventyConfig.addPassthroughCopy({'dist': 'assets/dist'});

  return {
    pathPrefix: "/bs5-react-elements/",
    passthroughFileCopy: true,
  };
}