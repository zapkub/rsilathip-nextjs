module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/', title: 'Page' },
      '/products': { page: '/products', title: 'Our Product' },
      '/contact': { page: '/contact-us', title: 'Contact' },
      '/blog': { page: '/blog', title: 'Blog' }
    }
  }
}
