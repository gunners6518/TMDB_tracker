import React, { useState } from "react";

const Search = (props) => {
	const [searchValue, setSearchValue] = useState("");

	//検索欄のインプットの値が変わった時に、その値をserchValueに与えてる
	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	};

	//searchValueの値をresetしている
	const resetInputField = () => {
		setSearchValue(" ");
	};

  //検索を実際に実行している
	const callSearchFunction = (e) => {
		// e.preventDefault()ってなに？
		//参考：https://qiita.com/tochiji/items/4e9e64cabc0a1cd7a1ae
		e.preventDefault();
    props.search(searchValue);
    
    //reset発火
		resetInputField();
	};

	return (
		<form className="search">
			<input
				value={searchValue}
				onChange={handleSearchInputChanges}
				type="text"
			/>
			<input onClick={callSearchFunction} type="submit" value="検索" />
		</form>
	);
};

export default Search;
