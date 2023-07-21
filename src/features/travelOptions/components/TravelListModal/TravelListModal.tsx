import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { AccordionItem } from 'ui/components/AccordionItem'
import { ButtonWithLinearGradient } from 'ui/components/buttons/buttonWithLinearGradient/ButtonWithLinearGradient'
import { AppModal } from 'ui/components/modals/AppModal'
import { Spacer, Typo, getSpacing } from 'ui/theme'
import { ColorsEnum } from 'ui/theme/colors'
import { api } from 'api/api'
import { formatToFrenchDecimal } from 'libs/parsers'
import useTravelOptions from 'features/travelOptions/api/useTravelOptions'
import { ImageTile } from 'ui/components/ImageTile'
import TravelPaymentRadio from 'features/travelOptions/components/RadioButton/RadioButton'
import { ModalLoader } from 'features/travelOptions/components/ModalLoader/ModalLoader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Disabled } from 'ui/components/IconWithCaption.stories'
import { TextStyle } from 'react-native'

interface TravelListModalInterface {
  toggleModal: () => void
  onProceed: () => void
  visible: boolean
  showLoader: boolean
  disabled: boolean
}

const TravelListModal = ({
  toggleModal,
  visible,
  onProceed,
  showLoader,
  disabled,
}: TravelListModalInterface) => {
  const [selectedItem, setSelectedItem] = useState('')
  const [accordianStatus, setAccordianStatus] = useState(false)
  const [walletBalance, setWalletBalance] = useState(null)
  const [paymentMode, setPaymentMode] = useState('')
  const [travelOptions, setTravelOptions] = useState([])

  const { data: listArr, loading: isLoading, fetchData } = useTravelOptions()

  const handleClick = async () => {
    await onProceed()
  }

  useEffect(() => {
    async function getUserDetails() {
      fetchData('/travel-options', {
        pickup_location: 'Paris',
        drop_location: 'rennes',
      })
      // const { domainsCredit } = await api.getnativev1me()
      // if (domainsCredit?.all.remaining) {
      //   setWalletBalance(formatToFrenchDecimal(domainsCredit?.all?.remaining).match(/\d+/)[0])
      //   // setWalletBalance(79);
      // }
    }

    getUserDetails()
    handlePaymentSelection('Payer en espèces')
  }, [])

  const minBalance = 50

  useEffect(() => {
    if (listArr && listArr?.length) {
      toggleItemSelection(listArr[0]['name'])
      setTravelOptions(listArr)
    }
  }, [listArr])

  const travelOptionWrapperStyle = (isSelected: boolean) : ViewStyle  => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: isSelected ? 1.2 : 0,
    borderRadius: 12,
    padding: 6,
    // marginTop: 8
  })

  // const noteTextStyle = {
  //   color: ColorsEnum.GREY_DARK,
  //   fontSize: 12,
  //   fontFamily: 'Montserrat',
  //   fontWeight: '500',
  //   lineHeight: 18,
  //   textAlign: 'center',
  // }

  const errorMessageStyle : TextStyle = {
    color: ColorsEnum.ERROR,
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'center',
  }
  const accordianHeaderText : TextStyle = { textAlign: 'center', fontWeight: '700', fontSize: 15 }
  const renderItem = ({ item }: any) => {
    const isSelected = selectedItem === item.name

    return (
      <View>
        <Touchable
          disabled={!item.enabled}
          style={travelOptionWrapperStyle(isSelected)}
          onPress={() => toggleItemSelection(item.name)}>
          <ImageWrapper>
            <ImageTile uri={item.icon} height={50} width={50} />
          </ImageWrapper>
          <TitleText disabled={!item.enabled}>{item.name}</TitleText>
        </Touchable>
        <Spacer.Column numberOfSpaces={2} />
      </View>
    )
  }

  const toggleItemSelection = (name: string) => {
    if (selectedItem !== name) {
      setSelectedItem(name)
    }
  }

  const customHeader = () => (
    <HeaderTextWrapper>
      <Typo.Body style={accordianHeaderText}>
        {!isLoading ? 'Sélectionnez votre mode de transport ' : 'Recherche'}
      </Typo.Body>
    </HeaderTextWrapper>
  )

  const accordianTitle = () => (
    <AccordianTextWrapper>
      <AccordianText>
        {
          // accordianStatus
          // ? 'Sélectionnez le mode de paiement'
          // :
          'Mode de paiement : Payer en espèces'
          // `Mode de paiement : Portefeuille PC € ${walletBalance}`
        }
      </AccordianText>
    </AccordianTextWrapper>
  )

  const handlePaymentSelection = useCallback((selectedPaymentMode: string) => {
    setPaymentMode(selectedPaymentMode)
  }, [])

  const isErrorValue = paymentMode === "Portefeuille..." && selectedItem;


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => toggleModal()}>
        <View>
          <AppModal
            title=''
            animationOutTiming={1}
            visible={visible}
            customModalHeader={customHeader()}
            onBackButtonPress={() => toggleModal()}
            scrollEnabled={false}
            onRequestClose={() => toggleModal()}>
            <ModalContent>
              {isLoading || showLoader ? (
                <LoaderWrapper>
                  <ModalLoader
                    message={
                      showLoader
                        ? ''
                        : 'Veuillez patienter! Nous recherchons des options de voyage actuelles'
                    }
                  />
                </LoaderWrapper>
              ) : (
                <>
                  {paymentMode === 'Portefeuille...'  && selectedItem && (
                    <ErrorMessageWrapper>
                      <Text style={errorMessageStyle}>
                        {
                          '! Solde du portefeuille insuffisant. Veuillez ajouter un solde minimum de 50 € pour continuer.'
                        }
                      </Text>
                    </ErrorMessageWrapper>
                  )}

                  <Spacer.Column numberOfSpaces={1} />
                  {travelOptions?.length ? (
                    <FlatList
                      data={travelOptions}
                      renderItem={renderItem}
                      scrollEnabled={false}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <></>
                  )}
                  <Spacer.Column numberOfSpaces={3} />
                  {selectedItem && (
                    <AccordianWrapper
                      isError={Boolean(isErrorValue)}>
                      <AccordionItem
                        title={accordianTitle()}
                        onClose={() => setAccordianStatus(!accordianStatus)}
                        onOpen={() => setAccordianStatus(!accordianStatus)}>
                        <TravelPaymentRadio
                          selectedItem={paymentMode}
                          walletBalance={walletBalance}
                          onPress={(paymentMode: string) => handlePaymentSelection(paymentMode)}
                        />
                        {/* <NoteContainer>
                          <Text style={noteTextStyle}>
                            {'Le service est actuellement indisponible'}
                          </Text>
                        </NoteContainer> */}
                      </AccordionItem>
                    </AccordianWrapper>
                  )}
                  <Spacer.Column numberOfSpaces={5} />
                </>
              )}
              <ButtonWithLinearGradient
                wording={'Procéder'}
                onPress={handleClick}
                isDisabled={
                  disabled ||
                  showLoader ||
                  !selectedItem ||
                  !paymentMode ||
                 
                  (paymentMode === 'Portefeuille...' && walletBalance > minBalance)
                }
              />
            </ModalContent>
          </AppModal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const ModalContent = styled.View({
  // flex: 1,
  alignContent: 'center',
})

