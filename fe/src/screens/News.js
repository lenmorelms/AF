import React from "react";
import { Link } from "react-router-dom";
// import newsImage from "";

const News = () => {
  return (
    <div className="construction-page">
      <h1>Stay Tuned for the Latest Sports News!</h1>
      {/* <img src={newsImage} alt="News Under Construction" /> */}
      <p>We’re working hard to bring you the latest updates on African football and more. Check back soon for news!</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
      <style jsx>{`
        .construction-page {
          text-align: center;
          padding: 50px 20px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        h1 {
          color: navy;
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          color: gray;
          margin-bottom: 20px;
        }
        .btn-primary {
          background-color: #ffc300;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
        }
        .btn-primary:hover {
          background-color: #ffc300;
        }
      `}</style>
    </div>
  );
};

export default News;

// import React from 'react';
// import Footer2 from '../components/reusables/Footer2';
// import Header2 from '../components/Header2';
// import MobileHeader from '../components/mobile/MobileHeader';
// import NewsCard from '../components/NewsCard';
// import FooterMobile from '../components/reusables/FooterMobile';
// const News = ({ deviceType }) => {
//     const handleClick = () => {
//         console.log('News card clicked!');
//     };
    
//     const exampleSources = [
//       'https://example.com/source1.png',
//       'https://example.com/source2.png',
//       'https://example.com/source3.png',
//     ];
//     return (
//         <>
//             <div className="heading">
//                 {(deviceType=="phone") ? <MobileHeader /> : <Header2 />}
//             </div>
//             <div className='homepage-hero'>
//                 <div className="container">
//                     <div className="flex-container-wrap">
//                         <div className="flex-news">
//                             <NewsCard
//                                 title="Langford and Heim Lead Rangers' Comeback Victory"
//                                 description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
//                                 imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
//                                 sourceLogos={exampleSources}
//                                 onClick={handleClick}
//                             />
//                         </div>
//                         <div className="flex-news">
//                             <NewsCard
//                                 title="Langford and Heim Lead Rangers' Comeback Victory"
//                                 description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
//                                 imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
//                                 sourceLogos={exampleSources}
//                                 onClick={handleClick}
//                             />
//                         </div>
//                         <div className="flex-news">
//                             <NewsCard
//                                 title="Langford and Heim Lead Rangers' Comeback Victory"
//                                 description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
//                                 imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
//                                 sourceLogos={exampleSources}
//                                 onClick={handleClick}
//                             />
//                         </div>
//                         <div className="flex-news">
//                             <NewsCard
//                                 title="Langford and Heim Lead Rangers' Comeback Victory"
//                                 description="According to ABC News, the Texas Rangers staged a dramatic comeback..."
//                                 imageUrl="https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0817%2Fr1374698_1296x729_16%2D9.jpg&w=570&format=jpg"
//                                 sourceLogos={exampleSources}
//                                 onClick={handleClick}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {deviceType==="phone" ?<FooterMobile /> : <Footer2 />}
//         </>
//     );
// };

// export default News;