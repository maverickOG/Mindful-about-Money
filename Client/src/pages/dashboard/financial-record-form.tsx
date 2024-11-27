import {useState} from 'react'
import {useUser} from '@clerk/clerk-react'

// FinancialRecordForm component
export const FinancialRecordForm = () => {

	// state variables for form fields
	const [description, setDescription] = useState<string>('')
	const [amount, setAmount] = useState<string>('')
	const [date, setDate] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [paymentMethod, setPaymentMethod] = useState<string>('')

	// get user object from Clerk
	const {user} = useUser()

	// handle form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// create new record object
		const newRecord = {
			userId: user?.id,
			date: new Date(date).toISOString(), // convert date to ISO string
			description: description,
			amount: parseFloat(amount), // convert amount to float
			category: category,
			paymentMethod: paymentMethod
		}

		// addRecord(newRecord)

		// clear form
		setDate('')
		setDescription('')
		setAmount('')
		setCategory('')
		setPaymentMethod('')
	}

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}> {/* Add onSubmit event handler */}
				<div className="form-field">
					<label>Description:</label>
					<input type="text" required className="input" value={description}
								 onChange={event => setDescription(event.target.value)}/>
				</div>
				<div className="form-field">
					<label>Amount:</label>
					<input type="number" required className="input" value={amount}
								 onChange={event => setAmount(event.target.value)}/>
				</div>
				<div className="form-field">
					<label>Date:</label>
					<input type="date" required className="input" value={date} onChange={event => setDate(event.target.value)}/>
				</div>
				<div className="form-field">
					<label>Category:</label>
					<select required className="input" value={category} onChange={event => setCategory(event.target.value)}>
						<option value="">Select a Category</option>
						<option value="Food">Food</option>
						<option value="Rent">Rent</option>
						<option value="Salary">Salary</option>
						<option value="Utilities">Utilities</option>
						<option value="Transportation">Transportation</option>
						<option value="Health and Insurance">Health and Insurance</option>
						<option value="Education">Education</option>
						<option value="Savings">Savings</option>
						<option value="Investment">Investment</option>
						<option value="Entertainment">Entertainment</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="for-field">
					<label>Payment Method:</label>
					<select required className="input" value={paymentMethod}
									onChange={event => setPaymentMethod(event.target.value)}>
						<option value="">Select a Payment Method</option>
						<option value="Credit Card">Credit Card</option>
						<option value="Debit Card">Debit Card</option>
						<option value="Cash">Cash</option>
						<option value="Cheque">Check</option>
						<option value="Bank Transfer">Bank Transfer</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<button type="submit" className="button"> {/* Add submit button */}
					Add Record
				</button>
			</form>
		</div>
	)
}