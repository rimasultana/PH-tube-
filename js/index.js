const loadCategory = async () => {
   const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   const data = await res.json();
   displayCategory(data.categories);

}
const displayCategory = (data) => {
    console.log(data);
}




loadCategory();