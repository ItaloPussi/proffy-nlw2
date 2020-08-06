import React from 'react'
import {View, Text, Image} from 'react-native'

import PageHeader from '../../components/PageHeader'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
function TeacherList(){
	return (
		<View style={styles.container} >
			<PageHeader title="Proffys Disponíveis" />
		</View>
	)
}

export default TeacherList