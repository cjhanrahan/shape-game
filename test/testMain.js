import 'babel-polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const testContext = require.context('.', true, /Test.jsx?$/)
testContext.keys().forEach(testContext)
