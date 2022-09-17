import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { CgBorderStyleSolid } from 'react-icons/cg';
import { useSpringCarousel } from 'react-spring-carousel-js';
import { GET_POSTS } from '../apollo';
import FeaturedPost from './FeaturedPost';

interface Data {
    id: string;
    image: string;
    caption: string;
    title: string;
    body: string;
    authorId: string;
    postCategory: string;
    createdAt: string;
}

const Slider = () => {
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            input: {
                isFeatured: true,
            },
        },
    });

    let items = [{ id: 'empty-post', renderItem: null }];

    if (data && data.posts && data.posts.length > 0) {
        items = data.posts.map((post: Data, index) => ({
            id: `FeaturedPost-${index + 1}`,
            renderItem: (
                <FeaturedPost
                    imgSrc={post.image}
                    caption={post.caption}
                    title={post.title}
                    text={post.body}
                    author={post.authorId}
                    postCategory={post.postCategory}
                    date={post.createdAt}
                    authorUrl="#"
                    categoryUrl="#"
                />
            ),
        }));
    }

    const {
        carouselFragment,
        slideToNextItem,
        slideToPrevItem,
        slideToItem,
        getCurrentActiveItem,
    } = useSpringCarousel({
        withLoop: true,
        items,
        itemsPerSlide: 1,
    });

    const [activeSlide, setActiveSlide] = useState(items[0]?.id);

    const handleSlide = (id: string) => {
        setActiveSlide(id);
        slideToItem(id);
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (getCurrentActiveItem().id !== 'empty-post') {
            const interval = setInterval(() => {
                slideToNextItem();
                const { id } = getCurrentActiveItem();
                setActiveSlide(id);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [slideToNextItem, getCurrentActiveItem]);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (items[0].id === 'empty-post') return null;

    return (
        <div className="flex flex-col gap-9 md:gap-[100px] lg:pointer-events-auto pointer-events-none mb-[100px]">
            <div className="relative">
                <AiOutlineArrowLeft
                    className="absolute left-0 z-30 hidden p-2 text-4xl text-gray-600 -translate-y-1/2 bg-white dark:bg-[#121212] cursor-pointer top-1/2 lg:block"
                    onClick={() => {
                        slideToPrevItem();
                        const { id } = getCurrentActiveItem();
                        setActiveSlide(id);
                    }}
                />

                {carouselFragment}

                <AiOutlineArrowRight
                    className="absolute right-0 z-30 hidden p-2 text-4xl text-gray-600 -translate-y-1/2 bg-white dark:bg-[#121212] cursor-pointer top-1/2 lg:block"
                    onClick={() => {
                        slideToNextItem();
                        const { id } = getCurrentActiveItem();
                        setActiveSlide(id);
                    }}
                />
            </div>

            {/* pagination section */}
            <div className="flex justify-center gap-[2px]">
                {items.map((e) => (
                    <CgBorderStyleSolid
                        key={e.id}
                        onClick={() => handleSlide(e.id)}
                        className={`cursor-pointer duration-150 text-3xl ${
                            activeSlide === e.id ? 'text-[#8bc34a]' : 'text-gray-500'
                        } scale-y-150 scale-x-75 pointer-events-auto`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
