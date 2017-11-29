import config from '../config'
import { compose, withProps } from 'recompose'
import withPromises from '../lib/withPromises'
import BlogList from '../components/BlogList'
import objectPath from 'object-path'

export default compose(
  withPromises(props => ({
    blogs: config.getBlog()
  })),
  withProps(props => ({
    blogs: objectPath(props).get('results.blogs', [])
  }))
)(BlogList)
