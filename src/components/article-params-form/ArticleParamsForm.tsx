import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
import clsx from 'clsx';

// export type ArticleParamsFormProps = {
// 	setAppState: (value: ArticleStateType) => void;
// };

export const ArticleParamsForm = () => {
	const asideRef = useRef<HTMLElement | null>(null);

	const [formState, setFormState] = useState(false);

	const toggleForm = () => {
		setFormState(!formState);
	};

	return (
		<>
			<ArrowButton isActive={formState} onClick={toggleForm} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, formState && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
