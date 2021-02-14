export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const handlePosts = () => {
  return {
    initialState: {
      current_page: 0,
      loading: false,
      error: null,
      total: null,
      list: [],
    },
    reducer: (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: action.payload };
        case 'FETCH_POSTS':
          return { ...state, list: action.payload };
        case 'FETCH_POSTS_FAIL':
          return { ...state, error: action.payload };
        case 'SET_TOTAL':
          return { ...state, total: action.payload };
        case 'SET_CURRENT_PAGE':
          return { ...state, current_page: action.payload };
        default:
          throw new Error('Unexpected action');
      }
    },
    fetchPosts: (e, offset, dispatch, posts) => {
      dispatch({ type: 'LOADING', payload: true });
      if (e) document.querySelector('h1').scrollIntoView();
      if (e) e.preventDefault();
      return fetch(
        `${window.POST_SETTINGS.domain}/wp-json/wp/v2/posts?offset=${
          offset * window.POST_SETTINGS.posts_per_page
        }&per_page=${
          window.POST_SETTINGS.posts_per_page
        }&_fields[]=title&_fields[]=date&_fields[]=link&_fields[]=formatted_date`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          if (!posts.total) {
            dispatch({
              type: 'SET_TOTAL',
              payload: Number(res.headers.get('X-WP-Total')),
            });
          }
          return res.json();
        })
        .then((list) => {
          dispatch({ type: 'FETCH_POSTS', payload: list });
          dispatch({ type: 'LOADING', payload: false });
          dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: offset === 0 ? 0 : offset + 1,
          });
          history.replaceState(
            null,
            null,
            `${offset === 0 ? '/blog/' : `/blog/page/${offset + 1}/`}`
          );
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_POSTS_FAIL', payload: err.toString() });
        });
    },
  };
};
