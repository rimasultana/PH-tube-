const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategory(data.categories);

    } catch (error) {
        console.error(error);
    }
};

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('categoris');

    categories.forEach((item) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = item.category;

        categoryContainer.append(button);
    });
};




loadCategory();