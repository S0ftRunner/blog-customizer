import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;

	const asideRef = useRef<HTMLElement | null>(null);

	const [isOpenForm, setToggleForm] = useState(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleForm = () => {
		setToggleForm(!isOpenForm);
	};

	const handleResetAppState = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('сработала очистка');
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
	};

	const handleChangeField = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentState) => ({
				...currentState,
				[fieldName]: value,
			}));
		};
	};

	return (
		<>
			<ArrowButton isActive={isOpenForm} onClick={toggleForm} />
			<div
				onClick={() => setToggleForm(false)}
				className={clsx(
					styles.overlay,
					isOpenForm && styles.overlay_open
				)}></div>
			{/*Данное решение нужно, чтобы форма закрывалась при клике вне элемента*/}
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form
					className={styles.form}
					onReset={handleResetAppState}
					onSubmit={handleSubmit}>
					<Text uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChangeField('fontFamilyOption')}></Select>
					<RadioGroup
						name='шрифт'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChangeField('fontSizeOption')}></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChangeField('fontColor')}></Select>
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChangeField('backgroundColor')}></Select>
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChangeField('contentWidthArr')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
