import React, { useRef, useState } from 'react';
import {
	IonApp,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonGrid,
	IonRow,
	IonCol,
	IonLabel,
	IonInput,
	IonItem,
	IonAlert
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControls from './components/InputControls';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
	const [ calculatedBmi, setCalculatedBmi ] = useState<number>();
	const [error, setError] = useState<string>()
	const[calcunits, setcalunits] = useState<'mkg'| 'ftlb'>('mkg');

	const heightInputRef = useRef<HTMLIonInputElement>(null);
	const weightInputRef = useRef<HTMLIonInputElement>(null);

	const calculateBmi = () => {
		const enteredHeight = heightInputRef.current!.value;
		const enteredweight = weightInputRef.current!.value;
		if (!enteredHeight || !enteredweight || +enteredHeight <= 0 || +enteredweight <= 0) {
			setError('Please enter a valid (non-negative) input number')
			return;
		}
	   const weightConversionfactor = calcunits === 'ftlb'? 2.2 :1
	   const heightConversionFactor = calcunits === 'ftlb'? 3.28 :1
	   const weight = +enteredweight/ weightConversionfactor;
	   const height = +enteredHeight/ heightConversionFactor;
		const bmi = weight / (height * height);
		setCalculatedBmi(bmi);

		
	};
	const resetInput = () => {
		heightInputRef.current!.value = '';
		weightInputRef.current!.value = '';
	};
	const clearError =() =>{
		setError('')
	}

	const selectedCalcUnitHandler = (selectedValue: 'mkg' | 'ftlb') =>{
		setcalunits(selectedValue);
	}
	return (
		<React.Fragment>
		<IonAlert isOpen ={!!error} message ={error} buttons ={[{text : 'Okay', handler: clearError}]}></IonAlert>
		<IonApp>
			<IonHeader>
				<IonToolbar color='primary'>
					<IonTitle>BMI CALCULATOR</IonTitle>
				</IonToolbar>
				<IonContent className='ion-padding'>
					<IonGrid>
						<IonRow>
							<IonCol>
								<InputControls selectedValue ={calcunits} onSelectedValue ={selectedCalcUnitHandler}/>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonItem>
	<IonLabel position='floating'>Your Height({calcunits === 'mkg'? 'meters': 'feet' })</IonLabel>
									<IonInput type='number' ref={heightInputRef} />
								</IonItem>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonItem>
									<IonLabel position='floating'>Your Weight({calcunits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
									<IonInput type='number' ref={weightInputRef} />
								</IonItem>
							</IonCol>
						</IonRow>

						<IonRow>
							<IonCol />
						</IonRow>
						<BmiControls onCalculate={calculateBmi} onReset={resetInput} />
						{calculatedBmi ? <BmiResult result={calculatedBmi} /> : null}
					</IonGrid>
				</IonContent>
			</IonHeader>
		</IonApp>
		</React.Fragment>
	);
};

export default App;
