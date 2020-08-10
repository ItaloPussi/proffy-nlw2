import AsyncStorage from '@react-native-community/async-storage'
export const TOKEN_KEY = "@proffy-Token";

export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY).then(res=>{
	if(res){
		return true;
	}else{
		return false;
	}
})

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY).then(res=>{
	return res
});

export const login = async(token:string) =>{
	await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export const logout = async() => {
	await AsyncStorage.removeItem(TOKEN_KEY)
}

