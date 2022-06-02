import React, { FunctionComponent, useMemo } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { IconInterface } from 'ui/svg/icons/types'
import { getSpacing, Typo } from 'ui/theme'

interface Props {
  label: string
  Icon: FunctionComponent<IconInterface>
  borderLeftColor: string
  style?: ViewStyle
}

export const CategoryButton: FunctionComponent<Props> = ({
  label,
  Icon,
  borderLeftColor,
  style,
}) => {
  const StyledIcon = useMemo(
    () =>
      styled(Icon).attrs(({ theme }) => ({
        size: theme.icons.sizes.small,
        color: theme.colors.black,
      }))({}),
    [Icon]
  )

  return (
    <TouchableContainer style={style} borderLeftColor={borderLeftColor}>
      <Label>{label}</Label>
      <StyledIcon />
    </TouchableContainer>
  )
}

const TouchableContainer = styled.TouchableOpacity<{ borderLeftColor: string }>(
  ({ theme, borderLeftColor }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    height: getSpacing(18),
    borderTopLeftRadius: getSpacing(0.75),
    borderTopRightRadius: getSpacing(1),
    borderBottomRightRadius: getSpacing(1),
    borderBottomLeftRadius: getSpacing(0.75),
    borderTopColor: theme.colors.greySemiDark,
    borderBottomColor: theme.colors.greySemiDark,
    borderRightColor: theme.colors.greySemiDark,
    borderLeftColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: getSpacing(1),
    paddingRight: getSpacing(4),
  })
)

const Label = styled(Typo.Caption)({ marginLeft: getSpacing(3) })
