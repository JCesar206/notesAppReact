import React,{ useState, useContext} from "react"; // Componente de ResetPassword...
import { AuthContext } from '../contexts/AuthContext';

export default function ResetPassword() {
	const { api } = useContext(AuthContext);
	const [token, setToken] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const submit = async (e) => {
		e.preventDefault()
		try {
			await api.post('/auth/reset-password', { token, newPassword });
			alert('Password actualziado');
		} catch (err) {
			console.error(err);
			alert(err.response?.data?.message || 'Error');
		}
	};

	return (
		<form onSubmit={submit} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
			<input value={token} onChange={e => setToken(e.target.value)} placeholder="Token"
				className="w-full p-2 mb-2 border rounded"/>
			<input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
				placeholder="Nuevo Password" className="w-full p-2 mb-2 border rounded"/>
			<button className="bg-red-500 text-white px-4 py-2 rounded">Reset</button>
		</form>
	);
}