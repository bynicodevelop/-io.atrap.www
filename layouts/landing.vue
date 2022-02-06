<template>
  <div>
    <Notification />
    <slot />
    <CookieBanner />
    <Footer />
  </div>
</template>

<script setup>
const {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_THUMBNAIL,
  TWITTER_AUTHOR,
} = useRuntimeConfig();

const siteUrl = SITE_URL;
const siteName = SITE_NAME;
const title = `${SITE_TITLE} - ${siteName}`;
const description = SITE_DESCRIPTION;
const image = `${siteUrl}/${SITE_THUMBNAIL}`;
const twitterAuthor = TWITTER_AUTHOR.replace(/^@/, "");

useMeta({
  title,
  description,
  link: [
    { rel: "canonical", href: siteUrl },
    { rel: "icon", href: `${siteUrl}/favicon.ico` },
    { rel: "apple-touch-icon", href: `${siteUrl}/apple-touch-icon.png` },
  ],
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: `@${twitterAuthor}`,
    },
    {
      name: "twitter:creator",
      content: `@${twitterAuthor}`,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: image,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "og:image",
      content: image,
    },
    {
      name: "og:url",
      content: siteUrl,
    },
    {
      name: "og:site_name",
      content: siteName,
    },
    {
      name: "og:type",
      content: "website",
    },
  ],
});
</script>
