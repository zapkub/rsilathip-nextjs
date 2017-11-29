const ENDPOINT = 'http://rsilathip.com/v2/wordpress/index.php'
const FACEBOOK_IMAGES_ENDPOINT =
  'http://www.rsilathip.com/api/getImages.php?target=slider'

const cache: { [key: string]: any } = {}

async function request(path) {
  if (cache[path]) {
    return cache[path]
  }
  const response = await window.fetch(`${ENDPOINT}/wp-json/wp/v2${path}`)
  const result = await response.json()
  cache[path] = result
  return result
}
async function getMediaLink(mediaId) {
  const response = await request('/media/' + mediaId)
  return response
}

async function getStaticPageContent(pageSlug: string) {
  const response = await request('/pages?slug=' + pageSlug)
  return response
}

async function getCategory(slug: string): Promise<{ id: any }> {
  const result: any[] = await request('/categories?slug=' + slug)
  if (result.length > 0) {
    return result[0]
  } else {
    return undefined
  }
}

export default {
  getBlog: async (page: number = 1) => {
    const result = await getCategory('blog')
    const blogData = await request(
      '/posts?categories=' + result.id + '&page=' + page
    )
    return blogData
  },
  getFacebookImagesData: async () => {
    try {
      const response = await fetch(FACEBOOK_IMAGES_ENDPOINT)
      const result = await response.json()
      return result.fb.photos.data.map(data => {
        return {
          href: data.link,
          url: data.images[0].source
        }
      })
    } catch (e) {
      console.error(e)
      return []
    }
  },
  getIndexPageData: async (lang: 'en' | 'th') => {
    const AboutusData = await getStaticPageContent('about-us-' + lang)
    const FounderData = await getStaticPageContent('founder-' + lang)
    return {
      aboutus: AboutusData[0],
      founder: FounderData[0]
    }
  },
  getServiceData: async (lang: 'en' | 'th') => {
    const serviceListCategoryData = await getCategory('service-list')
    const serviceListResult = await request(
      '/posts?categories=' + serviceListCategoryData.id
    )
    return Promise.all(
      serviceListResult
        .filter(data => new RegExp(`\-${lang}`).test(data.slug))
        .map(async data => {
          const media = await getMediaLink(data.featured_media)
          return {
            title: data.wps_subtitle,
            image: media.source_url,
            content: data.content.rendered,
            id: data.id
          }
        })
    )
  },
  getFooterData: async (lang: 'en' | 'th'): Promise<string> => {
    const result = await request('/pages?slug=footer-' + lang)
    if (result[0]) {
      return result[0].content.rendered
    }
  },
  getProductListData: async (page: number = 1) => {
    try {
      const productListResult = await request('/posts?slug=products-gallery')
      if (productListResult.length > 0) {
        const postId = productListResult[0].id
        const productListMediaResult = await request(
          '/media?parent=' + postId + `&page=${page}`
        )
        return productListMediaResult.map(media => {
          return {
            id: media.id,
            title: media.title.rendered,
            caption: media.caption.rendered,
            thumbnailImageUrl: media.media_details.sizes.medium.source_url,
            imageUrl: media.media_details.sizes.full.source_url
          }
        })
      }
    } catch (e) {
      console.error(e)
      return []
    }
  },
  getBannerData: async () => {
    /**
     * Get category id of Hero image
     */
    const categoryResult = await request('/categories?slug=hero')
    if (categoryResult.length <= 0) {
      return []
    }

    const result = await request('/posts?categories=' + categoryResult[0].id)

    return Promise.all(
      result.map(async data => {
        const media = await getMediaLink(data.featured_media)
        return {
          imageUrl: media.media_details.sizes.full.source_url,
          thumbnailImageUrl: media.media_details.sizes.medium.source_url
        }
      })
    )
  }
}
