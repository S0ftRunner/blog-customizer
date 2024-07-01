import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

// export type ArticleParamsFormProps = {
// 	setAppState: (value: ArticleStateType) => void;
// };

export const ArticleParamsForm = () => {
	// const {setAppState} = props;

	const asideRef = useRef<HTMLElement | null>(null);

	const [isOpenForm, setToggleForm] = useState(false);

	const [formState] = useState<ArticleStateType>(defaultArticleState);

	const toggleForm = () => {
		setToggleForm(!isOpenForm);
	};

	return (
		<>
			<ArrowButton isActive={isOpenForm} onClick={toggleForm} />
			<div
				onClick={() => setToggleForm(false)}
				className={clsx(
					styles.overlay,
					isOpenForm && styles.overlay_open
				)}></div>{' '}
			{/*Данное решение нужно, чтобы модалка закрывалась при клике вне элемента*/}
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form className={styles.form}>
					<Text uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}></Select>
					<RadioGroup
						name='шрифт'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}></Select>
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}></Select>
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
