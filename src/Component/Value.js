import React, { useEffect, useState } from "react";
import "./Value.css"
const Value = () => {
	const intialValue = { name: "", email: "", number: "" };
	const [formValues, setFormValues] = useState(intialValue);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [data, setData] = useState([]);

	const handleChange = (e) => {
		console.log(e.target);
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		console.log(formValues);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
		setFormValues({ name: "", email: "", number: "" });
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formValues).length === 0 && isSubmit) {
			// console.log(formValues);
		}
	});

	const validate = (values) => {
		const errors = {};
		const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (!values.name) {
			errors.name = "Name is required";
		}
		if (!values.email) {
			errors.email = "Email is required";
		} else if (!regex.test(values.email)) {
			errors.email = " This is not Vaild Email formate";
		}
		if (!values.number) {
			errors.number = "Phone Number is required";
		} else if (values.number.length < 10) {
			errors.number = "The number is below 10 characters";
		} else if (values.number.length > 10) {
			errors.number = "The number is above 10 characters";
		}
		return errors;

	};

	const addto = () => {
		setData((oldVal) => {
			return [...oldVal, formValues];
		});
	};
	const deleteVal = (id) => {
		console.log("deleted");
		setData((oldVal) => {
			return oldVal.filter((arrElem, index) => {
				return index !== id;
			});
		});
	};

	const editItem = (index) => {
		let newEditItem = formValues.find((dataVal) => {
			return dataVal.index === index;
		});
		console.log(newEditItem);
	};

	return (
		<div className="rightSide">
			<form action="" onSubmit={handleSubmit}>
				<label className="heading" htmlFor="">Name</label>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formValues.name}
					onChange={handleChange}
				/>
				<p style={{color: "red"}}>{formErrors.name}</p>
				<br />
				<label className="heading" htmlFor="">Email</label>
				<input
					type="email"
					name="email"
					placeholder="name@gmail.com"
					value={formValues.email}
					onChange={handleChange}
				/>
				<p style={{color: "red"}}>{formErrors.email}</p>
				<br />
				<label className="heading" htmlFor="">Phone.No</label>
				<input
				className="input3"
					type="Number"
					name="number"
					placeholder="91XXXXXXX0"
					value={formValues.number}
					onChange={handleChange}
				/>
				<p style={{color: "red"}}>{formErrors.number}</p>
				<br />
				<button className="btn" type="submit" onClick={addto}>
					Submit
				</button>
			</form>

			<div className="leftSide">
				<table border={1} width="30%" cellPadding={10}>
					<tbody>
						<tr>
							<td>Name</td>
							<td>Email</td>
							<td>Phone.No</td>
							<td>Edit</td>
							<td>Delete</td>
						</tr>
						{data.map((dataVal, index) => {
							// return <li>{dataVal.name}{dataVal.email}{dataVal.number}</li>
							return (
								<tr>
									<td key={index} id={index}>
										{dataVal.name}
									</td>
									<td key={index} id={index}>
										{dataVal.email}
									</td>
									<td key={index} id={index}>
										{dataVal.number}
									</td>
									<td key={index} id={index}>
										<button className="btn1"
											onClick={() => {
												editItem(index);
											}}
										>
											Edit
										</button>
									</td>
									<td key={index} id={index}>
										<button className="btn1"
											onClick={() => {
												deleteVal(index);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Value;
