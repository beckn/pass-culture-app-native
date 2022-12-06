import React, { Fragment, FunctionComponent, useRef } from 'react'
import styled, { useTheme } from 'styled-components/native'

import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { useHandleFocus } from 'libs/hooks/useHandleFocus'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { useArrowNavigationForRadioButton } from 'ui/hooks/useArrowNavigationForRadioButton'
import { useSpaceBarAction } from 'ui/hooks/useSpaceBarAction'
import { IconInterface } from 'ui/svg/icons/types'
import { Validate } from 'ui/svg/icons/Validate'
import { ValidateOff } from 'ui/svg/icons/ValidateOff'
import { getSpacing, Spacer, Typo } from 'ui/theme'

interface RadioButtonProps {
  label: string
  description?: string
  onSelect: (value: string) => void
  isSelected: boolean
  icon?: FunctionComponent<IconInterface>
  accessibilityLabel?: string
  testID?: string
  marginVertical?: number
}

export function RadioButton(props: RadioButtonProps) {
  const containerRef = useRef(null)
  const { isMobileViewport } = useTheme()
  const { onFocus, onBlur, isFocus } = useHandleFocus()
  const LabelContainer = isMobileViewport ? LabelContainerFlex : LabelContainerWithMarginRight
  const ValidateOff = isMobileViewport ? ValidateOffIcon : Fragment
  const StyledIcon =
    !!props.icon &&
    styled(props.icon).attrs(({ theme }) => ({
      color: theme.colors.primary,
      color2: props.isSelected ? theme.colors.primary : theme.colors.secondary,
      size: theme.icons.sizes.small,
    }))``

  const onPress = () => props.onSelect(props.label)

  useArrowNavigationForRadioButton(containerRef)
  useSpaceBarAction(isFocus ? onPress : undefined)
  return (
    <StyledTouchableOpacity
      accessibilityRole={AccessibilityRole.RADIO}
      accessibilityState={{ checked: props.isSelected }}
      accessibilityLabel={props.accessibilityLabel}
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      marginVertical={props.marginVertical ?? 0}
      testID={props.testID}>
      <LabelContainer ref={containerRef}>
        {!!StyledIcon && (
          <React.Fragment>
            <IconWrapper>
              <StyledIcon />
            </IconWrapper>
            <Spacer.Row numberOfSpaces={2} />
          </React.Fragment>
        )}
        <LabelWrapper>
          <Label isSelected={props.isSelected} numberOfLines={2}>
            {props.label}
          </Label>
          {!!props.description && (
            <Typo.CaptionNeutralInfo>{props.description}</Typo.CaptionNeutralInfo>
          )}
        </LabelWrapper>
      </LabelContainer>
      <IconContainer>{props.isSelected ? <ValidateIconPrimary /> : <ValidateOff />}</IconContainer>
    </StyledTouchableOpacity>
  )
}

const LabelContainerFlex = styled(Spacer.Flex).attrs({
  flex: 0.9,
})({
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 0,
})

const LabelContainerWithMarginRight = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: theme.isMobileViewport ? 0 : getSpacing(6),
}))

const StyledTouchableOpacity = styled(TouchableOpacity)<{ marginVertical: number }>(
  ({ theme, marginVertical }) => ({
    minHeight: theme.icons.sizes.small,
    marginVertical: marginVertical,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: theme.isMobileViewport ? 'space-between' : undefined,
  })
)

const Label = styled(Typo.ButtonText).attrs({
  numberOfLines: 2,
})<{ isSelected: boolean }>(({ isSelected, theme }) => ({
  color: isSelected ? theme.colors.primary : theme.colors.black,
}))

const IconContainer = styled.View(({ theme }) => ({
  flex: 0.1,
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: theme.icons.sizes.smaller,
  height: theme.icons.sizes.smaller,
}))

const ValidateIconPrimary = styled(Validate).attrs(({ theme }) => ({
  color: theme.colors.primary,
  size: theme.icons.sizes.smaller,
}))``

const ValidateOffIcon = styled(ValidateOff).attrs(({ theme }) => ({
  color: theme.colors.greySemiDark,
  size: theme.icons.sizes.smaller,
}))``

const LabelWrapper = styled.View({
  flexShrink: 1,
})

const IconWrapper = styled.View({
  flexShrink: 0,
})
