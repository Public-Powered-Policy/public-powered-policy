/* ----------------------------------------------------------------------------
creates a responsive <img> (Robust, final version)
---------------------------------------------------------------------------- */
import eleventyImage from '@11ty/eleventy-img';

export default async function image(
    src,
    alt,
    cssClass = null,
    // The default sizes value should be specific to the small viewport
    sizes = '90vw', 
    loadingAttr = 'lazy',
) {
    const filePath = `_source/assets/images/${src}`;
    const metadata = await eleventyImage(filePath, {
        widths: [500, 1000, 1500, 2000, 2500, 3000],
        formats: ['webp'], 
        urlPath: "/public-powered-policy/assets/images/",
        outputDir: './_public/assets/images/',
        sharpWebpOptions: { quality: 40 },
    });
    
    if (!metadata.webp || metadata.webp.length === 0) {
        console.error(`ERROR: Eleventy Image failed to generate 'webp' metadata for image: ${src}`);
        // Return a broken image tag so the build doesn't crash entirely.
        return `<img src="/broken-image-placeholder.png" alt="[Image failed to load: ${alt}]">`;
    }

    const data = metadata.webp[0]; 

    const completeSizes = `(max-width: 44.9em) ${sizes}, 50vw`;

    // Return the final HTML string, using your original structure that worked for parsing.
    return `<img ${cssClass ? `class="${cssClass}"` : ''} 
      src="${data.url}" 
      width="${data.width}" 
      height="${data.height}" 
      alt="${alt}" 
      loading="${loadingAttr}" 
      decoding="async" 
      sizes="${completeSizes}" 
      srcset="${Object.values(metadata)
      .map((imageFormat) => imageFormat.map((entry) => entry.srcset).join(', '))
      .join(', ')}">`;
}