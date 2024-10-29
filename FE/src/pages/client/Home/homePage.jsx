import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const HomePage = () => {

    const images = [
        "https://file.hstatic.net/1000230642/collection/3_da9a91027cd0488581c18e767bd6e453_master.jpg",
        "https://file.hstatic.net/1000230642/collection/congidungdo_229c262217e54fe2a7a3739dc4182c9c_master.jpg",
        "https://file.hstatic.net/1000230642/collection/bts_218f70f897c44b86b67f581575c2290a_master.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Chuyển ảnh mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
    }, [images.length]);

    return (
        <div id='root' className="overflow-auto">
            <div className="content-wrapper max-w-screen-2xl text-base mx-auto bg-slate-200">
                <header>
                    <div className="bg-gray-800 text-white text-sm p-2 flex justify-end space-x-4">
                        <a href="#" className="hover:text-gray-400 flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span>Tra cứu đơn hàng</span>
                        </a>
                        <a href="#" className="hover:text-gray-400 flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                            </svg>
                            <span>Đăng nhập</span>
                        </a>
                        <a href="#" className="hover:text-gray-400 flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <span>Giỏ hàng</span>
                        </a>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white">
                        <div className="flex items-center space-x-4">
                            <img src="./logo/logo.jpg" className="h-[120px]" alt="Logo" />
                        </div>

                        <nav className="flex space-x-8 text-black text-xl">
                            <a href="#" className="hover:text-orange-500 flex items-center">
                                Home
                            </a>
                            <a href="#" className="hover:text-orange-500 flex items-center">
                                Sản phẩm
                            </a>
                            <a href="#" className="hover:text-orange-500 flex items-center">
                                Giới thiệu
                            </a>
                            <a href="#" className="hover:text-orange-500 flex items-center">
                                Liên hệ
                            </a>
                        </nav>

                        {/* tìm kiếm */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="border border-gray-300 rounded px-4 py-2 pr-10 w-full"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </div>
                    </div>
                </header>

                <main>

                    <div className="baner h-[530px] bg-cover bg-no-repeat">
                        <img src={images[currentImageIndex]} alt={`banner${currentImageIndex + 1}`} />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mt-[70px] ">
                        {/* <!-- Black & Black Section --> */}
                        <div class="relative"  >
                            <img src="https://intphcm.com/data/upload/poster-giay-ad.jpg" alt="Black & Black" class="w-full h-[330px] object-cover" />
                            <div class="absolute inset-0 flex items-center justify-center">
                            </div>
                            <div class="mt-4">
                                <h3 class="text-xl font-bold">BLACK & BLACK</h3>
                                <p>Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán.</p>
                            </div>
                        </div>

                        {/* <!-- Bền bỉ --> */}
                        <div class="relative">
                            <img src="https://intphcm.com/data/upload/poster-giay-ben.jpg" class="w-full h-[330px] object-cover" />
                            <div class="absolute inset-0 flex items-center justify-center">
                            </div>
                            <div class="mt-4">
                                <h3 class="text-xl font-bold">BỀN BỈ</h3>
                                <p>Tất cả những sản phẩm đều bền bỉ, bất chấp mọi thời tiết</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="bg-white p-8">
                            {/* <!-- Section chứa 3 hình ảnh --> */}
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* <!-- Hình ảnh 1 --> */}
                                <div class="h-[280px] rounded-lg overflow-hidden">
                                    <img src="https://i1-thethao.vnecdn.net/2022/12/02/ee454b467d4ca412fd5d-166996716-1168-1920-1669967175.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=3Ox-x-PIOZQsER-9hy1lTw" alt="Image 1" class="w-full h-auto object-cover" />
                                </div>

                                {/* <!-- Hình ảnh 2 --> */}
                                <div class="h-[280px] rounded-lg overflow-hidden">
                                    <img src="https://i1-thethao.vnecdn.net/2022/12/02/z3912247255778-cd8ee3b0e69b8a9-5463-6358-1669967175.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=ddokyzCfAXW0QrJW9TVpJA" alt="Image 2" class="w-full h-auto object-cover" />
                                </div>

                                {/* <!-- Hình ảnh 3 --> */}
                                <div class="h-[280px] rounded-lg overflow-hidden">
                                    <img src="https://i1-thethao.vnecdn.net/2022/12/02/2a25b6437055a90bf044-3185-1669967175.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=8qM4o9pjq5S1YlaXWvsbiA" alt="Image 3" class="w-full h-auto object-cover" />
                                </div>
                            </div>

                            {/* <!-- Phần tiêu đề và nội dung --> */}
                            <div class="text-center mt-8">
                                <h2 class="text-2xl md:text-4xl font-bold">
                                    SỰ KIỆN CHẠY ĐỘC QUYỀN DÀNH CHO BEE SHOES RUNNERS
                                </h2>
                                <p class="mt-4 text-gray-600">
                                    Hãy tham gia cộng đồng chạy bộ địa phương và đăng ký các sự kiện chạy độc quyền của các vận động viên Bee Shoes tại Hà Nội và Thành phố Hồ Chí Minh thông qua ứng dụng chạy bộ Bee Shoes.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <div class="bg-gray-800 text-white py-10">
                        <div class="container mx-auto flex justify-between">

                            <div class="flex flex-col items-center">
                                <img src="./logo/logo.jpg" alt="Bee Shoes" class="w-24 h-auto"/>
                            </div>

                            <div class="flex flex-col">
                                <h3 class="font-bold mb-4">SẢN PHẨM</h3>
                                <ul>
                                    <li>Giày Thể Thao</li>
                                </ul>
                            </div>

                            <div class="flex flex-col">
                                <h3 class="font-bold mb-4">ĐỊA CHỈ</h3>
                                <ul>
                                    <li>Tòa nhà FPT Polytechnic</li>
                                    <li>13 P. Trịnh Văn Bô</li>
                                    <li>Xuân Phương, Nam Từ Liêm</li>
                                </ul>
                            </div>

                            
                            <div class="flex flex-col">
                                <h3 class="font-bold mb-4">LIÊN HỆ</h3>
                                <ul>
                                    <li>Hotline</li>
                                    <li>0999 888 999</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </footer>
            </div>
        </div>
    );
}

export default HomePage;
