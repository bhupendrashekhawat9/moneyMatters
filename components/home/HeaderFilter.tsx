
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

interface HeaderFilterProps {
    onChange: (date: Date) => void
}
const HeaderFilter = ({
    onChange
}: HeaderFilterProps) => {
    const [date, setDate] = useState(new Date())
    const handleDateChange = (date: Date) => {
        setDate(date)
        onChange(date)
    }
  return (
      <DateTimePicker 
      value={date}
      mode="date"
      accessibilityViewIsModal={false}
      maximumDate={new Date()}
      minimumDate={new Date(2020, 0, 1)}
      onChange={(event, date) => handleDateChange(date)}
      />
    
  )
}

export default HeaderFilter

const styles = StyleSheet.create({})