import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [elements, setElements] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5012/api/elements')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                if (data.elements && Array.isArray(data.elements)) {
                    setElements(data.elements);
                    const uniqueCategories = Array.from(new Set(data.elements.map(el => el.categoryName).filter(Boolean)));
                    setCategories(uniqueCategories);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filterGallery = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className={'body'}>
            <div className="gallery-container">
                <div className="gallery-header">
                    <h1>THE PRODUCT GALLERY</h1>
                    <p>awesome products prepared with creative ideas and great design</p>
                </div>
                <div className="gallery-nav">
                    <button
                        className={activeCategory === 'all' ? 'active' : ''}
                        onClick={() => filterGallery('all')}
                    >
                        ALL
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={activeCategory === category ? 'active' : ''}
                            onClick={() => filterGallery(category)}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="gallery-grid">
                    {elements.map((item, index) => (
                        <div
                            key={index}
                            className="gallery-item"
                            style={{display: activeCategory === 'all' || activeCategory === item.categoryName ? 'flex' : 'none'}}
                        >
                            <img src={item.imgPath} alt={item.categoryName}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
