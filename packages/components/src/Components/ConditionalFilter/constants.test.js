import { conditionalFilterType, typeMapper } from './constants';
import Text from './Text';

it('should have correct types', () => {
    expect(Object.values(conditionalFilterType).length).toBe(5);
});

it('should return correct type', () => {
    expect(typeMapper.checkbox.name).toBe('Checkbox');
});
