import markdownIt from 'markdown-it';
import esbuild from './_source/_utilities/esbuild.js';
import lightingcss from './_source/_utilities/lightningcss.js';
import image from './_source/_utilities/image.js';
import style from './_source/_utilities/style.js';
import setVar from './_source/_utilities/setVar.js';
import fullDate from './_source/_utilities/fullDate.js';
import markdownify from './_source/_utilities/markdownify.js';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from 'markdown-it-attrs';
import markdownItTOC from 'markdown-it-toc-done-right';
import { JSDOM } from 'jsdom';
import fs from "fs";
import { EleventyRenderPlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  /* --------------------------------------------------------------------------
  Plugins, bundles, shortcodes, filters
  -------------------------------------------------------------------------- */
  eleventyConfig.addPlugin(esbuild);
  eleventyConfig.addPlugin(lightingcss);
  eleventyConfig.addBundle('css', { transforms: [style] });
  eleventyConfig.addShortcode('image', image);
  eleventyConfig.addPairedShortcode('setVar', setVar);
  eleventyConfig.addFilter('fullDate', fullDate);
  eleventyConfig.addFilter('markdownify', markdownify);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("tocFromHtml", (html) => {
    const dom = new JSDOM(html);
    const headings = dom.window.document.querySelectorAll("h2, h3");
    let toc = '<nav class="toc"><ul class="unlisted font-size-sm font-weight-lg mt-sm">';
    headings.forEach(h => {
      if (h.id) {
        const tag = h.tagName.toLowerCase();
        toc += `<li><a class="${tag} button --simple" href="#${h.id}">${h.textContent}</a></li>`;
      }
    });
    toc += "</ul></nav>";
    return toc;
  });
  eleventyConfig.addPairedShortcode("accordion", function(content, title, id, level = 2) {
    const safeId = id || title.toLowerCase().replace(/\s+/g, "-");
    const headingTag = `h${level}`;
    return `
      <details class="accordion">
        <summary>
          <${headingTag} id="${safeId}" class="accordion-item">
            ${md.renderInline(title)}
          </${headingTag}>
        </summary>
        <div class="accordion-panel">
          ${md.render(content)}
        </div>
      </details>`;
  });

  /* --------------------------------------------------------------------------
  MarkdownIt settings
  -------------------------------------------------------------------------- */
  const markdownItOptions = {
    html: true,
    typographer: true,
  };

const md = markdownIt(markdownItOptions)
  .use(markdownItAnchor)
  .use(markdownItAttrs)
  .use(markdownItTOC, {
    level: [2, 3],   // only include h2 and h3
    listType: "ul",  // default is "ul", could be "ol"
    containerClass: "toc" // optional: add a class for styling
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  /* --------------------------------------------------------------------------
  Files & folders
  -------------------------------------------------------------------------- */
  eleventyConfig.ignores.add('.DS_Store');
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.addPassthroughCopy('_source/assets/fonts');
  eleventyConfig.addPassthroughCopy('_source/assets/images');

  return {
    dir: {
      input: '_source',
      output: '_public',
      layouts: '_layouts',
      includes: '_includes',
    },
    templateFormats: ['html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    pathPrefix: "/public-powered-policy/", // <-- Change when moved to custom domain
  };
}