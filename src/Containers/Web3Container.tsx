import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { getBalance } from '@/Services/web3'
import { Colors } from '@/Theme/Variables'

const Web3Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [balance, setBalance] = useState('0')
  const [address, setAddress] = useState('0x2f7662cD8E784750E116E44a536278d2b429167E')
  const [loading, setLoading] = useState(false)
  const [isAdressValid, setIsAdressValid] = useState(true)

  useEffect(() => {
    if (isAdressValid)
      // @ts-ignore
      getBalance(address).then((balance) => setBalance(balance));
  }, [address])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {(loading) && <ActivityIndicator />}
        <Text style={Fonts.textRegular}>
            {t('home.balance', { amount: balance })}
        </Text>
        { !isAdressValid && <Text style={[Fonts.textRegular, { color: Colors.error }]}>{ t('home.errors.invalidAddress') }</Text> }
      </View>
      <View
        style={[
          Layout.column,
          Layout.colCenter,
          Gutters.smallTMargin,
          Gutters.smallHPadding,
          Common.backgroundPrimary,
          Common.button.rounded,
          { height: '20%' }
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall, Gutters.regularTMargin]}>
          {t('home.labels.address')}
        </Text>
        <TextInput
          onChangeText={setAddress}
          editable={!loading}
          keyboardType={'number-pad'}
          maxLength={1}
          value={address}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput, Common.button.rounded]}
        />
      </View>
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Web3Container
