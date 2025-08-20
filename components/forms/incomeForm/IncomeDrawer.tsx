import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomDrawer from '@/components/ui/BottomDrawer'
import IncomeForm from './IncomeForm'
import { IncomeDrawerProps } from './types'


const IncomeDrawer = ({
  visible,
  onClose,
  categories,
  onSubmit,
  initialData,
  title,
  subtitle,
}: IncomeDrawerProps) => {
  return (
    <BottomDrawer
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      height="auto"
      showHandle={true}
      showCloseButton={true}
      backdrop={true}
      swipeToClose={true}
    >
      <IncomeForm
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onClose}
        initialData={initialData}
      />
    </BottomDrawer>
  )
}

export default IncomeDrawer

const styles = StyleSheet.create({})