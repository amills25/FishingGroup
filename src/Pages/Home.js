import React from "react";
import { Carousel } from "react-bootstrap";

export default function Home() {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto caroPic"
                        src="./img/rod.png"
                        alt="Fishing Rod"
                    />
                    <br></br>
                    <Carousel.Caption>
                        <h3 className="text-dark">Rods</h3>
                        <p className="text-dark">We sell fishing rods!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto h-50 caroPicReel"
                        src="./img/reel2.png"
                        alt="Fishing Reel"
                    />
                    <Carousel.Caption>
                        <h3 className="text-dark">Reels</h3>
                        <p className="text-dark">We sell reels too!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto caroPic"
                        src="./img/spinner.png"
                        alt="Fishing Spinner"
                    />
                    <Carousel.Caption>
                        <h3 className="text-dark">Spinners</h3>
                        <p className="text-dark">
                            Don't forget your tackle accessories!
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}
