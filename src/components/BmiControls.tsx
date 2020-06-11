import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshCircleOutline } from 'ionicons/icons';

const BmiControls: React.FC<{ onCalculate: () => void; onReset: () => void }> = (props) => {
	return (
		<IonRow>
			<IonCol>
				<IonButton className='ion-text-left' onClick={props.onCalculate}>
					<IonIcon slot='start' icon={calculatorOutline} />Calculate
				</IonButton>
			</IonCol>
			<IonCol>
				<IonButton className='ion-text-right' onClick={props.onReset}>
					<IonIcon slot='start' icon={refreshCircleOutline} />Reset
				</IonButton>
			</IonCol>
		</IonRow>
	);
};

export default BmiControls;
