import Loading from './loading';


export default function LoadingScreen(): JSX.Element {
  return (
    <>
      <h1 style={{textAlign: 'center' }}>Loading ...</h1>
      <div className="loading-screen">
        <Loading />
      </div>
    </>


  );
}
