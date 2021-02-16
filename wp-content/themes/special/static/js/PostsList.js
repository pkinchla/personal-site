import { h, render, Fragment } from 'preact';
import { removeAllChildNodes, handlePosts } from './helpers';
import { useEffect, useReducer } from 'preact/hooks';

export default function PostsList(selector) {
  if (!selector) return;
  const headerNode = selector.querySelector('header');
  const contentNode = selector.querySelector('.content');
  const categoriesNode = selector.querySelector('.categories');
  const figure = selector.querySelector('figure').innerHTML;
  removeAllChildNodes(selector);

  function List() {
    const posts_per_page = window.POST_SETTINGS.posts_per_page;
    const postAPI = handlePosts();
    const [posts, dispatch] = useReducer(postAPI.reducer, postAPI.initialState);

    useEffect(() => {
      const offset = window.location.pathname.split('/')[3]
        ? window.location.pathname.split('/')[3] - 1
        : 0;
      postAPI.fetchPosts(null, offset, dispatch, posts);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* eslint react/no-danger: 0 */
    return (
      <Fragment>
        <figure dangerouslySetInnerHTML={{ __html: figure }} />
        <header>
          <h1 tabindex="-1">
            Soap Box&nbsp;
            <span class="assistive-text">(Blog)</span>
            {posts.current_page === 0 ? (
              ''
            ) : (
              <span>(Page {posts.current_page})</span>
            )}
            <div
              className="post-meta assistive-text"
              dangerouslySetInnerHTML={{
                __html:
                  headerNode.firstElementChild.nextElementSibling.innerHTML,
              }}
            />
          </h1>
        </header>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: contentNode.innerHTML }}
        />
        <section
          className="post-list"
          aria-labelledby="posts"
          role="region"
          id="post-list"
          aria-live="polite"
        >
          <h2 id="posts" className="assistive-text">
            Blog Posts
          </h2>

          {posts.error && <p className="msg">Error Fetching Posts</p>}
          {posts.loading && !posts.error ? (
            <p className="msg gamma">loading...</p>
          ) : (
            <Fragment>
              {posts.list.map((item, index) => {
                return (
                  <article key={index}>
                    <h3 className="delta">
                      <a href={item.link} className="linked-header">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.title.rendered,
                          }}
                        />
                      </a>
                    </h3>
                    <div className="entry-meta">
                      <time dateTime={item.date}>{item.formatted_date}</time>
                    </div>
                  </article>
                );
              })}
              <div className="pagination">
                {posts.current_page !== 0 && (
                  <a
                    onClick={(e) =>
                      postAPI.fetchPosts(
                        e,
                        posts.current_page - 2,
                        dispatch,
                        posts
                      )
                    }
                    className="prev"
                    href={`/page/${posts.current_page - 1}`}
                  >
                    Previous&nbsp;<span className="assistive-text">Page</span>
                  </a>
                )}
                {Array(Math.ceil(posts.total / posts_per_page))
                  .fill()
                  .map((item, index) => {
                    const page = index + 1;
                    const current_page =
                      page === posts.current_page ||
                      (index === 0 && posts.current_page === 0);
                    const Tag = current_page ? 'span' : 'a';

                    return (
                      <Tag
                        className="page-number page-numbers"
                        aria-controls={current_page ? null : 'post-list'}
                        onClick={(e) =>
                          current_page
                            ? null
                            : postAPI.fetchPosts(e, index, dispatch, posts)
                        }
                        href={current_page ? null : `/blog/page/${page}`}
                      >
                        <span className="assistive-text">Page</span>&nbsp;{page}
                      </Tag>
                    );
                  })}
                {!(
                  Math.ceil(posts.total / posts_per_page) === posts.current_page
                ) && (
                  <a
                    onClick={(e) =>
                      postAPI.fetchPosts(
                        e,
                        posts.current_page === 0 ? 1 : posts.current_page,
                        dispatch,
                        posts
                      )
                    }
                    className="next"
                    href={`/page/${
                      posts.current_page === 0 ? 2 : posts.current_page + 1
                    }`}
                  >
                    Next&nbsp;<span className="assistive-text">Page</span>
                  </a>
                )}
              </div>
            </Fragment>
          )}
        </section>
        <section
          className="categories"
          aria-labelledby="categories"
          dangerouslySetInnerHTML={{ __html: categoriesNode.innerHTML }}
        />
      </Fragment>
    );
  }

  render(<List />, selector);
}
