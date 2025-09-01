import { ColorValue, Modal, Pressable,  ScrollView,  StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '@/components/AppButton';
import useTheme from '@/hooks/useTheme';
import { ThemeType } from '@/constants/theme';
import { router } from 'expo-router';
import { userProfileServices } from '@/api/service';
import { SafeAreaView } from 'react-native-safe-area-context';


interface CategoryType {
    label:string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    color: ColorValue;
}
interface categoryListPropsType {
    categories: CategoryType[];
    onClick: (category: CategoryType) => void;

}

const CategoryList = (props:categoryListPropsType) => {
    const {theme} = useTheme()
    const styles = useMemo(()=>generateStyle(theme),[theme])

    return (
        <ScrollView style={styles.cat_listContainer}>
            {props.categories.map((item:CategoryType) => {
                return (
                    <Pressable key={item.label} style={styles.cat_item} onPress={()=>props.onClick(item)}>
                        <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                        <Text style={styles.cat_label}>{item.label}</Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
const CreateCategory = (props:{visible:boolean,onClose:()=>void,onSubmit:(category:CategoryType)=>void}) => {
   const [category, setCategory] = React.useState<CategoryType>({
    label:"",
    icon:"receipt",
    color:"orange"
   })
   
   const handleChange = (field: 'label' | 'icon' | 'color', value: string) => {
    setCategory((prev)=>({...prev,[field]:value}))
   }
   const handleSubmit = () => {
    props.onSubmit(category)
    props.onClose()
   }
    return (
        <Modal visible={props.visible}>
            <View>  
                <View>
                    <MaterialCommunityIcons name={category.icon} size={24} color={category.color} />
                    <TextInput placeholder="Category Name" onChangeText={(text)=>handleChange('label',text)}/>
                </View>
                <TextInput placeholder="Category Icon" onChangeText={(text)=>handleChange('icon',text)}/>
                <TextInput placeholder="Category Color" onChangeText={(text)=>handleChange('color',text)}/>
                <AppButton title="Submit" onPress={handleSubmit}/>
            </View>
        </Modal>
    )
}

const AddCategories = () => {
    const {theme} = useTheme()
    const [categories, setCategories] = React.useState<CategoryType[]>( [
        {
            label:"Food",
            icon:"food",
            color:"red"
        },
        {
            label:"Transport",
            icon:"car",
            color:"blue"
        },
        {
            label:"Entertainment",
            icon:"party-popper",
            color:"green"
        },
        {
            label:"Shopping",
            icon:"shopping",
            color:"yellow"
        },
        {
            label:"Health",
            icon:"heart",
            color:"pink"
        },
        {
            label:"Education",
            icon:"book",
            color:"orange"
        },
        {
            label:"Travel",
            icon:"airplane",
            color:"purple"
        },
        {
            label:"Others",
            icon:"help",
            color:"gray"
        }
    ])
    const [selectedCategories, setSelectedCategories] = React.useState<CategoryType[]>([])
    const [createCategoryVisible, setCreateCategoryVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onClick = (category: CategoryType) => {
        setSelectedCategories([...selectedCategories, category])
    }
    const styles = useMemo(()=>generateStyle(theme),[theme])

    const handleSubmit = (category: CategoryType) => {
        setCategories(prev=> [...prev, category])
    }
    const openCreateCategory = () => {
        setCreateCategoryVisible(true)
    }
    const closeCreateCategory = () => {
        setCreateCategoryVisible(false)
    }
    const handleContinue = async() => {
        setLoading(true)
        const response = await userProfileServices.saveCategories(id,selectedCategories)
        if(response.status == "SUCCESS"){
            router.replace("/home")
        }else{
            setLoading(false)
        }
    }
  return (

    <SafeAreaView>
      <Text style={styles.title}>
        Choose your categories
      </Text>
  
        <CategoryList categories={categories} onClick={onClick}/>
        <Pressable style={styles.createButton} onPress={openCreateCategory}>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text style={styles.createButtonText}>
                Create Category
            </Text>
        </Pressable>
        <CreateCategory visible={createCategoryVisible} onClose={closeCreateCategory} onSubmit={handleSubmit}/>
    </SafeAreaView>
  )
}

export default AddCategories

const generateStyle = (theme: ThemeType) => StyleSheet.create({
    createButton:{
        backgroundColor:theme.colors.primary,
        padding:10,
        borderRadius:5,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center"
    },
    createButtonText:{  
        color:"white",
        margin:10
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        margin:10
    },
    cat_label:{
        fontSize:12,
        fontWeight:"bold",
        margin:10
    },
    cat_listContainer:{
    
        flexDirection:"row",
        flexWrap:"wrap",
        gap:10,
  
    },
    cat_item:{
        flexDirection:"row",
        alignItems:"center",
        borderRadius:5,
        backgroundColor:theme.colors.background,
        padding:10,
        width:"45%",
        height:100,
    }
})