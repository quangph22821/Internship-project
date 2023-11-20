import React from 'react';
import { Carousel, Image } from 'antd';


const ImageCarousel = () => {
    return (
        <div>
            <Carousel autoplay>
                <div>
                    <Image
                        width={1520}
                        style={{ width: "100%" }}
                        height={619}
                        src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_1.jpg?1689410100607"
                        alt="Slide 1"
                    />
                </div>
                <div>
                    <Image
                        width={1520}
                        style={{ width: "100%" }}
                        height={619}
                        src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_1.jpg?1689410100607"
                        alt="Slide 2"
                    />
                </div>
                <div>
                    <Image
                        width={1520}
                        style={{ width: "100%" }}
                        height={619}
                        src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_1.jpg?1689410100607"
                        alt="Slide 3"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
