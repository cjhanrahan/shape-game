import 'babel-polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const requireFromContext = require.context('.', true, /Test.jsx?$/)
const paths = requireFromContext.keys()
paths.forEach(requireFromContext)
