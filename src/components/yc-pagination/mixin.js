import ycPagination from './index'

export default {
  components: {
    ycPagination
  },
  data () {
    return {
      options: {
        pageSize: 10,
        pageNum: 1,
        pageTotal: 1
      }
    }
  },
  methods: {
    async commonPage (opt) {
      const res = await kzFetch({url: opt.url, type: (opt.type || 'get'), data: opt.data})
      // if (res && res.list) {
      //   this.options.pageTotal = +(res.total || res.page_total || res.total_page || 0)
      // }
      this.options.pageTotal = +(res.total || res.page_total || res.total_page || 0)
      return res
    }
  },
  created () {
    // 刷新默认页码
    if (this.$route) {
      const query = this.$route.query
      if ('page' in query) {
        this.options.pageNum = query.page
      }
    }
  }
}

