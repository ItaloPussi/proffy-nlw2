import React, {useState, useEffect} from 'react'
import {View, ScrollView} from 'react-native'
import api from '../../services/api'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native'
import styles from './styles'
function Favorites(){
	const [proffys, setProffys] = useState([])
	const [loading, setLoading] = useState(true)
	const [favorites, setFavorites] = useState([])

	function loadFavorites(){
		AsyncStorage.getItem('favorites').then(response=>{
			if(response){
				const favoritedTeachers = JSON.parse(response)
				setFavorites(favoritedTeachers)
			}
		})
	}


	useFocusEffect(
	  React.useCallback(() => {
		setLoading(true)
	    loadFavorites();
		setLoading(false)
	  }, [])
	)	

	return (

		<View style={styles.container}>
			<PageHeader title="Meus proffys favoritos" />
			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16
				}}
			>
				{!loading && favorites.map((proffy:any)=>{
					return (
						<TeacherItem key={proffy.id} teacher={proffy} favorited={true}  />
					)
				})}
			</ScrollView>
		</View>
	)
}
export default Favorites