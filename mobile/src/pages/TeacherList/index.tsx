import React,{ useState, ChangeEvent} from 'react'
import {View, Text, Image, ScrollView, TextInput} from 'react-native'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import {BorderlessButton, RectButton} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
function TeacherList(){
	const [proffys, setProffys] = useState([])
	const [subject, setSubject] = useState('')
	const [weekday, setWeekday] = useState('')
	const [favorites, setFavorites] = useState<Number[]>([])
	const [time, setTime] = useState('')

	const [loading, setLoading] = useState(true)
	const [isFiltersVisible, setIsFiltersVisible] = useState(false)

	function loadFavorites(){
		AsyncStorage.getItem('favorites').then(response=>{
			if(response){
				const favoritedTeachers = JSON.parse(response)
				const favoritedTeachersIds = favoritedTeachers.map((teacher:any)=>{
					return teacher.id
				})
				setFavorites(favoritedTeachersIds)
			}
		})
	}
	function handleFiltersVisible(){
		setIsFiltersVisible(!isFiltersVisible)
	}

	function handleFiltrateButton(){
		setLoading(true)
		loadFavorites()
		api.get('classes', {
			params:{
				subject,
				weekday,
				time
			}
		}).then(res=>{
			setProffys(res.data)
			setLoading(false)
		}).catch(res=>{
			console.log(res)
		})
		setIsFiltersVisible(!isFiltersVisible)

	}
	return (
		<View style={styles.container} >
			<PageHeader 
				title="Proffys Disponíveis" 
				headerRight={(
					<BorderlessButton onPress={handleFiltersVisible}>
						<Feather name="filter" size={30} color="#FFF"/>
					</BorderlessButton>
				)}
			>
				{ isFiltersVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							style={styles.input}
							placeholder="Qual a matéria"
							placeholderTextColor="#c1bccc"
							value={subject}
							onChangeText={text=>{setSubject(text)}}
						/>

						<View style={styles.inputGroup}>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									style={styles.input}
									placeholder="Qual o dia?"
									placeholderTextColor="#c1bccc"
									value={weekday}
									onChangeText={text=>{setWeekday(text)}}
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									style={styles.input}
									placeholder="Qual horário"
									placeholderTextColor="#c1bccc"
									value={time}
									onChangeText={text=>{setTime(text)}}
								/>
							</View>
						</View>

						<RectButton style={styles.submitButton} onPress={handleFiltrateButton}>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16
				}}
			>
				{!loading && proffys.map((proffy:any)=>{
					return (
						<TeacherItem key={proffy.id} teacher={proffy} favorited={favorites.includes(proffy.id)}  />
					)
				})}
			</ScrollView>
		</View>
	)
}

export default TeacherList