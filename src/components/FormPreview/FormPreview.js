import React from 'react';
import DatePicker from 'react-date-picker';
import { Dropdown, Form, Select } from 'semantic-ui-react';
import styles from './FormPreview.module.css';

const FormPreview = ({ customFields }) => {
	return (
		<div className={styles.form}>
			<Form.Group
				widths='equal'
				className={styles.eventForm}>
				<Form.Field style={{ marginBottom: '1rem' }}>
					<label style={{ fontWeight: 'bold' }}>Name *</label>
					<Form.Input
						fluid
						placeholder='Name'
					/>
				</Form.Field>
				<Form.Field style={{ marginBottom: '1rem' }}>
					<label style={{ fontWeight: 'bold' }}>Email *</label>
					<Form.Input
						fluid
						placeholder='Email'
					/>
				</Form.Field>
				<Form.Field>
					<label style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
						Phone *
					</label>
					<Form.Input
						style={{ marginBottom: '1rem' }}
						fluid
						placeholder='Phone *'
					/>
				</Form.Field>

				{/* <div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginBottom: '1rem',
					}}>
					<label style={{ fontWeight: 'bold' }}>Birthdate *</label>
					<DatePicker />
				</div>

				<Form.Field style={{ marginBottom: '1rem' }}>
					<label style={{ fontWeight: 'bold' }}>Address *</label>
					<Form.Input
						fluid
						placeholder='Address'
					/>
				</Form.Field>

				<div style={{ marginBottom: '1rem' }}>
					<label style={{ fontWeight: 'bold' }}>Category *</label>
					<Dropdown
						placeholder='Category'
						fluid
						search
						selection
					/>
				</div> */}

				{customFields.map((field, index) => {
					if (!field.published) {
						return null;
					}
					return (
						<Form.Field style={{ marginBottom: '1rem' }}>
							<label style={{ fontWeight: 'bold' }}>{field.name} *</label>
							{field.type === 'boolean' ? (
								<Form.Field
									control={Select}
									style={{ width: '100%' }}
									options={[
										{ key: 't', text: 'True', value: 'true' },
										{ key: 'f', text: 'False', value: 'false' },
									]}
									placeholder={field.name}
									search
									searchInput={{ id: 'form-select-control-gender' }}
								/>
							) : null}
							{field.type === 'string' ? (
								<>
									{field.options && field.options.length ? (
										<Form.Input
											control={Select}
											options={field.options.map((opt) => {
												return { key: opt, text: opt, value: opt };
											})}
											searchInput={{ id: 'form-select-control-gender' }}
											fluid
											placeholder={`${field.name}`}
										/>
									) : (
										<Form.Input
											fluid
											placeholder={`${field.name}`}
										/>
									)}
								</>
							) : null}
							{field.type === 'number' ? (
								<Form.Input
									fluid
									placeholder={`${field.name}`}
								/>
							) : null}
							{field.type === 'date' ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<DatePicker />
								</div>
							) : null}
						</Form.Field>
					);
				})}
			</Form.Group>
		</div>
	);
};

export default FormPreview;
