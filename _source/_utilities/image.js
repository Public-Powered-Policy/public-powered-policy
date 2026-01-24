/* ----------------------------------------------------------------------------
creates a responsive <picture> with webp + jpeg fallback
---------------------------------------------------------------------------- */
import eleventyImage from '@11ty/eleventy-img';

export default async function image(
  src,
  alt,
  cssClass = null,
  sizes = '90vw',
  loadingAttr = 'lazy',
) {
  const filePath = `_source/assets/images/${src}`;
  const metadata = await eleventyImage(filePath, {
    widths: [500, 1000, 1500, 2000, 2500, 3000],
    formats: ['webp', 'jpeg'],
    urlPath: "/public-powered-policy/assets/images/",
    outputDir: './_public/assets/images/',
    sharpWebpOptions: { quality: 40 },
  });

  const completeSizes = `(max-width: 44.9em) ${sizes}, 50vw`;

  return eleventyImage.generateHTML(metadata, {
    alt,
    loading: loadingAttr,
    decoding: "async",
    sizes: completeSizes,
    class: cssClass
  });
}