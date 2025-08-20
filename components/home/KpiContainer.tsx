import React from 'react';
import { StyleSheet, View } from 'react-native';
import KpiCard from './KpiCard';

type KpiContainerProps = {
    kpiList: Array<{
        id: string;
        title: string;
        value: number | string;
        size: number;
    }>;
    onKpiPress: (kpi: any) => void;
};
const kpiContainer = ({
    kpiList = [],
    onKpiPress = (kpi: any) => {},
}: KpiContainerProps) => {
    console.log(kpiList,"kpiList")
  return (
    <View style={[styles.container]}>
        {kpiList.map((kpi) => (
            <KpiCard key={kpi.title} data={kpi} onPress={() => onKpiPress(kpi)} />
        ))}
    </View>
  )
}

export default kpiContainer

const styles = StyleSheet.create({
    container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,

    },
})