import React, { useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { JsxElement } from 'typescript'
import { Touchable } from 'ui/components/touchable/Touchable'
import { ColorsEnum } from 'ui/theme/colors'

interface RadioButtonProps {
  label: string | JsxElement | Element
  selected: boolean
  isDisabled?: boolean
  onPress: () => void
}

const RadioButton = ({ label, selected, onPress, isDisabled }: RadioButtonProps) => {
  return (
    <Touchable onPress={onPress} disabled={!!isDisabled}>
      <RadioButtonContainer>
        <RadioButtonOuterCircle>{selected && <RadioButtonInnerCircle />}</RadioButtonOuterCircle>
        <RadioButtonLabel style={{}} disabled={isDisabled}>
          {label}
        </RadioButtonLabel>
      </RadioButtonContainer>
    </Touchable>
  )
}

const TravelPaymentRadio = ({ walletBalance, selectedItem, onPress }: any) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedItem || null)
  const badgeStyle = {
    color: ColorsEnum.WHITE,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '900',
  }

  const radioLabel = (message: string, walletBalance?: number, disabled?: boolean) => {
    return (
      <RadioLabelWrapper>
        <RadioButtonLabel disabled={disabled}>{message} </RadioButtonLabel>
        {walletBalance && (
          <AmountBadge disabled={disabled}>
            <Text style={badgeStyle}>€ {walletBalance} </Text>
          </AmountBadge>
        )}
      </RadioLabelWrapper>
    )
  }

  const onSelectOPtion = (mode: string) => {
    setSelectedOption(mode)
    onPress(mode)
  }

  return (
    <>
      <RadioButton
        label={radioLabel('Payer en espèces')}
        selected={selectedOption === 'Payer en espèces'}
        onPress={() => onSelectOPtion('Payer en espèces')}
      />
      {/* <RadioButton
        isDisabled={true}
        label={radioLabel('Portefeuille du Pass Culture', walletBalance, true)}
        selected={selectedItem === 'Portefeuille...'}
        onPress={() => onSelectOPtion('Portefeuille...')}
      /> */}
    </>
  )
}

const RadioLabelWrapper = styled.View({
  flexDirection: 'row',
})
const RadioButtonContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 10,
  paddingBottom: 10,
})

const RadioButtonOuterCircle = styled.View({
  height: 14,
  width: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: ColorsEnum.PRIMARY,
  alignItems: 'center',
  justifyContent: 'center',
})

const RadioButtonInnerCircle = styled.View({
  height: 8,
  width: 8,
  borderRadius: 6,
  backgroundColor: ColorsEnum.PRIMARY,
})

const RadioButtonLabel = styled.Text(({ disabled }) => ({
  color: !disabled ? ColorsEnum.BLACK : ColorsEnum.GREY,
  fontWeight: !disabled ? '900' : '500',
  marginLeft: 8,
}))
const AmountBadge = styled.View(({ disabled }) => ({
  paddingRight: 8,
  paddingLeft: 8,
  minHeight: 18,
  borderRadius: 15,
  justifyContent: 'center',
  backgroundColor: disabled ? ColorsEnum.GREY : ColorsEnum.SECONDARY,
}))

export default TravelPaymentRadio
