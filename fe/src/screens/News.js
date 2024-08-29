import React from 'react';
import Footer2 from '../components/reusables/Footer2';
import Header2 from '../components/Header2';
import MobileHeader from '../components/mobile/MobileHeader';
import NewsCard from '../components/NewsCard';

const News = ({ deviceType }) => {
    const handleClick = () => {
        console.log('News card clicked!');
    };
    
    const exampleSources = [
      'https://example.com/source1.png',
      'https://example.com/source2.png',
      'https://example.com/source3.png',
    ];
    return (
        <>
            <div className="heading">
                {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
            </div>
            <div className='homepage-hero'>
                <div className="container">
                    <div className="flex-container-wrap">
                        <div className="flex-news">
                            <NewsCard
                                title="Langford and Heim Lead Rangers' Comeback Victory"
                                description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
                                imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
                                sourceLogos={exampleSources}
                                onClick={handleClick}
                            />
                        </div>
                        <div className="flex-news">
                            <NewsCard
                                title="Langford and Heim Lead Rangers' Comeback Victory"
                                description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
                                imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
                                sourceLogos={exampleSources}
                                onClick={handleClick}
                            />
                        </div>
                        <div className="flex-news">
                            <NewsCard
                                title="Langford and Heim Lead Rangers' Comeback Victory"
                                description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
                                imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
                                sourceLogos={exampleSources}
                                onClick={handleClick}
                            />
                        </div>
                        <div className="flex-news">
                            <NewsCard
                                title="Langford and Heim Lead Rangers' Comeback Victory"
                                description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
                                imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
                                sourceLogos={exampleSources}
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    );
};

export default News;