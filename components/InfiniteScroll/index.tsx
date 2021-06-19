import { useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const InfiniteScroll = ({
  children,
  fetchMore,
  isLoading,
  hasMoreData,
  currentPage,
}: any) => {
  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current as any);
    }
  }, []);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      hasMoreData && fetchMore(currentPage + 1);
    }
  };

  return (
    <>
      {children}

      <div ref={loader} />
      {isLoading && <CircularProgress />}
    </>
  );
};

export default InfiniteScroll;
