import React from 'react';
import {IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const InputControls: React.FC<
{selectedValue:  'mkg'| 'ftlb'; 
onSelectedValue : (value: 'mkg' | 'ftlb')=>void}> =(props) =>{
    const inputChangeHandler = (event: CustomEvent) =>{
props.onSelectedValue(event.detail.value)
    }
    return(
        <IonSegment value ={props.selectedValue} onIonChange = {inputChangeHandler}>
            <IonSegmentButton value ="mkg">
                <IonLabel >m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value ="ftlb">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>

        </IonSegment>
    )
}


export default InputControls;