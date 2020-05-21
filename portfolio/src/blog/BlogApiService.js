const blogUrl = 'https://portfolio-server.mdrichardson.net/blog/';
const tagsUrl = `${blogUrl}tags/`
const articlesUrl = `${blogUrl}articles/`
const blogAdminUrl = `${blogUrl}admin/`
const unpublishedUrl = `${blogAdminUrl}unpublished/`
const previewUrl = `${blogAdminUrl}preview/`
const adminTagsUrl = `${blogAdminUrl}tags/`

const urls = {
  blog: blogUrl,
  tags: tagsUrl,
  articles: articlesUrl,
  admin: blogAdminUrl,
  unpublished: unpublishedUrl,
  preview: previewUrl,
  newTag: adminTagsUrl
}

const BlogApiService = {
  blogIsUp: async() => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 300);
      const res = await(fetch(urls.blog, {signal: controller.signal}));
      clearTimeout(timeout);
      return res.status === 200 ? true : false;
    } catch (err) {
      return false;
    }
  },
  getTags: async () => {
    try {
      const tagsResponse = await fetch(urls.tags);
      const tags = tagsResponse.json();
      return await tags;
    } catch(err) {
      console.error(`Error fetching tags: ${err}`);
    }
  },
  addNewTag: async (newTag, token) => {
    try {
      const res = await fetch(urls.newTag, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTag,
          token: token
        })
      })
      const status = await res.status;
      if (status === 200) {
        console.log('Tag added successfully');
        return await status
      }
    } catch(err) {
      console.error(err);
    }
  },
  getArticles: async () => {
    try {
      const articlesRespose = await fetch(urls.articles);
      const articles = articlesRespose.json();
      return articles && articles.length > 0 ? articles : [];
    } catch(err) {
      console.error(`Error fetching articles: ${err}`);
    }
  },
  getUnpublishedArticles: async (token) => {
    try {
      const previewResponse = await fetch(urls.unpublished, {
        headers: { 'x-access-token': token },
      });
      const unpublishedArticles = previewResponse.json();
      return await unpublishedArticles
    } catch(err) {
      console.error(`Error fetching preview articles: ${err}`);
    }     
  },
  getSingleUnpublishedArticle: async (slug, token) => {
    const articleRespose = await fetch(`${urls.preview}${slug}`, {
      method: 'GET',
      headers: { 'x-access-token': token }
    });
    const article = articleRespose.json();
    return await article
  },
  changeUrlIfOnGithub: (url) => {
    const pathname = new URL(window.location.href).pathname;
    const onGithub = pathname.includes('portfolio');
    return onGithub ? `/portfolio${ url }` : url
  }
}

export default BlogApiService;