const LoaderWrapper = styled.View({
  paddingHorizontal: getSpacing(10),
})

const ImageWrapper = styled.View({ marginRight: 12 })

const AccordianWrapper = styled.View(({ isError }: { isError: boolean | null}) => ({
  borderWidth: isError ? 1 : 0.5,
  borderColor: isError ? ColorsEnum.ERROR : ColorsEnum.GREY_MEDIUM,
  borderRadius: 10,
}))

const HeaderTextWrapper = styled.View({
  width: '100%',
})

const AccordianTextWrapper = styled.View({
  flexWrap: 'wrap',
  backGroundCOlor: 'red',
  maxWidth: '100%',
})

const ErrorMessageWrapper = styled.View({
  width: '100%',
})

const TitleText = styled.Text(({ disabled }) => ({
  fontSize: 15,
  fontWeight: !disabled ? 'bold' : '600',
  fontFamily: 'Montserrat',
  color: disabled ? '#696a6f' : ColorsEnum.BLACK,
}))

const AccordianText = styled.Text({
  fontSize: 13,
  fontWeight: 'Medium',
  fontFamily: 'Montserrat',
  color: ColorsEnum.BLACK,
})

const Touchable = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  padding: getSpacing(2),
  borderRadius: 12,
})

export default TravelListModal
