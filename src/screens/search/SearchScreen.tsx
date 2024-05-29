import { View, Text } from 'react-native'
import React from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SectionConponent from '../../components/SectionConponent'
import HeaderAppComponent from '../../components/HeaderAppComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Back } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { RootStack } from '../../navigations/TypeChecking'
import TextComponent from '../../components/TextComponent'

const SearchScreen = () => {

    
    const navigation = useNavigation<RootStack>()
  return (
<ContainerComponent>
      <SectionConponent>
        <View>
          <HeaderAppComponent
            fldicoration="row"
            title="Search" 
      
            
            icon={
              <TouchableOpacity onPress={()=>navigation.goBack()}  >
                <Back size={24} color={colors.white} />
              </TouchableOpacity>
            }
          />
        </View>
      </SectionConponent>

      <View>
        <TextComponent text='sdfasdsdsa'/>
      </View>
    </ContainerComponent>
  )
}

export default SearchScreen