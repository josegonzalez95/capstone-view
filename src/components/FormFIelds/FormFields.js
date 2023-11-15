import React, { useEffect, useState } from 'react';
import {
	createCustomField,
	createOption,
	deleteCustomFieldOption,
	getCustomField,
	getOptions,
	updateCustomFieldName,
	updateCustomFieldOption,
	updateCustomFieldPublished,
} from '../../api/CustomFields/customFields';
import { useParams } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, Select } from 'semantic-ui-react';
import styles from './FormFields.module.css';
import FormPreview from '../FormPreview/FormPreview';
import { getEvent } from '../../api/Events/eventsRoutes';

const FormFields = () => {
	const [state, setState] = useState({
		customFields: [],
		isEdit: false,
		fieldToUpdate: { name: '', published: '', id: 0 },
		options: [],
		isFieldCreate: false,
		fieldToCreate: { name: '', type: '' },
		isOptionCreate: false,
		optionValue: '',
		isDeleteOption: false,
		idOptionToUpdate: null,
		optionToUpdate: { id: 0, value: '' },
		isUpdateOption: false,
		event: { title: '' },
	});
	const { eventId } = useParams();
	useEffect(() => {
		const getFields = async () => {
			const getCustomFieldsResponse = await getCustomField({
				eventid: eventId,
			});
			const eventResponse = await await getEvent({ id: Number(eventId) });
			setState((prevState) => {
				return {
					...prevState,
					customFields: getCustomFieldsResponse.eventCustomFields.customFields,
					event: eventResponse.event,
				};
			});
		};
		getFields().catch((err) => {
			console.error(err);
		});
		// eslint-disable-next-line
	}, []);
	console.log(state.customFields);
	return (
		<div className={styles.container}>
			<div>
				<p className={styles.title}>{state.event.title}</p>

				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						// backgroundColor: 'red',
						marginBottom: '1rem',
					}}>
					<h1
						style={{
							// backgroundColor: 'blue',
							// display: 'flex',
							height: '1em',
						}}>
						Custom Form Fields
					</h1>
					<Button
						style={{ marginLeft: '1rem' }}
						// color='black'
						className={styles.btn}
						onClick={() => {
							setState((prevState) => {
								return { ...prevState, isFieldCreate: true };
							});
						}}>
						Create Field
					</Button>
				</div>
				{/* Create Custom Field Form */}
				{state.isFieldCreate && (
					<div>
						<Form>
							<Form.Group widths='equal'>
								<Form.Field
									id='form-input-control-first-name'
									control={Input}
									// label='Field Name'
									label={<label style={{ color: 'white' }}>Field Name</label>}
									placeholder='Field Name'
									onChange={(e) => {
										setState((prevState) => {
											return {
												...prevState,
												fieldToCreate: {
													...state.fieldToCreate,
													name: e.target.value,
												},
											};
										});
										// setEventInfo((prev) => {
										// 	return { ...prev, name: e.target.value };
										// });
									}}
								/>
								<Form.Field
									control={Select}
									label={<label style={{ color: 'white' }}>Type</label>}
									onChange={(e) => {
										setState((prevState) => {
											return {
												...prevState,
												fieldToCreate: {
													...state.fieldToCreate,
													type: e.target.textContent.toLowerCase(),
												},
											};
										});
										// setEventInfo((prev) => {
										// 	return {
										// 		...prev,
										// 		type: e.target.textContent.toLowerCase(),
										// 	};
										// });
									}}
									options={[
										{ key: 's', text: 'String', value: 'string' },
										{ key: 'b', text: 'Boolean', value: 'boolean' },
										{ key: 'd', text: 'Date', value: 'date' },
										{ key: 'n', text: 'Number', value: 'number' },
									]}
									// label={{
									// 	children: 'Type',
									// 	htmlFor: 'form-select-control-gender',
									// }}
									placeholder='Type'
									search
									searchInput={{ id: 'form-select-control-gender' }}
								/>
							</Form.Group>
						</Form>
						<Button
							// color='black'
							className={styles.btn}
							onClick={async () => {
								if (
									state.fieldToCreate.name === '' ||
									state.fieldToCreate.type === ''
								) {
									// setIsFieldCreate(false);
									setState((prevState) => {
										return { ...prevState, isFieldCreate: false };
									});
									return;
								}
								const response = await createCustomField({
									...state.fieldToCreate,
									eventid: eventId,
								});
								const newFieldId = response.newCustomField.field.id;
								// setCustomFields((prev) => {
								// 	return [...prev, eventInfo];
								// });
								// console.log(eventInfo)
								// setIsFieldCreate(false);
								setState((prevState) => {
									return {
										...prevState,
										isFieldCreate: false,
										customFields: [
											...prevState.customFields,
											{
												id: newFieldId,
												...state.fieldToCreate,
												published: true,
											},
										],
									};
								});
							}}>
							Create
						</Button>
						<Button
							color='black'
							// className={styles.btn}
							onClick={() =>
								setState((prevState) => {
									return { ...prevState, isFieldCreate: false };
								})
							}>
							Close
						</Button>
					</div>
				)}
				{/* End Create Custom Field Form */}

				{/* Custom Fields Table */}
				<div style={{ display: 'flex' }}>
					<Table
						className={styles.table}
						celled>
						<Table.Header>
							<Table.Row textAlign='center'>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Type</Table.HeaderCell>
								{/* <Table.HeaderCell>Options</Table.HeaderCell> */}
								<Table.HeaderCell>Published</Table.HeaderCell>
								<Table.HeaderCell>Actions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{state.customFields.map((field, index) => {
								return (
									<Table.Row textAlign='center'>
										<Table.Cell
											className={styles.selectableCell}
											onClick={() => {
												// setIdToPublished(field.id);
												setState((prevState) => {
													return {
														...prevState,
														isUpdateFieldName: true,
													};
												});
											}}>
											{field.name}
										</Table.Cell>
										<Table.Cell>{field.type}</Table.Cell>
										{/* {field.type === 'string' ? (
											<Table.Cell
												// className={styles.published}
												className={styles.selectableCell}
												onClick={async () => {
													// const options = await getOptions({
													// 	cfid: field.id,
													// });
													// console.log(options.options);
													// setOptions(options.options);
													// setAddOptions(true);
													// setIdToPublished(field.id);
												}}>
												Manage OPTIONS
											</Table.Cell>
										) : (
											<Table.Cell />
										)} */}
										<Table.Cell
											className={styles.selectableCell}
											onClick={() => {
												// setPublishField(true);
												// setIdToPublished(field.id);
											}}>
											<p>{String(field.published)}</p>
										</Table.Cell>
										<Table.Cell>
											<Button
												// color='black'
												className={styles.btn}
												onClick={async () => {
													const optionsResponse = await getOptions({
														cfid: field.id,
													});
													setState((prevState) => {
														return {
															...prevState,
															isEdit: true,
															fieldToUpdate: field,
															options: optionsResponse.options,
														};
													});
												}}>
												Edit
											</Button>
										</Table.Cell>
									</Table.Row>
									// <div style={{display:'flex'}}>
									//   <p>Name: {field.name}</p>
									//   <p>Type: {field.type}</p>
									// </div>
								);
							})}
						</Table.Body>
					</Table>

					<FormPreview customFields={state.customFields} />
				</div>
			</div>
			{/*End Custom Fields Table */}

			{/* Edit Custom Field Modal */}
			<Modal
				open={state.isEdit}
				onClose={() => {
					setState((prevState) => {
						return { ...prevState, isEdit: false };
					});
				}}>
				<Modal.Header>Update Field</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field
							control={Input}
							label='Name'
							value={state.fieldToUpdate.name}
							onChange={(e) => {
								setState((prevState) => {
									return {
										...prevState,
										fieldToUpdate: {
											...prevState.fieldToUpdate,
											name: e.target.value,
										},
									};
								});
							}}
							placeholder='Name'>
							{/* <Form.Input
								
							/> */}
						</Form.Field>
						<Form.Field
							label='Published'
							control={Select}
							style={{ width: '100%' }}
							onChange={(e) => {
								setState((prevState) => {
									return {
										...prevState,
										fieldToUpdate: {
											...prevState.fieldToUpdate,
											published: e.target.textContent.toLowerCase(),
										},
									};
								});
							}}
							options={[
								{ key: 't', text: 'True', value: 'true' },
								{ key: 'f', text: 'False', value: 'false' },
							]}
							search
							placeholder={`${state.fieldToUpdate.published}`}
							searchInput={{ id: 'form-select-control-gender' }}
						/>
					</Form>

					{/* Options Table */}
					{state.fieldToUpdate.type === 'string' && (
						<>
							{' '}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}>
								<p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
									Manage Field Options
								</p>
								<Button
									style={{ marginLeft: '1rem' }}
									// color='black'
									className={styles.btn}
									onClick={() => {
										// setIsOptionCreate(true);
										setState((prevState) => {
											return { ...prevState, isOptionCreate: true };
										});
									}}>
									Create Option
								</Button>
							</div>
							{state.isOptionCreate && (
								<div>
									<Form>
										<Form.Group widths='equal'>
											<Form.Field
												id='form-input-control-first-name'
												control={Input}
												label='Option Value'
												placeholder='Option Value'
												onChange={(e) => {
													// setEventInfo((prev) => {
													// 	return { ...prev, name: e.target.value };
													// });
													setState((prevState) => {
														return {
															...prevState,
															optionValue: e.target.value,
														};
													});
												}}
											/>
										</Form.Group>
									</Form>
									<Button
										// color='black'
										className={styles.btn}
										onClick={async () => {
											if (state.optionValue === '') {
												setState((prevState) => {
													return { ...prevState, isOptionCreate: false };
												});
												return;
											}
											const optResponse = await createOption({
												cfid: state.fieldToUpdate.id,
												value: state.optionValue,
											});
											console.log(state.fieldToUpdate.id);
											setState((prevState) => {
												const updatedFields = state.customFields.map(
													(field) => {
														if (field.id === state.fieldToUpdate.id) {
															return {
																...field,
																options: [...field.options, state.optionValue],
															};
														}
														return field;
													}
												);
												return {
													...prevState,
													isOptionCreate: false,
													customFields: updatedFields,
													options: [
														...prevState.options,
														{
															id: optResponse.option.id,
															value: state.optionValue,
															cfid: state.fieldToUpdate.id,
														},
													],
												};
											});
										}}>
										Create
									</Button>
									<Button
										color='black'
										// className={styles.btn}
										onClick={() => {
											// setIsOptionCreate(false);
											setState((prevState) => {
												return { ...prevState, isOptionCreate: false };
											});
										}}>
										Close
									</Button>
								</div>
							)}
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Value</Table.HeaderCell>
										{/* <Table.HeaderCell>Actions</Table.HeaderCell> */}
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{state.options.map((opt) => {
										return (
											<>
												<Table.Row>
													<Table.Cell
														className={styles.actionsCell}
														// selectable
														// onClick={() => {
														// 	setState((prevState) => {
														// 		return {
														// 			...prevState,
														// 			isUpdateOption: true,
														// 			idOptionToUpdate: opt.id,
														// 		};
														// 	});
														// }}
													>
														{opt.value}
														<div>
															<Button
																onClick={() => {
																	setState((prevState) => {
																		return {
																			...prevState,
																			isUpdateOption: true,
																			idOptionToUpdate: opt.id,
																			optionToUpdate: opt,
																		};
																	});
																}}
																// color='black'
																className={styles.btn}>
																Edit
															</Button>
															<Button
																onClick={() => {
																	setState((prevState) => {
																		return {
																			...prevState,
																			isDeleteOption: true,
																			idOptionToUpdate: opt.id,
																			optionToUpdate: opt,
																		};
																	});
																}}
																color='black'>
																Delete
															</Button>
														</div>
													</Table.Cell>
													{/* <Table.Cell
												// className={styles.actionsCell}
												style={{ paddingLeft: '1rem' }}
												selectable
												onClick={() => {
													setState((prevState) => {
														return {
															...prevState,
															isDeleteOption: true,
															idOptionToUpdate: opt.id,
														};
													});
												}}>
												<Button color='black'>Delete</Button>
											</Table.Cell> */}
												</Table.Row>
											</>
										);
									})}
								</Table.Body>
							</Table>
						</>
					)}
					{/*End Options Table */}
				</Modal.Content>
				<Modal.Actions>
					<Button
						color='black'
						onClick={() => {
							setState((prevState) => {
								return {
									...prevState,
									isEdit: false,
									fieldToUpdate: { name: '', published: '', id: 0 },
								};
							});
						}}>
						Close
					</Button>
					<Button
						className={styles.btn}
						positive
						onClick={async () => {
							const originalField = state.customFields.filter((field) => {
								return field.id === state.fieldToUpdate.id;
							})[0];

							const { name, published } = originalField;
							if (name !== state.fieldToUpdate.name) {
								await updateCustomFieldName({
									id: state.fieldToUpdate.id,
									name: state.fieldToUpdate.name,
								});
							}

							if (published !== state.fieldToUpdate.published) {
								await updateCustomFieldPublished({
									id: state.fieldToUpdate.id,
									published: state.fieldToUpdate.published,
								});
							}

							setState((prevState) => {
								const updatedFields = state.customFields.map((field) => {
									if (field.id === state.fieldToUpdate.id) {
										return {
											...field,
											name: state.fieldToUpdate.name,
											published:
												state.fieldToUpdate.published === 'true' ? true : false,
										};
									}
									return field;
								});
								return {
									...prevState,
									isEdit: false,
									fieldToUpdate: { name: '', published: '', id: 0 },
									customFields: updatedFields,
								};
							});
						}}>
						Update
					</Button>
				</Modal.Actions>
			</Modal>
			{/* End Edit Custom Field Modal */}
			{/* update option value modal */}
			<Modal
				open={state.isUpdateOption}
				onClose={() =>
					setState((prevState) => {
						return { ...prevState, isUpdateOption: false };
					})
				}>
				<Modal.Header>Update Option Value</Modal.Header>
				<Modal.Content>
					<Form.Field
						id='form-input-control-first-name'
						control={Input}
						placeholder='Input Value'
						onChange={(e) => {
							setState((prevState) => {
								return {
									...prevState,
									optionToUpdate: {
										...prevState.optionToUpdate,
										value: e.target.value,
									},
								};
							});
						}}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button
						content='Update'
						labelPosition='right'
						icon='checkmark'
						onClick={async () => {
							console.log(state.optionToUpdate);
							await updateCustomFieldOption({
								id: state.optionToUpdate.id,
								value: state.optionToUpdate.value,
							});
							// setOptions((prevState) => {

							// });
							setState((prevState) => {
								const options = prevState.options.map((opt) => {
									if (opt.id === state.optionToUpdate.id) {
										return { ...opt, value: state.optionToUpdate.value };
									}
									return opt;
								});
								const updatedFields = state.customFields.map((field) => {
									if (field.id === state.fieldToUpdate.id) {
										const optToDel = prevState.options.filter((opt) => {
											return opt.id === state.optionToUpdate.id;
										})[0];
										const updatedOptions = field.options.filter((opt) => {
											return opt !== optToDel.value;
										});
										return {
											...field,
											options: [...updatedOptions, state.optionToUpdate.value],
										};
									}
									return field;
								});
								return {
									...prevState,
									isUpdateOption: false,
									customFields: updatedFields,
									options: options,
								};
							});
						}}
						positive
					/>
					<Button
						content='Cancel'
						labelPosition='right'
						onClick={() => {
							setState((prevState) => {
								return { ...prevState, isUpdateOption: false };
							});
						}}
					/>
				</Modal.Actions>
			</Modal>
			{/*End update option value modal */}

			{/* Delete option modal */}
			<Modal
				open={state.isDeleteOption}
				onClose={() =>
					setState((prevState) => {
						return { ...prevState, isDeleteOption: false };
					})
				}>
				<Modal.Header>Delete Option</Modal.Header>
				<Modal.Actions>
					<Button
						content='Delete'
						labelPosition='right'
						icon='checkmark'
						onClick={async () => {
							await deleteCustomFieldOption({
								id: state.optionToUpdate.id,
							});
							// setOptions((prevState) => {
							// 	return prevState.filter((opt) => {
							// 		return opt.id !== state.idOptionToUpdate;
							// 	});
							// });
							setState((prevState) => {
								const updatedFields = state.customFields.map((field) => {
									if (field.id === state.fieldToUpdate.id) {
										const optToDel = prevState.options.filter((opt) => {
											return opt.id === state.optionToUpdate.id;
										})[0];
										const updatedOptions = field.options.filter((opt) => {
											return opt !== optToDel.value;
										});
										return {
											...field,
											options: updatedOptions,
										};
									}
									return field;
								});
								const options = prevState.options.filter((opt) => {
									return opt.id !== state.optionToUpdate.id;
								});
								return {
									...prevState,
									isDeleteOption: false,
									options: options,
									customFields: updatedFields,
								};
							});
						}}
						positive
					/>
					<Button
						content='Cancel'
						labelPosition='right'
						onClick={() => {
							setState((prevState) => {
								return { ...prevState, isDeleteOption: false };
							});
						}}
					/>
				</Modal.Actions>
			</Modal>
			{/* End Delete option modal */}
		</div>
	);
};

export default FormFields;
