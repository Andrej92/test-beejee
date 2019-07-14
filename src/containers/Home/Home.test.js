import { shallow } from 'enzyme';
import Home from './Home';

describe('<Home />', () => {
  it('renders text Home', () => {
    const wrapper = shallow(Home />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });
});
