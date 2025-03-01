/* eslint-disable react/prop-types */

export default function GamePageDataSection ({ title, data, nestedKey = null }) {
  //if it's a simple value like "release date"
  if (typeof data === 'string') {
    return (
      <div className='gamePagaData'>
        <h3 className='gamePagaDataH3'>{title}:</h3>
        <p>{data}</p>
      </div>
    );
  }

  //if data is undefined or empty, don't render anything
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='gamePagaData'>
      <h3 className='gamePagaDataH3'>{title}:</h3>
      <>
        {data.map((item, index) => {
          //get value - handle nested items like platforms
          const value = nestedKey ? item[nestedKey].name : item.name;
          
          return (
            <p key={value}>
              {index === data.length - 1 ? 
                <> {value} </> 
                :
                <>{value},&nbsp; </>
              }
            </p>
          );
        })}
      </>
    </div>
  );
}

