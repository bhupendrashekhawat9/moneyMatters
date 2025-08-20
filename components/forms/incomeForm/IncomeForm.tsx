
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IncomeFormData, IncomeFormProps } from './types'
import useTheme from '@/hooks/useTheme'
import { useState } from 'react'
import { ThemeType } from '@/constants/theme'
import SelectInput from '@/components/ui/SelectInput'

const IncomeForm = ({
    categories,
    onSubmit,
    onClose,
    initialData,

}: IncomeFormProps) => {
    const { theme } = useTheme();
    const styles = generateStyles(theme);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<IncomeFormData>({
      category: '',
      amount: 0,
      date: new Date(),
      note: '',
    });

    const handleSubmit = async (incomeData: IncomeFormData) => {
      try {
        setLoading(true);
        await onSubmit(incomeData);
        onClose();
      } catch (error) {
        console.error('Error submitting income:', error);
        // Handle error - could show toast or alert
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = () => {
      onClose();
    };

  return (
   <View style={styles.container}>

    <SelectInput 
    options={categories}
    value={formData.category}
    onChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
    /> 
    <TextInput
    placeholder="Amount"
    value={formData.amount?.toString()}
    onChangeText={(value) => setFormData((prev) => ({ ...prev, amount: parseInt(value) }))}
    keyboardType="numeric"
    />
    <TextInput
    placeholder="Note"
    value={formData.note}
    onChangeText={(value) => setFormData((prev) => ({ ...prev, note: value }))}
    />
    <TouchableOpacity
    style={styles.submitButton}
    onPress={()=>handleSubmit(formData)}
    disabled={loading}
    >
    <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
   </View>
  )
}

export default IncomeForm

const generateStyles = (theme: ThemeType) => StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        gap:10
        },
        submitButton:{
            backgroundColor:theme.colors.primary,
            padding:10,
            borderRadius:5,
            alignItems:'center',
            margin:10,
            },
            submitButtonText:{
                color:'white',
                fontSize:16,
                fontWeight:'bold',
                },

})