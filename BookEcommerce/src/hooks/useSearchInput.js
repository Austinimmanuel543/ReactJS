import {useState, useCallback} from 'react';

const useSearchInput = (props) => {
 
 	const [search, setSearch]=useState('');
  	const handleSearch = useCallback((e)=>{
  		setSearch(e.target.value);
  	},[setSearch])
  	return {
  		search,
  		handleSearch
  	}
}

export default useSearchInput;