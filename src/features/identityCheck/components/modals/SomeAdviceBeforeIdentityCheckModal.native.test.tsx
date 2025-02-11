import React from 'react'

import { SomeAdviceBeforeIdentityCheckModal } from 'features/identityCheck/components/modals/SomeAdviceBeforeIdentityCheckModal'
import { fireEvent, render } from 'tests/utils'

const hideModalMock = jest.fn()
const onPressContinueMock = jest.fn()

describe('<SomeAdviceBeforeIdentityCheckModal/>', () => {
  it('should render correctly', () => {
    const renderAPI = render(
      <SomeAdviceBeforeIdentityCheckModal
        visible
        hideModal={hideModalMock}
        onPressContinue={onPressContinueMock}
      />
    )
    expect(renderAPI).toMatchSnapshot()
  })

  it('should call hideModal function when clicking on Close icon', () => {
    const { getByTestId } = render(
      <SomeAdviceBeforeIdentityCheckModal
        visible
        hideModal={hideModalMock}
        onPressContinue={onPressContinueMock}
      />
    )
    const rightIcon = getByTestId('Fermer la modale de conseils pour avoir un document lisible')
    fireEvent.press(rightIcon)
    expect(hideModalMock).toHaveBeenCalledTimes(1)
  })

  it('should call onPressContinue when cliking on "J’ai compris" button', () => {
    const { getByText } = render(
      <SomeAdviceBeforeIdentityCheckModal
        visible
        hideModal={hideModalMock}
        onPressContinue={onPressContinueMock}
      />
    )
    fireEvent.press(getByText('J’ai compris'))
    expect(onPressContinueMock).toHaveBeenCalledTimes(1)
  })
})
