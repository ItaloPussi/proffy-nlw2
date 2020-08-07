import React from 'react'
import {Text, View, ImageBackground} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'

import styles from './styles'

import PageHeader from '../../components/PageHeader'
import giveClassesBgImage from '../../assets/images/give-classes-background.png'
function GiveClasses(){

	return (
		<View style={styles.container}>
			<PageHeader title="Quer ser um Proffy?">
				<Text style={styles.description}>
					Para começar, você precisa se cadastrar na nossa plataforma.
				</Text>
			</PageHeader>
		</View>
	)
}

export default GiveClasses;