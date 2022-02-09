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
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:site",
      content: `@${twitterAuthor}`,
    },
    {
      property: "twitter:creator",
      content: `@${twitterAuthor}`,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: image,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: image,
    },
    {
      property: "og:url",
      content: siteUrl,
    },
    {
      property: "og:site_name",
      content: siteName,
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>
