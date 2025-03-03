/* eslint-disable react/prop-types */

export default function Carousel ({gameScreenshots}) {
    return (
        <>
            <div id="carousel" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={gameScreenshots.gameScreenshots[0].image} className="d-block w-100" alt="..."/>
                </div>   
                {(gameScreenshots.gameScreenshots.slice(1)).map((screenshot) => { 

                return <div key={screenshot.id} className="carousel-item">
                    {/*use loading="lazy" for improving performance by preventing image loading until the user switches to them*/}
                    <img 
                        src={screenshot.image} 
                        className="d-block w-100" 
                        loading="lazy" 
                        alt="game screenshot"
                    />
                </div>   
                })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </>
    );
}