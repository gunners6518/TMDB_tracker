import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=fc176905";

// stateを3つ使っている
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

// stateとactionに基づいて、新しいstateを返す
const reducer = (state, action) => {
  // stateが複数の場合は、action.typeになる
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        //複数のstateを持つ場合は、展開してオブジェクトをマージする
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        //複数のstateを持つ場合は、展開してオブジェクトをマージする
        ...state,
        loading: false,
        //成功したら。action.payloadで、検索結果のjson配列を受け取っている
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        //複数のstateを持つ場合は、展開してオブジェクトをマージする
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = () => {
  //作成したreducerとstateをuseReducerに渡す
  //initialStateを初期値とし、dispatchでstateを変えていく
  //dispatchでreducerは実行されて、typeでaction識別子を、payloadでプロパティを返す
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffectの第二引数が[]なので、初回のみfetchは実行される。
    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
              });
            });
          }, []);

    const search = searchValue => {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST"
      });
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          　});
        } else {
          dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          });
          }
      });
	};

    const { movies, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="Movie-app" />
      <Search search={search} />
      <p className="App-intro">好きな映画をシェアしよう！！</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;

