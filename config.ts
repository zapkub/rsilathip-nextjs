const ENDPOINT = 'http://rsilathip.com/v2/wordpress/index.php'

function request(path) {
  return window.fetch(`${ENDPOINT}/wp-json/wp/v2${path}`)
}
async function getMediaLink(mediaId) {
  const response = await request('/media/' + mediaId)
  return response.json()
}

async function getStaticPageContent(pageSlug: string) {
  const response = await request('/pages?slug=' + pageSlug)
  return response.json()
}

async function getCategoryId(slug: string) {
  const response = await request('/categories?slug=' + slug)
  const result: any[] = await response.json()
  if (result.length > 0) {
    return result[0]
  } else {
    return undefined
  }
}

export default {
  getIndexPageData: async (lang: 'en' | 'th') => {
    const AboutusData = await getStaticPageContent('about-us-' + lang)
    const FounderData = await getStaticPageContent('founder-' + lang)
    return {
      aboutus: AboutusData[0],
      founder: FounderData[0]
    }
  },
  getServiceData: async (lang: 'en' | 'th') => {
    const serviceListCategoryData = await getCategoryId('service-list')
    const serviceListResponse = await request(
      '/posts?categories=' + serviceListCategoryData.id
    )
    const serviceListResult = await serviceListResponse.json()
    return Promise.all(
      serviceListResult
        .filter(data => /\-th/.test(data.slug))
        .map(async data => {
          const media = await getMediaLink(data.featured_media)
          data.image = media.source_url
          return data
        })
    )
  },
  getFooterData: async (lang: 'en' | 'th') => {
    const getFooterResponse = await request('/pages?slug=footer-' + lang)
    const result = await getFooterResponse.json()
    if (result[0]) {
      return result[0].content.rendered
    }
  },
  getBannerData: async () => {
    /**
     * Get category id of Hero image
     */
    const getCategoryNameResponse = await request('/categories?slug=hero')
    const categoryResult = await getCategoryNameResponse.json()
    if (categoryResult.length <= 0) {
      return []
    }

    const response = await request('/posts?categories=' + categoryResult[0].id)
    const result = await response.json()

    return Promise.all(
      result.map(async data => {
        const media = await getMediaLink(data.featured_media)
        return media.source_url
      })
    )
  }
}
