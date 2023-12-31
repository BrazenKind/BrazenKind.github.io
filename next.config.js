// @ts-check

/** Followed this guide to configure Next.js to be hosted on Github pages:
https://github.com/gregrickaby/nextjs-github-pages */

/** @type {import('next').NextConfig} */
const nextConfig = {

/**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },


};

module.exports = nextConfig;
