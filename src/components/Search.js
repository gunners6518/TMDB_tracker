import React, { useState } from "react";

const Search = (props) => {

  //useStateを使っている。searchValueの初期値はuseSateの初期値より空。
	const [searchValue, setSearchValue] = useState("");

	//検索欄のインプットの値が変わった時に、その値をsetSearchValueに与えてる
	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	};

	//searchValueの値をresetしている
	const resetInputField = () => {
		setSearchValue("");
	};

  //検索を実際に実行している
	const callSearchFunction = (e) => {

		// e.preventDefault()ってなに？
		//参考：https://qiita.com/tochiji/items/4e9e64cabc0a1cd7a1ae
    e.preventDefault();

    //props.searchでは{search}関数ををApp.jsからpropsとして受け取っている。
    props.search(searchValue);
    
    //resetでsearchValueを空にする
		resetInputField();
	};

	return (
		<form className="search">
			<input
        //valueにはsearchValueが格納されているので、handleSearchInputChangesにより、入力時に値が変わり
        //resetInputFieldにより検索ボタン押下時に、空になる
        value={searchValue}
        
				onChange={handleSearchInputChanges}
				type="text"
			/>
			<input onClick={callSearchFunction} type="submit" value="検索" />
		</form>
	);
};

export default Search;
