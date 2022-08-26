import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import { SearchGroupNameEnumv2 } from 'api/gen'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { CATEGORY_CRITERIA } from 'features/search/enums'
import { useSearch } from 'features/search/pages/SearchWrapper'
import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { useSafeState } from 'libs/hooks'
import { useSearchGroupLabelMapping } from 'libs/subcategories/mappings'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonQuaternaryBlack } from 'ui/components/buttons/ButtonQuaternaryBlack'
import { styledButton } from 'ui/components/buttons/styledButton'
import { PageHeader } from 'ui/components/headers/PageHeader'
import { Li } from 'ui/components/Li'
import { RadioButton } from 'ui/components/radioButtons/RadioButton'
import { VerticalUl } from 'ui/components/Ul'
import { Again } from 'ui/svg/icons/Again'
import { getSpacing, Spacer } from 'ui/theme'

interface Props {
  dismissModal?: () => void
}

export const Categories: FunctionComponent<Props> = ({ dismissModal }) => {
  const { navigate } = useNavigation<UseNavigationType>()
  const { searchState, dispatch } = useSearch()
  const [selectedCategory, setSelectedCategory] = useSafeState<SearchGroupNameEnumv2>(
    searchState?.offerCategories?.[0] || SearchGroupNameEnumv2.NONE
  )
  const isModal = !!dismissModal

  const selectCategory = (category: SearchGroupNameEnumv2) => () => {
    setSelectedCategory(category)
  }

  const isCategorySelected = (category: SearchGroupNameEnumv2) => {
    return selectedCategory === category
  }

  const onResetPress = () => {
    setSelectedCategory(SearchGroupNameEnumv2.NONE)
  }

  const onSearchPress = () => {
    const payload = selectedCategory === SearchGroupNameEnumv2.NONE ? [] : [selectedCategory]
    dispatch({ type: 'SET_CATEGORY', payload })
    if (isModal) dismissModal()
    navigate(
      ...getTabNavConfig('Search', {
        ...searchState,
        offerCategories: payload,
      })
    )
  }

  const searchGroupLabelMapping = useSearchGroupLabelMapping()
  const titleID = uuidv4()
  return (
    <Container>
      {!isModal && (
        <PageHeader
          titleID={titleID}
          title={t`Catégories`}
          background="primary"
          withGoBackButton
          testID="pageHeader"
        />
      )}
      <StyledScrollView
        accessibilityRole={AccessibilityRole.RADIOGROUP}
        aria-labelledby={titleID}
        isModal={isModal}>
        {!isModal && <Spacer.Column numberOfSpaces={4} testID="topSpacerCategoryList" />}
        <VerticalUl>
          {Object.entries(CATEGORY_CRITERIA).map(([category, { icon: Icon }]) => {
            const searchGroup = category as SearchGroupNameEnumv2
            return (
              <Li key={searchGroup}>
                <RadioButton
                  label={searchGroupLabelMapping[searchGroup]}
                  isSelected={isCategorySelected(searchGroup)}
                  onSelect={selectCategory(searchGroup)}
                  testID={searchGroup}
                  marginVertical={getSpacing(3)}
                  icon={Icon}
                />
              </Li>
            )
          })}
        </VerticalUl>
      </StyledScrollView>
      <BottomButtonsContainer isModal={isModal}>
        <ResetButton wording="Réinitialiser" icon={Again} onPress={onResetPress} />
        <SearchButton wording="Rechercher" onPress={onSearchPress} />
      </BottomButtonsContainer>
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}))

const StyledScrollView = styled(ScrollView)<{ isModal: boolean }>(({ isModal }) => ({
  flexGrow: 1,
  ...(!isModal ? { paddingHorizontal: getSpacing(6) } : {}),
}))

const BottomButtonsContainer = styled.View<{ isModal: boolean }>(({ isModal }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  ...(!isModal ? { paddingHorizontal: getSpacing(6) } : {}),
  paddingTop: getSpacing(2),
  ...(!isModal ? { paddingBottom: getSpacing(6) } : {}),
}))

const ResetButton = styledButton(ButtonQuaternaryBlack)({
  width: 'auto',
  marginRight: getSpacing(4),
})

const SearchButton = styledButton(ButtonPrimary)({
  flexGrow: 1,
  width: 'auto',
})
