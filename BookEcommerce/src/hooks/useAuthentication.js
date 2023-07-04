import { useHistory } from 'react-router'
import fire from '../Firebase';
const useAuthentication = (props) => {
	const history = useHistory();

	const logOut = () => {
		fire.auth.signOut().then(() => {
			localStorage.removeItem('user');
			props();
			history.replace('/sign');
		}).catch(err => {
			console.log(err);
		})
	}
	return {
		logOut
	}
}

export default useAuthentication;