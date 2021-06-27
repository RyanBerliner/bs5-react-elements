module.exports = function(eleventyConfig) { 
  eleventyConfig.addFilter("exampleusage", function(value) {
    return `exampleusage/${value.toLowerCase()}.njk`;
  });

  eleventyConfig.addPassthroughCopy({'dist': 'assets/dist'});

  return {
    pathPrefix: "/bs5-react-elements/",
    passthroughFileCopy: true,
  };
}