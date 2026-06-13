export default function(eleventyConfig) {

  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Watch CSS/JS for live reload during dev
  eleventyConfig.addWatchTarget("src/assets/");

  // Collections for research content (blog + case studies)
  eleventyConfig.addCollection("insights", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/research/insights/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("caseStudies", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/research/case-studies/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("research", (collectionApi) => {
    return collectionApi.getFilteredByTag("research").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Year shortcode for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Date filter for templates
  eleventyConfig.addFilter("dateFormat", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("json", (value) => {
    return JSON.stringify(value);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
