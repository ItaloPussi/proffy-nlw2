import React, {useState} from 'react'
import {View, Text, Image, Linking} from 'react-native'
import api from '../../services/api'
import {RectButton} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whastsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'

export interface TeacherItemProps{
	teacher:{
		id: number,
		name: string,
		imageURL: string,
		subject: string,
		description: string,
		price: string,
		whatsapp: string
	},
	favorited: boolean
}
const TeacherItem:React.FC<TeacherItemProps> = ({teacher, favorited}) =>{
	async function handleLinkToWhatsapp(){
		await api.post('connections',{
			user: teacher.id
		})
		Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
	}

	const [isFavorited, setIsFavorited] = useState(favorited)
	async function handleToggleFavorited(){
		const favorites = await AsyncStorage.getItem('favorites')
		let favoritesArray = []
		if (favorites){
			favoritesArray = JSON.parse(favorites)
		}
		if (isFavorited){
			const favoriteIndex = favoritesArray.findIndex((teacherObject:any)=>{
				return teacherObject.id === teacher.id
			})

			favoritesArray.splice(favoriteIndex,1)
			setIsFavorited(false)
		}else{
			favoritesArray.push(teacher)
			setIsFavorited(true)
		}
		await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))

	}
	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Image
					source={{uri: teacher.imageURL}}
					style={styles.avatar} 
				/>

				<View style={styles.profileInfo}>
					<Text style={styles.name}>{teacher.name}</Text>
					<Text style={styles.subject}>{teacher.subject}</Text>

				</View> 
			</View>

			<Text style={styles.description}>
				{teacher.description}
			</Text>

			<View style={styles.footer}>
				<Text style={styles.price}>
					Preço/hora {'   '}
					<Text style={styles.priceValue}> R$ {teacher.price} </Text>
				</Text>

				<View style={styles.buttonsContainer}>
					<RectButton onPress={handleToggleFavorited} style={[styles.favoriteButton, isFavorited && styles.unfavoriteBgColor]}>
						{isFavorited? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}
					</RectButton>

					<RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
						<Image source={whastsappIcon} />
						<Text style={styles.contactButtonText}>Entrar em Contato</Text>
					</RectButton>
				</View>
			</View>
		</View>
	)
}

export default TeacherItem