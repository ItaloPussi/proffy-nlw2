import React,{ useState, ChangeEvent} from "react"
import {View, Text, Image, FlatList, TextInput, ActivityIndicator} from "react-native"
import api from "../../services/api"
import AsyncStorage from "@react-native-community/async-storage"
import PageHeader from "../../components/PageHeader"
import TeacherItem, {TeacherItemProps} from "../../components/TeacherItem"
import {BorderlessButton, RectButton} from "react-native-gesture-handler"
import {Feather} from "@expo/vector-icons"
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png"
import whatsappIcon from "../../assets/images/icons/whatsapp.png"

import styles from "./styles"
function TeacherList(){
	const [proffys, setProffys] = useState<Object[]>([])
	const [subject, setSubject] = useState("")
	const [weekday, setWeekday] = useState("")
	const [favorites, setFavorites] = useState<Number[]>([])
	const [time, setTime] = useState("")
	const [page, setPage] = useState(1)
	const [maxPage, setMaxPage] = useState(100)

	const [loading, setLoading] = useState(false)
	const [isFiltersVisible, setIsFiltersVisible] = useState(false)

	function loadFavorites(){
		AsyncStorage.getItem("favorites").then(response=>{
			if(response){
				const favoritedTeachers = JSON.parse(response)
				const favoritedTeachersIds = favoritedTeachers.map((teacher:TeacherItemProps["teacher"])=>{
					return teacher.id
				})
				setFavorites(favoritedTeachersIds)
			}
		})
	}

	function loadProffys(){
		setLoading(true)
		api.get("classes", {
			params:{
				subject,
				weekday,
				time,
				page,
			}
		}).then(res=>{
			setProffys([...proffys,...res.data.data])
			setLoading(false)
			if(page===1){
				setMaxPage(res.data.pagination.lastPage)
			}
			setPage(page+1)
		}).catch(res=>{
			console.log(res)
		})
	}
	function handleFiltersVisible(){
		setIsFiltersVisible(!isFiltersVisible)
	}

	function handleFiltrateButton(){
		setPage(1)
		loadFavorites()
		loadProffys()
		setIsFiltersVisible(!isFiltersVisible)

	}

	function renderItems(proffy:any){
		return (
			<TeacherItem key={proffy.id} teacher={proffy} favorited={favorites.includes(proffy.id)}  />
		)
	}

	function renderFooter(){
		if (page>maxPage){
			return (
				<View style={styles.maxReached}>
					<Text style={styles.maxReachedText}> Não há Proffys disponíveis com o filtro selecionado ou todos já foram listados :)</Text>
				</View>
			)
		}
		if(loading){
			return (
				<View style={styles.maxReached}>
					<ActivityIndicator />
				</View>
			)
		}
		return null
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

			<FlatList
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16
				}}
				data={proffys}
				renderItem={({item})=>renderItems(item)}
				onEndReached={page <= maxPage ? loadProffys : null}
				keyExtractor={(item:TeacherItemProps["teacher"]) => item.id.toString()}
  				onEndReachedThreshold={0.15}
  				ListFooterComponent={renderFooter}
			/>

		</View>
	)
}

export default TeacherList