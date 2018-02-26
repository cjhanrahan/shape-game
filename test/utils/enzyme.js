import { configure, mount as _mount, shallow as _shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

export const mount = _mount
export const shallow = _shallow
