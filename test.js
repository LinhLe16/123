const randomCat = require('random-cat-img');

(async () => {
    const res = await randomCat();
    console.log(res.data.message);
})();