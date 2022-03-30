import React from 'react'

import { ControlledFilterSwitch } from 'features/_marketingAndCommunication/atoms/ControlledFilterSwitch'
import { render, fireEvent } from 'tests/utils/web'

describe('<ControlledFilterSwitch />', () => {
  it('should call onChange with new value on toggle', () => {
    const onChange = jest.fn()
    const renderAPI = render(<ControlledFilterSwitch onChange={onChange} name="testUnit" />)
    fireEvent.click(renderAPI.getByTestId('Interrupteur'))
    expect(onChange).toBeCalledWith(true)
    fireEvent.click(renderAPI.getByTestId('Interrupteur'))
    expect(onChange).toBeCalledWith(false)
  })
})
